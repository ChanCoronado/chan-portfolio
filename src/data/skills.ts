/* Skills by category. Each one has a logo or icon.
   "usedIn" is not shown on the page; it only feeds the Ask Chan assistant. */

export type Use = { label: string; href?: string };

export type Skill = {
  name: string;
  /* Path to a logo in /public, or "glyph:<name>" for a drawn icon */
  icon: string;
  /* Black logos need flipping on the dark theme */
  invert?: boolean;
  usedIn?: Use[];
};

export type SkillCategory = {
  id: string;
  title: string;
  blurb: string;
  skills: Skill[];
};

const saisyd: Use = { label: "Saisyd Café", href: "/projects/saisyd-cafe" };
const notarial: Use = {
  label: "Notarial Document System",
  href: "/projects/notarial-document-system",
};
const typing: Use = { label: "Chan's Typing Test" };
const organizer: Use = { label: "Student Life Organizer" };
const neonbreak: Use = { label: "NEONBREAK" };
const knowles: Use = { label: "Knowles internship" };
const portfolio: Use = { label: "This portfolio" };
const pikachu: Use = {
  label: "Pikachu Adventures Mini Games (group project)",
  href: "https://github.com/mainnely/Pikachu-Adventures-Mini-Games",
};

const S = "/images/skills";

export const skillCategories: SkillCategory[] = [
  {
    id: "front-end",
    title: "Front-End",
    blurb: "What runs in the browser.",
    skills: [
      {
        name: "HTML",
        icon: `${S}/html.webp`,
        usedIn: [saisyd, typing, organizer, neonbreak, portfolio],
      },
      {
        name: "CSS",
        icon: `${S}/css.webp`,
        usedIn: [saisyd, typing, organizer, neonbreak, portfolio],
      },
      {
        name: "JavaScript",
        icon: `${S}/js.webp`,
        usedIn: [saisyd, notarial, typing, organizer, neonbreak],
      },
      { name: "TypeScript", icon: `${S}/typescript.svg`, usedIn: [portfolio] },
      { name: "React", icon: `${S}/react.svg`, usedIn: [portfolio] },
      {
        name: "Next.js",
        icon: `${S}/nextjs.svg`,
        invert: true,
        usedIn: [portfolio],
      },
      {
        name: "Bootstrap",
        icon: `${S}/bootstrap.webp`,
        usedIn: [saisyd, typing, organizer],
      },
    ],
  },
  {
    id: "back-end",
    title: "Back-End & Programming",
    blurb: "Server logic and languages.",
    skills: [
      { name: "PHP", icon: `${S}/php.webp`, usedIn: [saisyd, notarial] },
      { name: "Node.js", icon: `${S}/nodejs.svg`, usedIn: [portfolio] },
      { name: "Java", icon: `${S}/java.webp`, usedIn: [pikachu] },
      { name: "Python", icon: `${S}/python.webp` },
      { name: "C++", icon: `${S}/cpp.webp` },
      { name: "Claude API", icon: "glyph:sparkle", usedIn: [portfolio] },
    ],
  },
  {
    id: "database",
    title: "Database",
    blurb: "Storing and managing data.",
    skills: [
      { name: "MySQL", icon: `${S}/mysql.webp`, usedIn: [saisyd, notarial] },
      { name: "SQL Server", icon: `${S}/sql-server.webp` },
      { name: "phpMyAdmin", icon: "glyph:database" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    blurb: "How the work gets built and shipped.",
    skills: [
      { name: "Git", icon: `${S}/git.svg`, usedIn: [notarial, portfolio] },
      { name: "GitHub", icon: `${S}/github.svg`, invert: true },
      {
        name: "GitHub Actions",
        icon: `${S}/githubactions.svg`,
        usedIn: [notarial],
      },
      {
        name: "Vercel",
        icon: `${S}/vercel.svg`,
        invert: true,
        usedIn: [portfolio],
      },
      { name: "XAMPP", icon: "glyph:server" },
      { name: "VS Code", icon: `${S}/vscode.svg` },
      { name: "Visual Studio", icon: `${S}/visualstudio.svg` },
      { name: "npm", icon: `${S}/npm.svg`, usedIn: [portfolio] },
      { name: "ESLint", icon: `${S}/eslint.svg`, usedIn: [portfolio] },
    ],
  },
  {
    id: "design",
    title: "Design & Platforms",
    blurb: "Visuals and the sites around the code.",
    skills: [
      { name: "Figma", icon: `${S}/figma.webp` },
      { name: "Canva", icon: `${S}/canva.webp` },
      { name: "Adobe Photoshop", icon: `${S}/photoshop.svg` },
      { name: "WordPress", icon: `${S}/wordpress.svg`, usedIn: [knowles] },
      {
        name: "Google Search Console",
        icon: "glyph:search",
        usedIn: [knowles],
      },
    ],
  },
  {
    id: "it-support",
    title: "IT Support",
    blurb: "TESDA NC II, Computer Systems Servicing.",
    skills: [
      { name: "Hardware Servicing", icon: "glyph:chip" },
      { name: "Networking", icon: "glyph:network" },
      { name: "OS Troubleshooting", icon: "glyph:monitor" },
    ],
  },
];
