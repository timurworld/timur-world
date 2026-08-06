import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <div className="relative rounded-3xl overflow-hidden aspect-square card-shadow">
              <Image
                src="/timur_about.jpg"
                alt="Timur"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <span className="font-[family-name:var(--font-collector)] text-[11px] font-bold uppercase tracking-[0.2em] text-[#2F7CFF]">
              The Kid Behind the World
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink tracking-tight leading-tight mt-3">
              Hockey player by day.<br />
              <span className="text-[#FF4D7D]">Character creator by night.</span>
            </h1>

            <div className="space-y-5 text-pencil text-lg leading-relaxed mt-8">
              <p>
                Hi, I&apos;m Timur and I&apos;m 9 years old. I run a small design studio
                dedicated to making fun, imaginative characters for kids. Every character
                starts as a pencil sketch in my notebook, then gets turned into a collectible
                vinyl-style sprite.
              </p>
              <p>
                Creating is my passion — whether it&apos;s characters, game worlds, or
                backgrounds. I love sharing what I make with other kids and bringing ideas
                to life with bold colors and playful energy.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10">
              {[
                { emoji: "🏒", title: "Hockey Player", desc: "Speed, teamwork, and clutch plays on the ice." },
                { emoji: "🎨", title: "Character Creator", desc: "A whole universe of originals — and counting." },
                { emoji: "💡", title: "Game Maker", desc: "Brainrot Clicker and more coming soon." },
                { emoji: "🧱", title: "Lego Builder", desc: "Complex 18+ builds. Big sets, big patience." },
              ].map((card) => (
                <div key={card.title} className="rounded-[20px] bg-white card-shadow p-5">
                  <span className="text-2xl">{card.emoji}</span>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-ink mt-2 mb-1">{card.title}</h3>
                  <p className="text-xs text-pencil leading-relaxed">{card.desc}</p>
                </div>
              ))}

              {/* Gamer — full-width card */}
              <div className="col-span-2 rounded-[20px] bg-white card-shadow p-5 relative overflow-hidden">
                <span className="absolute -right-4 -bottom-6 text-[100px] opacity-[0.06] select-none">🎮</span>
                <span className="text-2xl">🎮</span>
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-ink mt-2 mb-1">Gamer</h3>
                <p className="text-xs text-pencil leading-relaxed max-w-sm">
                  Fortnite fan first, game maker second. Every Victory Royale is
                  research for building better games.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink/[0.02] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "100+", label: "Characters born so far" },
              { value: "5+", label: "Years hockey played" },
              { value: "18+", label: "Lego builds only" },
              { value: "∞", label: "Ideas in the sketchbook" },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold text-ink">{stat.value}</span>
                <p className="text-pencil text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Parents */}
      <section id="parents" className="max-w-4xl mx-auto px-6 py-16 md:py-24 scroll-mt-20">
        <div className="rounded-[20px] bg-white card-shadow p-8 md:p-12">
          <span className="font-[family-name:var(--font-collector)] text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFB01F]">
            A Note for Grown-Ups
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold text-ink mt-3 mb-6">
            Made for fun. Built with care.
          </h2>
          <div className="space-y-4 text-pencil text-sm leading-relaxed max-w-2xl">
            <p>
              Timur World is made by Timur, age 9 — with a little help from his family.
              Every character starts as one of Timur&apos;s own ideas, sketched first and
              then turned into the collectible sprites you see here.
            </p>
            <p>
              No ads, no accounts, no purchases, no chat. Kids can explore, collect,
              and color safely.
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-ink/[0.06]">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-ink mb-2">
              Say hi!
            </h3>
            <p className="text-pencil text-sm mb-6">
              Questions, feedback, or a character idea? We read everything.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
