"use client";

import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { categories } from "@/data/categories";
import type { CategorySlug } from "@/types";

interface AIResponse {
  argument: string;
  whyItWorks: string;
  analogy?: string;
  question?: string;
}

export default function ProPage() {
  const [situation, setSituation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug>("ciencia");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (situation.trim().length < 10) {
      setError("Descreva a situação com mais detalhes (mínimo 10 caracteres)");
      return;
    }

    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await fetch("/api/gerar-argumento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          situation: situation.trim(),
          categorySlug: selectedCategory,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Erro ao gerar resposta. Tente novamente.");
        return;
      }

      setResponse(data.data);
    } catch {
      setError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleNewQuestion = () => {
    setResponse(null);
    setSituation("");
    setError("");
  };

  // Response view — full screen
  if (response) {
    return (
      <div className="flex flex-col min-h-dvh px-5 pb-24 pt-safe">
        <header className="pt-12 pb-4 text-center">
          <h1 className="font-serif text-2xl font-bold shimmer-text">
            Sua Resposta
          </h1>
        </header>

        <div className="flex-1 flex flex-col gap-4 animate-fade-in-up">
          {/* Main argument */}
          <div className="glass-card rounded-3xl p-5">
            <p className="text-xs font-semibold text-sunset-600 uppercase tracking-wider mb-2">
              O que falar
            </p>
            <p className="font-serif text-lg font-semibold text-slate-800 leading-relaxed">
              &ldquo;{response.argument}&rdquo;
            </p>
          </div>

          {/* Analogy */}
          {response.analogy && (
            <div className="glass rounded-2xl p-4">
              <p className="text-xs font-semibold text-sunset-600 uppercase tracking-wider mb-1">
                Analogia
              </p>
              <p className="text-sm text-slate-700">{response.analogy}</p>
            </div>
          )}

          {/* Question */}
          {response.question && (
            <div className="glass rounded-2xl p-4">
              <p className="text-xs font-semibold text-sunset-600 uppercase tracking-wider mb-1">
                Pergunta pra inverter o jogo
              </p>
              <p className="text-sm text-slate-700 italic">
                &ldquo;{response.question}&rdquo;
              </p>
            </div>
          )}

          {/* Why it works */}
          <div className="glass rounded-2xl p-4">
            <p className="text-xs font-semibold text-sunset-600 uppercase tracking-wider mb-1">
              Por que funciona
            </p>
            <p className="text-sm text-slate-700">{response.whyItWorks}</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-auto">
            <button
              onClick={() =>
                handleCopy(
                  `"${response.argument}"\n\nEnviado via Defenda Sua Fé`
                )
              }
              className="flex-1 rounded-xl glass py-3 text-sm font-medium text-slate-700 active:scale-95 transition-transform"
            >
              Copiar resposta
            </button>
            <button
              onClick={handleNewQuestion}
              className="flex-1 rounded-xl bg-gradient-to-r from-sunset-500 to-sunset-400 py-3 text-sm font-semibold text-white active:scale-95 transition-transform"
            >
              Nova pergunta
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  // Form view
  return (
    <div className="flex flex-col min-h-dvh px-5 pb-24 pt-safe">
      <header className="pt-12 pb-6 text-center">
        <h1 className="font-serif text-2xl font-bold shimmer-text">
          Resposta Personalizada
        </h1>
        <p className="text-sm text-slate-700 mt-1">
          Descreva a situação e a IA gera a resposta perfeita
        </p>
      </header>

      {/* Category selector */}
      <div className="mb-4">
        <label className="text-xs font-medium text-slate-700 uppercase tracking-wider mb-2 block">
          Tema
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`rounded-full px-3 py-1.5 text-sm transition-all ${
                selectedCategory === cat.slug
                  ? "bg-gradient-to-r from-sunset-500 to-sunset-400 text-white font-semibold shadow-sm"
                  : "glass text-slate-700"
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Situation input */}
      <div className="mb-4">
        <label className="text-xs font-medium text-slate-700 uppercase tracking-wider mb-2 block">
          Descreva a situação
        </label>
        <textarea
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          placeholder="Ex: Meu amigo disse que a ciência já provou que Deus não existe e que eu sou ignorante por acreditar..."
          className="w-full h-32 rounded-2xl glass p-4 text-sm text-slate-800 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-sunset-400/40"
          maxLength={500}
        />
        <div className="text-right mt-1">
          <span className="text-xs text-slate-700">{situation.length}/500</span>
        </div>
      </div>

      {/* Quick examples */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          "Meu colega disse que fé é coisa de gente fraca",
          "Minha amiga perguntou por que Deus permite guerras",
          "Alguém no trabalho falou que a Bíblia é um livro de ficção",
        ].map((example) => (
          <button
            key={example}
            onClick={() => setSituation(example)}
            className="text-xs text-slate-700 glass rounded-full px-3 py-1.5 active:scale-95 transition-transform"
          >
            &ldquo;{example.slice(0, 40)}...&rdquo;
          </button>
        ))}
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full rounded-2xl bg-gradient-to-r from-sunset-500 to-sunset-400 py-4 text-white font-semibold text-base glow-accent active:scale-[0.98] transition-transform disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Gerando...
          </span>
        ) : (
          "Gerar Resposta"
        )}
      </button>

      {/* Error */}
      {error && (
        <p className="mt-4 text-sm text-red-400 text-center">{error}</p>
      )}

      <BottomNav />
    </div>
  );
}
