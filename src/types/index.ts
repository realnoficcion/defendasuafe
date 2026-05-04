export type CategorySlug =
  | "ciencia"
  | "moral"
  | "sentido-da-vida"
  | "sofrimento"
  | "e-se-voce-estiver-errado";

export interface Category {
  readonly slug: CategorySlug;
  readonly label: string;
  readonly description: string;
  readonly icon: string;
  readonly color: string;
}

export interface Quote {
  readonly id: string;
  readonly categorySlug: CategorySlug;
  readonly argument: string;
  readonly whyItWorks: string;
  readonly source?: string;
}

export interface GeneratedArgument {
  readonly argument: string;
  readonly whyItWorks: string;
  readonly analogy?: string;
  readonly question?: string;
}

export type SubscriptionTier = "free" | "pro";

export type ProductId = "pro_mensal" | "pro_anual";

export interface ProStatus {
  readonly tier: SubscriptionTier;
  readonly productId?: ProductId;
  readonly expiresAt?: number;
  readonly verifiedAt: number;
}

