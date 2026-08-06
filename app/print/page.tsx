import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { characters, SERIES_META, TOTAL_ROSTER } from "../data/characters";

const printable = characters
  .filter((c) => c.sketchUrl && !c.hidden)
  .sort((a, b) => b.number - a.number);

export default function PrintIndex() {
  return (
    <main>
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-14">
          <span className="font-[family-name:var(--font-collector)] text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B5CF6]">
            Sketchbook
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink tracking-tight mt-3">
            Coloring Pages
          </h1>
          <p className="text-pencil mt-3 text-lg">
            {printable.length} characters to print and color — free to download
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {printable.map((ch) => {
            const series = SERIES_META[ch.series];
            const padNum = String(ch.number).padStart(3, "0");
            return (
              <div
                key={ch.slug}
                className="rounded-[20px] bg-white card-shadow overflow-hidden hover-lift group"
                style={{ borderLeft: `3px solid ${series.color}` }}
              >
                <div className="aspect-square relative notebook-paper flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4">
                    <Image
                      src={ch.sketchUrl!}
                      alt={`${ch.name} coloring page`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-ink/[0.06]">
                  <h3 className="font-[family-name:var(--font-display)] text-sm font-bold text-ink truncate">
                    {ch.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="font-[family-name:var(--font-collector)] text-[10px] text-pencil uppercase">
                      No. {padNum} · {series.label}
                    </span>
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    <Link
                      href={`/print/${ch.slug}`}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-ink bg-ink/[0.06] hover:bg-ink/[0.12] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Print
                    </Link>
                    <a
                      href={ch.sketchUrl!}
                      download
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-ink bg-ink/[0.06] hover:bg-ink/[0.12] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
