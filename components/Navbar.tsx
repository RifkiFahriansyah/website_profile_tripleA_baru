"use client";

import { useState, useEffect } from "react";
import { Menu as MenuIcon, X, MapPin, Coffee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/data";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMenuOpen
          ? "bg-forest-green shadow-xl py-2"
          : "bg-white/80 backdrop-blur-md py-4 border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10 font-medium">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group relative z-[60]">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0">
              <Image
                src="/images/logo/logobaru.png"
                alt="Triple A Coffee Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={`text-xl font-bold tracking-widest uppercase transition-colors duration-500 ${
                isScrolled || isMenuOpen ? "text-white" : "text-forest-green"
              }`}
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Triple A
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                className={`text-sm font-bold transition-colors duration-500 relative group uppercase tracking-wider ${
                  isScrolled
                    ? "text-white/80 hover:text-white"
                    : "text-forest-green/70 hover:text-forest-green"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-deep-red transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              asChild
              className="bg-deep-red hover:bg-deep-red/90 text-white rounded-full px-8 font-bold shadow-lg shadow-deep-red/20 uppercase tracking-wider text-xs"
            >
              <Link href="/#footer">
                <MapPin size={14} className="mr-2" />
                Visit Us
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center relative z-[60]">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={isScrolled || isMenuOpen ? "text-white" : "text-forest-green"}
            >
              {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Full Screen Dropped Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-forest-green z-50 flex flex-col pt-24 overflow-hidden"
          >
            <div className="flex flex-col items-center gap-8 py-10">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Link
                    href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-3xl font-black text-white hover:text-deep-red transition-colors tracking-tight uppercase"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 px-8 w-full max-w-xs"
              >
                <Button
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-white text-forest-green hover:bg-deep-red hover:text-white w-full h-16 text-xl rounded-2xl shadow-xl font-bold uppercase tracking-widest transition-all"
                >
                  <Link href="/#footer" className="flex items-center justify-center gap-2">
                    <MapPin size={24} /> Visit Us
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Decorative background elements in menu */}
            <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[40%] bg-deep-red/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-[40%] h-[40%] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
