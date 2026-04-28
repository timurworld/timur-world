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

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Banner image is the entire hero — title, tagline, character grid,
            PLAY NOW CTA, and value props are all baked into the artwork.
            Whole banner is a single clickable link to the game. */}
        <a
          href={GAME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300
            hover:scale-[1.01] hover:shadow-[0_0_80px_rgba(255,226,61,0.25)]"
          style={{
            border: "2px solid rgba(255,226,61,0.2)",
            boxShadow: "0 0 60px rgba(255,226,61,0.08), 0 0 120px rgba(255,45,120,0.05)",
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation",
            textDecoration: "none",
          }}
          aria-label="Play Brainrot Clicker — opens in a new tab"
        >
          <img
            src="/banner.jpg"
            alt="Brainrot Clicker — tap, unlock, go brainrot. 100+ characters, limited skins, trade with friends."
            loading="eager"
            className="w-full h-auto block"
          />
        </a>

        {/* Tiny caption under the banner so the destination is obvious */}
        <div className="text-center mt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-white/40 tracking-wider uppercase font-bold">
            game.timur.world
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
