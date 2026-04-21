import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Triple A Coffee Palembang | Coffee Shop Hits Dekat Kampus IBA, MDP & Musi Charitas",
  description:
    "Triple A Coffee: Tempat nongkrong asik & nugas favorit mahasiswa di Palembang. Lokasi sangat strategis dekat Kampus IBA, Universitas MDP, UNIKA Musi Charitas, dan SMA Xaverius 1. Nikmati kopi premium dengan suasana tenang dan nyaman.",
  keywords: [
    "Triple A Coffee Palembang",
    "Cafe dekat Kampus IBA",
    "Tempat nongkrong dekat Universitas MDP",
    "Cafe dekat UNIKA Musi Charitas",
    "Tempat santai dekat SMA Xaverius 1 Palembang",
    "Coffee Shop Palembang",
    "Cafe buat nugas mahasiswa Palembang",
    "Kopi hits Palembang",
    "Cafe Palembang",
    "Kopi Palembang"
  ],
  openGraph: {
    title: "Triple A Coffee Palembang",
    description: "Cafe strategis dekat kampus IBA, MDP, dan Musi Charitas. Tempat ternyaman untuk nugas dan bersantai.",
    url: "https://triple-a-coffee.vercel.app",
    siteName: "Triple A Coffee",
    images: [
      {
        url: "/images/logo/logobaru.png",
        width: 800,
        height: 600,
        alt: "Logo Triple A Coffee Palembang",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
