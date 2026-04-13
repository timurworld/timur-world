"use client";

import { useReveal } from "../hooks/useReveal";

const animations = [
  {
    title: "Running Character",
    image: "https://placehold.co/400x300/1a0e3a/00d4ff?text=RUN+CYCLE&font=raleway",
    emoji: "🏃",
    glow: "#00d4ff",
    size: "2.4 MB",
  },
  {
    title: "Explosion FX",
    image: "https://placehold.co/400x300/250e3a/ff2d78?text=BOOM+FX&font=raleway",
    emoji: "💥",
    glow: "#ff2d78",
    size: "1.8 MB",
  },
  {
    title: "Coin Spin",
    image: "https://placehold.co/400x300/1a1a08/ffe23d?text=COIN+SPIN&font=raleway",
    emoji: "🪙",
    glow: "#ffe23d",
    size: "980 KB",
  },
  {
    title: "Walking Cat",
    image: "https://placehold.co/400x300/0e2a1a/30d158?text=CAT+WALK&font=raleway",
    emoji: "🐱",
    glow: "#30d158",
    size: "1.5 MB",
  },
  {
    title: "Fire Loop",
    image: "https://placehold.co/400x300/2a0a0a/ff9f0a?text=FIRE+LOOP&font=raleway",
    emoji: "🔥",
    glow: "#ff9f0a",
    size: "2.1 MB",
  },
  {
    title: "Jump Squash",
    image: "https://placehold.co/400x300/1a0a2e/bf5af2?text=JUMP+SQUASH&font=raleway",
    emoji: "⬆️",
    glow: "#bf5af2",
    size: "1.2 MB",
  },
];

export default function Animations() {
  const ref = useReveal();

  return (
    <section id="animations" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[45%] rounded-full bg-neon-green/[0.05] blur-[140px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[40%] rounded-full bg-neon-orange/[0.05] blur-[120px]" />
      </div>
      <div className="absolute inset-0 grain" />
      <div className="absolute top-0 left-[5%] right-[5%] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(48,209,88,0.15), rgba(255,159,10,0.15), transparent)" }} />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="reveal mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase"
            style={{ background: "rgba(48,209,88,0.1)", border: "1px solid rgba(48,209,88,0.2)" }}
          >
            <span className="text-lg">✨</span>
            <span className="text-neon-green">Animations</span>
          </span>
        </div>

        <h2 className="reveal font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] leading-[1.05] mb-4">
          Free <span className="gradient-text">downloads</span> 🎁
        </h2>
        <p className="reveal text-white/40 text-lg max-w-xl mb-12 leading-relaxed">
          Grab these animated GIFs for free! Use them in your own projects,
          share them with friends, or just enjoy the vibes. ✨
        </p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {animations.map((anim) => (
            <div
              key={anim.title}
              className="reveal group relative rounded-2xl overflow-hidden cursor-default
                transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                hover:scale-[1.05] hover-wiggle"
              style={{
                background: "var(--color-surface)",
                border: `2px solid ${anim.glow}22`,
                boxShadow: `0 4px 30px ${anim.glow}15`,
              }}
            >
              {/* Preview */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={anim.image}
                  alt={anim.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0f0825, transparent 50%)" }} />

                {/* GIF badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full font-bold"
                    style={{ background: `${anim.glow}20`, color: anim.glow, border: `1px solid ${anim.glow}30` }}
                  >
                    GIF
                  </span>
                </div>

                {/* Emoji */}
                <div className="absolute bottom-3 right-4 text-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  {anim.emoji}
                </div>
              </div>

              {/* Info + Download */}
              <div className="p-5 pt-2 flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white group-hover:text-neon-green transition-colors duration-300 mb-0.5">
                    {anim.title}
                  </h3>
                  <p className="text-xs text-white/30">{anim.size}</p>
                </div>
                <a
                  href={anim.image}
                  download
                  className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold
                    transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    hover:scale-110 active:scale-90"
                  style={{
                    background: `${anim.glow}20`,
                    color: anim.glow,
                    border: `1px solid ${anim.glow}30`,
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
              </div>

              {/* Bottom glow */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(90deg, transparent, ${anim.glow}, transparent)`, boxShadow: `0 0 12px ${anim.glow}` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
