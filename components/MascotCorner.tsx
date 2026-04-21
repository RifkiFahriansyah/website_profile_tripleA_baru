"use client";

import { motion } from "framer-motion";
import { Gamepad2, Sparkles, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

export default function MascotCorner() {
  return (
    <section id="mascot" className="py-24 bg-gray-50 relative overflow-hidden text-forest-green">
      {/* Subtle patterns */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent" />

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-deep-red font-bold uppercase tracking-widest text-xs"
          >
            <Sparkles size={16} />
            The Signature Vibe
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-forest-green leading-none tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            A Fusion Of <span className="text-deep-red italic">Art</span> & <span className="text-forest-green/40">Play</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Triple A Coffee isn't just a destination, it's a culture. Where gaming meets gourmet, and mascots meet masterpieces.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Mascot Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-gray-100 flex flex-col md:flex-row h-full"
          >
            <div className="w-full md:w-1/2 aspect-video md:aspect-auto relative overflow-hidden bg-forest-green/5 min-h-[250px] md:min-h-full">
              <Image
                src="/images/mascot/tesmaskotcenter.png"
                alt="Triple A Coffee Mascot"
                fill
                className="object-contain p-8 group-hover:scale-110 transition-transform duration-[2s]"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-deep-red text-white px-4 py-1.5 rounded-full shadow-lg shadow-deep-red/20 font-bold tracking-widest text-[10px] uppercase">
                  Mascot
                </span>
              </div>
            </div>
            <div className="md:w-1/2 p-10 flex flex-col justify-center space-y-6">
              <h3
                className="text-3xl font-bold text-forest-green leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Meet <span className="text-deep-red">The Guardian</span>
              </h3>
              <p className="text-gray-500 text-base font-medium leading-relaxed">
                Our red mascot is the living soul of Triple A Coffee — radiating the
                warmth, passion, and welcoming spirit that goes into every cup. 
                Born from the deep forest shadows, he's the artistic soul who keeps 
                the vibe high and the coffee bold.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-1 text-gray-500 font-bold tracking-tight text-xs uppercase text-deep-red">Guardian</span>
                <span className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-1 text-gray-500 font-bold tracking-tight text-xs uppercase ">Icon</span>
              </div>
            </div>
          </motion.div>

          {/* Game Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-gray-100 flex flex-col md:flex-row h-full"
          >
            <div className="w-full md:w-1/2 aspect-video md:aspect-auto relative overflow-hidden order-first md:order-last bg-forest-green/5 min-h-[250px] md:min-h-full">
              <Image
                src="/images/mascot/gamebox.png"
                alt="Console Gaming at Triple A"
                fill
                className="object-contain p-8 group-hover:scale-110 transition-transform duration-[2s]"
              />
              <div className="absolute top-6 right-6">
                <span className="bg-forest-green text-white px-4 py-1.5 rounded-full shadow-lg shadow-forest-green/20 font-bold tracking-widest text-[10px] uppercase">
                  Lounge
                </span>
              </div>
            </div>
            <div className="md:w-1/2 p-10 flex flex-col justify-center space-y-6">
              <h3
                className="text-3xl font-bold text-forest-green leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                The <span className="text-deep-red italic">Play</span> Box
              </h3>
              <p className="text-gray-500 text-base font-medium leading-relaxed">
                Take a seat in our custom gaming lounge. From retro classics to 
                curated board games, we've created an experience that pairs 
                perfectly with a signature espresso.
              </p>
              <Button
                asChild
                variant="ghost"
                className="w-fit p-0 h-auto font-bold text-deep-red group-hover:translate-x-1 transition-all uppercase tracking-widest text-sm"
              >
                <a href="#menu">
                  Browse activities <ArrowRight size={20} className="ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
