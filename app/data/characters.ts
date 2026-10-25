export type Series = "lovini" | "partini" | "hockini" | "fidgetini" | "foodini" | "summerini" | "halloweenini";
export type Rarity =
  | "standard" | "rare" | "og" | "epic" | "legendary"
  | "secret" | "prestige" | "limited" | "mythic" | "divine";

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
  /** Nudges the sprite's size inside the card. Some artwork spreads wide
   *  wings or a cape, so the character reads smaller than its neighbours
   *  even though both images fill the frame. Mirrors RENDER_SCALE_BY_ID
   *  in the clicker. 1 = untouched. */
  renderScale?: number;
}

export const SERIES_META: Record<Series, { label: string; color: string }> = {
  lovini:      { label: "Lovini",      color: "#FF4D7D" },
  partini:     { label: "Partini",     color: "#FF8A3D" },
  hockini:     { label: "Hockini",     color: "#2F7CFF" },
  fidgetini:   { label: "Fidgetini",   color: "#8B5CF6" },
  foodini:     { label: "Foodini",     color: "#FFB01F" },
  summerini:   { label: "Summerini",   color: "#FFD700" },
  halloweenini:{ label: "Halloweenini", color: "#FF7A1A" },
};

// ── Rarity: the single source of truth ──
// `tier` orders the ladder (Divine sits at the top, above Mythic).
// `foil` marks the tiers that get the pointer-tracked foil tilt.
// `foilStrength` scales that tilt — Divine tilts harder than everything else.
export const RARITY_META: Record<
  Rarity,
  { label: string; tier: number; foil: boolean; foilStrength: number; seasonalOnly?: boolean }
> = {
  standard:  { label: "Standard",  tier: 1,  foil: false, foilStrength: 0 },
  rare:      { label: "Rare",      tier: 2,  foil: false, foilStrength: 0 },
  og:        { label: "OG",        tier: 3,  foil: false, foilStrength: 0 },
  epic:      { label: "Epic",      tier: 4,  foil: true,  foilStrength: 1 },
  legendary: { label: "Legendary", tier: 5,  foil: true,  foilStrength: 1 },
  secret:    { label: "Secret",    tier: 6,  foil: true,  foilStrength: 1 },
  prestige:  { label: "Prestige",  tier: 7,  foil: true,  foilStrength: 1 },
  limited:   { label: "Limited",   tier: 8,  foil: true,  foilStrength: 1 },
  mythic:    { label: "Mythic",    tier: 9,  foil: true,  foilStrength: 1 },
  divine:    { label: "Divine",    tier: 10, foil: true,  foilStrength: 1.75 },
};

// ── Limited seasonal collections ──
// These mirror the core series in shape but are tracked as their own albums and
// are deliberately excluded from the 100-character core roster completion.
export const SEASONAL_SERIES: readonly Series[] = ["summerini", "halloweenini"];

export function isSeasonal(series: Series): boolean {
  return SEASONAL_SERIES.includes(series);
}

// Halloween 2026 runs until Nov 2, 2026 23:59 Pacific (PST, DST ended Nov 1).
// Single config value — the clicker keeps its own copy of the same instant.
export const HALLOWEEN_2026_END = "2026-11-02T23:59:59-08:00";

export function isHalloweenSeasonOpen(now: Date = new Date()): boolean {
  return now.getTime() <= new Date(HALLOWEEN_2026_END).getTime();
}

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

/**
 * Released characters with no pencil sketch asset. These are absent from the
 * /print coloring-page index (which needs a sketch) even though their
 * individual print page works, since that renders the sprite.
 */
export function charactersMissingSketches(): Character[] {
  return characters.filter((c) => c.status === "released" && !c.hidden && !c.sketchUrl);
}

