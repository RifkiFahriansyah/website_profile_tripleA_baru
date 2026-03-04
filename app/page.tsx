import Navbar               from "@/components/Navbar";
import Hero                from "@/components/Hero";
import BrandStory          from "@/components/BrandStory";
import MascotCorner        from "@/components/MascotCorner";
import SignatureMenuSection from "@/components/SignatureMenuSection";
import MenuGallery         from "@/components/MenuGallery";
import Footer              from "@/components/Footer";

// Always fetch fresh data — prevents Vercel from caching the Supabase fetch
export const dynamic = "force-dynamic";

/**
 * Triple A Coffee — Single Page Application
 *
 * This file is intentionally thin: it only assembles the section
 * components in page order. Each component owns its own logic,
 * data imports, and styling.
 *
 * Section order:
 *  1. Navbar         — sticky, glassmorphism → forest-green on scroll
 *  2. Hero           — full-height with watermark + floating mascot
 *  3. BrandStory     — the Triple A philosophy (Authentic, Aroma, Atmosphere)
 *  4. MascotCorner   — dual feature: mascot + game box experience
 *  5. SignatureMenu  — responsive 3-column coffee menu grid
 *  6. MenuGallery   — menu poster images in a responsive grid
 *  7. Footer         — hours, map, social links
 */
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <BrandStory />
      <MascotCorner />
      <SignatureMenuSection />
      <MenuGallery />
      <Footer />
    </main>
  );
}

