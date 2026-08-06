export default function TrustBanner() {
  const confetti = [
    { top: "12%", left: "4%",  size: 10, color: "#FF4D7D", rot: "12deg" },
    { top: "70%", left: "9%",  size: 7,  color: "#2F7CFF", rot: "-8deg" },
    { top: "22%", left: "30%", size: 8,  color: "#8B5CF6", rot: "20deg" },
    { top: "78%", left: "42%", size: 9,  color: "#FF4D7D", rot: "-15deg" },
    { top: "14%", left: "58%", size: 7,  color: "#2F7CFF", rot: "8deg" },
    { top: "68%", left: "72%", size: 10, color: "#8B5CF6", rot: "-20deg" },
    { top: "18%", left: "88%", size: 8,  color: "#FF4D7D", rot: "14deg" },
    { top: "76%", left: "94%", size: 7,  color: "#2F7CFF", rot: "-10deg" },
  ];

  return (
    <section className="relative bg-[#FFB01F] py-12 overflow-hidden">
      {/* Confetti sprinkle */}
      {confetti.map((c, i) => (
        <span
          key={i}
          className="absolute rounded-sm"
          style={{
            top: c.top,
            left: c.left,
            width: c.size,
            height: c.size * 1.6,
            background: c.color,
            transform: `rotate(${c.rot})`,
            opacity: 0.55,
          }}
        />
      ))}

      <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Heading */}
        <div className="shrink-0 text-center md:text-left">
          <span className="font-[family-name:var(--font-collector)] text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50">
            A Note for Grown-Ups
          </span>
          <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-ink leading-tight mt-1">
            Made for <span className="text-white drop-shadow-[0_2px_0_rgba(28,27,34,0.25)]">fun.</span>
            <br />
            Built with <span className="text-[#FF4D7D] drop-shadow-[0_2px_0_rgba(28,27,34,0.15)]">care.</span>
          </h3>
        </div>

        {/* Playful trust pills */}
        <div className="flex-1 flex flex-wrap items-center justify-center md:justify-end gap-3">
          {[
            { emoji: "🎨", label: "Kid-created", rot: "-2deg" },
            { emoji: "🚫", label: "No ads", rot: "2deg" },
            { emoji: "💬", label: "No chat", rot: "-1.5deg" },
            { emoji: "💙", label: "No pressure to buy", rot: "1.5deg" },
          ].map((pill) => (
            <span
              key={pill.label}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-full font-[family-name:var(--font-display)] text-sm font-bold text-ink shadow-[0_3px_0_rgba(28,27,34,0.15)]"
              style={{ transform: `rotate(${pill.rot})` }}
            >
              <span>{pill.emoji}</span>
              {pill.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
