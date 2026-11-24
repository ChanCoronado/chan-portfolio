/* About content. Facts supplied by Christian; nothing is invented. */

export const story = [
  'I\'m Christian "Chan" Coronado, a BS Information Technology graduate of the Polytechnic University of the Philippines, Sto. Tomas Campus, Magna Cum Laude, class of 2026.',
  "I enjoy turning ideas into working web applications. I also like troubleshooting hardware, and I hold a TESDA NC II in Computer Systems Servicing.",
];

export const motto = {
  lead: "My honors came from",
  phrase: "sipag at tyaga",
  tail: "steady work, one project at a time.",
};

export const lookingFor =
  "Junior Software Engineer or Full-Stack Web Developer roles, with a team that values learning. Open to any work setup, with a preference for hybrid.";

export const aiUse =
  "I use Claude Code to help write and fix code in my projects. When I want a second opinion or a more detailed explanation, I ask ChatGPT. I use Gemini for reading long documents and understanding images and videos. I check what they give me before I use it, and the decisions are mine.";

export type School = {
  name: string;
  detail: string;
  period: string;
  logo: string;
  badges?: string[];
};

export const schools: School[] = [
  {
    name: "Polytechnic University of the Philippines, Sto. Tomas Campus",
    detail: "BS Information Technology",
    period: "2022 – 2026",
    logo: "/images/schools/pup-logo.webp",
    badges: [
      "Magna Cum Laude",
      "Consistent President's Lister",
      "Iskolar ng Laguna",
      "Iskolar ng Nagcarlan",
    ],
  },
  {
    name: "Upland Integrated National High School",
    detail:
      "Junior High (2016 – 2020), Senior High TVL-ICT with High Honors (2020 – 2022)",
    period: "2016 – 2022",
    logo: "/images/schools/upland-logo.webp",
  },
  {
    name: "Lazaan-Malinao Elementary School",
    detail: "Elementary",
    period: "2010 – 2016",
    logo: "/images/schools/lazaan-malinao-logo.webp",
  },
];

export type Highlight = {
  year: string;
  title: string;
  /* One short line of context. Only add what is true. */
  note?: string;
};

/* Ordered by weight, not by date */
export const highlights: Highlight[] = [
  { year: "2026", title: "Magna Cum Laude, BS Information Technology" },
  {
    year: "Jun 2026",
    title: "3rd Place, Techno Mini-Hackathon, PUPSTC (out of 15 teams)",
  },
  {
    year: "Sep 2026",
    title: "Outstanding Service Award, Central Student Council",
    note: "Served as College Representative, Computer Society, in the Central Student Council (2024 – 2025). Recognized for leadership, dedication and service to the student body.",
  },
  { year: "2022 – 2026", title: "Consistent President's Lister" },
];

export type CertGroup = "technical" | "community" | "academic";

export type Certificate = {
  /* Sort key and short label */
  year: string;
  /* The full date shown under the title */
  when: string;
  title: string;
  issuer: string;
  group: CertGroup;
  image?: string;
};

/* Newest first */
export const certificates: Certificate[] = [
  {
    year: "2026",
    when: "Sep 22, 2026",
    title: "Outstanding Service Award, Central Student Council",
    issuer: "PUP Sto. Tomas Campus",
    group: "community",
    image: "/images/certs/csc-outstanding-service-award.webp",
  },
  {
    year: "2026",
    when: "Aug 19, 2026",
    title: "AI Career Readiness Training",
    issuer: "ASEAN Foundation and LinkedIn",
    group: "technical",
    image: "/images/certs/ai-career-readiness.webp",
  },
  {
    year: "2026",
    when: "Jun 5, 2026",
    title: "Techno Mini-Hackathon, Certificate of Participation",
    issuer: "PUP Sto. Tomas Campus",
    group: "technical",
    image: "/images/certs/techno-hackathon-participation.webp",
  },
  {
    year: "2025",
    when: "Dec 5, 2025",
    title: "AI and Machine Learning seminar",
    issuer: "PUP Sto. Tomas Campus",
    group: "technical",
    image: "/images/certs/ai-ml-seminar.webp",
  },
  {
    year: "2025",
    when: "Nov 2025",
    title: "Introduction to Project Management with ClickUp",
    issuer: "Coursera",
    group: "technical",
    image: "/images/certs/clickup-project-management.webp",
  },
  {
    year: "2025",
    when: "Sep – Dec 2025",
    title: "Salesforce Supported Virtual Internship Program",
    issuer: "SmartBridge",
    group: "technical",
    image: "/images/certs/salesforce-virtual-internship.webp",
  },
  {
    year: "2024",
    when: "Dec 7, 2024",
    title: "Tech Nexus 2024: Empowering Campus Innovators",
    issuer: "Campus DEVCON, University of Batangas - Lipa",
    group: "technical",
    image: "/images/certs/tech-nexus-2024.webp",
  },
  {
    year: "2024",
    when: "Dec 3, 2024",
    title: "PAGLINANG: PUPSTC Student Leaders Executive Training",
    issuer: "PUP Sto. Tomas Campus",
    group: "community",
    image: "/images/certs/paglinang-training.webp",
  },
  {
    year: "2024",
    when: "Nov 22, 2024",
    title: "TechSTART November: Git, Ready, Set, Commit",
    issuer: "DOST-SEI",
    group: "technical",
    image: "/images/certs/techstart-git.webp",
  },
  {
    year: "2023 – 2024",
    when: "2023 – 2024",
    title: "Google Developers Student Clubs member",
    issuer: "PUP Sto. Tomas Campus",
    group: "community",
    image: "/images/certs/gdsc-member.webp",
  },
  {
    year: "2022",
    when: "2022",
    title: "TESDA NC II, Computer Systems Servicing",
    issuer: "TESDA",
    group: "technical",
    image: "/images/certs/tesda-nc2.webp",
  },
  {
    year: "2022",
    when: "2022",
    title: "Senior High School, High Honors (TVL-ICT)",
    issuer: "Upland Integrated National High School",
    group: "academic",
    image: "/images/certs/senior-high-honors.webp",
  },
];
