"use client";

import { Quote } from "@/types";
import { categories } from "@/data/categories";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { formatQuoteForSharing, shareQuote } from "@/lib/share";

interface QuoteCardProps {
  readonly quote: Quote;
  readonly onNext: () => void;
}

export function QuoteCard({ quote, onNext }: QuoteCardProps) {
  const { copy, copied } = useCopyToClipboard();
  const category = categories.find((c) => c.slug === quote.categorySlug);

  const handleCopy = () => {
    copy(formatQuoteForSharing(quote.argument, quote.source));
  };

  const handleShare = () => {
    shareQuote(quote.argument, quote.source);
  };

  return (
    <div className="glass-card rounded-3xl p-6 animate-fade-in-up" key={quote.id}>
      {/* Category tag */}
      {category && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-lg">{category.icon}</span>
          <span className="text-xs font-medium text-sunset-600 uppercase tracking-wider">
            {category.label}
          </span>
        </div>
      )}

      {/* Quote text */}
      <blockquote className="font-serif text-xl font-semibold leading-relaxed text-slate-800 mb-4">
        {quote.argument}
      </blockquote>

      {/* Source */}
      {quote.source && (
        <p className="text-sm text-slate-500 mb-4">— {quote.source}</p>
      )}

      {/* Why it works */}
      <div className="glass rounded-xl p-4 mb-6">
        <p className="text-xs font-semibold text-sunset-600 uppercase tracking-wider mb-1">
          Por que funciona
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          {quote.whyItWorks}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3 glass text-xs font-medium text-slate-600 active:scale-95 transition-transform"
        >
          {copied ? (
            <>
              <CheckIcon /> Copiado!
            </>
          ) : (
            <>
              <CopyIcon /> Copiar
            </>
          )}
        </button>

        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3 glass text-xs font-medium text-slate-600 active:scale-95 transition-transform"
        >
          <ShareIcon /> Enviar
        </button>

        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3 bg-gradient-to-r from-sunset-500 to-sunset-400 text-white text-xs font-semibold active:scale-95 transition-transform"
        >
          Próxima →
        </button>
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}
