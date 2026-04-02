import { Category } from "@/types";

export const categories: readonly Category[] = [
  {
    slug: "e-se-voce-estiver-errado",
    label: "E se você estiver errado?",
    description: "O peso da aposta",
    icon: "🤔",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    slug: "ciencia",
    label: "Ciência",
    description: "Fé e razão lado a lado",
    icon: "🔬",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    slug: "moral",
    label: "Moral",
    description: "De onde vem o certo e o errado?",
    icon: "⚖️",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    slug: "sentido-da-vida",
    label: "Sentido da Vida",
    description: "Por que estamos aqui?",
    icon: "🌅",
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    slug: "sofrimento",
    label: "Sofrimento",
    description: "Se Deus existe, por que o mal?",
    icon: "💔",
    color: "from-red-500/20 to-pink-500/20",
  },
];
