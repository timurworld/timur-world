"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="px-4 py-2 rounded-full bg-ink text-white font-[family-name:var(--font-display)] font-bold text-sm hover:bg-ink/90 transition-colors"
    >
      Print
    </button>
  );
}
