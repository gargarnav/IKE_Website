import "./globals.scss";
import { Varela_Round } from "next/font/google";

const varela = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Inspired Karters",
  description: "Static Next.js website using Sass",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={varela.className}>
      <body>{children}</body>
    </html>
  );
}



// /*"use client"; // <-- ADDED THIS DIRECTIVE

// import React, { useEffect, useRef } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import styles from './page.module.scss'; // Import the SCSS module
// import { MdKeyboardDoubleArrowDown } from "react-icons/md";

// const LOGO_SRC = '/images/logo.svg';
// const HERO_SRC = '/images/hero.jpg'; // This will be the full background hero image
// const TEAM_SRC = '/images/team.jpg';
// const ELECTRICAL_SRC = '/images/electrical.jpg';
// const MECHANICAL_SRC = '/images/mechanical.jpg';
// const MANAGEMENT_SRC = '/images/management.jpg';
// const CONTACT_SRC = '/images/contact.jpg';

// // Leader images (placeholders, assuming named as per leader name)
// const ARNAV_LEADER_SRC = '/images/leader1.jpg'; // Assuming these exist
// const SUTIRTH_LEADER_SRC = '/images/leader2.jpg';
// const SARTHAK_LEADER_SRC = '/images/leader3.jpg';



// const Navbar: React.FC = () => {
//     const navbarRef = useRef<HTMLElement>(null);

//     // Navbar background on scroll logic (uses client-side APIs: useEffect, window)
//     useEffect(() => {
//         const handleScroll = () => {
//             if (navbarRef.current) {
//                 if (window.scrollY > 0) { // Changed from 50 to 0 for immediate effect like the design
//                     navbarRef.current.classList.add(styles.scrolled);
//                 } else {
//                     navbarRef.current.classList.remove(styles.scrolled);
//                 }
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         // Set initial state based on scroll position
//         handleScroll();
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     // Smooth scroll and contact button logic (uses client-side APIs: document.querySelector)
//     const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
//         e.preventDefault();
//         const target = document.querySelector(targetId);
//         if (target) {
//             target.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start',
//             });
//         }
//     };

//     return (
//         <nav ref={navbarRef} className={styles.navbar}>
//             <div className={styles.container}>
//                 <div className={styles.logo}>
//                     <Image src={LOGO_SRC} alt="Inspired Karters" className={styles.logoImg} width={40} height={40} priority />
                    
//                 </div>
//                 <ul className={styles.navLinks}>
//                     <li><Link href="#home" onClick={(e) => handleLinkClick(e, '#home')}>Home</Link></li>
//                     <li><Link href="#subsystems" onClick={(e) => handleLinkClick(e, '#subsystems')}>Our Subsystems</Link></li>
//                     <li><Link href="#alumni" onClick={(e) => handleLinkClick(e, '#alumni')}>Our Alumni</Link></li>
//                 </ul>
//                 <button className={styles.contactBtn} onClick={(e) => handleLinkClick(e, `.${styles.contact}`)}>Contact Us</button>
//             </div>
//         </nav>
//     );
// };

// // --- Main Page Component
// const InspiredKartersPage: React.FC = () => {
//     return (
//         <>
//             <Navbar />

//             {/* Hero Section */}
//             <section id="home" className={styles.hero}>
//                 {/* Background image now using Next/Image fill */}
//                 <Image src={HERO_SRC} alt="Electric Formula Student Car" fill style={{ objectFit: 'cover' }} priority />
//                 <div className={styles.heroOverlay}></div>
//                 <div className={styles.heroContent}>
//                     <h1>INSPIRED KARTERS ELECTRIC</h1>
//                     <p className={styles.tagline}>Driving Innovation Sustainably</p>
//                    <Link href="#about" className={styles.scrollHint}>
//   Downshift to learn more <span className={styles.icon}><MdKeyboardDoubleArrowDown /></span>
// </Link>
//                 </div>
//             </section>

//           <section id="about" className={`${styles.section} ${styles.about}`}>
//   <h2>WHO ARE WE?</h2>
//   <div className={styles.aboutContent}>
//     <Image
//       src={TEAM_SRC}
//       alt="Team"
//       className={styles.aboutImg}
//       width={550}
//       height={350}
//       style={{ objectFit: 'cover' }}
//     />
//     <div className={styles.aboutText}>
//       <p>
//         In 2010, a passion-driven cadre rose from the sands of Pilani,
//         handicapped by the location even before inception, the team paid no
//         heed to the obstacles at hand as they began their journey in the realm
//         of race-car–engineering. This is how we started.
//       </p>
//       <p>
//         <strong>Inspired Karters</strong> is BITS Pilani&apos;s Formula Student
//         Team and over the last decade, we have made several vehicles that have
//         led to national as well as international prowess.
//       </p>
//     </div>
//   </div>
// </section>


//    <section className={styles.achievements}>
//   <h2>PAST ACHIEVEMENTS</h2>
//   <div className={styles.achievementsGrid}>
//     <div className={styles.achievementCard}>
//       <p className={styles.achievementTitle}>
//         Formula Student Italy <br /> Design Category - 2014
//       </p>
//       <p className={styles.achievementRank}>1st</p>
//     </div>

//     <div className={styles.achievementCard}>
//       <p className={styles.achievementTitle}>
//         FSEV Concept Challenge <br /> India 2019 - FMEA Report
//       </p>
//       <p className={styles.achievementRank}>1st</p>
//     </div>

