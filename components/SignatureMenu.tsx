"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Cloud, Leaf, Waves, Sparkle, Star, Utensils } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { MENU_ITEMS } from "@/lib/data";
import type { DisplayMenuItem } from "@/lib/menu-utils";

// ─── Props ─────────────────────────────────────────────────────────────────

interface SignatureMenuProps {
  /** Pass dynamic items from Supabase; falls back to static data.ts items. */
  items?: DisplayMenuItem[];
}

export default function SignatureMenu({ items }: SignatureMenuProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Items", icon: <Sparkle size={14} /> },
    { id: "coffee", label: "Coffee", icon: <Coffee size={14} /> },
    { id: "non-coffee", label: "Non Coffee", icon: <Waves size={14} /> },
    { id: "foods", label: "Foods", icon: <Utensils size={14} /> },
  ];

  // Static fallback: map data.ts items to the unified display model
  const staticItems: DisplayMenuItem[] = MENU_ITEMS.map((m, i) => ({
    id: `static-${i}`,
    name: m.name,
    price: m.price,
    desc: m.desc,
    img: m.img,
    badge: m.badge,
    notes: m.notes,
    category: m.badge?.toLowerCase().includes("coffee") ? "coffee" : "foods" // simple mapping for static
  }));

  // Merge: static dummy items first, then any real DB items appended after
  const displayItems = items && items.length > 0 ? [...staticItems, ...items] : staticItems;

  const filteredItems = activeCategory === "all"
    ? displayItems
    : displayItems.filter(item => {
        const cat = item.category?.toLowerCase() || "";
        return cat === activeCategory;
      });

  return (
    <section id="menu" className="py-24 bg-white relative overflow-hidden text-forest-green">
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 text-deep-red font-bold uppercase tracking-widest text-xs">
            <Sparkle size={16} />
            The Collection
          </div>
          <h2
            className="text-5xl md:text-7xl font-bold text-forest-green leading-none tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Our <span className="text-deep-red">Menu</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Meticulously crafted beverages and bites designed to elevate your everyday.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-16 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full sm:w-auto">
            <TabsList className="flex w-max sm:w-full h-auto bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100 items-center gap-2">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="rounded-xl px-5 sm:px-8 py-3 data-[state=active]:bg-white data-[state=active]:text-deep-red data-[state=active]:shadow-sm data-[state=active]:border-gray-100 border border-transparent transition-all gap-2 text-gray-500 font-bold whitespace-nowrap"
                >
                  {cat.icon}
                  <span className="text-xs sm:text-base">{cat.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
              >
                <Link href={`/menu/${item.id}`} className="block h-full group">
                  <Card className="h-full flex flex-col rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 bg-white">
                    <CardHeader className="p-0 relative overflow-hidden aspect-[4/3] sm:aspect-square lg:aspect-[4/3]">
                      {item.img ? (
                        <Image
                          src={item.img}
                          alt={item.name}
                          fill
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-cream">
                          <span className="text-forest-green/20 text-4xl select-none">☕</span>
                        </div>
                      )}
                      {item.badge && (
                        <div className="absolute top-4 right-4 z-10">
                          <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-white/20">
                            <Star size={12} className="text-deep-red fill-deep-red" />
                            <span className="text-[10px] font-black text-forest-green uppercase tracking-wider">
                              {item.badge}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-green/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </CardHeader>
                    <CardContent className="p-6 md:p-8 flex-grow flex flex-col">
                      <div className="space-y-3 flex-grow">
                        <div className="flex justify-between items-start gap-4">
                          <CardTitle
                            className="text-xl md:text-2xl font-bold text-forest-green group-hover:text-deep-red transition-colors tracking-tight"
                            style={{ fontFamily: "var(--font-playfair), serif" }}
                          >
                            {item.name}
                          </CardTitle>
                          <span className="text-lg md:text-xl font-black text-deep-red shrink-0">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed italic line-clamp-2">
                          {item.desc}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-100" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
