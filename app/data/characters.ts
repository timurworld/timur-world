export type Series = "lovini" | "partini" | "hockini" | "fidgetini" | "foodini" | "summerini";
export type Rarity = "standard" | "rare" | "legendary" | "secret" | "limited" | "mythic" | "prestige" | "og";

export interface Character {
  slug: string;
  name: string;
  number: number;
  series: Series;
  spriteUrl?: string;
  sketchUrl?: string;
  firstDrawn?: string;
  facts: string[];
  rarity: Rarity;
  mult?: string;
  status: "released" | "sketch" | "secret";
  releasedAt?: string;
  birthday?: string;
  hidden?: boolean;
}

export const SERIES_META: Record<Series, { label: string; color: string }> = {
  lovini:    { label: "Lovini",    color: "#FF4D7D" },
  partini:   { label: "Partini",   color: "#FF8A3D" },
  hockini:   { label: "Hockini",   color: "#2F7CFF" },
  fidgetini: { label: "Fidgetini", color: "#8B5CF6" },
  foodini:   { label: "Foodini",   color: "#FFB01F" },
  summerini: { label: "Summerini", color: "#FFD700" },
};

const TWENTY_ONE_DAYS = 21 * 24 * 60 * 60 * 1000;
export function isNew(ch: Character): boolean {
  if (!ch.releasedAt) return false;
  return Date.now() - new Date(ch.releasedAt).getTime() < TWENTY_ONE_DAYS;
}

// Same character for every visitor; rotates once per UTC day.
export function characterOfTheDay(): Character {
  const released = characters.filter((c) => c.status === "released" && c.spriteUrl && !c.hidden);
  const d = new Date();
  const dayIndex = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86_400_000);
  return released[dayIndex % released.length];
}

export const TOTAL_ROSTER = 100;

