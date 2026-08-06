import Image from "next/image";
import { characters, SERIES_META, TOTAL_ROSTER } from "../../data/characters";
import { notFound } from "next/navigation";
import PrintButton from "./PrintButton";

export function generateStaticParams() {
  return characters
    .filter((c) => c.spriteUrl)
    .map((c) => ({ slug: c.slug }));
}

export default async function ColoringPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const character = characters.find((c) => c.slug === slug);
  if (!character || !character.spriteUrl) return notFound();

  const series = SERIES_META[character.series];
  const padNum = String(character.number).padStart(2, "0");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Screen header — hidden when printing */}
      <div className="print:hidden bg-paper border-b border-ink/[0.06] px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-[family-name:var(--font-display)] text-xl font-extrabold text-ink">
          TIMUR<span className="text-[#FF4D7D]">.</span>WORLD
        </a>
        <div className="flex items-center gap-3">
          <a href="/print" className="text-sm text-pencil hover:text-ink font-semibold">All coloring pages</a>
          <PrintButton />
        </div>
      </div>

      {/* Printable coloring page */}
      <div className="flex-1 flex items-center justify-center p-8 print:p-0">
        <div className="w-full max-w-[8.5in] aspect-[8.5/11] bg-white relative border border-ink/[0.08] print:border-0 rounded-lg print:rounded-none overflow-hidden">
          {/* Thin series-color border frame */}
          <div
            className="absolute inset-4 rounded-2xl print:inset-[0.5in] print:rounded-none pointer-events-none"
            style={{ border: `2px solid ${series.color}25` }}
          />

          {/* Header */}
          <div className="absolute top-8 left-0 right-0 text-center print:top-[0.75in]">
            <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-extrabold text-ink">
              {character.name}
            </h1>
            <p className="font-[family-name:var(--font-collector)] text-sm text-pencil mt-1 uppercase">
              No. {padNum} / {TOTAL_ROSTER}
            </p>
          </div>

          {/* Character art — large and centered */}
          <div className="absolute inset-0 top-24 bottom-16 flex items-center justify-center print:top-[2in] print:bottom-[1in]">
            <div className="relative w-3/4 h-3/4 max-w-[500px]">
              <Image
                src={character.spriteUrl}
                alt={character.name}
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-6 left-0 right-0 text-center print:bottom-[0.5in]">
            <p className="text-xs text-pencil/50">
              timur.world · drawn by Timur, age 9
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
