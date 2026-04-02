"use client";

import { useState, useMemo, useCallback } from "react";
import { quotes } from "@/data/quotes";
import type { CategorySlug, Quote } from "@/types";

function shuffle<T>(array: readonly T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function useQuotes(categorySlug?: CategorySlug) {
  const filtered = useMemo(() => {
    const list = categorySlug
      ? quotes.filter((q) => q.categorySlug === categorySlug)
      : quotes;
    return shuffle(list);
  }, [categorySlug]);

  const [index, setIndex] = useState(0);

  const currentQuote: Quote | undefined = filtered[index];
  const total = filtered.length;

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % filtered.length);
  }, [filtered.length]);

  const previous = useCallback(() => {
    setIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  return {
    currentQuote,
    index,
    total,
    next,
    previous,
  };
}
