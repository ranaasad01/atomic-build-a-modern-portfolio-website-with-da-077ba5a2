import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Mercer — Creative Developer",
  description:
    "Full-stack developer and creative technologist crafting digital experiences that live at the intersection of design and engineering.",
  keywords: ["developer", "portfolio", "full-stack", "creative", "design"],
  authors: [{ name: "Alex Mercer" }],
  openGraph: {
    title: "Alex Mercer — Creative Developer",
    description:
      "Full-stack developer and creative technologist crafting digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-[#0f0f0f] text-white antialiased font-inter">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}