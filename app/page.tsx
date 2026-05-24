"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./page.module.scss";

import teamData from "../team_data.json";

// Image paths
const LOGO_SRC = "/images/logo.svg";
const HERO_SRC = "/images/hero.jpg";
const TEAM_SRC = "/images/team.jpg";
const ELECTRICAL_SRC = "/images/electrical.jpg";
const MECHANICAL_SRC = "/images/mechanical.jpg";
const MANAGEMENT_SRC = "/images/management.jpg";
const CONTACT_SRC = "/images/contact.jpg";

// Group the team members by Name and combine their PORs
const groupedTeamData = teamData.reduce((acc, curr) => {
  if (!acc[curr.Name]) {
    acc[curr.Name] = { ...curr, POR: [curr.POR].filter(Boolean) };
  } else {
    if (curr.POR && !acc[curr.Name].POR.includes(curr.POR)) {
      acc[curr.Name].POR.push(curr.POR);
    }
  }
  return acc;
}, {} as Record<string, any>);

const teamArray = Object.values(groupedTeamData).map(member => ({
  src: `/images/${member.Name}.jpeg`,
  name: member.Name,
  role: member.POR.join(", ")
}));

const Navbar: React.FC = () => {
  const navbarRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        if (window.scrollY > 0) {
          navbarRef.current.classList.add(styles.scrolled);
        } else {
          navbarRef.current.classList.remove(styles.scrolled);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setMenuOpen(false);
  };

  return (
    <nav ref={navbarRef} className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
       <div className={styles.logo}>
  <Link href="#home" onClick={(e) => handleLinkClick(e, "#home")}>
    <Image
      src={LOGO_SRC}
      alt="Inspired Karters"
      className={styles.logoImg}
      width={40}
      height={40}
      priority
    />
  </Link>
</div>


        {/* Hamburger */}
        <div
          className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav Links */}
        <ul
          className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <Link href="#home" onClick={(e) => handleLinkClick(e, "#home")}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#subsystems"
              onClick={(e) => handleLinkClick(e, "#subsystems")}
            >
              Our Subsystems
            </Link>
          </li>
          <li>
            <Link href="#alumni" onClick={(e) => handleLinkClick(e, "#alumni")}>
              Our Alumni
            </Link>
          </li>
          
          <li className={styles.mobileContact}>
            <button onClick={(e) => handleLinkClick(e, "#contact")}>
              Contact Us
            </button>
          </li>
        </ul>

      
        <button
          className={styles.contactBtn}
          onClick={(e) => handleLinkClick(e, "#contact")}
        >
          Contact Us
        </button>
      </div>
    </nav>
  );
};


