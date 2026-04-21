"use client";

import { MapPin, Clock, Instagram, Phone, Coffee } from "lucide-react";
import Image from "next/image";
import FadeInUp from "@/components/FadeInUp";
import { HOURS } from "@/lib/data";

/**
 * Footer section — Forest Green background.
 * Three columns:
 *  1. Brand overview + social media icons (Instagram, WhatsApp)
 *  2. Operational hours table
 *  3. Location address + Google Maps link + map placeholder
 */
export default function Footer() {
  return (
    <footer id="footer" className="bg-forest-green text-white">

      {/* ── Top Section ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* ── Column 1: Brand ── */}
          <FadeInUp>
            <div>
              {/* Logo lockup */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-full overflow-hidden shadow-lg shrink-0">
                  <Image
                    src="/images/logo/logobaru.png"
                    alt="Triple A Coffee Logo"
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className="text-2xl font-black tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Triple A Coffee
                </span>
              </div>

              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Biji kopi autentik. Aroma luar biasa. Suasana senyaman rumah. Itulah janji Triple A — setiap hari. Berada tepat di pusat studi Palembang.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 mt-7">
                <a
                  href="https://www.instagram.com/triple.acoffee?igsh=YXdpdWtuOGI4dmh5"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-deep-red hover:border-deep-red transition-all duration-300"
                >
                  <Instagram size={18} className="text-white" />
                </a>
                <a
                  href="https://wa.me/6281366905551"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact us on WhatsApp"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-deep-red hover:border-deep-red transition-all duration-300"
                >
                  <Phone size={18} className="text-white" />
                </a>
                <a
                  href="#menu"
                  aria-label="Menu Kami"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-deep-red hover:border-deep-red transition-all duration-300"
                >
                  <Coffee size={18} className="text-white" />
                </a>
              </div>
            </div>
          </FadeInUp>

          {/* ── Column 2: Operational Hours ── */}
          <FadeInUp delay={0.1}>
            <div>
              <h4
                className="text-lg font-bold mb-6 flex items-center gap-2"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                <Clock size={18} className="text-deep-red" />
                Jam Operasional
              </h4>
              <ul className="space-y-3 text-sm text-white/70">
                {HOURS.map((row) => (
                  <li
                    key={row.day}
                    className="flex justify-between gap-4 border-b border-white/10 pb-2.5 last:border-0"
                  >
                    <span>{row.day}</span>
                    <span className="text-white font-semibold">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>

          {/* ── Column 3: Location ── */}
          <FadeInUp delay={0.2}>
            <div>
              <h4
                className="text-lg font-bold mb-6 flex items-center gap-2"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                <MapPin size={18} className="text-deep-red" />
                Lokasi Kami
              </h4>

              <p className="text-white/70 text-sm leading-relaxed mb-5">
                Jl. Mayor Ruslan, 9 Ilir, Kec. Ilir Timur. II
                <br />
                (Dekat IBA, MDP, & Musi Charitas)
                <br />
                Kota Palembang, Sumatera Selatan 30115
              </p>

              <a
                href="https://maps.app.goo.gl/MnJjgMbhDxxd2bZF6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-deep-red text-white text-sm font-semibold hover:opacity-90 transition-all duration-300"
              >
                <MapPin size={15} />
                Buka di Google Maps
              </a>

              {/* Map Placeholder */}
              <div className="mt-5 rounded-2xl overflow-hidden border border-white/10 h-28 bg-white/5 flex items-center justify-center">
                <a
                  href="https://maps.app.goo.gl/MnJjgMbhDxxd2bZF6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
                >
                  <MapPin size={28} />
                  <span className="text-xs tracking-wider">Lihat peta lokasi</span>
                </a>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Triple A Coffee. All rights reserved.</p>
          <p>Authentic · Aroma · Atmosphere</p>
        </div>
      </div>
    </footer>
  );
}
