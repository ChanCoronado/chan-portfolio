"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { skillCategories } from "@/data/skills";
import styles from "./Masthead.module.css";

/* Logos drifting up and down the side margins. Only skills that have a real logo file. */
const LOGOS = skillCategories
  .flatMap((c) => c.skills)
  .filter((k) => !k.icon.startsWith("glyph:"));
const RAIL_LEFT = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Bootstrap",
];
const RAIL_RIGHT = [
  "Node.js",
  "Git",
  "GitHub",
  "GitHub Actions",
  "Vercel",
  "Figma",
  "VS Code",
];

/* The same logos as one slow row, for screens too narrow for the side rails */
function LogoStrip() {
  const items = [...RAIL_LEFT, ...RAIL_RIGHT]
    .map((n) => LOGOS.find((k) => k.name === n))
    .filter((k): k is (typeof LOGOS)[number] => Boolean(k));
  const loop = [...items, ...items];
  return (
    <div className={styles.strip} aria-hidden="true">
      <ul className={styles.stripTrack}>
        {loop.map((k, i) => (
          <li key={`${k.name}-${i}`}>
            <Image
              src={k.icon}
              alt=""
              width={40}
              height={40}
              className={
                k.invert
                  ? `${styles.railLogo} ${styles.railInvert}`
                  : styles.railLogo
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function RailColumn({
  side,
  names,
}: {
  side: "left" | "right";
  names: string[];
}) {
  const items = names
    .map((n) => LOGOS.find((k) => k.name === n))
    .filter((k): k is (typeof LOGOS)[number] => Boolean(k));
  // the list is doubled so the loop has no visible seam
  const loop = [...items, ...items];
  return (
    <div
      className={`${styles.rail} ${side === "left" ? styles.railLeft : styles.railRight}`}
      aria-hidden="true"
    >
      <ul className={styles.railTrack}>
        {loop.map((k, i) => (
          <li key={`${k.name}-${i}`}>
            <Image
              src={k.icon}
              alt=""
              width={44}
              height={44}
              className={
                k.invert
                  ? `${styles.railLogo} ${styles.railInvert}`
                  : styles.railLogo
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

const LINKS = [
  { href: "#projects", label: "Projects", icon: "projects" },
  { href: "#experience", label: "Experience", icon: "experience" },
  { href: "#skills", label: "Skills", icon: "skills" },
  { href: "#about", label: "About", icon: "about" },
  { href: "#contact", label: "Contact", icon: "contact" },
] as const;

/* Simple line icons for the phone tab bar */
const ICONS: Record<(typeof LINKS)[number]["icon"], React.ReactNode> = {
  projects: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.6" />
      <rect x="14" y="3" width="7" height="7" rx="1.6" />
      <rect x="3" y="14" width="7" height="7" rx="1.6" />
      <rect x="14" y="14" width="7" height="7" rx="1.6" />
    </>
  ),
  experience: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.2" />
      <path d="M9 7V5.2A1.2 1.2 0 0 1 10.2 4h3.6A1.2 1.2 0 0 1 15 5.2V7M3 13h18" />
    </>
  ),
  skills: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />,
  about: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21c0-3.9 3.4-6.5 7.5-6.5s7.5 2.6 7.5 6.5" />
    </>
  ),
  contact: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.2" />
      <path d="M3.5 7.5L12 13l8.5-5.5" />
    </>
  ),
};

const CV_HREF = "/files/Christian_Coronado_CV.pdf";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export default function Masthead() {
  const navRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  const [active, setActive] = useState("");
  const activeIndex = LINKS.findIndex((l) => l.href === active);

  /* The big name travels to the nav brand while the page scrolls.
     Position comes from the in-flow slot, so it works at any screen size. */
  useEffect(() => {
    const nav = navRef.current;
    const brand = brandRef.current;
    const slot = slotRef.current;
    const name = nameRef.current;
    if (!nav || !brand || !slot || !name) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const raw = clamp(window.scrollY / (vh * 0.5));
      const eased = 1 - Math.pow(1 - raw, 3);

      nav.dataset.solid =
        raw > 0.98 || window.scrollY > vh * 0.6 ? "true" : "false";

      if (reduce) {
        name.style.transform = "";
        name.style.opacity = "1";
        brand.style.opacity = window.scrollY > vh * 0.5 ? "1" : "0";
        return;
      }

      const s = slot.getBoundingClientRect();
      const t = brand.getBoundingClientRect();
      if (!s.width || !t.width) return;

      const scale = 1 + (t.width / s.width - 1) * eased;
      const dx = (t.left + t.width / 2 - (s.left + s.width / 2)) * eased;
      const dy = (t.top + t.height / 2 - (s.top + s.height / 2)) * eased;
      const swap = smooth(0.9, 1, raw);

      name.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`;
      name.style.opacity = String(1 - swap);
      brand.style.opacity = String(swap);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.fonts?.ready.then(update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Highlight the link of the section on screen */
  useEffect(() => {
    const targets = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => Boolean(el),
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((t) => observer.observe(t));

    const onTop = () => {
      if (window.scrollY < window.innerHeight * 0.4) {
        setActive("");
        return;
      }
      // At the very bottom the last section never reaches the middle of the screen
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) setActive("#contact");
    };
    window.addEventListener("scroll", onTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  return (
    <>
      <header ref={navRef} className={styles.nav} data-solid="false">
        <a
          href="#home"
          className={styles.brand}
          aria-label="Christian Coronado, back to top"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt=""
            className={styles.logo}
            width="40"
            height="25"
          />
          <span ref={brandRef} className={styles.brandName}>
            <span>Christian</span> <span>Coronado</span>
          </span>
        </a>

        <nav className={styles.links} aria-label="Main">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "true" : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          className={styles.cv}
          href={CV_HREF}
          target="_blank"
          rel="noopener noreferrer"
        >
          View CV
        </a>
      </header>

      <nav
        className={`${styles.tabbar} app-tabbar`}
        aria-label="Sections"
        data-active={activeIndex >= 0}
        style={{ "--i": Math.max(activeIndex, 0) } as CSSProperties}
      >
        <span className={styles.tabPill} aria-hidden="true" />
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={styles.tab}
            aria-current={active === l.href ? "true" : undefined}
          >
            <svg
              className={styles.tabIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              {ICONS[l.icon]}
            </svg>
            <span>{l.label}</span>
          </a>
        ))}
      </nav>

      <section id="home" className={styles.hero} aria-labelledby="hero-title">
        <RailColumn side="left" names={RAIL_LEFT} />
        <RailColumn side="right" names={RAIL_RIGHT} />
        <div className={styles.heroInner}>
          <div className={styles.metaRow}>
            <span>BSIT &middot; Magna Cum Laude &middot; 2026</span>
            <span className={styles.status}>
              <i aria-hidden="true" /> Available for opportunities
            </span>
          </div>

          <div ref={slotRef} className={styles.slot}>
            <h1 id="hero-title" ref={nameRef} className={styles.name}>
              <span>Christian</span>{" "}
              <span className={styles.accent}>Coronado</span>
            </h1>
          </div>

          <div className={styles.stage}>
            <figure className={styles.cutout}>
              <Image
                src="/images/portrait-barong-cutout.webp"
                alt="Christian Coronado in a barong, smiling"
                width={1000}
                height={1500}
                sizes="(min-width: 900px) 40rem, 86vw"
                priority
              />
            </figure>

            <div className={styles.lower}>
              <p className={styles.roles}>
                Junior Software Engineer <span aria-hidden="true">/</span>{" "}
                Full-Stack Web Developer
              </p>
              <p className={styles.intro}>
                Hi, I&apos;m Chan, a recent BSIT graduate (Magna Cum Laude). I
                enjoy building web applications, and I try to learn something
                new from every project.
              </p>
            </div>

            <div className={styles.actions}>
              <a className={styles.primary} href="#projects">
                View Projects
              </a>
              <a
                className={styles.secondary}
                href={CV_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                View CV
              </a>
            </div>
          </div>
          <LogoStrip />
        </div>
      </section>
    </>
  );
}
