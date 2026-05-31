"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const KartCanvas = dynamic(() => import("./components/KartCanvas"), { ssr: false });

// ── content ───────────────────────────────────────────────────────────────────

const achievements = [
  { title: "Formula Student Italy 2014", category: "Design Category", rank: "1st" },
  { title: "FSEV Concept Challenge 2019", category: "FMEA Report", rank: "1st" },
  { title: "FSEV Concept Challenge 2019", category: "National Rank", rank: "2nd" },
  { title: "FSEV Concept Challenge 2020", category: "National Rank", rank: "1st" },
  { title: "Formula Bharat 2023", category: "Business Plan Presentation", rank: "2nd" },
  { title: "FSEV Concept Challenge 2021", category: "National Rank", rank: "3rd" },
];

const subsystems = [
  {
    name: "Electrical Subsystem",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    desc: "The Electrical Subsystem is the team's backbone, providing the power and control necessary for peak on-track performance. Their expertise in power electronics, embedded systems, and control systems enables them to develop high-performance battery management systems and intricate motor control algorithms.",
  },
  {
    name: "Mechanical Subsystem",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    desc: "The Mechanical Subsystem plays a pivotal role in designing and fabricating the vehicle's mechanical components. From optimizing suspension geometry to enhancing aerodynamic efficiency, every aspect of the design is meticulously crafted to ensure peak performance on the track.",
  },
  {
    name: "Management Subsystem",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    desc: "The Management Subsystem ensures smooth coordination and effective execution of all team activities. The management subsystem oversees budgeting, sponsorship acquisition, logistics, and collaboration between different subsystems, enabling seamless integration of mechanical and electrical components.",
  },
];

