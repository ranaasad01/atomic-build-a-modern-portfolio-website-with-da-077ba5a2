"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ExternalLink, Code, Layers, Zap, Star, CheckCircle, Terminal, Globe, Sparkles, ArrowUp } from 'lucide-react';
import { brand } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────

const projects = [
  {
    id: "p1",
    title: "Luminary Design System",
    description:
      "A comprehensive component library built for scale. 120+ accessible components, dark mode first, with full Storybook documentation and automated visual regression testing.",
    tags: ["React", "TypeScript", "Storybook", "Radix UI"],
    image: "https://cdn.prod.website-files.com/5e60642a30fed6e8bad55789/5f374060a5fdcb0681140afc_LDC_meta-image-2.png",
    href: "#projects",
    featured: true,
  },
  {
    id: "p2",
    title: "Orbit Analytics Platform",
    description:
      "Real-time data visualization dashboard processing 2M+ events per day. Built with Next.js, WebSockets, and a custom charting engine for sub-100ms render times.",
    tags: ["Next.js", "WebSockets", "PostgreSQL", "Redis"],
    image: "https://media.licdn.com/dms/image/v2/C4D0BAQGpxO-qmVX71w/company-logo_200_200/company-logo_200_200/0/1631343009150?e=2147483647&v=beta&t=83RkzALMJjbqpSvBJ8YVr9M9rqEaXa2HUVTnwDjd9xI",
    href: "#projects",
    featured: true,
  },
  {
    id: "p3",
    title: "Pulse E-Commerce Engine",
    description:
      "Headless commerce platform powering 40+ storefronts. Custom checkout flows, inventory sync, and a merchant dashboard with live order tracking.",
    tags: ["Next.js", "Stripe", "Sanity", "Vercel"],
    image: "https://www.leahyconsulting.com/wp-content/uploads/2015/05/pulse-ecommerce-logo-white-transparent.png",
    href: "#projects",
    featured: false,
  },
  {
    id: "p4",
    title: "Vanta Auth SDK",
    description:
      "Open-source authentication SDK with OAuth 2.0, magic links, and passkey support. 3k+ GitHub stars, used in production by 200+ teams.",
    tags: ["TypeScript", "OAuth", "WebAuthn", "Node.js"],
    image: "https://cdn.prod.website-files.com/64009032676f24f376f002fc/66424b4811c651d03f0a5eb1_Ingest%20more%20data.webp",
    href: "#projects",
    featured: false,
  },
];

const skills = [
  {
    category: "Frontend",
    icon: Layers,
    color: "from-purple-500 to-violet-600",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    icon: Terminal,
    color: "from-violet-500 to-purple-700",
    items: ["Node.js", "PostgreSQL", "Redis", "GraphQL", "REST APIs"],
  },
  {
    category: "Tooling",
    icon: Code,
    color: "from-purple-600 to-fuchsia-600",
    items: ["Git", "Docker", "Vercel", "AWS", "CI/CD Pipelines"],
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "CTO at Luminary",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Sarah_Chen_%E9%99%88%E6%B7%91%E6%A1%A6_1986_Malaysia_Concert_Live_Photo_Original_%28cropped%29.jpg",
    quote:
      "Alex delivered a design system that transformed how our team ships product. The attention to accessibility and performance was exceptional.",
    stars: 5,
  },
  {
    id: "t2",
    name: "Marcus Webb",
    role: "Founder at Orbit",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/JMarcus_Webb.JPG/960px-JMarcus_Webb.JPG",
    quote:
      "The analytics platform Alex built handles our peak load without breaking a sweat. Clean architecture, great documentation, zero drama.",
    stars: 5,
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "Lead Engineer at Pulse",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    quote:
      "Working with Alex felt like having a senior engineer and a product designer in one. The code quality and UX instincts are rare to find together.",
    stars: 5,
  },
];

