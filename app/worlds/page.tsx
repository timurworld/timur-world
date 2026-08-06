import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GAME_URL = "https://game.timur.world";

const games = [
  { title: "Brainrot Clicker", description: "Click. Collect. Unlock the whole universe.", url: GAME_URL, live: true, color: "#FF4D7D", cover: "/banner.jpg", num: "01" },
  { title: "TimurWorld Hockey", description: "Hit the ice with the Hockey Bros.", url: "#", live: false, color: "#2F7CFF", cover: "/sportini_banner.png", num: "02" },
];

const backgrounds = [
  { title: "Fidget World",        image: "/worlds/bg_26.jpg", series: "Fidgetini" },
  { title: "Los Hockeys Stadium", image: "/worlds/bg_25.jpg", series: "Hockini" },
  { title: "Timur World Arena",   image: "/worlds/bg_24.jpg", series: "Hockini" },
  { title: "Sushi Sunset",        image: "/worlds/bg_23.jpg", series: "Foodini" },
  { title: "Neon Berry City",     image: "/worlds/bg_22.jpg", series: "Foodini" },
  { title: "Citrus Oasis",        image: "/worlds/bg_21.jpg", series: "Foodini" },
  { title: "Hockey Rink",         image: "/worlds/bg_20.jpg", series: "Hockini" },
  { title: "Volcano Throne",      image: "/worlds/bg_19.jpg", series: "Lovini" },
  { title: "Rainy Night",         image: "/worlds/bg_18.jpg", series: "Lovini" },
  { title: "Crimson Arena",       image: "/worlds/bg_17.jpg", series: "Lovini" },
  { title: "Ocean Sunset",        image: "/worlds/bg_16.jpg", series: "Lovini" },
  { title: "Jungle Party",        image: "/worlds/bg_15.jpg", series: "Partini" },
  { title: "Inventor Lab",        image: "/worlds/bg_14.jpg", series: "Partini" },
  { title: "Circus Tent",         image: "/worlds/bg_13.jpg", series: "Partini" },
  { title: "Birthday Party",      image: "/worlds/bg_12.jpg", series: "Partini" },
  { title: "Enchanted Forest",    image: "/worlds/bg_11.jpg", series: "Lovini" },
  { title: "Celestial Temple",    image: "/worlds/bg_10.jpg", series: "Lovini" },
  { title: "Dark Battle Arena",   image: "/worlds/bg_09.jpg", series: "Lovini" },
  { title: "Cloud Kingdom",       image: "/worlds/bg_08.jpg", series: "Lovini" },
  { title: "Rose Garden",         image: "/worlds/bg_07.jpg", series: "Lovini" },
  { title: "Bakery Kitchen",      image: "/worlds/bg_06.jpg", series: "Partini" },
  { title: "Fireworks Night",     image: "/worlds/bg_05.jpg", series: "Partini" },
  { title: "Toy Workshop",        image: "/worlds/bg_04.jpg", series: "Lovini" },
  { title: "Heart Cloud Kingdom", image: "/worlds/bg_03.jpg", series: "Lovini" },
  { title: "Castle at Dusk",      image: "/worlds/bg_02.jpg", series: "Lovini" },
  { title: "Candy Dreamland",     image: "/worlds/bg_01.jpg", series: "Lovini" },
];

export default function WorldsPage() {
  return (
    <main>
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-14">
          <span className="font-[family-name:var(--font-collector)] text-[11px] font-bold uppercase tracking-[0.2em] text-[#2F7CFF]">
            Their Worlds
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink tracking-tight mt-3">
            Where the crew comes alive.
          </h1>
          <p className="text-pencil mt-3 text-lg">Games and worlds where the characters live</p>
        </div>

        {/* Games */}
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink mb-6">Games</h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {games.map((game) => (
            <a
              key={game.num}
              href={game.live ? game.url : undefined}
              target={game.live ? "_blank" : undefined}
              rel={game.live ? "noopener noreferrer" : undefined}
              className={`group relative rounded-2xl overflow-hidden transition-transform duration-200
                ${game.live ? "hover:scale-[1.02] cursor-pointer" : "cursor-default"}`}
              style={{ border: `3px solid ${game.color}` }}
            >
              <div className="bg-white flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={game.cover}
                    alt={`${game.title} cover`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className={`object-cover transition-transform duration-300 group-hover:scale-105 ${game.live ? "" : "saturate-[0.6] opacity-90"}`}
                  />
                  <div className="absolute top-3 left-3">
                    {game.live ? (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 font-[family-name:var(--font-collector)] text-[10px] font-bold uppercase tracking-wider text-ink">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Live
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-white/90 font-[family-name:var(--font-collector)] text-[10px] font-bold uppercase tracking-wider text-pencil">Coming Soon</span>
                    )}
                  </div>
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/90 font-[family-name:var(--font-collector)] text-xs text-pencil">{game.num}</span>
                </div>
                <div className="p-8 pt-6">
                  <h3 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-ink leading-tight">{game.title}</h3>
                  <p className="text-pencil text-sm mt-2">{game.description}</p>
                  <div className="mt-5">
                    {game.live ? (
                      <span className="inline-flex items-center justify-between w-full px-5 py-3.5 bg-ink text-white font-[family-name:var(--font-collector)] text-xs font-bold uppercase tracking-wider">
                        Play Now <span>&rarr;</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-between w-full px-5 py-3.5 bg-ink/[0.04] text-pencil font-[family-name:var(--font-collector)] text-xs font-bold uppercase tracking-wider">
                        Get Ready <span>&nearr;</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Backgrounds */}
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink mb-2">Backgrounds</h2>
        <p className="text-pencil text-sm mb-8">Free to download — use them as wallpapers or in your own projects</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {backgrounds.map((bg) => (
            <a
              key={bg.title}
              href={bg.image}
              download
              className="group relative rounded-2xl overflow-hidden hover-lift card-shadow"
            >
              <div className="aspect-video relative">
                <Image
                  src={bg.image}
                  alt={bg.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-bold truncate">{bg.title}</p>
                  <p className="text-white/60 text-[10px]">{bg.series}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
