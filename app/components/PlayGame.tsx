"use client";

const GAME_URL = "https://game.timur.world";

export default function PlayGame() {
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
          <a href={GAME_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-6 transition-all hover:scale-105 hover:border-neon-yellow/50 cursor-pointer no-underline"
            style={{ background: "rgba(255,226,61,0.1)", border: "1px solid rgba(255,226,61,0.2)" }}
          >
            <span className="text-lg">🕹️</span>
            <span className="text-neon-yellow">My Games</span>
          </a>

          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-7xl font-bold tracking-[-0.03em] leading-[1.05] mb-4">
            <span className="gradient-text">Brainrot Clicker</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            My first game — tap your way to brainrot mastery. Unlock 24+
            characters, fuse limited skins in lockers, and trade with friends! 💀🔥
          </p>
        </div>

        {/* Play button — opens game.timur.world in a new tab so it has the full
            screen instead of being trapped in an iframe on this page. */}
        <div className="flex justify-center">
          <a
            href={GAME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-3xl overflow-hidden flex items-center justify-center cursor-pointer group w-full max-w-2xl"
            style={{
              background: "var(--color-surface)",
              border: "2px solid rgba(255,226,61,0.2)",
              boxShadow: "0 0 60px rgba(255,226,61,0.08), 0 0 120px rgba(255,45,120,0.05)",
              minHeight: "260px",
              padding: "60px 20px",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
              textDecoration: "none",
            }}
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
                Play Brainrot Clicker
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/40 tracking-wider uppercase font-bold">
                game.timur.world
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
