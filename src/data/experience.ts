/* Work experience. Facts supplied by Christian; nothing is invented. */

export type Experience = {
  period: string;
  duration: string;
  role: string;
  org: string;
  note?: string;
  points: string[];
  stack: string[];
  metrics: { value: string; label: string }[];
};

export const experience: Experience[] = [
  {
    period: "Jul – Sep 2026",
    duration: "Contract",
    role: "Full-Stack Web Developer",
    org: "Notarial Document System, Law Office",
    note: "Confidential client project",
    points: [
      "Contracted to build a records and reporting system for a notary public's office.",
      "Automated document numbering, PDF renaming and generation of the official Notarial Register and Records Book, now managing 600+ notarial records.",
      "Secured confidential records with login authentication, CSRF protection, rate limiting and automated backups.",
      "Set up Git version control and a CI pipeline (GitHub Actions) with automated tests.",
    ],
    stack: ["PHP", "MySQL", "JavaScript", "GitHub Actions"],
    metrics: [
      { value: "4", label: "Security safeguards" },
      { value: "600+", label: "Notarial records managed" },
      { value: "3", label: "Automated document tasks" },
      { value: "CI", label: "Automated tests on every push" },
    ],
  },
  {
    period: "Feb – May 2026",
    duration: "500 hours, remote",
    role: "IT Intern, Team Lead Assistant",
    org: "Knowles Training Institute (Singapore-based)",
    points: [
      "Maintained and tested 50 WordPress websites as part of an 8+ member IT team.",
      "Monitored website performance and search indexing using Google Search Console.",
      "Managed technical documentation and task records to keep IT operations organized.",
    ],
    stack: ["WordPress", "Google Search Console", "Documentation"],
    metrics: [
      { value: "500", label: "Internship hours" },
      { value: "8+", label: "Member IT team" },
    ],
  },
];
