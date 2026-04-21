"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Coffee, ArrowDown, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Background - SPLIT FOR DESKTOP, FULL FOR MOBILE */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        {/* Desktop Split View: Left White, Right Image */}
        <div className="hidden lg:flex h-full w-full">
          <div className="w-1/2 h-full bg-white relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-deep-red/5 via-transparent to-transparent rounded-full blur-3xl opacity-50" />
          </div>
          <div className="w-1/2 h-full bg-forest-green relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-bl from-deep-red/10 via-transparent to-transparent rounded-full blur-3xl opacity-50" />
            <Image
              src="/images/hero/herotriplecomp.png"
              alt="Triple A Coffee Roastery"
              fill
              className="w-full h-full object-cover mix-blend-overlay opacity-60"
            />
          </div>
        </div>

        {/* Mobile/Tablet Full Image Background */}
        <div className="flex lg:hidden h-full w-full bg-forest-green relative">
          <Image
            src="/images/hero/herotriplecomp.png"
            alt="Triple A Coffee Roastery"
            fill
            priority
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-forest-green/30" />
        </div>
      </div>

      <div className="container relative z-20 mx-auto px-4 md:px-6 py-20 lg:py-32 flex items-center justify-center translate-y-[7px]">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-2xl lg:max-w-3xl space-y-10 text-center lg:text-left relative py-16 px-6 sm:px-12 overflow-hidden rounded-[3rem] shadow-2xl lg:shadow-none border border-white/20 lg:border-none isolate"
          >
            {/* Mobile/Tablet Backdrop - Only visible on non-desktop */}
            <div className="absolute inset-0 lg:hidden -z-10 w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src="/images/hero/herotriplecomp.png"
                  alt="Background"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 0vw"
                />
                {/* Blur and Overlay Layer */}
                <div className="absolute inset-0 bg-white/70 backdrop-blur-xl" />
              </div>
            </div>
            
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-deep-red/5 border border-deep-red/10 rounded-full text-deep-red font-semibold text-xs uppercase tracking-widest shadow-sm relative z-10 mx-auto lg:mx-0">
              <span className="w-1.5 h-1.5 bg-deep-red rounded-full animate-pulse" />
              Est. 2024
            </div>

            <h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-forest-green leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              TRIPLE A <br />
              <span className="text-deep-red italic font-medium">COFFEE</span>
            </h1>

            <p className="text-sm sm:text-base md:text-xl lg:text-lg xl:text-xl text-forest-green/80 lg:text-forest-green/70 max-w-xl mx-auto lg:mx-0 font-bold lg:font-medium leading-relaxed uppercase tracking-[0.2em]">
              Authentic · Aroma · Atmosphere
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-deep-red hover:bg-deep-red/90 text-white rounded-2xl h-14 px-10 text-lg shadow-lg shadow-deep-red/20 active:scale-95 transition-all uppercase tracking-widest font-bold"
              >
                <a href="#menu">The Menu</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-forest-green border-forest-green/20 hover:border-deep-red hover:text-deep-red hover:bg-white/50 rounded-2xl h-14 px-10 text-lg active:scale-95 transition-all gap-2 uppercase tracking-widest font-bold bg-white/30 backdrop-blur-sm"
              >
                <a href="#about">
                  Our Story <ArrowDown size={20} className="animate-bounce" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Desktop Only Side Card - Restored */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative w-full max-w-lg lg:max-w-xl aspect-square hidden lg:block"
          >
            <div className="absolute inset-0 bg-deep-red rounded-[3rem] rotate-6 shadow-2xl opacity-10" />
            <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/hero/herotriplecomp.png"
                alt="Perfect Cup of Triple A Coffee"
                fill
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-1 bg-deep-red" />
                  <span className="text-sm font-black uppercase tracking-widest">
                    Our Philosophy
                  </span>
                </div>
                <h3
                  className="text-3xl font-bold"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Authentic. Aroma. Atmosphere.
                </h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Cue ── */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 z-10"
      >
        <ChevronDown size={30} />
      </motion.div>
    </section>
  );
}
