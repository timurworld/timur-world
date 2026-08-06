"use client";

import Image from "next/image";
import { useState } from "react";
import { SERIES_META, TOTAL_ROSTER, characterOfTheDay } from "../data/characters";

const HERO_GROUP = "/hero-characters.png";

const POKE_REACTIONS = [
  "scale-x-110 scale-y-90",
  "rotate-[20deg]",
  "-translate-y-6",
] as const;

export default function Hero() {
  const [featured] = useState(characterOfTheDay);
  const series = SERIES_META[featured.series];
  const padNum = String(featured.number).padStart(2, "0");
  const [pokeIdx, setPokeIdx] = useState(0);
  const [poking, setPoking] = useState(false);

  const nameParts = featured.name.split(" ");
  const firstName = nameParts.slice(0, -1).join(" ") || nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  function handlePoke() {
    setPoking(true);
    setPokeIdx((i) => (i + 1) % POKE_REACTIONS.length);
    setTimeout(() => setPoking(false), 400);
  }

  return (
    <section className="relative overflow-hidden border-b border-ink/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
          {/* Left: Copy */}
          <div className="w-full lg:w-[38%] shrink-0 text-center lg:text-left">
            <a
              href={`#char-${featured.slug}`}
              className="inline-block px-3 py-1.5 mb-5 font-[family-name:var(--font-collector)] text-[11px] font-bold uppercase tracking-wider border border-ink rounded-sm hover:bg-ink hover:text-white transition-colors"
            >
              Character of the Day
            </a>

            <div className="flex items-center gap-3 mb-3 justify-center lg:justify-start">
              <span className="series-badge" style={{ background: series.color }}>{series.label}</span>
              <span className="collector-num">No. {padNum} / {TOTAL_ROSTER}</span>
            </div>

            <a href={`#char-${featured.slug}`} className="group inline-block">
              <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-extrabold text-ink tracking-tight leading-[1.0] group-hover:opacity-80 transition-opacity">
                {firstName}
                {lastName && <><br /><span style={{ color: series.color }}>{lastName}</span></>}
              </h1>
            </a>

            {featured.facts[0] && (
              <p className="mt-6 text-lg text-pencil max-w-md mx-auto lg:mx-0 leading-relaxed">{featured.facts[0]}</p>
            )}

            <div className="flex items-center gap-3 mt-8 justify-center lg:justify-start">
              <a
                href="#characters"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-white font-[family-name:var(--font-collector)] font-bold text-xs uppercase tracking-wider hover:bg-ink/90 transition-colors"
              >
                Meet the whole crew
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/worlds"
                className="inline-flex items-center px-6 py-3.5 border border-ink/20 text-ink font-[family-name:var(--font-collector)] font-bold text-xs uppercase tracking-wider hover:border-ink/40 transition-colors"
              >
                Play their Worlds
              </a>
            </div>

            <div className="flex items-center gap-4 mt-8 text-xs text-pencil justify-center lg:justify-start">
              <span>Made by Timur, age 9</span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                No ads
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Parent-run
              </span>
            </div>
          </div>

          {/* Right: Character group image */}
          <div className="w-full lg:w-[62%] relative lg:-mr-6 lg:scale-[1.15] lg:origin-center">
            {/* Organic blob backdrop — tucked behind the right half of the group */}
            <div
              className="absolute right-[-4%] top-[6%] w-[64%] h-[82%] bg-[#DDE8FB]"
              style={{ borderRadius: "58% 42% 47% 53% / 52% 48% 55% 45%" }}
            />

            {/* Loose squiggle weaving through the group */}
            <svg
              className="absolute inset-0 w-full h-full text-ink/[0.55]"
              viewBox="0 0 800 500"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M210 90 C 420 30, 660 80, 640 210 C 625 315, 470 330, 430 260 C 395 195, 520 130, 640 170 M 300 430 C 420 480, 560 450, 610 380"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            {/* Characters — the dominant element */}
            <div
              className="relative z-10 w-full aspect-[1574/759] cursor-pointer select-none"
              onClick={handlePoke}
            >
              <Image
                src={HERO_GROUP}
                alt="Timur World characters"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 62vw"
                className={`object-contain transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${poking ? POKE_REACTIONS[pokeIdx] : ""}`}
              />
            </div>

            {/* Decorative accents */}
            <svg className="absolute top-[18%] left-[16%] w-4 h-4 text-[#2F7CFF] z-20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14 2 9.2h7.6z" />
            </svg>
            <svg className="absolute bottom-[12%] left-[12%] w-3 h-3 text-[#FF4D7D] z-20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14 2 9.2h7.6z" />
            </svg>
            <div className="absolute top-[12%] right-[12%] z-20 rotate-6">
              <svg className="w-16 h-16 text-[#2F7CFF]" viewBox="0 0 64 64" fill="currentColor">
                <polygon points="64,32 57.1,38.7 59.7,48 50.4,50.4 48,59.7 38.7,57.1 32,64 25.3,57.1 16,59.7 13.6,50.4 4.3,48 6.9,38.7 0,32 6.9,25.3 4.3,16 13.6,13.6 16,4.3 25.3,6.9 32,0 38.7,6.9 48,4.3 50.4,13.6 59.7,16 57.1,25.3" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white -rotate-6">WOW!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
