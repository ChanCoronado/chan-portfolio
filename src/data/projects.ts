/* All project content lives here. To add a project, add an entry.
   Featured projects get a big row and a case study page at /projects/[slug].
   Everything below comes from facts Christian provided; nothing is invented. */

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  kind: string;
  period?: string;
  role?: string;
  summary: string;
  stack: string[];
  highlights?: string[];
  confidential?: boolean;
  /* Optional case study fields. They render only when present. */
  problem?: string;
  challenge?: string;
  result?: string;
  demo?: { label: string; href?: string };
  repo?: string;
  /* Real screenshots. Add files under public/images/projects/<slug>/ and list them here.
     desktop is 1440x900, phone is 390x844. Nothing renders until these exist. */
  screens?: {
    desktop: string;
    /* Only when the desktop shot is not 16:10, e.g. "1600 / 794" */
    desktopRatio?: string;
    phone?: string;
    details?: {
      src: string;
      alt: string;
      caption: string;
      portrait?: boolean;
    }[];
  };
  /* Hover card only: a redacted shot for work whose case study shows no screenshots */
  hoverPreview?: { src: string; ratio: string };
  /* Shows a flow diagram instead of screenshots (for confidential work) */
  flow?: boolean;
};

export const featuredProjects: Project[] = [
  {
    slug: "saisyd-cafe",
    title: "Saisyd Café",
    subtitle: "QR Code POS & Inventory Management System",
    kind: "Capstone",
    period: "Jun 2025 – Jan 2026",
    role: "Full-Stack Developer & QA",
    summary:
      "QR code menu ordering, real-time order tracking and GCash payment integration for an operating café. Includes inventory that deducts ingredients automatically, with low-stock and expiration alerts, plus sales reports for admins.",
    stack: ["PHP", "JavaScript", "CSS", "Bootstrap", "HTML", "MySQL"],
    highlights: [
      "Led the build of the system in a 6-member team, and handled QA testing.",
      "Rated “Strongly Agree” on all 9 ISO/IEC 25010 criteria by 50 respondents, and successfully defended.",
    ],
    problem:
      "The Suplang branch relied on manual ordering, which led to long queues, order inaccuracies, service delays and inefficient inventory monitoring.",
    screens: {
      desktop: "/images/projects/saisyd-cafe/desktop-landing.webp",
      desktopRatio: "1600 / 794",
      phone: "/images/projects/saisyd-cafe/phone-menu.webp",
      details: [
        {
          src: "/images/projects/saisyd-cafe/admin-pos-full.webp",
          alt: "The admin point of sale screen with menu categories, items and a running receipt",
          caption:
            "Admin POS: categories, sugar and ice levels, receipt and change",
        },
        {
          src: "/images/projects/saisyd-cafe/admin-inventory.webp",
          alt: "The inventory management screen with stock counts, search, filters and an item table",
          caption: "Inventory management: stock levels and expiration dates",
        },
      ],
    },
    repo: "https://github.com/GlowBoss/SAISYD-PHP",
    demo: { label: "Live site no longer hosted" },
  },
  {
    slug: "notarial-document-system",
    title: "Notarial Document System",
    subtitle: "Records and reporting for a notary public's office",
    kind: "Contract",
    period: "Jul – Sep 2026",
    role: "Full-Stack Web Developer",
    summary:
      "Contracted by a law office to build a records and reporting system. Automates document numbering, PDF renaming and generation of the official Notarial Register and Records Book.",
    stack: ["PHP", "MySQL", "JavaScript", "GitHub Actions"],
    highlights: [
      "Secured confidential records with login authentication, CSRF protection, rate limiting and automated backups.",
      "Set up Git version control and a CI pipeline (GitHub Actions) with automated tests.",
    ],
    confidential: true,
    flow: true,
    hoverPreview: {
      src: "/images/projects/notarial-document-system/dashboard-preview.webp",
      ratio: "1600 / 787",
    },
    demo: { label: "Confidential client project" },
  },
  {
    slug: "the-fourth-lens",
    title: "The Fourth Lens",
    subtitle: "Media and Information Literacy Learning Website",
    kind: "Freelance",
    role: "Web Developer",
    summary:
      "A learning website for Grade 12 Media and Information Literacy students, with 14 lessons, quizzes, a glossary and a final assessment. Refined in content and design based on client feedback.",
    problem:
      "Students had to go through books and PDF files one by one just to review a lesson or check what they had learned. That was slow, and hard to come back to later.",
    highlights: [
      "Built the website around the client's 14 lessons, so students can read, review and revisit each one in one place, at their own pace.",
      "Added a quiz for every lesson and a final assessment, so students can check their understanding right away.",
      "Added a searchable glossary, a teacher's guide and a printable certificate of completion.",
      "Kept it simple to use: no account or login, and quiz scores stay on the student's own device.",
      "Revised the content and design based on the client's feedback.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    screens: {
      desktop: "/images/projects/the-fourth-lens/desktop-wide.webp",
      desktopRatio: "2400 / 1200",
      phone: "/images/projects/the-fourth-lens/phone-home.webp",
    },
    demo: { label: "Live site", href: "https://fourth-lens.vercel.app/" },
  },
];