const stats = [
  { value: "5+", label: "Years of experience" },
  { value: "40+", label: "Projects shipped" },
  { value: "3k+", label: "GitHub stars" },
  { value: "99%", label: "Client satisfaction" },
];

const services = [
  {
    icon: Globe,
    title: "Full-Stack Web Apps",
    description:
      "End-to-end product development from database schema to polished UI. I own the full stack so nothing falls through the cracks.",
  },
  {
    icon: Layers,
    title: "Design Systems",
    description:
      "Scalable component libraries that keep teams moving fast without sacrificing consistency or accessibility.",
  },
  {
    icon: Zap,
    title: "Performance Audits",
    description:
      "Deep-dive into Core Web Vitals, bundle analysis, and rendering bottlenecks. I find the slow parts and fix them.",
  },
  {
    icon: Sparkles,
    title: "Technical Consulting",
    description:
      "Architecture reviews, tech stack decisions, and code quality improvements for teams that want to level up.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-widest">
      {children}
    </span>
  );
}

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const motionProps = (variants: Variants) =>
    shouldReduceMotion
      ? {}
      : {
          variants,
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, margin: "-80px" },
        };

  return (
    <main className="bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-violet-700/8 rounded-full blur-[80px]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={shouldReduceMotion ? undefined : fadeInUp}>
              <SectionLabel>
                <Sparkles className="w-3 h-3" />I Built AI Powered Applications</SectionLabel>
            </motion.div>

            <motion.h1
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-balance"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              I build things
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #7c3aed 100%)",
                }}
              >
                for the web.
              </span>
            </motion.h1>

            <motion.p
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-lg text-white/55 leading-relaxed max-w-md text-pretty"
            >
              {brand.description} I care about performance, accessibility, and
              the craft of writing code that lasts.
            </motion.p>

            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="flex flex-wrap gap-4 pt-2"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all duration-200 shadow-[0_0_24px_rgba(168,85,247,0.3)] hover:shadow-[0_0_36px_rgba(168,85,247,0.5)]"
              >
                View my work
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-purple-500/40 hover:bg-white/5 text-white/80 hover:text-white font-semibold text-sm transition-all duration-200"
              >
                Get in touch
              </motion.a>
            </motion.div>

            {/* Social row */}
            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="flex items-center gap-4 pt-2"
            >
              {[
                { icon: Github, href: brand.github, label: "GitHub" },
                { icon: Linkedin, href: brand.linkedin, label: "LinkedIn" },
                { icon: Twitter, href: brand.twitter, label: "Twitter" },
                {
                  icon: Mail,
                  href: `mailto:${brand.email}`,
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-lg border border-white/10 hover:border-purple-500/40 flex items-center justify-center text-white/40 hover:text-purple-400 transition-all duration-200 hover:bg-purple-500/10"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: visual card */}
          <motion.div
            variants={shouldReduceMotion ? undefined : slideInRight}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-purple-600/20 rounded-3xl blur-3xl scale-110" />

              {/* Profile card */}
              <div className="relative rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-8 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_24px_64px_-16px_rgba(0,0,0,0.6)]">
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    style={{
                      background:
                        "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
                    }}
                  >
                    {brand.initials}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{brand.name}</p>
                    <p className="text-purple-400 text-xs">{brand.tagline}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-white/40">Open</span>
                  </div>
                </div>

                {/* Code snippet */}
                <div className="rounded-xl bg-black/40 border border-white/5 p-4 font-mono text-xs leading-relaxed mb-6">
                  <div className="flex gap-1.5 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <p className="text-white/30">
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-white/70">developer</span>{" "}
                    <span className="text-white/30">=</span>{" "}
                    <span className="text-white/30">{"{"}</span>
                  </p>
                  <p className="text-white/30 pl-4">
                    <span className="text-violet-300">name</span>
                    <span className="text-white/30">: </span>
                    <span className="text-emerald-400">
                      &quot;{brand.name}&quot;
                    </span>
                    <span className="text-white/30">,</span>
                  </p>
                  <p className="text-white/30 pl-4">
                    <span className="text-violet-300">role</span>
                    <span className="text-white/30">: </span>
                    <span className="text-emerald-400">
                      &quot;{brand.tagline}&quot;
                    </span>
                    <span className="text-white/30">,</span>
                  </p>
                  <p className="text-white/30 pl-4">
                    <span className="text-violet-300">available</span>
                    <span className="text-white/30">: </span>
                    <span className="text-orange-400">true</span>
                  </p>
                  <p className="text-white/30">{"}"}</p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { v: "5+", l: "Years" },
                    { v: "40+", l: "Projects" },
                    { v: "3k+", l: "Stars" },
                  ].map(({ v, l }) => (
                    <div
                      key={l}
                      className="rounded-lg bg-white/[0.03] border border-white/5 p-3 text-center"
                    >
                      <p className="text-purple-400 font-bold text-sm">{v}</p>
                      <p className="text-white/30 text-xs mt-0.5">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/20 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-purple-500/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <motion.div
          variants={shouldReduceMotion ? undefined : staggerContainer}
          {...(shouldReduceMotion
            ? {}
            : {
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true, margin: "-60px" },
              })}
          className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={shouldReduceMotion ? undefined : scaleIn}
              className="flex flex-col items-center text-center gap-1"
            >
              <span
                className="text-4xl font-bold tracking-tight bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #a855f7 0%, #c084fc 100%)",
                }}
              >
                {stat.value}
              </span>
              <span className="text-sm text-white/40">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image side */}
          <motion.div
            variants={shouldReduceMotion ? undefined : slideInLeft}
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true, margin: "-80px" },
                })}
            className="relative"
          >
            <div className="absolute -inset-4 bg-purple-600/10 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden border border-white/8 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_32px_80px_-24px_rgba(0,0,0,0.7)]">
              <img
                src="https://comicvine.gamespot.com/a/uploads/scale_medium/3/31666/869863-mercer.jpg"
                alt="Alex Mercer at work"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
              className="absolute -bottom-5 -right-5 rounded-xl bg-[#141414] border border-white/10 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-white text-xs font-semibold">
                  Currently available
                </p>
                <p className="text-white/40 text-xs">for freelance work</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true, margin: "-80px" },
                })}
            className="flex flex-col gap-6"
          >
            <motion.div variants={shouldReduceMotion ? undefined : fadeInUp}>
              <SectionLabel>About me</SectionLabel>
            </motion.div>

            <motion.h2
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-balance"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Crafting digital products with purpose.
            </motion.h2>

            <motion.p
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-white/55 leading-relaxed text-pretty"
            >
              I&apos;m a full-stack developer with five years of experience
              building products that people actually enjoy using. My background
              spans early-stage startups and scale-ups, which means I know how
              to move fast without accumulating debt that bites you later.
            </motion.p>

            <motion.p
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-white/55 leading-relaxed text-pretty"
            >
              I believe great software is invisible. When the interface gets out
              of the way and the user just accomplishes their goal, that&apos;s
              the win. I obsess over the details that make that happen: load
              times, keyboard navigation, error states, and the hundred small
              decisions that separate good from great.
            </motion.p>

            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="flex flex-wrap gap-3 pt-2"
            >
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "PostgreSQL",
                "Figma",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/8 text-white/60 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section
        id="skills"
        className="py-28 px-6 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true, margin: "-80px" },
                })}
            className="flex flex-col items-center text-center gap-4 mb-16"
          >
            <motion.div variants={shouldReduceMotion ? undefined : fadeInUp}>
              <SectionLabel>Skills</SectionLabel>
            </motion.div>
            <motion.h2
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-4xl md:text-5xl font-bold tracking-tight text-balance"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Tools of the trade.
            </motion.h2>
            <motion.p
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-white/50 max-w-lg text-pretty"
            >
              A curated set of technologies I reach for when building modern web
              products. Depth over breadth.
            </motion.p>
          </motion.div>

          {/* Skill cards — asymmetric bento */}
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true, margin: "-60px" },
                })}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.category}
                  variants={shouldReduceMotion ? undefined : scaleIn}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 flex flex-col gap-5 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:border-purple-500/25 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-[0_0_16px_rgba(168,85,247,0.3)]`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-white text-base">
                      {skill.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/6 text-white/60 text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true, margin: "-80px" },
                })}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          >
            {/* Left: heading */}
            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="flex flex-col gap-5 lg:sticky lg:top-28"
            >
              <SectionLabel>Services</SectionLabel>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-balance"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                What I can do for you.
              </h2>
              <p className="text-white/50 leading-relaxed text-pretty">
                Whether you need a product built from scratch, an existing
                codebase improved, or a team that needs a technical partner, I
                can help.
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_32px_rgba(168,85,247,0.45)]"
              >
                Start a project
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Right: service list */}
            <motion.div
              variants={shouldReduceMotion ? undefined : staggerContainer}
              className="flex flex-col gap-4"
            >
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    variants={shouldReduceMotion ? undefined : fadeInUp}
                    whileHover={{ x: 4 }}
                    className="flex gap-4 p-5 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-purple-500/25 hover:bg-white/[0.04] transition-all duration-300 cursor-default"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm mb-1">
                        {service.title}
                      </h3>
                      <p className="text-white/45 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section
        id="projects"
        className="py-28 px-6 bg-gradient-to-b from-transparent via-purple-950/8 to-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true, margin: "-80px" },
                })}
            className="flex flex-col items-center text-center gap-4 mb-16"
          >
            <motion.div variants={shouldReduceMotion ? undefined : fadeInUp}>
              <SectionLabel>Projects</SectionLabel>
            </motion.div>
            <motion.h2
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-4xl md:text-5xl font-bold tracking-tight text-balance"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Selected work.
            </motion.h2>
            <motion.p
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-white/50 max-w-lg text-pretty"
            >
              A handful of projects I&apos;m proud of. Each one taught me
              something new.
            </motion.p>
          </motion.div>

          {/* Featured projects: large cards */}
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true, margin: "-60px" },
                })}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
          >
            {projects
              .filter((p) => p.featured)
              .map((project) => (
                <motion.div
                  key={project.id}
                  variants={shouldReduceMotion ? undefined : scaleIn}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.06),0_16px_48px_-12px_rgba(0,0,0,0.5)] hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col gap-3">
                    <h3
                      className="font-bold text-white text-xl tracking-tight"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/15 text-purple-400 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <motion.a
                        href={project.href}
                        whileHover={{ x: 3 }}
                        className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200"
                      >
                        View project
                        <ExternalLink className="w-3.5 h-3.5" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>

          {/* Non-featured: smaller horizontal cards */}
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true, margin: "-60px" },
                })}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {projects
              .filter((p) => !p.featured)
              .map((project) => (
                <motion.div
                  key={project.id}
                  variants={shouldReduceMotion ? undefined : fadeInUp}
                  whileHover={{ y: -4, x: 2 }}
                  className="group flex gap-4 p-5 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-purple-500/25 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-white/8">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <h3 className="font-semibold text-white text-sm">
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-xs leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/6 text-white/40 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true, margin: "-80px" },
                })}
            className="flex flex-col items-center text-center gap-4 mb-16"
          >
            <motion.div variants={shouldReduceMotion ? undefined : fadeInUp}>
              <SectionLabel>Testimonials</SectionLabel>
            </motion.div>
            <motion.h2
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-4xl md:text-5xl font-bold tracking-tight text-balance"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              What clients say.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true, margin: "-60px" },
                })}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={shouldReduceMotion ? undefined : scaleIn}
                whileHover={{ y: -5 }}
                className={`rounded-2xl border border-white/8 bg-white/[0.025] p-6 flex flex-col gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:border-purple-500/25 transition-all duration-300 ${
                  i === 1 ? "md:mt-6" : ""
                }`}
              >
                <StarRow count={t.stars} />
                <p className="text-white/60 text-sm leading-relaxed flex-1 text-pretty">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{t.name}</p>
                    <p className="text-white/35 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-28 px-6 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: info */}
            <motion.div
              variants={shouldReduceMotion ? undefined : staggerContainer}
              {...(shouldReduceMotion
                ? {}
                : {
                    initial: "hidden",
                    whileInView: "visible",
                    viewport: { once: true, margin: "-80px" },
                  })}
              className="flex flex-col gap-6"
            >
              <motion.div variants={shouldReduceMotion ? undefined : fadeInUp}>
                <SectionLabel>Contact</SectionLabel>
              </motion.div>
              <motion.h2
                variants={shouldReduceMotion ? undefined : fadeInUp}
                className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-balance"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Let&apos;s build something together.
              </motion.h2>
              <motion.p
                variants={shouldReduceMotion ? undefined : fadeInUp}
                className="text-white/50 leading-relaxed text-pretty"
              >
                Have a project in mind or just want to talk shop? I&apos;m
                always happy to hear from people building interesting things.
                Drop me a message and I&apos;ll get back to you within 24 hours.
              </motion.p>

              <motion.div
                variants={shouldReduceMotion ? undefined : fadeInUp}
                className="flex flex-col gap-3 pt-2"
              >
                <a
                  href={`mailto:${brand.email}`}
                  className="flex items-center gap-3 text-white/60 hover:text-purple-400 transition-colors duration-200 text-sm group"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/15 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors duration-200">
                    <Mail className="w-4 h-4 text-purple-400" />
                  </div>
                  {brand.email}
                </a>
                <a
                  href={brand.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-purple-400 transition-colors duration-200 text-sm group"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/15 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors duration-200">
                    <Github className="w-4 h-4 text-purple-400" />
                  </div>
                  github.com/alexmercer
                </a>
                <a
                  href={brand.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-purple-400 transition-colors duration-200 text-sm group"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/15 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors duration-200">
                    <Linkedin className="w-4 h-4 text-purple-400" />
                  </div>
                  linkedin.com/in/alexmercer
                </a>
              </motion.div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              variants={shouldReduceMotion ? undefined : slideInRight}
              {...(shouldReduceMotion
                ? {}
                : {
                    initial: "hidden",
                    whileInView: "visible",
                    viewport: { once: true, margin: "-80px" },
                  })}
            >
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_24px_64px_-16px_rgba(0,0,0,0.5)]">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-purple-500/15 border border-purple-500/25 flex items-center justify-center">
                      <CheckCircle className="w-7 h-7 text-purple-400" />
                    </div>
                    <h3
                      className="text-xl font-bold text-white"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Message sent!
                    </h3>
                    <p className="text-white/50 text-sm max-w-xs">
                      Thanks for reaching out. I&apos;ll get back to you within
                      24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({ name: "", email: "", message: "" });
                      }}
                      className="mt-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="name"
                        className="text-xs font-semibold text-white/40 uppercase tracking-wider"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, name: e.target.value }))
                        }
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/8 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all duration-200"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="email"
                        className="text-xs font-semibold text-white/40 uppercase tracking-wider"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            email: e.target.value,
                          }))
                        }
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/8 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all duration-200"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="message"
                        className="text-xs font-semibold text-white/40 uppercase tracking-wider"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            message: e.target.value,
                          }))
                        }
                        placeholder="Tell me about your project..."
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/8 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all duration-200 resize-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_32px_rgba(168,85,247,0.45)] flex items-center justify-center gap-2"
                    >
                      Send message
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}