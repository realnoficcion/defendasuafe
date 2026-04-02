export function formatQuoteForSharing(argument: string, source?: string): string {
  let text = `"${argument}"`;
  if (source) {
    text += `\n\n— ${source}`;
  }
  text += "\n\nEnviado via Defenda Sua Fé";
  return text;
}

export async function shareQuote(argument: string, source?: string): Promise<boolean> {
  const text = formatQuoteForSharing(argument, source);

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ text });
      return true;
    } catch {
      // User cancelled or share failed
    }
  }

  // Fallback: WhatsApp deeplink
  const encoded = encodeURIComponent(text);
  window.open(`https://wa.me/?text=${encoded}`, "_blank");
  return true;
}
