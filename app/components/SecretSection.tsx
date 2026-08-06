"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { characters, SERIES_META } from "../data/characters";

const STORAGE_KEY = "timurworld-lucky";

// Wishes are themed per series so they match the character on the card.
const WISHES: Record<string, string[]> = {
  lovini: [
    "Someone you love is about to make you laugh really hard.",
    "Today you'll make someone's heart happy without even trying.",
    "A hug is heading your way — pass it on!",
    "Telling someone you love them today is basically a superpower.",
  ],
  partini: [
    "You're one surprise away from the best day this week!",
    "Today deserves confetti — find a reason to celebrate.",
    "A sweet surprise is hiding somewhere in your day.",
    "Your laugh will start a party today. Let it out!",
  ],
  hockini: [
    "Today you'll score a goal nobody saw coming!",
    "You'll beat your own record at something today.",
    "Play like the puck is lucky — because today, it is.",
    "Teamwork wins today. Pass the puck and shine!",
  ],
  fidgetini: [
    "Click, spin, pop — today's worries don't stand a chance.",
    "Your hands are going to build something awesome today.",
    "Spin into the day — your focus is your superpower.",
    "Squeeze the day! It's going to be a satisfying one.",
  ],
  foodini: [
    "Your snack today will taste 10x better than usual.",
    "Warning: something delicious is about to find you.",
    "Try one new food today — your taste buds will throw a party.",
    "You're the secret ingredient in today's fun.",
  ],
  summerini: [
    "Sunshine follows you around today — even inside!",
    "Today has big beach-day energy. Enjoy it!",
    "Ice-cold lemonade luck: everything goes your way today.",
    "Champion vibes today — you've already won!",
  ],
};

const luckyPool = characters.filter((c) => c.status === "released" && c.spriteUrl && !c.hidden);

type Lucky = { openedAt: number; slug: string; wish: number };

// Rolling cooldown between cracks — tweak the hours here.
const COOLDOWN_MS = 5 * 60 * 60 * 1000;

function loadLucky(): Lucky | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Lucky;
    if (!parsed.openedAt) return null; // old date-based entries expire immediately
    return Date.now() - parsed.openedAt < COOLDOWN_MS ? parsed : null;
  } catch {
    return null;
  }
}

