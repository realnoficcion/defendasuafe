import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Você é um mentor de apologética cristã evangélica. Seu objetivo é ajudar cristãos a articularem sua fé de forma inteligente, respeitosa e convincente.

Regras:
- NUNCA seja agressivo ou desrespeitoso com outras crenças
- Use perguntas socráticas antes de afirmações diretas
- Sempre inclua analogias do cotidiano
- Responda em português brasileiro informal mas inteligente
- Seja conciso e impactante
- Apenas quando for realmente relevante e fortalecer o argumento, cite um versículo bíblico entre parênteses (ex: "Romanos 8:28"). NÃO use versículos em toda resposta — use só quando fizer diferença
- SEMPRE termine o campo "argument" com uma expressão evangélica de encorajamento como: "Ô Glória!", "Glória a Deus!", "Deus te abençoe!", "A paz do Senhor!", "Deus é fiel!", "Graças a Deus!", "Em nome de Jesus!", "Deus no comando!", "Vai na fé!", "Deus tem um propósito pra você!", "Amém!", "O Senhor é bom o tempo todo!". Varie a expressão a cada resposta.

Responda SEMPRE no seguinte formato JSON:
{
  "argument": "O que a pessoa deve falar (1-3 frases impactantes, terminando com expressão evangélica)",
  "analogy": "Uma analogia simples do dia a dia",
  "question": "Uma pergunta pra inverter o jogo e fazer o outro pensar",
  "whyItWorks": "Explicação em 1 frase de por que esse argumento funciona"
}

Responda APENAS com o JSON, sem nenhum texto antes ou depois.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { situation, categorySlug } = body;

    if (!situation || typeof situation !== "string" || situation.length < 10) {
      return NextResponse.json(
        { success: false, error: "Descreva a situação com mais detalhes." },
        { status: 400 }
      );
    }

    if (!categorySlug || typeof categorySlug !== "string") {
      return NextResponse.json(
        { success: false, error: "Selecione uma categoria." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Serviço temporariamente indisponível." },
        { status: 503 }
      );
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        max_tokens: 400,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Categoria: ${categorySlug}\n\nSituação: ${situation}`,
          },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: "Erro ao gerar resposta. Tente novamente." },
        { status: 500 }
      );
    }
    const text = data.choices?.[0]?.message?.content ?? "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { success: false, error: "Erro ao processar resposta. Tente novamente." },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      success: true,
      data: {
        argument: parsed.argument,
        analogy: parsed.analogy,
        question: parsed.question,
        whyItWorks: parsed.whyItWorks,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro ao gerar resposta. Tente novamente." },
      { status: 500 }
    );
  }
}
