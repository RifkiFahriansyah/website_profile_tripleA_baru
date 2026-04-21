import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getBranchesAction } from "@/app/admin/actions";
import { MapPin, Globe, Phone, Clock, Navigation } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BranchesPage() {
  const { data: branches } = await getBranchesAction();

  return (
    <main className="min-h-screen bg-cream/20 pt-24">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 uppercase tracking-widest">
        <div className="text-center mb-16 space-y-4">
            <h1 className="text-5xl md:text-6xl font-black text-forest-green" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Our Branches
            </h1>
            <p className="text-forest-green/60 font-bold max-w-2xl mx-auto">
                Find your nearest Triple A Coffee and enjoy our signature blends in a cozy atmosphere.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches && branches.length > 0 ? (
            branches.filter(b => b.is_active).map((branch) => (
              <div key={branch.id} className="bg-white rounded-[2rem] p-8 shadow-xl border border-forest-green/5 hover:-translate-y-2 transition-transform duration-500 group">
                <div className="w-16 h-16 bg-forest-green rounded-2xl flex items-center justify-center mb-8 group-hover:bg-deep-red transition-colors duration-500">
                  <MapPin className="text-white" size={32} />
                </div>
                
                <h3 className="text-2xl font-black text-forest-green mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  {branch.name}
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex gap-3 items-start">
                    <MapPin className="text-deep-red shrink-0 mt-1" size={18} />
                    <p className="text-sm font-bold text-forest-green/70 leading-relaxed normal-case">
                      {branch.address}
                    </p>
                  </div>
                  
                  {branch.phone && (
                    <div className="flex gap-3 items-center">
                      <Phone className="text-deep-red shrink-0" size={18} />
                      <p className="text-sm font-bold text-forest-green/70">
                        {branch.phone}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-3 items-center">
                    <Clock className="text-deep-red shrink-0" size={18} />
                    <p className="text-sm font-bold text-forest-green/70">
                      08:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>
                
                <a 
                  href={branch.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-forest-green text-white font-black rounded-2xl hover:bg-deep-red transition-colors duration-300 shadow-lg shadow-forest-green/10"
                >
                  <Navigation size={18} />
                  <span>Get Directions</span>
                </a>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-forest-green/40 font-bold">More locations coming soon!</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
