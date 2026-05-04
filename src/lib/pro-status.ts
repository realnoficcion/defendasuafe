import type { ProStatus, ProductId } from "@/types";

const STORAGE_KEY = "defenda-pro-status";
const STATUS_TTL_MS = 24 * 60 * 60 * 1000;

export function readCachedStatus(): ProStatus | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as ProStatus;
    if (parsed.tier !== "pro") return parsed;

    const isStale = Date.now() - parsed.verifiedAt > STATUS_TTL_MS;
    if (isStale) return null;

    if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
      return { tier: "free", verifiedAt: Date.now() };
    }

    return parsed;
  } catch {
    return null;
  }
}

export function writeCachedStatus(status: ProStatus): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
}

export function clearCachedStatus(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export interface VerifyPurchaseInput {
  productId: ProductId;
  purchaseToken: string;
}

export async function verifyPurchase(input: VerifyPurchaseInput): Promise<ProStatus> {
  const res = await fetch("/api/verificar-compra", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.error || "Falha ao verificar compra");
  }

  const status: ProStatus = data.data;
  writeCachedStatus(status);
  return status;
}
