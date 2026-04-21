// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Beranda",  href: "#home" },
  { label: "Cerita",   href: "#story" },
  { label: "Maskot",   href: "#mascot" },
  { label: "Menu",     href: "#menu" },
  { label: "Cabang",   href: "/branches" },
];

// ─── Menu Items ───────────────────────────────────────────────────────────────

export type MenuItem = {
  name:  string;
  price: string;
  desc:  string;
  img:   string;
  badge: string | null;
  notes: string[];
};

export const MENU_ITEMS: MenuItem[] = [
  {
    name:  "Signature Espresso",
    price: "Rp 35.000",
    desc:  "Tembakan espresso yang kuat dan kaya dari biji Arabica single-origin terbaik dengan crema keemasan yang sempurna.",
    img:   "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=60",
    badge: "Terlaris",
    notes: ["Kuat", "Kacang", "Cokelat Gelap"],
  },
  {
    name:  "Forest Latte",
    price: "Rp 42.000",
    desc:  "Espresso yang lembut dipadukan dengan susu uap beludru dan sedikit sentuhan rasa tanah hutan yang alami.",
    img:   "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=60",
    badge: "Baru",
    notes: ["Creamy", "Alami", "Lembut"],
  },
  {
    name:  "Triple A Special",
    price: "Rp 48.000",
    desc:  "Karya agung triple-shot kami — karamel, vanila, dan sirup brown-butter buatan rumah.",
    img:   "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=60",
    badge: "Andalan",
    notes: ["Karamel", "Vanila", "Kaya Rasa"],
  },
  {
    name:  "Cold Brew Delight",
    price: "Rp 38.000",
    desc:  "Kopi seduh dingin selama 16 jam untuk pengalaman yang halus, manis alami, dan rendah asam.",
    img:   "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&q=60",
    badge: null,
    notes: ["Manis", "Halus", "Rendah Asam"],
  },
  {
    name:  "Caramel Macchiato",
    price: "Rp 45.000",
    desc:  "Espresso berlapis di atas susu manis vanila, dimahkotai dengan kisi-kisi saus karamel.",
    img:   "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=60",
    badge: null,
    notes: ["Karamel", "Manis", "Berlapis"],
  },
  {
    name:  "Matcha Harmony",
    price: "Rp 43.000",
    desc:  "Matcha kelas seremonial yang dikocok hingga berbusa, dipadukan dengan susu gandum dingin dan madu.",
    img:   "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=60",
    badge: null,
    notes: ["Segar", "Madu", "Menenangkan"],
  },
];

// ─── Brand Story Pillars ──────────────────────────────────────────────────────

export type StoryPillar = {
  letter: string;
  title:  string;
  desc:   string;
};

export const STORY_PILLARS: StoryPillar[] = [
  {
    letter: "A",
    title:  "Authentic",
    desc:   "Setiap biji kopi bersumber transparan dari petani lokal di Sumatra, Flores, hingga Toraja. Tanpa jalan pintas — hanya kopi yang jujur.",
  },
  {
    letter: "A",
    title:  "Aroma",
    desc:   "Dari retakan pertama panggangan hingga tuangan terakhir, kami meracik setiap cangkir untuk memberikan aroma yang bercerita sebelum Anda mencicipinya.",
  },
  {
    letter: "A",
    title:  "Atmosphere",
    desc:   "Kami percaya secangkir kopi yang luar biasa layak mendapatkan tempat yang istimewa. Triple A bukan sekadar kafe — ini adalah ruang tenang di mana momen menjadi memori.",
  },
];

// ─── Operational Hours ────────────────────────────────────────────────────────

export const HOURS = [
  { day: "Selasa – Sabtu", time: "08:00 – 23:00" },
  { day: "Senin",          time: "10:00 – 23:00" },
  { day: "Minggu",         time: "14:00 – 23:00" },
];
