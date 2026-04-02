"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { QuoteCard } from "@/components/QuoteCard";
import { CategoryPills } from "@/components/CategoryPills";
import { BottomNav } from "@/components/BottomNav";
import { quotes } from "@/data/quotes";
import type { CategorySlug } from "@/types";

function shuffle<T>(array: readonly T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function HomePage() {
  const [category, setCategory] = useState<CategorySlug | "todos">("todos");
  const [index, setIndex] = useState(0);
  const [shuffled, setShuffled] = useState<typeof quotes>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = useMemo(() => {
    return category === "todos"
      ? quotes
      : quotes.filter((q) => q.categorySlug === category);
  }, [category]);

  useEffect(() => {
    setShuffled(shuffle(filtered));
    setIndex(0);
  }, [filtered]);

  const currentQuote = shuffled[index];

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % shuffled.length);
  }, [shuffled.length]);

  const handleCategoryChange = useCallback(
    (slug: CategorySlug | "todos") => {
      setCategory(slug);
    },
    []
  );

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-dvh px-5 pb-24 pt-safe">
        <header className="pt-12 pb-6 text-center">
          <h1 className="font-serif text-4xl font-bold shimmer-text">
            Defenda Sua Fé
          </h1>
          <p className="text-sm text-white/90 mt-1">
            Argumentos poderosos para<br />evangelizar com sabedoria
          </p>
        </header>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh px-5 pb-24 pt-safe">
      {/* Header */}
      <header className="pt-12 pb-6 text-center">
        <h1 className="font-serif text-4xl font-bold shimmer-text">
          Defenda Sua Fé
        </h1>
        <p className="text-sm text-white/90 mt-1">
          Argumentos poderosos para<br />evangelizar com sabedoria
        </p>
      </header>

      {/* Categories */}
      <div className="mb-6">
        <CategoryPills selected={category} onSelect={handleCategoryChange} />
      </div>

      {/* Quote counter */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-slate-500">
          {shuffled.length > 0 ? `${index + 1} de ${shuffled.length}` : ""}
        </span>
      </div>

      {/* Quote */}
      {currentQuote && (
        <QuoteCard quote={currentQuote} onNext={handleNext} />
      )}

      {/* Pro upsell */}
      <div className="mt-6 rounded-2xl p-4 flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-white/60">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-800">
            Quer argumentos personalizados?
          </p>
          <p className="text-xs text-slate-600">
            A IA gera respostas sob medida pra sua conversa
          </p>
        </div>
        <a
          href="/pro"
          className="shrink-0 rounded-xl bg-gradient-to-r from-sunset-500 to-sunset-400 px-4 py-2 text-xs font-semibold text-white shadow-sm"
        >
          Pro
        </a>
      </div>

      <BottomNav />
    </div>
  );
}