export type SmallProject = {
  name: string;
  kind: string;
  stack: string[];
  href: string;
  cta: string;
  /* 16:10 screenshot under public/images/projects/more/ */
  image: string;
  /* One short line shown on the card, e.g. a disclaimer */
  note?: string;
  /* Filter on /projects. Defaults to coursework when the kind says so, else personal */
  group?: "personal" | "coursework";
};

/* Smaller builds. Links point to the current portfolio until these move. */
export const moreProjects: SmallProject[] = [
  {
    name: "Chan's Typing Test",
    kind: "Personal project",
    stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    href: "/projects/001/index.html",
    cta: "Live demo",
    image: "/images/projects/more/typing-test.webp",
  },
  {
    name: "Student Life Organizer",
    kind: "Personal project",
    stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "LocalStorage"],
    href: "/projects/002/index.html",
    cta: "Live demo",
    image: "/images/projects/more/student-life-organizer.webp",
  },
  {
    name: "NEONBREAK",
    kind: "Personal project",
    stack: ["HTML5 Canvas", "CSS3", "JavaScript", "Web Audio API"],
    href: "/projects/003/index.html",
    cta: "Play it",
    image: "/images/projects/more/neonbreak.webp",
  },
  {
    name: "Academic Archive",
    kind: "College coursework",
    stack: ["HTML", "CSS", "JavaScript"],
    href: "https://chancoronado.github.io/",
    cta: "Visit",
    image: "/images/projects/more/academic-archive.webp",
  },
  {
    name: "Pikachu Adventures Mini Games",
    kind: "Group project",
    stack: ["Java", "Java Swing"],
    href: "https://github.com/mainnely/Pikachu-Adventures-Mini-Games",
    cta: "Source",
    image: "/images/projects/more/pikachu-adventures.webp",
    note: "Fan-made student project. I worked on one of the mini-games.",
    group: "coursework",
  },
];

export const getFeatured = (slug: string) =>
  featuredProjects.find((p) => p.slug === slug);

export type ProjectGroup = "featured" | "personal" | "coursework";

/* One flat list for the card views: featured projects first, then the smaller builds */
export type ProjectCardData = {
  key: string;
  number: string;
  title: string;
  kind: string;
  stack: string[];
  href: string;
  external: boolean;
  cta: string;
  image?: string;
  note?: string;
  group: ProjectGroup;
};

export const projectCards: ProjectCardData[] = [
  ...featuredProjects.map((p) => ({
    key: p.slug,
    title: p.title,
    kind: p.kind,
    stack: p.stack,
    href: `/projects/${p.slug}`,
    external: false,
    cta: "View project",
    image: p.screens?.desktop ?? p.hoverPreview?.src,
    group: "featured" as ProjectGroup,
  })),
  ...moreProjects.map((p) => ({
    key: p.name,
    title: p.name,
    kind: p.kind,
    stack: p.stack,
    href: p.href,
    external: true,
    cta: p.cta,
    image: p.image,
    note: p.note,
    group: (p.group ??
      (p.kind.toLowerCase().includes("coursework")
        ? "coursework"
        : "personal")) as ProjectGroup,
  })),
].map((c, i) => ({ ...c, number: String(i + 1).padStart(2, "0") }));
