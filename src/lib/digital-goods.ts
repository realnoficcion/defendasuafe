import type { ProductId } from "@/types";

const PAYMENT_METHOD = "https://play.google.com/billing";

export const PRODUCT_IDS: ProductId[] = ["pro_mensal", "pro_anual"];

export interface ProductInfo {
  productId: ProductId;
  title: string;
  priceFormatted: string;
  priceMicros: string;
  currency: string;
}

export function isTwaEnvironment(): boolean {
  if (typeof window === "undefined") return false;
  return typeof window.getDigitalGoodsService === "function";
}

export async function fetchProducts(): Promise<ProductInfo[]> {
  if (!isTwaEnvironment()) {
    throw new Error("Digital Goods API não disponível");
  }

  const service = await window.getDigitalGoodsService!(PAYMENT_METHOD);
  const items = await service.getDetails([...PRODUCT_IDS]);

  return items.map((item) => ({
    productId: item.itemId as ProductId,
    title: item.title,
    priceFormatted: formatPrice(item.price.value, item.price.currency),
    priceMicros: item.price.value,
    currency: item.price.currency,
  }));
}

export interface PurchaseResult {
  productId: ProductId;
  purchaseToken: string;
}

export async function purchaseSubscription(productId: ProductId): Promise<PurchaseResult> {
  if (typeof PaymentRequest === "undefined") {
    throw new Error("PaymentRequest não suportado");
  }

  const request = new PaymentRequest(
    [
      {
        supportedMethods: PAYMENT_METHOD,
        data: {
          sku: productId,
        },
      },
    ],
    {
      total: {
        label: "Assinatura Pro",
        amount: { currency: "BRL", value: "0" },
      },
    }
  );

  const response = await request.show();
  const details = response.details as { purchaseToken?: string };
  const purchaseToken = details.purchaseToken;

  if (!purchaseToken) {
    await response.complete("fail");
    throw new Error("Compra retornou sem token");
  }

  await response.complete("success");

  return { productId, purchaseToken };
}

export async function listExistingPurchases(): Promise<PurchaseResult[]> {
  if (!isTwaEnvironment()) return [];

  const service = await window.getDigitalGoodsService!(PAYMENT_METHOD);
  const purchases = await service.listPurchases();

  return purchases
    .filter((p): p is { itemId: ProductId; purchaseToken: string } =>
      PRODUCT_IDS.includes(p.itemId as ProductId)
    )
    .map((p) => ({ productId: p.itemId, purchaseToken: p.purchaseToken }));
}

function formatPrice(value: string, currency: string): string {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return `${currency} ${value}`;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(numeric);
}