export default function SecretSection() {
  const [mounted, setMounted] = useState(false);
  const [cracking, setCracking] = useState(false);
  const [lucky, setLucky] = useState<Lucky | null>(null);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    setLucky(loadLucky());
    setMounted(true);
  }, []);

  // Tick the countdown and auto-reset the card when the cooldown ends.
  useEffect(() => {
    if (!lucky) return;
    const tick = () => {
      const ms = lucky.openedAt + COOLDOWN_MS - Date.now();
      if (ms <= 0) {
        setLucky(null); // cooldown over — fresh card
        return;
      }
      const totalMin = Math.ceil(ms / 60_000);
      const h = Math.floor(totalMin / 60);
      const m = totalMin % 60;
      setCountdown(h > 0 ? `${h}h ${m}m` : `${m}m`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [lucky]);

  function crackOpen() {
    if (cracking || lucky) return;
    setCracking(true);
    setTimeout(() => {
      const ch = luckyPool[Math.floor(Math.random() * luckyPool.length)];
      const pool = WISHES[ch.series] ?? WISHES.lovini;
      const pick: Lucky = {
        openedAt: Date.now(),
        slug: ch.slug,
        wish: Math.floor(Math.random() * pool.length),
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(pick)); } catch {}
      setLucky(pick);
      setCracking(false);
    }, 700);
  }

  const revealedChar = lucky ? luckyPool.find((c) => c.slug === lucky.slug) : null;
  const series = revealedChar ? SERIES_META[revealedChar.series] : null;
  const wishPool = revealedChar ? WISHES[revealedChar.series] ?? WISHES.lovini : null;
  const wishText = lucky && wishPool ? wishPool[lucky.wish % wishPool.length] : null;

  return (
    <section className="relative bg-[#7B61FF] py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Lucky card */}
          <div className="md:w-[40%] flex justify-center">
            <div
              onClick={crackOpen}
              className={`relative w-56 h-72 md:w-64 md:h-80 rounded-xl overflow-hidden shadow-2xl select-none
                ${!lucky ? "cursor-pointer hover:scale-105 transition-transform duration-200" : ""}
                ${cracking ? "animate-[shake-hard_0.7s_ease-in-out]" : ""}`}
              style={{ transform: "rotate(-6deg)" }}
              role={!lucky ? "button" : undefined}
              tabIndex={!lucky ? 0 : undefined}
              onKeyDown={(e) => e.key === "Enter" && crackOpen()}
            >
              <div className="absolute inset-x-0 top-0 bg-[#FF4D7D] h-10 flex items-center justify-center z-10">
                <span className="font-[family-name:var(--font-display)] text-white text-xs font-bold tracking-wider">TIMUR.WORLD</span>
              </div>

              {mounted && revealedChar ? (
                /* Revealed: today's lucky character */
                <div className="absolute inset-0 top-10 bg-white flex flex-col items-center justify-center gap-2 p-4 animate-[pop-in_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">
                  <div className="relative w-36 h-36 md:w-44 md:h-44">
                    <Image
                      src={revealedChar.spriteUrl!}
                      alt={revealedChar.name}
                      fill
                      sizes="200px"
                      className="object-contain"
                    />
                  </div>
                  <p className="font-[family-name:var(--font-display)] text-lg font-bold text-ink text-center leading-tight">
                    {revealedChar.name}
                  </p>
                  {series && (
                    <span className="series-badge" style={{ background: series.color }}>{series.label}</span>
                  )}
                </div>
              ) : (
                /* Unopened: the mystery */
                <div className="absolute inset-0 top-10 bg-[#FFB01F] flex flex-col items-center justify-center gap-3">
                  <span className={`font-[family-name:var(--font-display)] text-8xl font-extrabold text-ink/70 ${!cracking ? "motion-safe:animate-[wiggle-slow_3s_ease-in-out_infinite]" : ""}`}>?</span>
                  {mounted && !cracking && (
                    <span className="font-[family-name:var(--font-collector)] text-[10px] font-bold uppercase tracking-wider text-ink/50">
                      Tap to crack open
                    </span>
                  )}
                </div>
              )}

              <div className="absolute inset-0 shadow-[inset_0_0_0_3px_rgba(0,0,0,0.15)] rounded-xl pointer-events-none z-20" />
            </div>
          </div>

          {/* Copy */}
          <div className="md:w-[60%] text-center md:text-left">
            <span className="font-[family-name:var(--font-collector)] text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
              Lucky Card
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mt-3">
              {lucky ? "Your lucky wish:" : <>Who&rsquo;s hiding<br />inside?</>}
            </h2>

            {mounted && lucky ? (
              <>
                <p className="text-white text-xl mt-4 max-w-md mx-auto md:mx-0 leading-relaxed font-semibold italic">
                  &ldquo;{wishText}&rdquo;
                </p>
                {revealedChar && (
                  <p className="text-white/60 text-sm mt-3">
                    — {revealedChar.name}
                  </p>
                )}
                <p className="text-white/50 text-sm mt-6">
                  {countdown ? <>New lucky card in <span className="text-white font-bold">{countdown}</span> ✨</> : "Come back soon for a new lucky card!"}
                </p>
              </>
            ) : (
              <>
                <p className="text-white/60 text-lg mt-4 max-w-md mx-auto md:mx-0 leading-relaxed">
                  Crack it open to meet a surprise character
                  and get your wish of the day.
                </p>
                <button
                  onClick={crackOpen}
                  disabled={cracking}
                  className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 bg-white text-ink font-[family-name:var(--font-collector)] font-bold text-xs uppercase tracking-wider hover:bg-white/90 transition-colors disabled:opacity-60"
                >
                  {cracking ? "Cracking..." : "Crack it open"}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