export const characters: Character[] = [
  // ── Lovini ──
  { slug: "noobini-lovini",       name: "Noobini Lovini",        number: 1,  series: "lovini",    spriteUrl: "/characters/01_noobini_lovini.png", sketchUrl: "/sketches/01_noobini_lovini.png",          facts: ["Keeps a spare heart floating above his head. You never know."],                                  mult: "1x", rarity: "standard", status: "released" },
  { slug: "romantini-grandini",   name: "Romantini Grandini",    number: 2,  series: "lovini",    spriteUrl: "/characters/02_la_romantic_grande_v2.png", sketchUrl: "/sketches/02_la_romantic_grande.png",       facts: ["Never misses — she only aims at people who already like her"],                                mult: "1.1x", rarity: "standard", status: "released" },
  { slug: "lovini-lovini-lovini", name: "Lovini Lovini Lovini",  number: 3,  series: "lovini",    spriteUrl: "/characters/03_lovini_lovini_lovini_v2.png", sketchUrl: "/sketches/03_lovini_lovini_lovini.png",     facts: ["Dressed up for the date three hours early, every single time"],                               mult: "1.3x", rarity: "legendary", status: "released" },
  { slug: "teddini-robotini",     name: "Teddini & Robotini",    number: 4,  series: "lovini",    spriteUrl: "/characters/04_teddy_and_rosie.png", sketchUrl: "/sketches/04_teddy_and_rosie.png",          facts: ["The robot insists he is not a hugger. The teddy knows better."],                             mult: "1.4x", rarity: "legendary", status: "released" },
  { slug: "lovini-rosetti",       name: "Lovini Rosetti",        number: 7,  series: "lovini",    spriteUrl: "/characters/07_lovin_rose_v2.png", sketchUrl: "/sketches/07_lovin_rose.png",               facts: ["Hands out roses to everyone and keeps exactly none"],                                mult: "2.1x", rarity: "rare",     status: "released" },
  { slug: "heartini-smilekurro",  name: "Heartini Smilekurro",   number: 8,  series: "lovini",    spriteUrl: "/characters/08_heartini_smilekur_v2.png", sketchUrl: "/sketches/08_heartini_smilekur.png",        facts: ["Nobody has ever caught him not smiling. A few have tried."],                                  mult: "2.4x", rarity: "standard", status: "released" },
  { slug: "cupidini-sahuroni",    name: "Cupidini Sahuroni",     number: 10, series: "lovini",    spriteUrl: "/characters/10_cupid_cupid_sahur_v2.png", sketchUrl: "/sketches/10_cupid_cupid_sahur.png",        facts: ["Fires one arrow a day, then takes the rest of it off"],                                  mult: "3x", rarity: "legendary", status: "released" },
  { slug: "rositti-tueletti",     name: "Rositti Tueletti",      number: 11, series: "lovini",    spriteUrl: "/characters/11_rositti_tueletti_v2.png", sketchUrl: "/sketches/11_rositti_tueletti.png",         facts: ["Wears a crown of roses so you notice the flowers first"],                 mult: "3.4x", rarity: "rare",     status: "released" },
  { slug: "noo-mio-heartini",     name: "Noo Mio Heartini",      number: 18, series: "lovini",    spriteUrl: "/characters/18_noo_my_heart_v2.png", sketchUrl: "/sketches/18_noo_my_heart.png",             facts: ["Zipped himself back together and still cries at the sad parts"],                              mult: "8.2x", rarity: "rare",     status: "released" },
  { slug: "cupidini-hotspottini", name: "Cupidini Hotspottini",  number: 19, series: "lovini",    spriteUrl: "/characters/19_cupid_hotspot_v2.png", sketchUrl: "/sketches/19_cupid_hotspot.png",            facts: ["Puts out fires all day, then starts a few with that heart"],                       mult: "10x", rarity: "legendary", status: "released" },
  { slug: "bobini-lovini",        name: "Bobini Lovini",         number: 34, series: "lovini",    spriteUrl: "/characters/34_Bobini Lovini.png", sketchUrl: "/sketches/34_Bobini Lovini.png",            facts: ["Made a sign about boba because talking about it wasn't enough"],                      mult: "17x", rarity: "secret",   status: "released", releasedAt: "2026-08-05" },
  { slug: "cappy-family",         name: "Cappy Family",          number: 35, series: "lovini",    spriteUrl: "/characters/35_Cappy Family.png", sketchUrl: "/sketches/35_Cappy Family.png",             facts: ["The calmest family in the universe. Mom made the sign."],                      mult: "9.3x", rarity: "rare",     status: "released", releasedAt: "2026-08-05" },
  { slug: "cupcakini-sweetini",   name: "Cupcakini Sweetini",    number: 37, series: "lovini",    spriteUrl: "/characters/37_Cupcakini Sweetini.png", sketchUrl: "/sketches/37_Cupcakini Sweetini.png",       facts: ["Practised the thank-you speech. Brought flowers as backup."],                        mult: "15x", rarity: "secret",   status: "released", releasedAt: "2026-08-05" },
  { slug: "lovini-vibini",        name: "Lovini Vibini",         number: 40, series: "lovini",    spriteUrl: "/characters/40_Lovini vibini.png", sketchUrl: "/sketches/40_Lovini vibini.png",            facts: ["Everyone turned up at once and nobody wants to go home"],                mult: "28x", rarity: "limited",  status: "released", releasedAt: "2026-08-05" },
  { slug: "toastini-butterini",   name: "Toastini Butterini",    number: 41, series: "lovini",    spriteUrl: "/characters/41_Toastini Butterini.png", sketchUrl: "/sketches/41_Toastini Butterini.png",       facts: ["Makes Mom breakfast every morning and lets nobody near the butter"],             mult: "6.4x", rarity: "rare",     status: "released", releasedAt: "2026-08-05" },

  // ── Partini ──
  { slug: "noobini-partini",      name: "Noobini Partini",       number: 5,  series: "partini",   spriteUrl: "/characters/05_noobini_partini_v2.png", sketchUrl: "/sketches/05_noobini_partini.png",          facts: ["Already set off the confetti and the guests aren't here yet"],                     mult: "1.6x", rarity: "standard", status: "released" },
  { slug: "cakini-presintini",    name: "Cakini Presintini",     number: 6,  series: "partini",   spriteUrl: "/characters/06_cakini_and_presintini_v2.png", sketchUrl: "/sketches/06_cakini_and_presintini.png",    facts: ["One brings the cake, one brings the present. Neither brings a card."],                   mult: "1.9x", rarity: "secret",   status: "released" },
  { slug: "dragini-partini",      name: "Dragini Partini",       number: 9,  series: "partini",   spriteUrl: "/characters/09_dragon_partyini.png", sketchUrl: "/sketches/09_dragon_partyini.png",          facts: ["Blows out every candle in one go. Sometimes the cake too."],            mult: "2.7x", rarity: "og",       status: "released" },
  { slug: "birthdayini-cardini",  name: "Birthdayini Cardini",   number: 12, series: "partini",   spriteUrl: "/characters/12_birthdayini_cardini.png", sketchUrl: "/sketches/12_birthdayini_cardini.png",      facts: ["Delivers himself, so nobody can forget to post him"],                             mult: "4.4x", rarity: "standard", status: "released" },
  { slug: "cakini-elephantini",   name: "Cakini Elephantini",    number: 13, series: "partini",   spriteUrl: "/characters/13_cakini_elephantini_v2.png", sketchUrl: "/sketches/13_cakini_elephantini.png",       facts: ["An elephant who never forgets a birthday. Especially his own."],               mult: "5x", rarity: "og",       status: "released" },
  { slug: "pizzini-partyini",     name: "Pizzini Partyini",      number: 15, series: "partini",   spriteUrl: "/characters/15_noobini_partyini_v2.png", sketchUrl: "/sketches/15_noobini_partyini.png",         facts: ["Turns up to every party with one slice and no explanation"],               mult: "5.6x", rarity: "standard", status: "released" },

  // ── Hockini ──
  { slug: "stick-stick",          name: "Stick Stick",           number: 20, series: "hockini",   spriteUrl: "/characters/20_stick_stick.png", sketchUrl: "/sketches/20_stick_stick.png",              facts: ["No arms, no legs, no problem. Still scores."],              mult: "12x", rarity: "secret",   status: "released" },
  { slug: "no-my-pucks",          name: "No My Pucks",           number: 21, series: "hockini",   spriteUrl: "/characters/21_no_my_pucks.png", sketchUrl: "/sketches/21_no_my_pucks.png",              facts: ["Fills the bucket every morning. Loses the lot by lunch."],                              mult: "16x", rarity: "secret",   status: "released" },
  { slug: "hockey-bros",          name: "Hockey Bros",           number: 22, series: "hockini",   spriteUrl: "/characters/22_hockey_bros.png", sketchUrl: "/sketches/22_hockey_bros.png",              facts: ["The stick shoots, the bucket catches. Nobody else gets a turn."],                mult: "22x", rarity: "limited",  status: "released" },
  { slug: "cupideini-hockini",    name: "Cupideini Hockini",     number: 26, series: "hockini",   spriteUrl: "/characters/26_cupideini_hockini.png", sketchUrl: "/sketches/26_cupideini_hockini.png",        facts: ["Won the Maple Cup with a bow instead of a stick. Nobody argued."],                  mult: "25x", rarity: "mythic",   status: "released" },
  { slug: "los-hockeys",          name: "Los Hockeys",           number: 27, series: "hockini",   spriteUrl: "/characters/27_los_hockeys.png", sketchUrl: "/sketches/27_los_hockeys.png",              facts: ["The whole line on the ice at once. Good luck."],                      mult: "30x", rarity: "limited",  status: "released" },

  // ── Foodini ──
  { slug: "sushiro-soyaro",       name: "Sushiro & Soyaro",      number: 23, series: "foodini",   spriteUrl: "/characters/23_sushiro_soyaro.png", sketchUrl: "/sketches/23_sushiro_soyaro.png",           facts: ["Will not go anywhere without the other. This has been tested."],          mult: "16x", rarity: "prestige", status: "released" },
  { slug: "kingurini-orangini",   name: "Kingurini Orangini",    number: 24, series: "foodini",   spriteUrl: "/characters/24_kinguru_orange.png", sketchUrl: "/sketches/24_kinguru_orange.png",           facts: ["Hits the gym daily and is still, technically, a piece of fruit"],                       mult: "20x", rarity: "prestige", status: "released" },
  { slug: "auraberry",            name: "Auraberry",             number: 25, series: "foodini",   spriteUrl: "/characters/25_auraberry.png", sketchUrl: "/sketches/25_auraberry.png",                facts: ["Wears sunglasses indoors. The aura is simply too strong."],               mult: "21x", rarity: "prestige", status: "released" },

  // ── Fidgetini ──
  { slug: "popini-itini",         name: "Popini Itini",          number: 28, series: "fidgetini", spriteUrl: "/characters/28_popini_itini.png", sketchUrl: "/sketches/28_popini_itini.png",             facts: ["Pops every bubble, flips over, starts again. Forever."],                              mult: "16x", rarity: "secret",   status: "released" },
  { slug: "fidgetini-cubini",     name: "Fidgetini Cubini",      number: 29, series: "fidgetini", spriteUrl: "/characters/29_fidgetini_cubini.png", sketchUrl: "/sketches/29_fidgetini_cubini.png",         facts: ["Every switch does something. He has flipped all of them."],                                  mult: "17x", rarity: "secret",   status: "released" },
  { slug: "dragini-sqishini",     name: "Dragini Sqishini",      number: 30, series: "fidgetini", spriteUrl: "/characters/30_dragini_sqishini.png", sketchUrl: "/sketches/30_dragini_sqishini.png",         facts: ["Tries to roar. Squeaks instead. Keeps trying."],                        mult: "20x", rarity: "mythic",   status: "released" },
  { slug: "la-fidget-combination",name: "La Fidget Combination", number: 31, series: "fidgetini", spriteUrl: "/characters/31_la_fidget_combination.png", sketchUrl: "/sketches/31_la_fidget_combination.png",    facts: ["Three toys that refused to be put away separately"],                       mult: "35x", rarity: "limited",  status: "released" },
  { slug: "spinirino",            name: "Spinirino",             number: 32, series: "fidgetini", spriteUrl: "/characters/32_Spinirino.png", sketchUrl: "/sketches/32_Spinirino.png",                facts: ["Still spinning from a flick last Tuesday"],                               mult: "19x", rarity: "secret",   status: "released" },
  { slug: "stressini-ballini",    name: "Stressini Ballini",     number: 33, series: "fidgetini", spriteUrl: "/characters/33_Stressini_ballini.png", sketchUrl: "/sketches/33_Stressini_ballini.png",        facts: ["Squeeze as hard as you like. He has had worse days."],                        mult: "17x", rarity: "secret",   status: "released" },

  // ── Summerini ──
  { slug: "chillen-lemonade",     name: "Chillen Lemonade",      number: 36, series: "summerini", spriteUrl: "/characters/36_Chillen Lemonade.png", sketchUrl: "/sketches/36_Chillen Lemonade.png",   facts: ["Hasn't worried about a single thing since the ice went in"],                  mult: "19x", rarity: "secret",   status: "released", releasedAt: "2026-08-05" },
  { slug: "cuppini-triondini",    name: "Cuppini Triondini",     number: 38, series: "summerini", spriteUrl: "/characters/38_cuppini_triondini_v2.png", sketchUrl: "/sketches/38_cuppini_triondini_v2.png",  facts: ["The ball did the work. The trophy takes the photos."],                  mult: "12x", rarity: "legendary", status: "released", releasedAt: "2026-08-05" },
  { slug: "lemon-lemon-sahur",    name: "Lemon Lemon Sahur",     number: 39, series: "summerini", spriteUrl: "/characters/39_Lemon Lemon Sahur.png", sketchUrl: "/sketches/39_Lemon Lemon Sahur.png",  facts: ["Sourest fruit in the bowl, best shoes by a mile"],                  mult: "7.2x", rarity: "rare",     status: "released", releasedAt: "2026-08-05" },

  // ── Hockini: the Cupiddini line ──
  { slug: "cupiddini-cyberini",  name: "Cupiddini Cyberini",  number: 47, series: "hockini", spriteUrl: "/characters/47_Cupiddini_Cyberini_v2.png",  facts: ["Skates so fast the rink lights up behind him"],       mult: "28x", rarity: "mythic", status: "released", releasedAt: "2026-10-24" },
  { slug: "cupiddini-divinini",  name: "Cupiddini Divinini",  number: 48, series: "hockini", spriteUrl: "/characters/48_Cupiddini_Divinini_v2.png",  facts: ["Flies straight at the net. The cape is not strictly necessary."], mult: "45x", rarity: "divine", renderScale: 1.14, status: "released", releasedAt: "2026-10-24" },

  // ── Halloween 2026 (limited seasonal collection) ──
  { slug: "candini-bucketini",     name: "Candini Bucketini",     number: 42, series: "halloweenini", spriteUrl: "/characters/43_Candini_Bucketini.png",      facts: ["Knocks twice at every door. Just in case."],                        mult: "3.9x",  rarity: "standard",  status: "released", releasedAt: "2026-10-23" },
  { slug: "ghostini-mechini",      name: "Ghostini Mechini",      number: 43, series: "halloweenini", spriteUrl: "/characters/44_ghostini_mechini.png",       facts: ["Half robot, half ghost — says boo in beeps"],          mult: "13x", rarity: "epic",      status: "released", releasedAt: "2026-10-23" },
  { slug: "frankenstini-sharkini", name: "Frankenstini Sharkini", number: 44, series: "halloweenini", spriteUrl: "/characters/46_Frankenstini_Sharkini.png",  facts: ["Built from spare parts in somebody's garage. Swims fine."],   mult: "22x", rarity: "legendary", status: "released", releasedAt: "2026-10-23" },
  { slug: "vampire-dragini",       name: "Vampire Dragini",       number: 45, series: "halloweenini", spriteUrl: "/characters/45_Vampire_Dragini.png",        facts: ["Sleeps upside down and calls his cave a castle"],               mult: "40x", rarity: "divine",    status: "released", releasedAt: "2026-10-23" },
  { slug: "headlessini-pumpkini",  name: "Headlessini Pumpkini",  number: 46, series: "halloweenini", spriteUrl: "/characters/42_Headlessini_Pumpkini.png",   facts: ["Lost the head, kept the hat — rides faster than anyone can look"],   mult: "55x", rarity: "divine",    status: "released", releasedAt: "2026-10-23" },

  // No unrevealed "Drops Soon" placeholders at the moment. To tease the next
  // character again, add an entry with status: "secret" and the next free
  // number; the Roster marks the three lowest-numbered ones "Drops Soon".
];