const InspiredKartersPage: React.FC = () => {
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  if (window.innerWidth > 768) {
    const ctx = gsap.context(() => {
      // HERO TEXT
      gsap.fromTo(
        `.${styles.heroContent}`,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          delay: 0.3,
        }
      );

      // ABOUT SECTION
      gsap.fromTo(
        `.${styles.aboutContent}`,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "expo.out",
          duration: 1.8,
          scrollTrigger: {
            trigger: `.${styles.aboutContent}`,
            start: "top 90%",
            end: "top 30%",
            scrub: 1.5, 
          },
        }
      );

// ACHIEVEMENTS
gsap.utils.toArray(`.${styles.achievementCard}`).forEach((card: any, i) => {
  gsap.fromTo(
    card,
    { opacity: 0, y: 50, scale: 0.9 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.1,
      delay: i * 0.25,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        end: "top 40%",
        scrub: 1.2,
      },
    }
  );
});

      // LEADERS
gsap.utils.toArray(`.${styles.leaderCard}`).forEach((card: any, i) => {
  const fromX = i % 2 === 0 ? -100 : 100; // alternate directions
  gsap.fromTo(
    card,
    { opacity: 0, x: fromX, scale: 0.9 },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.3,
      ease: "expo.out",
      delay: i * 0.1,
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        end: "top 40%",
        scrub: 1.2,
      },
    }
  );
});

      // DIVISIONS
      gsap.utils.toArray(`.${styles.division}`).forEach((div: any, i) => {
        gsap.fromTo(
          div,
          { x: i % 2 === 0 ? -120 : 120, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: div,
              start: "top 90%",
              end: "top 30%",
              scrub: 1.6,
            },
          }
        );
      });

      // CONTACT
    gsap.fromTo(
  `.${styles.contactContent}`,
  { opacity: 0, scale: 0.9 },
  {
    opacity: 1,
    scale: 1,
    ease: "power4.out",
    duration: 1.5,
    scrollTrigger: {
      trigger: `.${styles.contactContent}`,
      start: "top 90%",
      end: "top 30%",
      scrub: 1.4,
    },
  }
);
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    window.addEventListener("orientationchange", refresh);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", refresh);
      window.removeEventListener("orientationchange", refresh);
    };
  }
}, []);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section id="home" className={styles.hero}>
        <Image
          src={HERO_SRC}
          alt="Electric Formula Student Car"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>INSPIRED KARTERS ELECTRIC</h1>
          <p className={styles.tagline}>Driving Innovation Sustainably</p>
          <Link href="#about" className={styles.scrollHint}>
            Downshift to learn more{" "}
            <span className={styles.icon}>
              <MdKeyboardDoubleArrowDown />
            </span>
          </Link>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={`${styles.section} ${styles.about}`}>
        <h2>WHO ARE WE?</h2>
        <div className={styles.aboutContent}>
          <Image
            src={TEAM_SRC}
            alt="Team"
            className={styles.aboutImg}
            width={550}
            height={350}
            style={{ objectFit: "cover" }}
          />
          <div className={styles.aboutText}>
            <p>
              In 2010, a passion-driven cadre rose from the sands of Pilani,
              handicapped by the location even before inception, the team paid
              no heed to the obstacles at hand as they began their journey in
              the realm of race-car–engineering. This is how we started.
            </p>
            <p>
              <strong>Inspired Karters</strong> is BITS Pilani&apos;s Formula
              Student Team and over the last decade, we have made several
              vehicles that have led to national as well as international
              prowess.
            </p>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className={styles.achievements}>
        <h2>PAST ACHIEVEMENTS</h2>
        <div className={styles.achievementsGrid}>
          {[
            ["Formula Student Italy 2014 – Design Category", "1st"],
            ["FSEV Concept Challenge 2019 – FMEA Report", "1st"],
            ["FSEV Concept Challenge 2019 – National Rank", "2nd"],
            ["FSEV Concept Challenge 2020 – National Rank", "1st"],
            ["Formula Bharat 2023 – Business Plan Presentation", "2nd"],
            ["FSEV Concept Challenge 2021 – National Rank", "3rd"],
          ].map(([title, rank], i) => (
            <div key={i} className={styles.achievementCard}>
              <p className={styles.achievementTitle}>{title}</p>
              <p className={styles.achievementRank}>{rank}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LEADERS / PORs */}
      <section id="alumni" className={styles.leaders}>
        <h2>OUR TEAM & PORs</h2>
        <div className={styles.leadersGrid}>
          {teamArray.map((member, i) => (
            <div key={i} className={styles.leaderCard}>
              <Image
                src={member.src}
                alt={member.name}
                className={styles.leaderImg}
                width={220}
                height={240}
              />
              <h3>{member.name}</h3>
              <p className={styles.leaderRole}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIVISIONS */}
      <section id="subsystems" className={`${styles.section} ${styles.divisions}`}>
        <h2>OUR OPERATION DIVISIONS</h2>
        <div className={styles.divisionsContainer}>
          {[
            [
              ELECTRICAL_SRC,
              "Electrical Subsystem",
              "The Electrical Subsystem is the team's backbone, providing the power and control necessary for peak on-track performance. Their expertise in power electronics, embedded systems, and control systems enables them to develop high-performance battery management systems and intricate motor control algorithms.",
            ],
            [
              MECHANICAL_SRC,
              "Mechanical Subsystem",
              "The Mechanical Subsystem plays a pivotal role in designing and fabricating the vehicle's mechanical components. From optimizing suspension geometry to enhancing aerodynamic efficiency, every aspect of the design is meticulously crafted to ensure peak performance on the track.",
              true,
            ],
            [
              MANAGEMENT_SRC,
              "Management Subsystem",
              "The Management Subsystem ensures smooth coordination and effective execution of all team activities. The management subsystem oversees budgeting, sponsorship acquisition, logistics, and collaboration between different subsystems, enabling seamless integration of mechanical and electrical components.",
            ],
          ].map(([src, name, desc, reverse], i) => (
            <div
              key={i}
              className={`${styles.division} ${reverse ? styles.reverse : ""}`}
            >
              <Image
                src={src as string}
                alt={name as string}
                className={styles.divisionImg}
                width={550}
                height={300}
                style={{ objectFit: "cover" }}
              />
              <p className={styles.divisionText}>
                The <span className={styles.accentText}>{name}</span> {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`${styles.section} ${styles.contact}`}>
        <h2>CONTACT US</h2>
       <div className={styles.contactContent}>
 <div className={styles.mapContainer}>
  <a
    href="https://maps.app.goo.gl/7d1RqPytR4v4b7Ja6"
    target="_blank"
    rel="noopener noreferrer"
    className={styles.mapOverlay}
  ></a>

  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.5905603845694!2d75.58583847545637!3d28.35880887581602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3913d0a23fdb6799%3A0x7e84c26cd0826db9!2sBITS%20Pilani!5e0!3m2!1sen!2sin!4v1708264236478!5m2!1sen!2sin"
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>


          <div className={styles.contactInfo}>
            <h3 style={{ color: "#a2051a", marginTop: 0, marginBottom: "0.5rem", fontSize: "1.4rem", textTransform: "uppercase" }}>
              READY TO CO-ENGINEER?
            </h3>
            <p style={{ fontWeight: "bold", fontSize: "1.15rem", margin: "0.2rem 0", color: "#fff" }}>
              Eesha Santosh Deshpande
            </p>
            <p style={{ fontWeight: "bold", fontSize: "1.15rem", margin: "0.2rem 0", color: "#fff" }}>
              Management Lead, Inspired Karters Electric
            </p>
            <p style={{ fontWeight: "bold", fontSize: "1.15rem", margin: "0.2rem 0", color: "#fff" }}>
              +91 63666 70651
            </p>
            <p style={{ fontSize: "1.15rem", margin: "0.2rem 0", color: "#cecece" }}>
              fs.inspiredkarters@gmail.com
            </p>
            <p style={{ fontSize: "1.15rem", margin: "0.2rem 0", color: "#888" }}>
              Inspired Karters Electric
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default InspiredKartersPage;
