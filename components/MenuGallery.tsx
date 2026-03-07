"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FadeInUp from "@/components/FadeInUp";

// ─── Gallery Data ────────────────────────────────────────────────────────────

interface GalleryItem {
  id:    string;
  title: string;
  img:   string;
  alt:   string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id:    "gallery-1",
    title: "Coffee Menu",
    img:   "/images/gallery/coffee.png",
    alt:   "Triple A Coffee — Coffee Menu Poster",
  },
  {
    id:    "gallery-2",
    title: "Non-coffee Menu",
    img:   "/images/gallery/noncoffee.png",
    alt:   "Triple A Coffee — Snack Menu Poster",
  },
  {
    id:    "gallery-3",
    title: "Non-coffee Menu",
    img:   "/images/gallery/noncoffee2.png",
    alt:   "Triple A Coffee — Seasonal Specials Poster",
  },
  {
    id:    "gallery-4",
    title: "Food Menu",
    img:   "/images/gallery/food.png",
    alt:   "Triple A Coffee — Cold Brew Series",
  },
  {
    id:    "gallery-5",
    title: "More Foods",
    img:   "/images/gallery/food2.png",
    alt:   "Triple A Coffee — Pastry & Bites Menu",
  },
  {
    id:    "gallery-6",
    title: "More Foods",
    img:   "/images/gallery/food3.png",
    alt:   "Triple A Coffee — Signature Drinks Poster",
  },
  {
    id:    "gallery-9",
    title: "Aneka Roti",
    img:   "/images/gallery/roti.png",
    alt:   "Triple A Coffee — Menu 8",
  },
  {
    id:    "gallery-10",
    title: "Aneka Snack",
    img:   "/images/gallery/snack.png",
    alt:   "Triple A Coffee — Menu 8",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * MenuGallery — displays café menu poster images in a responsive grid.
 *
 * Desktop: 3 columns
 * Tablet:  2 columns
 * Mobile:  1 column
 *
 * Each card features a hover scale effect and an optional title label.
 */
export default function MenuGallery() {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── Section Header ── */}
        <FadeInUp className="text-center mb-16">
          <p className="text-deep-red tracking-[0.3em] uppercase text-xs font-bold mb-3">
            Visual Menu
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-forest-green leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Menu Gallery
          </h2>
          <p className="mt-4 text-forest-green/60 max-w-xl mx-auto text-[0.95rem]">
            Browse our collection of handcrafted offerings — each poster a window
            into the Triple A Coffee world.
          </p>
        </FadeInUp>

        {/* ── Responsive Grid ── */}
        <div className="flex flex-wrap justify-center gap-6">
          {GALLERY_ITEMS.map((item, i) => (
            <FadeInUp key={item.id} delay={Math.min(0.06 * i, 0.25)} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white"
              >
                {/* ── Poster Image ── */}
                <div className="relative w-full aspect-3/4 overflow-hidden bg-cream">
                  <Image
                    src={item.img}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient overlay — reveals title on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-forest-green/80 via-forest-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* ── Card Title Bar ── */}
                <div className="px-4 py-3 bg-white flex items-center justify-between">
                  <span
                    className="text-sm font-semibold text-forest-green tracking-wide"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {item.title}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-deep-red shrink-0" />
                </div>
              </motion.div>
            </FadeInUp>
          ))}
        </div>

      </div>
    </section>
  );
}
