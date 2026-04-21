"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, Coffee, Heart, Zap } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { STORY_PILLARS } from "@/lib/data";

export default function BrandStory() {
  return (
    <section id="story" className="py-24 bg-white relative overflow-hidden">
      {/* Soft decorative background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-forest-green/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-deep-red/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-0" />

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-3 text-deep-red font-bold uppercase tracking-widest text-xs shadow-sm bg-white/50 border border-gray-100 rounded-full px-4 py-2 w-fit">
                <Sparkles size={16} />
                Filosofi Kami
              </div>
              <h2
                className="text-4xl sm:text-5xl md:text-7xl font-bold text-forest-green leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Filosofi <br />
                <span className="text-deep-red">Triple A.</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-forest-green/60 leading-relaxed max-w-xl font-medium">
                Nikmati janji Triple A setiap hari. Berlokasi strategis di pusat kota Palembang, kami menjadi tempat favorit bagi para pelajar untuk berkumpul dan berkarya.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-6 border-t border-gray-100 text-center sm:text-left">
              {STORY_PILLARS.map((pillar, idx) => (
                <div key={pillar.title} className="space-y-4 group flex flex-col items-center sm:items-start">
                  <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-deep-red group-hover:bg-deep-red group-hover:text-white transition-all duration-500 shadow-sm font-black text-2xl">
                    {pillar.letter}
                  </div>
                  <h4
                    className="font-bold text-forest-green text-xl tracking-tight"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-[280px] sm:max-w-none">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-center lg:justify-start">
              <Button
                asChild
                variant="ghost"
                className="text-forest-green hover:bg-forest-green/5 p-0 hover:px-4 rounded-2xl group transition-all h-auto text-lg font-bold"
              >
                <a href="#menu" className="flex items-center">
                  Lihat menu andalan kami{" "}
                  <ArrowUpRight
                    size={24}
                    className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group aspect-[4/5] lg:aspect-auto lg:h-[600px]">
              <Image
                src="/images/brandstory/story.png"
                alt="Halaman Depan Triple A Coffee"
                fill
                className="object-cover hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-forest-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
