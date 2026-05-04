import { google, androidpublisher_v3 } from "googleapis";
import type { ProductId, ProStatus } from "@/types";

const SCOPE = "https://www.googleapis.com/auth/androidpublisher";

let cachedClient: androidpublisher_v3.Androidpublisher | null = null;

function getClient(): androidpublisher_v3.Androidpublisher {
  if (cachedClient) return cachedClient;

  const clientEmail = process.env.GOOGLE_PLAY_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PLAY_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Credenciais Google Play não configuradas");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: [SCOPE],
  });

  cachedClient = google.androidpublisher({ version: "v3", auth });
  return cachedClient;
}

export async function verifySubscriptionPurchase(
  productId: ProductId,
  purchaseToken: string
): Promise<ProStatus> {
  const packageName = process.env.GOOGLE_PLAY_PACKAGE_NAME;
  if (!packageName) {
    throw new Error("GOOGLE_PLAY_PACKAGE_NAME não configurado");
  }

  const client = getClient();
  const response = await client.purchases.subscriptionsv2.get({
    packageName,
    token: purchaseToken,
  });

  const purchase = response.data;
  const state = purchase.subscriptionState;

  const isActive =
    state === "SUBSCRIPTION_STATE_ACTIVE" ||
    state === "SUBSCRIPTION_STATE_IN_GRACE_PERIOD";

  if (!isActive) {
    return { tier: "free", verifiedAt: Date.now() };
  }

  const expiryIso =
    purchase.lineItems?.[0]?.expiryTime ?? undefined;
  const expiresAt = expiryIso ? new Date(expiryIso).getTime() : undefined;

  if (purchase.acknowledgementState === "ACKNOWLEDGEMENT_STATE_PENDING") {
    await acknowledgeSubscription(productId, purchaseToken);
  }

  return {
    tier: "pro",
    productId,
    expiresAt,
    verifiedAt: Date.now(),
  };
}

async function acknowledgeSubscription(
  productId: ProductId,
  purchaseToken: string
): Promise<void> {
  const packageName = process.env.GOOGLE_PLAY_PACKAGE_NAME;
  if (!packageName) return;

  const client = getClient();
  await client.purchases.subscriptions.acknowledge({
    packageName,
    subscriptionId: productId,
    token: purchaseToken,
  });
}
