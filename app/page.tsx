"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import teamData from "../team_data.json";

const KartCanvas = dynamic(() => import("./components/KartCanvas"), { ssr: false });

// ── content ──────────────────────────────────────────────────────────────────

const achievements = [
  { title: "Formula Student Italy 2014 – Design Category", rank: "1st" },
  { title: "FSEV Concept Challenge 2019 – FMEA Report", rank: "1st" },
  { title: "FSEV Concept Challenge 2019 – National Rank", rank: "2nd" },
  { title: "FSEV Concept Challenge 2020 – National Rank", rank: "1st" },
  { title: "Formula Bharat 2023 – Business Plan Presentation", rank: "2nd" },
  { title: "FSEV Concept Challenge 2021 – National Rank", rank: "3rd" },
];

const subsystems = [
  {
    name: "Electrical Subsystem",
    img: "/images/electrical.jpg",
    desc: "The Electrical Subsystem is the team's backbone, providing the power and control necessary for peak on-track performance. Their expertise in power electronics, embedded systems, and control systems enables them to develop high-performance battery management systems and intricate motor control algorithms.",
    reverse: false,
  },
  {
    name: "Mechanical Subsystem",
    img: "/images/mechanical.jpg",
    desc: "The Mechanical Subsystem plays a pivotal role in designing and fabricating the vehicle's mechanical components. From optimizing suspension geometry to enhancing aerodynamic efficiency, every aspect of the design is meticulously crafted to ensure peak performance on the track.",
    reverse: true,
  },
  {
    name: "Management Subsystem",
    img: "/images/management.jpg",
    desc: "The Management Subsystem ensures smooth coordination and effective execution of all team activities. The management subsystem oversees budgeting, sponsorship acquisition, logistics, and collaboration between different subsystems, enabling seamless integration of mechanical and electrical components.",
    reverse: false,
  },
];

const stats = [
  { number: "2010", label: "Founded" },
  { number: "6+", label: "Podiums" },
  { number: "1st", label: "FS Italy 2014" },
  { number: "Full EV", label: "" },
];

// build team array from JSON, merging duplicate names
const groupedTeamData = teamData.reduce((acc, curr) => {
  if (!acc[curr.Name]) {
    acc[curr.Name] = { ...curr, POR: [curr.POR].filter(Boolean) };
  } else {
    if (curr.POR && !acc[curr.Name].POR.includes(curr.POR)) {
      acc[curr.Name].POR.push(curr.POR);
    }
  }
  return acc;
}, {} as Record<string, { Name: string; POR: string[] }>);

const teamArray = Object.values(groupedTeamData).map((m) => ({
  src: `/images/${m.Name}.jpeg`,
  name: m.Name,
  role: m.POR.join(", "),
}));