const teamMembers = [
  { name: "Mohnish Oswal", role: "Captain" },
  { name: "Punya G Nagpal", role: "Vice Captain" },
  { name: "Eesha Santosh Deshpande", role: "Team Manager" },
  { name: "Tanush Agarwal", role: "Elec Lead, PCB" },
  { name: "Saksham Bhatnagar", role: "Elec Lead, Motor" },
  { name: "Anupam Sahai", role: "Mech Lead, Braking" },
  { name: "Madhur Nk", role: "Mech Lead, Vehicle Dynamics" },
  { name: "Aarnav Piparsania", role: "Steering" },
  { name: "Malhar Patwardhan", role: "Aero" },
  { name: "Gourav Jhanwar", role: "Chassis & Powertrain" },
  { name: "Dhwani Bandi", role: "RnD" },
  { name: "Aarav Gupta", role: "LV" },
  { name: "Ishan Chine", role: "Operations" },
  { name: "Pratham Jain", role: "Logistics" },
  { name: "Arsh Surana", role: "Joint Accumulator Lead" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "ACHIEVEMENTS", href: "#achievements" },
    { label: "SUBSYSTEMS", href: "#subsystems" },
    { label: "TEAM", href: "#team" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0a]/95 border-b border-white/10 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link href="#home" onClick={(e) => scrollTo(e, "#home")} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#e63946] flex items-center justify-center font-bold text-white text-sm">
            IKE
          </div>
          <span className="text-white font-medium tracking-wide">Inspired Karters</span>
        </Link>

        <ul className="hidden md:flex gap-10 list-none">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                className="text-[#a0a0b0] text-xs tracking-[0.15em] font-medium hover:text-white transition-colors duration-200"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden flex flex-col justify-between w-6 h-4"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-[2px] bg-white transition-all ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-[2px] bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] bg-white transition-all ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0a]/98 border-t border-white/10 flex flex-col items-center gap-6 py-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={(e) => scrollTo(e, l.href)}
              className="text-white text-sm tracking-[0.15em] hover:text-[#e63946] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(100,10,10,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-20">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[2px] bg-[#e63946]" />
            <span className="text-[#a0a0b0] text-xs tracking-[0.25em] uppercase">
              BITS Pilani · Formula Student EV
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl xl:text-8xl font-black uppercase leading-none tracking-tight mb-6">
            <span className="text-white block">INSPIRED</span>
            <span className="text-white block">KARTERS</span>
            <span className="text-[#e63946] block">ELECTRIC</span>
          </h1>

          <p className="text-[#a0a0b0] text-lg mb-10 tracking-wide">
            Driving Innovation <span className="text-[#e63946]">Sustainably</span>
          </p>

          <Link
            href="#about"
            onClick={(e) => scrollTo(e, "#about")}
            className="inline-flex items-center gap-3 text-white text-sm tracking-[0.2em] uppercase border border-white/20 px-6 py-3 hover:border-[#e63946] hover:text-[#e63946] transition-all duration-300"
          >
            EXPLORE
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Right — 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative h-[500px] border border-white/10 bg-[#0f0f0f] overflow-hidden"
        >
          <KartCanvas />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[#a0a0b0] text-[10px] tracking-[0.3em] uppercase">SCROLL</span>
        <svg className="w-4 h-4 text-[#e63946] animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-[#e63946]" />
            <span className="text-[#a0a0b0] text-xs tracking-[0.25em] uppercase">ABOUT US</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black uppercase text-white mb-8 leading-none">
            WHO ARE WE?
          </h2>
          <p className="text-[#a0a0b0] text-base leading-relaxed mb-5">
            In 2010, a passion-driven cadre rose from the sands of Pilani, handicapped by the location even before inception, the team paid no heed to the obstacles at hand as they began their journey in the realm of race-car–engineering. This is how we started.
          </p>
          <p className="text-[#a0a0b0] text-base leading-relaxed">
            <span className="text-white font-medium">Inspired Karters</span> is BITS Pilani&apos;s Formula Student Team and over the last decade, we have made several vehicles that have led to national as well as international prowess.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            { number: "2010", label: "FOUNDED", idx: "01" },
            { number: "6+", label: "PODIUMS", idx: "02" },
            { number: "1st", label: "FS ITALY 2014", idx: "03" },
            { number: "Full EV", label: "EV", idx: "04" },
          ].map((s) => (
            <div
              key={s.idx}
              className="bg-[#111111] border border-white/[0.07] p-8 relative overflow-hidden group hover:border-[#e63946]/30 transition-colors duration-300"
            >
              <div className="absolute bottom-2 right-3 text-6xl font-black text-[#e63946]/10 leading-none select-none group-hover:text-[#e63946]/20 transition-colors duration-300">
                {s.idx}
              </div>
              <p className="text-4xl font-black text-white mb-1">{s.number}</p>
              {s.label && <p className="text-xs text-[#a0a0b0] tracking-[0.2em] uppercase">{s.label}</p>}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Achievements ───────────────────────────────────────────────────────────────
function Achievements() {
  return (
    <section id="achievements" className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-[#e63946]" />
            <span className="text-[#a0a0b0] text-xs tracking-[0.25em] uppercase">TRACK RECORD</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase text-white leading-none">
            ACHIEVEMENTS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#111111] border border-white/[0.07] p-8 relative overflow-hidden group hover:border-[#e63946]/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute -bottom-2 -right-2 text-9xl font-black leading-none select-none opacity-10 group-hover:opacity-20 transition-opacity duration-300 text-[#e63946]">
                {a.rank}
              </div>
              <div className="relative z-10">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-black text-[#e63946]">{a.rank}</span>
                  <span className="text-[#a0a0b0] text-xs tracking-[0.15em] uppercase">PLACE</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{a.title}</h3>
                <p className="text-[#a0a0b0] text-sm">{a.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Subsystems ─────────────────────────────────────────────────────────────────
function Subsystems() {
  return (
    <section id="subsystems" className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[2px] bg-[#e63946]" />
            <span className="text-[#a0a0b0] text-xs tracking-[0.25em] uppercase">ENGINEERING</span>
            <div className="w-8 h-[2px] bg-[#e63946]" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase text-white mb-6 leading-none">
            SUBSYSTEMS
          </h2>
          <p className="text-[#a0a0b0] text-base max-w-xl mx-auto leading-relaxed">
            Our vehicle is built on three core engineering pillars, each pushing the boundaries of electric motorsport technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subsystems.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#111111] border border-white/[0.07] group hover:border-[#e63946]/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="h-52 bg-[#0d0d0d] border-b border-white/[0.07] flex items-center justify-center text-[#e63946]/40 group-hover:text-[#e63946]/70 transition-colors duration-300">
                {s.icon}
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#e63946]">{s.icon}</span>
                  <h3 className="text-white font-bold text-xl">{s.name}</h3>
                </div>
                <p className="text-[#a0a0b0] text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Team ───────────────────────────────────────────────────────────────────────
function Team() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="team" className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-[#e63946]" />
            <span className="text-[#a0a0b0] text-xs tracking-[0.25em] uppercase">OUR PEOPLE</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase text-white mb-4 leading-none">
            THE TEAM
          </h2>
          <p className="text-[#a0a0b0] text-base max-w-lg leading-relaxed">
            A dedicated group of engineering students united by a passion for innovation and electric motorsport.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
          {teamMembers.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex flex-col items-center text-center group cursor-pointer"
              onClick={() => setActive(active === i ? null : i)}
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-3 text-lg font-bold tracking-wide transition-all duration-300
                  ${active === i
                    ? "bg-[#1a0505] border-2 border-[#e63946] text-white"
                    : "bg-[#1a1a1a] border border-white/10 text-[#a0a0b0] group-hover:border-[#e63946]/50 group-hover:text-white"
                  }`}
              >
                {getInitials(m.name)}
              </div>
              <h3 className="text-white text-sm font-medium leading-tight mb-0.5">{m.name}</h3>
              <p className="text-[#e63946] text-xs">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="bg-[#0a0a0a] py-32 px-6 border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-[#e63946]" />
            <span className="text-[#a0a0b0] text-xs tracking-[0.25em] uppercase">GET IN TOUCH</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black uppercase text-white mb-8 leading-none">
            READY TO<br />CO-ENGINEER?
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-white font-bold text-lg">Eesha Santosh Deshpande</p>
              <p className="text-[#a0a0b0] text-sm">Management Lead, Inspired Karters Electric</p>
            </div>
            <a href="tel:+916366670651" className="flex items-center gap-3 text-white hover:text-[#e63946] transition-colors">
              <svg className="w-4 h-4 text-[#e63946]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              +91 63666 70651
            </a>
            <a href="mailto:fs.inspiredkarters@gmail.com" className="flex items-center gap-3 text-[#a0a0b0] hover:text-[#e63946] transition-colors">
              <svg className="w-4 h-4 text-[#e63946]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              fs.inspiredkarters@gmail.com
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[320px] border border-white/[0.07] overflow-hidden"
        >
          <a
            href="https://maps.app.goo.gl/7d1RqPytR4v4b7Ja6"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10 cursor-pointer"
          />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.5905603845694!2d75.58583847545637!3d28.35880887581602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3913d0a23fdb6799%3A0x7e84c26cd0826db9!2sBITS%20Pilani!5e0!3m2!1sen!2sin!4v1708264236478!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0 pointer-events-none grayscale"
          />
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/[0.07] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#e63946] flex items-center justify-center font-bold text-white text-[10px]">
            IKE
          </div>
          <span className="text-[#a0a0b0] text-sm">Inspired Karters Electric</span>
        </div>
        <p className="text-[#555] text-xs tracking-wide">
          © {new Date().getFullYear()} Inspired Karters Electric · BITS Pilani
        </p>
      </div>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function InspiredKartersPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Achievements />
      <Subsystems />
      <Team />
      <Contact />
      <Footer />
    </>
  );
}
