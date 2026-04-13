"use client";

import { useEffect, useState } from "react";

const emojis = ["🏒", "🎮", "🧠", "🎨", "⚡", "🔥", "💀", "🗿", "✨", "🐐"];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Neon background blobs ── */}
      <div className="absolute inset-0">
        <div
          className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[160px] animate-scale-pulse"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.25) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full blur-[140px] animate-scale-pulse"
          style={{ background: "radial-gradient(circle, rgba(191,90,242,0.25) 0%, transparent 70%)", animationDelay: "-1.5s" }}
        />
        <div
          className="absolute top-[20%] right-[10%] w-[35%] h-[35%] rounded-full blur-[120px] animate-scale-pulse"
          style={{ background: "radial-gradient(circle, rgba(255,45,120,0.15) 0%, transparent 70%)", animationDelay: "-3s" }}
        />
        <div
          className="absolute bottom-[30%] left-[10%] w-[25%] h-[25%] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(255,226,61,0.12) 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Spinning geometric ring ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-neon-purple/10 animate-spin-slow" />
        <div className="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full border border-neon-blue/10 animate-spin-slower" />
      </div>

      {/* ── Grain ── */}
      <div className="absolute inset-0 grain" />

      {/* ── Floating emojis ── */}
      <div className="absolute inset-0 pointer-events-none">
        {emojis.map((emoji, i) => {
          const positions = [
            { top: "8%", left: "5%" },
            { top: "15%", right: "8%" },
            { top: "35%", left: "3%" },
            { top: "25%", right: "4%" },
            { bottom: "30%", left: "7%" },
            { bottom: "20%", right: "6%" },
            { top: "50%", right: "12%" },
            { bottom: "12%", left: "15%" },
            { top: "65%", left: "10%" },
            { bottom: "8%", right: "14%" },
          ];
          const wobbleClass = [
            "animate-wobble",
            "animate-wobble-2",
            "animate-wobble-3",
            "animate-wobble-4",
            "animate-wobble-5",
          ][i % 5];
          return (
            <div
              key={i}
              className={`absolute text-2xl md:text-3xl ${wobbleClass} select-none`}
              style={positions[i]}
            >
              {emoji}
            </div>
          );
        })}
      </div>

      {/* ── Main content ── */}
      <div
        className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-90"
        }`}
      >
        {/* Creative Studio label */}
        <p className="font-[family-name:var(--font-display)] text-sm sm:text-base md:text-lg font-bold tracking-[0.35em] uppercase text-neon-blue/70 mb-4">
          Creative Studio
        </p>

        {/* Hero glow behind title */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[120px] md:w-[600px] md:h-[160px] rounded-full blur-[80px] hero-glow"
              style={{ background: "linear-gradient(90deg, #00d4ff, #bf5af2, #ff2d78)" }}
            />
          </div>
          <h1 className="relative font-[family-name:var(--font-display)] text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-bold leading-[0.85] tracking-[-0.04em] mb-2">
            <span className="gradient-text">TIMUR</span>
          </h1>
          <p className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.2em] uppercase text-white/60 mb-8">
            .world
          </p>
        </div>

        <p className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
          Where the intensity of the ice meets the freedom of creation.
          <br className="hidden sm:block" />
          Backgrounds. Characters. Games.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#play"
            className="group relative px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden
              transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              hover:scale-110 active:scale-95 hover-wiggle
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-blue"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #bf5af2)",
              boxShadow: "0 0 20px rgba(0,212,255,0.4), 0 0 40px rgba(191,90,242,0.2)",
            }}
          >
            <span className="relative z-10 text-white flex items-center gap-2">
              Play
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
          <a
            href="#projects"
            className="px-8 py-4 rounded-2xl font-bold text-lg text-white/70
              transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              hover:scale-110 hover:text-white active:scale-95 hover-wiggle
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-purple"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "2px solid rgba(191,90,242,0.3)",
              boxShadow: "0 0 15px rgba(191,90,242,0.1)",
            }}
          >
            See Creations
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-700 delay-500 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}>
        <div className="flex flex-col items-center gap-1 animate-bounce">
          <span className="text-xs uppercase tracking-[0.3em] text-white/30 font-bold">Scroll</span>
          <span className="text-xl">👇</span>
        </div>
      </div>
    </section>
  );
}