// ── rank colour helper ────────────────────────────────────────────────────────
function rankClass(rank: string, idx: number): string {
  if (rank === "1st") return "from-yellow-200 to-yellow-500";
  if (rank === "2nd") return "from-gray-300 to-gray-500";
  if (rank === "3rd") return "from-orange-300 to-orange-600";
  return "from-white to-gray-400";
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Our Subsystems", href: "#subsystems" },
    { label: "Our Alumni", href: "#alumni" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/98 border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="#home" onClick={(e) => scrollTo(e, "#home")}>
          <Image
            src="/images/logo.svg"
            alt="Inspired Karters"
            width={139}
            height={73}
            priority
            className="w-[120px] h-auto"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-12 list-none">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                className="relative text-white text-[1.05rem] tracking-wide font-normal
                  after:content-[''] after:absolute after:left-0 after:-bottom-1
                  after:w-0 after:h-[2px] after:bg-[#e63946] after:transition-all after:duration-300
                  hover:text-[#e63946] hover:after:w-full transition-colors duration-300"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Contact button */}
        <button
          onClick={(e) => scrollTo(e as unknown as React.MouseEvent, "#contact")}
          className="hidden md:block px-6 py-3 text-sm font-medium uppercase tracking-wider text-white
            bg-gradient-to-r from-[#450121] to-[#a2051a] rounded hover:from-[#36011b] hover:to-[#890517]
            hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
        >
          Contact Us
        </button>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-between w-7 h-5 z-[60]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[3px] bg-white rounded transition-all duration-300 ${
              menuOpen ? "translate-y-[9px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[3px] bg-white rounded transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[3px] bg-white rounded transition-all duration-300 ${
              menuOpen ? "-translate-y-[9px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#0a0a0f]/98 backdrop-blur-md
          flex flex-col items-center justify-center gap-8 transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-[60vh] py-8 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={(e) => scrollTo(e, l.href)}
            className="text-white text-xl hover:text-[#e63946] transition-colors duration-300"
          >
            {l.label}
          </Link>
        ))}
        <button
          onClick={(e) => scrollTo(e as unknown as React.MouseEvent, "#contact")}
          className="px-6 py-3 text-sm font-medium uppercase tracking-wider text-white
            bg-gradient-to-r from-[#450121] to-[#a2051a] rounded"
        >
          Contact Us
        </button>
      </div>
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="home" className="relative h-screen flex items-end justify-start overflow-hidden">
      <KartCanvas />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

      {/* Text */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="relative z-[3] pb-14 pl-8 md:pl-20"
      >
        <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#a0a0b0] mb-3 font-light">
          BITS Pilani · Formula Student EV
        </p>
        <h1 className="text-3xl md:text-6xl font-thin tracking-widest uppercase text-white leading-tight mb-3">
          Inspired Karters Electric
        </h1>
        <p className="text-base md:text-2xl tracking-widest font-normal text-[#e63946] mb-8">
          Driving Innovation Sustainably
        </p>
        <Link
          href="#about"
          onClick={(e) => scrollTo(e, "#about")}
          className="inline-flex items-center gap-2 text-sm tracking-widest uppercase
            bg-gradient-to-r from-[#450121] to-[#a2051a] bg-clip-text text-transparent
            hover:from-gray-200 hover:to-[#e63946] transition-all duration-300
            animate-[floatUpDown_1.5s_ease-in-out_infinite]"
          style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          Downshift to learn more
          <svg className="w-5 h-5 text-[#a2051a] fill-[#a2051a]" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </Link>
      </motion.div>

      <style jsx>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.8, ease: "expo.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 90%", end: "top 30%", scrub: 1.5 },
      }
    );
  }, []);

  return (
    <section id="about" className="bg-[#0a0a0f] py-24 px-6">
      <h2 className="text-center text-4xl font-light tracking-[0.1em] uppercase text-white mb-16">
        Who Are We?
      </h2>

      <div ref={contentRef} className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-14">
        <Image
          src="/images/team.jpg"
          alt="Team"
          width={550}
          height={350}
          className="w-full max-w-[550px] h-auto object-cover shadow-[0_10px_30px_rgba(71,3,3,0.5)]"
        />
        <div className="max-w-xl text-[#f0eeee] text-[1.1rem] leading-relaxed tracking-wide">
          <p className="mb-6">
            In 2010, a passion-driven cadre rose from the sands of Pilani,
            handicapped by the location even before inception, the team paid
            no heed to the obstacles at hand as they began their journey in
            the realm of race-car–engineering. This is how we started.
          </p>
          <p>
            <span className="text-[#e63946] font-medium">Inspired Karters</span> is BITS
            Pilani&apos;s Formula Student Team and over the last decade, we have made several
            vehicles that have led to national as well as international prowess.
          </p>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4 mt-10">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#12121a] border border-white/[0.08] p-4 text-center rounded-sm"
              >
                <p className="text-2xl font-bold text-[#e63946]">{s.number}</p>
                {s.label && <p className="text-xs text-[#a0a0b0] tracking-widest uppercase mt-1">{s.label}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Achievements ──────────────────────────────────────────────────────────────
function Achievements() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll(".achievement-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.1, delay: i * 0.25, ease: "back.out(1.7)",
          scrollTrigger: { trigger: card, start: "top 90%", end: "top 40%", scrub: 1.2 },
        }
      );
    });
  }, []);

  return (
    <section className="bg-[#0a0a0f] py-24 px-6 text-center">
      <h2 className="text-4xl font-light tracking-[0.1em] uppercase text-white mb-14">
        Past Achievements
      </h2>
      <div ref={cardsRef} className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((a, i) => (
          <div
            key={i}
            className="achievement-card bg-[#12121a] p-8 flex flex-col md:flex-row items-center
              justify-between gap-4 hover:-translate-y-1 transition-transform duration-300"
          >
            <p className="text-white text-sm leading-relaxed text-left flex-1">{a.title}</p>
            <p
              className={`font-['Varela_Round',sans-serif] text-4xl font-bold tracking-wide lowercase
                bg-gradient-to-r ${rankClass(a.rank, i)} bg-clip-text text-transparent`}
              style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              {a.rank}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Subsystems ────────────────────────────────────────────────────────────────
function Subsystems() {
  const divsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divsRef.current) return;
    const items = divsRef.current.querySelectorAll(".subsystem-item");
    items.forEach((el, i) => {
      gsap.fromTo(
        el,
        { x: i % 2 === 0 ? -120 : 120, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.8, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%", end: "top 30%", scrub: 1.6 },
        }
      );
    });
  }, []);

  return (
    <section id="subsystems" className="bg-[#0a0a0f] py-24 px-6">
      <h2 className="text-center text-4xl font-light tracking-[0.1em] uppercase text-white mb-20">
        Our Operation Divisions
      </h2>
      <div ref={divsRef} className="max-w-5xl mx-auto flex flex-col gap-20">
        {subsystems.map((s, i) => (
          <div
            key={i}
            className={`subsystem-item group flex flex-col gap-8 items-center
              md:flex-row ${s.reverse ? "md:flex-row-reverse" : ""}
              border border-transparent hover:border-[#e63946]/40 hover:-translate-y-1
              transition-all duration-300 p-4 md:p-0`}
          >
            <Image
              src={s.img}
              alt={s.name}
              width={550}
              height={300}
              className="w-full max-w-[450px] h-[229px] object-cover shadow-[0_10px_30px_rgba(0,0,0,0.5)]
                group-hover:shadow-[0_12px_40px_rgba(230,57,70,0.2)] transition-shadow duration-300"
            />
            <p className="text-white max-w-[550px] text-[1.05rem] leading-relaxed">
              The <span className="text-[#e63946] font-medium">{s.name}</span>{" "}
              {s.desc.replace(/^The [^.]+ /, "")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Team ──────────────────────────────────────────────────────────────────────
function Team() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll(".leader-card");
    cards.forEach((card, i) => {
      const fromX = i % 2 === 0 ? -100 : 100;
      gsap.fromTo(
        card,
        { opacity: 0, x: fromX, scale: 0.9 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1.3, ease: "expo.out", delay: i * 0.1,
          scrollTrigger: { trigger: card, start: "top 90%", end: "top 40%", scrub: 1.2 },
        }
      );
    });
  }, []);

  return (
    <section id="alumni" className="bg-[#0a0a0f] py-20 px-6 text-center">
      <h2 className="text-4xl font-light tracking-[0.1em] uppercase text-white mb-16">
        Our Team &amp; PORs
      </h2>
      <div
        ref={cardsRef}
        className="max-w-5xl mx-auto flex flex-wrap justify-center gap-12 md:gap-16"
      >
        {teamArray.map((member, i) => (
          <motion.div
            key={i}
            className="leader-card flex flex-col items-center w-[150px] md:w-[180px] text-center"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src={member.src}
              alt={member.name}
              width={108}
              height={140}
              className="w-[108px] h-[140px] object-cover mb-3"
            />
            <h3 className="text-white text-[0.95rem] font-medium leading-tight">{member.name}</h3>
            <p className="text-[#e63946] text-[0.85rem] font-medium mt-0.5">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1, scale: 1, ease: "power4.out", duration: 1.5,
        scrollTrigger: { trigger: contentRef.current, start: "top 90%", end: "top 30%", scrub: 1.4 },
      }
    );
  }, []);

  return (
    <section id="contact" className="bg-[#0a0a0f] py-24 px-6">
      <h2 className="text-center text-4xl font-light tracking-[0.1em] uppercase text-white mb-16">
        Contact Us
      </h2>
      <div
        ref={contentRef}
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12"
      >
        {/* Map */}
        <div className="relative w-full max-w-[538px] h-[274px] overflow-hidden rounded-sm">
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
            className="w-full h-full border-0 pointer-events-none"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-3 text-left">
          <h3 className="text-[#e63946] text-xl font-medium uppercase tracking-wide mb-1">
            Ready to Co-Engineer?
          </h3>
          <p className="text-white font-bold text-lg">Eesha Santosh Deshpande</p>
          <p className="text-white font-bold text-lg">Management Lead, Inspired Karters Electric</p>
          <p className="text-white font-bold text-lg">+91 63666 70651</p>
          <p className="text-[#cecece] text-base">fs.inspiredkarters@gmail.com</p>
          <p className="text-[#888] text-base">Inspired Karters Electric</p>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#12121a] border-t border-white/[0.08] py-6 text-center">
      <p className="text-[#a0a0b0] text-sm tracking-wide">
        © {new Date().getFullYear()} Inspired Karters Electric · BITS Pilani
      </p>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function InspiredKartersPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

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
