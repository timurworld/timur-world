"use client";

import { useState } from "react";

export default function PlayGame() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="play" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-[5%] left-[10%] w-[50%] h-[60%] rounded-full bg-neon-yellow/[0.06] blur-[160px]" />
        <div className="absolute bottom-[5%] right-[5%] w-[40%] h-[50%] rounded-full bg-neon-pink/[0.05] blur-[140px]" />
      </div>
      <div className="absolute inset-0 grain" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-6"
            style={{ background: "rgba(255,226,61,0.1)", border: "1px solid rgba(255,226,61,0.2)" }}
          >
            <span className="text-lg">🕹️</span>
            <span className="text-neon-yellow">Play Now</span>
          </span>

          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-7xl font-bold tracking-[-0.03em] leading-[1.05] mb-4">
            <span className="gradient-text">Brainrot Clicker</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            My first game — playable right here! Tap your way to brainrot
            mastery. Unlock 15 characters, each with their own world! 💀🔥
          </p>
        </div>

        {/* Game container */}
        <div>
          {!isPlaying ? (
            <button
              className="relative rounded-3xl overflow-hidden aspect-video flex items-center justify-center cursor-pointer group w-full border-none"
              style={{
                background: "var(--color-surface)",
                border: "2px solid rgba(255,226,61,0.2)",
                boxShadow: "0 0 60px rgba(255,226,61,0.08), 0 0 120px rgba(255,45,120,0.05)",
              }}
              onClick={() => setIsPlaying(true)}
            >
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center
                    transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    group-hover:scale-110 animate-scale-pulse"
                  style={{
                    background: "linear-gradient(135deg, #ffe23d, #ff9f0a)",
                    boxShadow: "0 0 40px rgba(255,226,61,0.4), 0 0 80px rgba(255,226,61,0.2)",
                  }}
                >
                  <svg className="w-12 h-12 md:w-16 md:h-16 text-[#0f0825] ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold text-neon-yellow tracking-wider uppercase">
                  Click to Play!
                </span>
              </div>
            </button>
          ) : (
            <div className="relative">
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  height: "80vh",
                  maxHeight: "900px",
                  border: "2px solid rgba(255,226,61,0.3)",
                  boxShadow: "0 0 60px rgba(255,226,61,0.1), 0 0 120px rgba(255,45,120,0.06)",
                }}
              >
                <iframe
                  src="https://brainrot-clicker-seven.vercel.app"
                  title="Brainrot Clicker"
                  className="w-full h-full"
                  style={{ background: "#0f0825", border: "none" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                />
              </div>
              <div className="text-center mt-4">
                <button
                  onClick={() => setIsPlaying(false)}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white/60 hover:text-white transition-all duration-300 hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  ← Close Game
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
