import Link from "next/link";
import Image from "next/image";

export default function AboutStrip() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Timur */}
          <div className="md:w-[45%] shrink-0">
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Soft backdrop blob */}
              <div
                className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 w-[92%] aspect-square bg-[#DDE8FB]"
                style={{ borderRadius: "52% 48% 45% 55% / 55% 45% 52% 48%" }}
              />
              <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-display)] text-[280px] font-extrabold text-[#2F7CFF]/[0.08] leading-none select-none">
                T
              </span>
              <Image
                src="/timur_v2.png"
                alt="Timur"
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="relative object-contain object-bottom drop-shadow-[0_16px_32px_rgba(28,27,34,0.18)]"
              />
            </div>
            <p className="text-center font-[family-name:var(--font-collector)] text-[10px] font-bold uppercase tracking-[0.2em] text-pencil mt-4">
              Founder &amp; Chief Imagination Officer
            </p>
          </div>

          {/* Copy */}
          <div className="md:w-[55%] text-center md:text-left">
            <span className="font-[family-name:var(--font-collector)] text-[11px] font-bold uppercase tracking-[0.2em] text-[#2F7CFF]">
              The Kid Behind the World
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink tracking-tight leading-tight mt-3">
              Hi, I'm Timur.
            </h2>
            <p className="text-pencil text-lg mt-4 max-w-lg mx-auto md:mx-0 leading-relaxed">
              I love to play hockey, make characters, invent games and name everything with way too many &ldquo;ini&rdquo;s.
            </p>
            <p className="font-[family-name:var(--font-display)] text-2xl text-[#FF4D7D] italic mt-6">
              — Timur
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 mt-6 font-[family-name:var(--font-collector)] text-xs font-bold uppercase tracking-wider text-ink border-b-2 border-[#2F7CFF] pb-0.5 hover:text-[#2F7CFF] transition-colors"
            >
              Learn more
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
