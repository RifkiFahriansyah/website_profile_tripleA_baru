import { MENU_ITEMS } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Star, Clock, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMenuItemByIdAction } from "@/app/admin/actions";
import { menuRowToDisplay } from "@/lib/menu-utils";

export default async function MenuDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // 1. Validate ID
  if (!id || typeof id !== "string") return notFound();

  let item;

  // 2. Check Static Data
  if (id.startsWith("static-")) {
    const index = parseInt(id.replace("static-", ""), 10);
    const staticItem = MENU_ITEMS[index];
    if (staticItem) {
      item = { ...staticItem, id };
    }
  } else {
    // 3. Fetch from Database
    const row = await getMenuItemByIdAction(id);
    if (row) {
      item = menuRowToDisplay(row);
    }
  }

  if (!item) return notFound();

  return (
    <div className="min-h-screen bg-white text-forest-green pb-20">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/#menu" className="flex items-center gap-2 text-gray-500 hover:text-forest-green transition-colors group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">Back to Menu</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 lg:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl bg-cream/30">
            {item.img ? (
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-cream">
                <span className="text-forest-green/20 text-6xl select-none">☕</span>
              </div>
            )}
            {item.badge && (
              <div className="absolute top-6 right-6">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg border border-white/20">
                  <Star size={16} className="text-deep-red fill-deep-red" />
                  <span className="text-sm font-black text-forest-green uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 
                className="text-5xl md:text-7xl font-bold text-forest-green leading-tight"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                {item.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl md:text-4xl font-black text-deep-red">
                  {item.price}
                </span>
                <div className="h-6 w-px bg-gray-200" />
                <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                  <Clock size={18} />
                  <span>Available Now</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold uppercase tracking-widest text-gray-400">Description</h3>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>

            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button className="h-16 rounded-2xl bg-forest-green hover:bg-forest-green/90 text-white font-bold text-lg gap-2 shadow-lg transition-all active:scale-95">
                <BadgeCheck size={20} />
                Order Now
              </Button>
              <Button variant="outline" className="h-16 rounded-2xl border-2 border-forest-green text-forest-green font-bold text-lg hover:bg-forest-green/5 transition-all">
                Add to Favorites
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