export const characters: Character[] = [
  // ── Lovini ──
  { slug: "noobini-lovini",       name: "Noobini Lovini",        number: 1,  series: "lovini",    spriteUrl: "/characters/01_noobini_lovini.png", sketchUrl: "/sketches/01_noobini_lovini.png",          facts: ["Has never lost a staring contest"],                                  mult: "1x", rarity: "standard", status: "released" },
  { slug: "romantini-grandini",   name: "Romantini Grandini",    number: 2,  series: "lovini",    spriteUrl: "/characters/02_la_romantic_grande.png", sketchUrl: "/sketches/02_la_romantic_grande.png",       facts: ["Writes love poems in invisible ink"],                                mult: "1.5x", rarity: "standard", status: "released" },
  { slug: "lovini-lovini-lovini", name: "Lovini Lovini Lovini",  number: 3,  series: "lovini",    spriteUrl: "/characters/03_lovini_lovini_lovini.png", sketchUrl: "/sketches/03_lovini_lovini_lovini.png",     facts: ["So lovini they named it three times"],                               mult: "2x", rarity: "legendary", status: "released" },
  { slug: "teddini-robotini",     name: "Teddini & Robotini",    number: 4,  series: "lovini",    spriteUrl: "/characters/04_teddy_and_rosie.png", sketchUrl: "/sketches/04_teddy_and_rosie.png",          facts: ["Best friends since the toy shelf days"],                             mult: "2.5x", rarity: "legendary", status: "released" },
  { slug: "lovini-rosetti",       name: "Lovini Rosetti",        number: 7,  series: "lovini",    spriteUrl: "/characters/07_lovin_rose.png", sketchUrl: "/sketches/07_lovin_rose.png",               facts: ["Delivers roses to every collection"],                                mult: "4x", rarity: "rare",     status: "released" },
  { slug: "heartini-smilekurro",  name: "Heartini Smilekurro",   number: 8,  series: "lovini",    spriteUrl: "/characters/08_heartini_smilekur.png", sketchUrl: "/sketches/08_heartini_smilekur.png",        facts: ["Smiles so hard the screen shakes"],                                  mult: "4.5x", rarity: "standard", status: "released" },
  { slug: "cupidini-sahuroni",    name: "Cupidini Sahuroni",     number: 10, series: "lovini",    spriteUrl: "/characters/10_cupid_cupid_sahur.png", sketchUrl: "/sketches/10_cupid_cupid_sahur.png",        facts: ["Fires heart arrows from the moon"],                                  mult: "5.5x", rarity: "legendary", status: "released" },
  { slug: "rositti-tueletti",     name: "Rositti Tueletti",      number: 11, series: "lovini",    spriteUrl: "/characters/11_rositti_tueletti.png", sketchUrl: "/sketches/11_rositti_tueletti.png",         facts: ["Lives in an enchanted forest of glowing mushrooms"],                 mult: "6x", rarity: "rare",     status: "released" },
  { slug: "noo-mio-heartini",     name: "Noo Mio Heartini",      number: 18, series: "lovini",    spriteUrl: "/characters/18_noo_my_heart.png", sketchUrl: "/sketches/18_noo_my_heart.png",             facts: ["Loves rainy nights and broken hearts"],                              mult: "8x", rarity: "rare",     status: "released" },
  { slug: "cupidini-hotspottini", name: "Cupidini Hotspottini",  number: 19, series: "lovini",    spriteUrl: "/characters/19_cupid_hotspot.png", sketchUrl: "/sketches/19_cupid_hotspot.png",            facts: ["Sits on a volcano throne and doesn't flinch"],                       mult: "9x", rarity: "legendary", status: "released" },
  { slug: "bobini-lovini",        name: "Bobini Lovini",         number: 34, series: "lovini",    spriteUrl: "/characters/34_Bobini Lovini.png", sketchUrl: "/sketches/34_Bobini Lovini.png",            facts: ["I love my boba — that's all you need to know"],                      mult: "11x", rarity: "secret",   status: "released", releasedAt: "2026-08-05" },
  { slug: "cappy-family",         name: "Cappy Family",          number: 35, series: "lovini",    spriteUrl: "/characters/35_Cappy Family.png", sketchUrl: "/sketches/35_Cappy Family.png",             facts: ["Capybara mom and baby — I Love Mommy forever"],                      mult: "8x", rarity: "rare",     status: "released", releasedAt: "2026-08-05" },
  { slug: "cupcakini-sweetini",   name: "Cupcakini Sweetini",    number: 37, series: "lovini",    spriteUrl: "/characters/37_Cupcakini Sweetini.png", sketchUrl: "/sketches/37_Cupcakini Sweetini.png",       facts: ["Thank you Mom! #1 Mom cupcake with flowers"],                        mult: "10.5x", rarity: "secret",   status: "released", releasedAt: "2026-08-05" },
  { slug: "lovini-vibini",        name: "Lovini Vibini",         number: 40, series: "lovini",    spriteUrl: "/characters/40_Lovini vibini.png", sketchUrl: "/sketches/40_Lovini vibini.png",            facts: ["The ultimate Lovini fusion — every friend showed up"],                mult: "28x", rarity: "limited",  status: "released", releasedAt: "2026-08-05" },
  { slug: "toastini-butterini",   name: "Toastini Butterini",    number: 41, series: "lovini",    spriteUrl: "/characters/41_Toastini Butterini.png", sketchUrl: "/sketches/41_Toastini Butterini.png",       facts: ["Brings Mom coffee in the #1 Mom mug every single morning"],             mult: "7.5x", rarity: "rare",     status: "released", releasedAt: "2026-08-05" },

  // ── Partini ──
  { slug: "noobini-partini",      name: "Noobini Partini",       number: 5,  series: "partini",   spriteUrl: "/characters/05_noobini_partini.png", sketchUrl: "/sketches/05_noobini_partini.png",          facts: ["Started the party and forgot to invite anyone"],                     mult: "3x", rarity: "standard", status: "released" },
  { slug: "cakini-presintini",    name: "Cakini Presintini",     number: 6,  series: "partini",   spriteUrl: "/characters/06_cakini_and_presintini.png", sketchUrl: "/sketches/06_cakini_and_presintini.png",    facts: ["A cake and a present — the dynamic birthday duo"],                   mult: "3.5x", rarity: "secret",   status: "released" },
  { slug: "dragini-partini",      name: "Dragini Partini",       number: 9,  series: "partini",   spriteUrl: "/characters/09_dragon_partyini.png", sketchUrl: "/sketches/09_dragon_partyini.png",          facts: ["Breathes fire at birthday candles — one breath, all out"],            mult: "5x", rarity: "og",       status: "released" },
  { slug: "birthdayini-cardini",  name: "Birthdayini Cardini",   number: 12, series: "partini",   spriteUrl: "/characters/12_birthdayini_cardini.png", sketchUrl: "/sketches/12_birthdayini_cardini.png",      facts: ["Writes happy birthday in 47 languages"],                             mult: "6.5x", rarity: "standard", status: "released" },
  { slug: "cakini-elephantini",   name: "Cakini Elephantini",    number: 13, series: "partini",   spriteUrl: "/characters/13_cakini_elephantini.png", sketchUrl: "/sketches/13_cakini_elephantini.png",       facts: ["An elephant made of cake — never forgets a birthday"],               mult: "6.75x", rarity: "og",       status: "released" },
  { slug: "pizzini-partyini",     name: "Pizzini Partyini",      number: 15, series: "partini",   spriteUrl: "/characters/15_noobini_partyini.png", sketchUrl: "/sketches/15_noobini_partyini.png",         facts: ["Every party needs pizza — Pizzini brings the slices"],               mult: "7x", rarity: "standard", status: "released" },

  // ── Hockini ──
  { slug: "stick-stick",          name: "Stick Stick",           number: 20, series: "hockini",   spriteUrl: "/characters/20_stick_stick.png", sketchUrl: "/sketches/20_stick_stick.png",              facts: ["Two hockey sticks that became best friends on the ice"],              mult: "9.5x", rarity: "secret",   status: "released" },
  { slug: "no-my-pucks",          name: "No My Pucks",           number: 21, series: "hockini",   spriteUrl: "/characters/21_no_my_pucks.png", sketchUrl: "/sketches/21_no_my_pucks.png",              facts: ["Guards the puck bucket with his life"],                              mult: "12x", rarity: "secret",   status: "released" },
  { slug: "hockey-bros",          name: "Hockey Bros",           number: 22, series: "hockini",   spriteUrl: "/characters/22_hockey_bros.png", sketchUrl: "/sketches/22_hockey_bros.png",              facts: ["Fused from two hockey legends — unstoppable on ice"],                mult: "22x", rarity: "limited",  status: "released" },
  { slug: "cupideini-hockini",    name: "Cupideini Hockini",     number: 26, series: "hockini",   spriteUrl: "/characters/26_cupideini_hockini.png", sketchUrl: "/sketches/26_cupideini_hockini.png",        facts: ["The Maple Cup champion — wears Timur's #7 jersey"],                  mult: "25x", rarity: "mythic",   status: "released" },
  { slug: "los-hockeys",          name: "Los Hockeys",           number: 27, series: "hockini",   spriteUrl: "/characters/27_los_hockeys.png", sketchUrl: "/sketches/27_los_hockeys.png",              facts: ["Three-skin fusion — the ultimate hockey squad"],                      mult: "30x", rarity: "limited",  status: "released" },

  // ── Foodini ──
  { slug: "sushiro-soyaro",       name: "Sushiro & Soyaro",      number: 23, series: "foodini",   spriteUrl: "/characters/23_sushiro_soyaro.png", sketchUrl: "/sketches/23_sushiro_soyaro.png",           facts: ["A sushi roll and soy sauce — always together, never apart"],          mult: "12x", rarity: "prestige", status: "released" },
  { slug: "kingurini-orangini",   name: "Kingurini Orangini",    number: 24, series: "foodini",   spriteUrl: "/characters/24_kinguru_orange.png", sketchUrl: "/sketches/24_kinguru_orange.png",           facts: ["The king of citrus — rules the Citrus Oasis"],                       mult: "18x", rarity: "prestige", status: "released" },
  { slug: "auraberry",            name: "Auraberry",             number: 25, series: "foodini",   spriteUrl: "/characters/25_auraberry.png", sketchUrl: "/sketches/25_auraberry.png",                facts: ["A neon strawberry with a city skyline named after it"],               mult: "20x", rarity: "prestige", status: "released" },

  // ── Fidgetini ──
  { slug: "popini-itini",         name: "Popini Itini",          number: 28, series: "fidgetini", spriteUrl: "/characters/28_popini_itini.png", sketchUrl: "/sketches/28_popini_itini.png",             facts: ["Pop it all day — never stops popping"],                              mult: "13x", rarity: "secret",   status: "released" },
  { slug: "fidgetini-cubini",     name: "Fidgetini Cubini",      number: 29, series: "fidgetini", spriteUrl: "/characters/29_fidgetini_cubini.png", sketchUrl: "/sketches/29_fidgetini_cubini.png",         facts: ["A fidget cube that solves itself"],                                  mult: "15x", rarity: "secret",   status: "released" },
  { slug: "dragini-sqishini",     name: "Dragini Sqishini",      number: 30, series: "fidgetini", spriteUrl: "/characters/30_dragini_sqishini.png", sketchUrl: "/sketches/30_dragini_sqishini.png",         facts: ["A squishy dragon — squeeze it and it roars"],                        mult: "18x", rarity: "mythic",   status: "released" },
  { slug: "la-fidget-combination",name: "La Fidget Combination", number: 31, series: "fidgetini", spriteUrl: "/characters/31_la_fidget_combination.png", sketchUrl: "/sketches/31_la_fidget_combination.png",    facts: ["Three fidgets fused into one unstoppable toy"],                       mult: "35x", rarity: "limited",  status: "released" },
  { slug: "spinirino",            name: "Spinirino",             number: 32, series: "fidgetini", spriteUrl: "/characters/32_Spinirino.png", sketchUrl: "/sketches/32_Spinirino.png",                facts: ["Spins forever — world record holder"],                               mult: "16x", rarity: "secret",   status: "released" },
  { slug: "stressini-ballini",    name: "Stressini Ballini",     number: 33, series: "fidgetini", spriteUrl: "/characters/33_Stressini_ballini.png", sketchUrl: "/sketches/33_Stressini_ballini.png",        facts: ["Squeeze when stressed — bounces right back"],                        mult: "14x", rarity: "secret",   status: "released" },

  // ── Summerini ──
  { slug: "chillen-lemonade",     name: "Chillen Lemonade",      number: 36, series: "summerini", spriteUrl: "/characters/36_Chillen Lemonade.png", sketchUrl: "/sketches/36_Chillen Lemonade.png",   facts: ["Coolest drink on the beach — always wears shades"],                  mult: "15x", rarity: "secret",   status: "released", releasedAt: "2026-08-05" },
  { slug: "cuppini-triondini",    name: "Cuppini Triondini",     number: 38, series: "summerini", spriteUrl: "/characters/38_cuppini_triondini_v2.png", sketchUrl: "/sketches/38_cuppini_triondini_v2.png",  facts: ["World Cup trophy and ball — the summer champions"],                  mult: "9x", rarity: "legendary", status: "released", releasedAt: "2026-08-05" },
  { slug: "lemon-lemon-sahur",    name: "Lemon Lemon Sahur",     number: 39, series: "summerini", spriteUrl: "/characters/39_Lemon Lemon Sahur.png", sketchUrl: "/sketches/39_Lemon Lemon Sahur.png",  facts: ["A glowing lemon slice with the freshest sneakers"],                  mult: "7.5x", rarity: "rare",     status: "released", releasedAt: "2026-08-05" },

  // ── Secret (unrevealed) ──
  { slug: "secret-42",            name: "???",                   number: 42, series: "lovini",    facts: [],  rarity: "secret",   status: "secret" },
  { slug: "secret-43",            name: "???",                   number: 43, series: "partini",   facts: [],  rarity: "secret",   status: "secret" },
];
