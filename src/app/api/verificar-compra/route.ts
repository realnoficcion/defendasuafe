import { NextRequest, NextResponse } from "next/server";
import { verifySubscriptionPurchase } from "@/lib/google-play";
import { PRODUCT_IDS } from "@/lib/digital-goods";
import type { ProductId } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, purchaseToken } = body;

    if (!productId || !PRODUCT_IDS.includes(productId as ProductId)) {
      return NextResponse.json(
        { success: false, error: "productId inválido" },
        { status: 400 }
      );
    }

    if (!purchaseToken || typeof purchaseToken !== "string") {
      return NextResponse.json(
        { success: false, error: "purchaseToken inválido" },
        { status: 400 }
      );
    }

    const status = await verifySubscriptionPurchase(productId, purchaseToken);

    return NextResponse.json({ success: true, data: status });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json(
      { success: false, error: `Falha na verificação: ${message}` },
      { status: 500 }
    );
  }
}
