"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import {
  fetchProducts,
  isTwaEnvironment,
  purchaseSubscription,
  type ProductInfo,
} from "@/lib/digital-goods";
import { verifyPurchase } from "@/lib/pro-status";
import type { ProductId } from "@/types";

const FALLBACK_PRICES: Record<ProductId, string> = {
  pro_anual: "R$ 83,90",
  pro_mensal: "R$ 9,90",
};

export default function AssinarPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Record<ProductId, ProductInfo | null>>({
    pro_anual: null,
    pro_mensal: null,
  });
  const [twaAvailable, setTwaAvailable] = useState(false);
  const [purchasing, setPurchasing] = useState<ProductId | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const inTwa = isTwaEnvironment();
    setTwaAvailable(inTwa);

    if (!inTwa) return;

    fetchProducts()
      .then((items) => {
        const map: Record<ProductId, ProductInfo | null> = {
          pro_anual: null,
          pro_mensal: null,
        };
        for (const item of items) {
          map[item.productId] = item;
        }
        setProducts(map);
      })
      .catch(() => {
        // mantém fallback
      });
  }, []);

  const handlePurchase = async (productId: ProductId) => {
    setError("");

    if (!twaAvailable) {
      setError("Compras só estão disponíveis no app instalado pelo Google Play.");
      return;
    }

    setPurchasing(productId);

    try {
      const result = await purchaseSubscription(productId);
      await verifyPurchase(result);
      router.push("/pro");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro inesperado";
      if (!/cancel/i.test(message)) {
        setError(`Não foi possível concluir a compra. ${message}`);
      }
    } finally {
      setPurchasing(null);
    }
  };

  const annualPrice = products.pro_anual?.priceFormatted ?? FALLBACK_PRICES.pro_anual;
  const monthlyPrice = products.pro_mensal?.priceFormatted ?? FALLBACK_PRICES.pro_mensal;

  return (
    <div className="flex flex-col min-h-dvh px-5 pb-24 pt-safe">
      <header className="pt-12 pb-8 text-center">
        <h1 className="font-serif text-2xl font-bold shimmer-text">
          Libere todo seu potencial
        </h1>
        <p className="text-sm text-white/90 mt-2">
          Argumentos ilimitados + IA personalizada
        </p>
      </header>

      {/* Benefits */}
      <div className="space-y-3 mb-8">
        {[
          {
            title: "Argumentos ilimitados",
            desc: "Acesso a todos os argumentos sem limite diário",
          },
          {
            title: "IA Personalizada",
            desc: "Descreva a situação e receba a resposta perfeita",
          },
          {
            title: "Todas as categorias",
            desc: "Ciência, moral, sofrimento e muito mais",
          },
          {
            title: "Novos toda semana",
            desc: "Argumentos novos adicionados semanalmente",
          },
        ].map((benefit) => (
          <div key={benefit.title} className="glass rounded-2xl p-4 flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-sunset-400 mt-1.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-700">
                {benefit.title}
              </p>
              <p className="text-xs text-slate-500">{benefit.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing cards */}
      <div className="space-y-4">
        {/* Annual - highlighted */}
        <div className="glass-card rounded-3xl p-6 glow-accent relative overflow-hidden">
          <div className="absolute top-3 right-3 bg-gradient-to-r from-sunset-500 to-sunset-400 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
            Mais popular
          </div>
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
            Plano Anual
          </p>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="font-serif text-3xl font-bold text-slate-800">
              {annualPrice}
            </span>
            <span className="text-sm text-slate-500">/ano</span>
          </div>
          <p className="text-xs text-sunset-600 mb-4">
            R$6,99/mês — economize 30%
          </p>
          <button
            onClick={() => handlePurchase("pro_anual")}
            disabled={purchasing !== null}
            className="w-full rounded-2xl bg-gradient-to-r from-sunset-500 to-sunset-400 py-4 text-white font-semibold glow-accent active:scale-[0.98] transition-transform disabled:opacity-60"
          >
            {purchasing === "pro_anual" ? "Processando..." : "Começar agora"}
          </button>
        </div>

        {/* Monthly */}
        <div className="glass rounded-2xl p-5">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
            Plano Mensal
          </p>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="font-serif text-2xl font-bold text-slate-800">
              {monthlyPrice}
            </span>
            <span className="text-sm text-slate-500">/mês</span>
          </div>
          <button
            onClick={() => handlePurchase("pro_mensal")}
            disabled={purchasing !== null}
            className="w-full rounded-xl glass py-3 text-sm font-medium text-slate-600 active:scale-95 transition-transform disabled:opacity-60"
          >
            {purchasing === "pro_mensal" ? "Processando..." : "Escolher mensal"}
          </button>
        </div>
      </div>

      {/* Trust */}
      <p className="text-center text-xs text-slate-600 mt-6">
        Cancele quando quiser · Pagamento seguro via Google Play
      </p>

      {!twaAvailable && (
        <p className="text-center text-xs text-white/80 mt-3">
          Para assinar, instale o app pelo Google Play.
        </p>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-300 text-center">{error}</p>
      )}

      <BottomNav />
    </div>
  );
}
