export default function TrustBanner() {
  return (
    <section className="bg-[#FFB01F] py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6 md:gap-12">
        <div className="flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-full bg-ink/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <span className="font-[family-name:var(--font-collector)] text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50">
              A Note for Grown-Ups
            </span>
            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold text-ink leading-tight">
              Made for fun.<br />Built with care.
            </h3>
          </div>
        </div>

        <p className="text-ink/70 text-sm leading-relaxed flex-1">
          Timur.World is a kid-created universe with no ads, no chat, and no pressure to buy. Just characters, creativity, and play.
        </p>
      </div>
    </section>
  );
}