//     <div className={styles.achievementCard}>
//       <p className={styles.achievementTitle}>
//         FSEV Concept Challenge <br /> India 2019 - National Rank
//       </p>
//       <p className={styles.achievementRank}>2nd</p>
//     </div>

//     <div className={styles.achievementCard}>
//       <p className={styles.achievementTitle}>
//         FSEV Concept Challenge <br /> India 2020 - National Rank
//       </p>
//       <p className={styles.achievementRank}>1st</p>
//     </div>

//     <div className={styles.achievementCard}>
//       <p className={styles.achievementTitle}>
//         Formula Bharat 2023 <br /> Business Plan Presentation
//       </p>
//       <p className={styles.achievementRank}>2nd</p>
//     </div>

//     <div className={styles.achievementCard}>
//       <p className={styles.achievementTitle}>
//         FSEV Concept Challenge <br /> India 2021 - National Rank
//       </p>
//       <p className={styles.achievementRank}>3rd</p>
//     </div>
//   </div>
// </section>


//             {/* Team Leaders Section */}
// <section id="alumni" className={styles.leaders}>
//   <h2>OUR TEAM LEADERS</h2>
//   <div className={styles.leadersGrid}>
//     <div className={styles.leaderCard}>
//       <Image
//         src={ARNAV_LEADER_SRC}
//         alt="Arnav Geet Verma"
//         className={styles.leaderImg}
//         width={220}
//         height={240}
//       />
//       <h3>Arnav Geet Verma</h3>
//       <p className={styles.leaderRole}>Team Captain</p>
//     </div>

//     <div className={styles.leaderCard}>
//       <Image
//         src={SUTIRTH_LEADER_SRC}
//         alt="Sutirth Rath"
//         className={styles.leaderImg}
//         width={220}
//         height={240}
//       />
//       <h3>Sutirth Rath</h3>
//       <p className={styles.leaderRole}>Team Manager</p>
//     </div>

//     <div className={styles.leaderCard}>
//       <Image
//         src={SARTHAK_LEADER_SRC}
//         alt="Sarthak Gupta"
//         className={styles.leaderImg}
//         width={220}
//         height={240}
//       />
//       <h3>Sarthak Gupta</h3>
//       <p className={styles.leaderRole}>Team Vice-Captain</p>
//     </div>
//   </div>
// </section>



//             {/* Operation Divisions Section */}
//             <section id="subsystems" className={`${styles.section} ${styles.divisions}`}>
//                 <h2>OUR OPERATION DIVISIONS</h2>
//                 <div className={styles.divisionsContainer}>
//                     <div className={styles.division}>
//                         <Image src={ELECTRICAL_SRC} alt="Electrical Subsystem" className={styles.divisionImg} width={550} height={300} style={{ objectFit: 'cover' }} />
//                         <p className={styles.divisionText}>The <span className={styles.accentText}>Electrical Subsystem</span> is the team&apos;s backbone, providing the power and control necessary for peak on-track performance. Their expertise in power electronics, embedded systems, and control systems enables them to develop high-performance battery management systems and intricate motor control algorithms.</p>
//                     </div>
//                     <div className={`${styles.division} ${styles.reverse}`}>
//                         <Image src={MECHANICAL_SRC} alt="Mechanical Subsystem" className={styles.divisionImg} width={550} height={300} style={{ objectFit: 'cover' }} />
//                         <p className={styles.divisionText}>The <span className={styles.accentText}>Mechanical Subsystem</span> plays a pivotal role in designing and fabricating the vehicle&apos;s mechanical components. From optimizing suspension geometry to enhancing aerodynamic efficiency, every aspect of the design is meticulously crafted to ensure peak performance on the track.</p>
//                     </div>
//                     <div className={styles.division}>
//                         <Image src={MANAGEMENT_SRC} alt="Management Subsystem" className={styles.divisionImg} width={550} height={300} style={{ objectFit: 'cover' }} />
//                         <p className={styles.divisionText}>The <span className={styles.accentText}>Management Subsystem</span> ensures smooth coordination and effective execution of all team activities. The management subsystem oversees budgeting, sponsorship acquisition, logistics, and collaboration between different subsystems, enabling seamless integration of mechanical and electrical components.</p>
//                     </div>
//                 </div>
//             </section>

//             {/* Contact Section */}
// <section className={`${styles.section} ${styles.contact}`}>
//   <h2>CONTACT US</h2>
//   <div className={styles.contactContent}>
//     <Image
//       src={CONTACT_SRC}
//       alt="Contact Team"
//       className={styles.contactImg}
//       width={500}
//       height={300}
//       style={{ objectFit: "cover" }}
//     />
//     <div className={styles.contactInfo}>
//       <div className={styles.contactItem}>
//         <Image
//           src="/mail.svg"
//           alt="Email Icon"
//           className={styles.contactIcon}
//           width={22}
//           height={22}
//         />
//         <p>sutirthrath@gmail.com</p>
//       </div>
//       <div className={styles.contactItem}>
//         <Image
//           src="/phone.svg"
//           alt="Phone Icon"
//           className={styles.contactIcon}
//           width={22}
//           height={22}
//         />
//         <p>+91 94384 44888</p>
//       </div>
//       <div className={styles.contactItem}>
//         <Image
//           src="/location.svg"
//           alt="Location Icon"
//           className={styles.contactIcon}
//           width={22}
//           height={22}
//         />
//         <p>
//           BITS Pilani, Vidya Vihar
//           <br />
//           Pilani, Rajasthan – 333031
//         </p>
//       </div>
//     </div>
//   </div>
// </section>
//         </>
//     );
// }
// export default InspiredKartersPage;