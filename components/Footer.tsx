"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ArrowUp } from 'lucide-react';
import { navLinks, brand } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: brand.github, label: "GitHub" },
    { icon: Linkedin, href: brand.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: brand.twitter, label: "Twitter" },
    { icon: Mail, href: `mailto:${brand.email}`, label: "Email" },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0a]">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
                }}
              >
                {brand.initials}
              </div>
              <span className="font-syne font-bold text-sm text-white/90">
                {brand.name}
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              {brand.description}
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social + contact */}
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
              Connect
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-white/50 hover:text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all duration-200"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
            <a
              href={`mailto:${brand.email}`}
              className="text-sm text-white/50 hover:text-purple-400 transition-colors duration-200"
            >
              {brand.email}
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5"
        >
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} {brand.name}. Crafted with care.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors duration-200 group"
            aria-label="Scroll to top"
          >
            Back to top
            <span className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-200">
              <ArrowUp size={12} />
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
}