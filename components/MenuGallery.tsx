"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Camera, Instagram, X } from "lucide-react";
import { Button } from "./ui/button";

// ─── Gallery Data ────────────────────────────────────────────────────────────

interface GalleryItem {
  id: string;
  title: string;
  img: string;
  category: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "Coffee Menu",
    img: "/images/gallery/coffee.png",
    category: "Coffee",
  },
  {
    id: "gallery-2",
    title: "Non-coffee Menu",
    img: "/images/gallery/noncoffee.png",
    category: "Drinks",
  },
  {
    id: "gallery-3",
    title: "Seasonal Specials",
    img: "/images/gallery/noncoffee2.png",
    category: "Seasonal",
  },
  {
    id: "gallery-4",
    title: "Food Menu",
    img: "/images/gallery/food.png",
    category: "Food",
  },
  {
    id: "gallery-5",
    title: "Pastry & Bites",
    img: "/images/gallery/food2.png",
    category: "Pastry",
  },
  {
    id: "gallery-6",
    title: "Signature Series",
    img: "/images/gallery/food3.png",
    category: "Signature",
  },
];

export default function MenuGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Disable scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedItem]);

  return (
    <section id="gallery" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
          <div className="max-w-3xl space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 text-deep-red font-bold uppercase tracking-widest text-xs">
              <Camera size={20} />
              Visual Anthology
            </div>
            <h2
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-forest-green leading-none tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Glimpses Of <span className="text-deep-red italic">Triple A</span>
            </h2>
          </div>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-sm mb-4 leading-relaxed text-center md:text-left">
            A visual documentation of our space, our craft, and the community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden cursor-pointer border border-gray-100 shadow-sm transition-all duration-300"
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <div className="bg-white/20 p-4 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500">
                  <Maximize2 size={32} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Button
            variant="ghost"
            size="lg"
            className="h-14 px-10 rounded-2xl text-forest-green hover:bg-forest-green/5 font-bold text-lg active:scale-95 transition-all gap-3 uppercase tracking-widest"
          >
            <Instagram size={24} /> View On Instagram
          </Button>
        </div>
      </div>

      {/* Full-screen Image Popup */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedItem(null)}
          >
            {/* Background Blur */}
            <div className="absolute inset-0 bg-forest-green/80 backdrop-blur-md" />
            
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 text-white/70 hover:text-white z-[110] bg-white/10 p-2 rounded-full transition-colors"
              onClick={() => setSelectedItem(null)}
            >
              <X size={32} />
            </motion.button>

            <motion.div
              layoutId={selectedItem.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[500px] aspect-[3/4] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedItem.img}
                alt={selectedItem.title}
                fill
                className="object-cover"
                quality={100}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
