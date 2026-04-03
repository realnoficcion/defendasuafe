import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Defenda Sua Fé — Argumentos poderosos para evangelizar",
  description:
    "Argumentos, quotes e respostas inteligentes para compartilhar sua fé com sabedoria.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Defenda Sua Fé",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#fffaf5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="font-sans text-slate-800 min-h-dvh antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}`,
          }}
        />
        {/* Celestial background */}
        <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
          <img
            src="/bg.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>

        <div className="relative mx-auto max-w-md min-h-dvh">
          {/* Soft warm ambient orbs */}
          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-sunset-200/25 blur-3xl" />
            <div className="absolute top-1/3 -left-20 h-64 w-64 rounded-full bg-sunset-100/30 blur-3xl" />
            <div className="absolute bottom-20 right-10 h-48 w-48 rounded-full bg-warm-200/35 blur-3xl" />
          </div>
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
