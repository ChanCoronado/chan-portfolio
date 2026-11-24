"use client";

import { useState } from "react";
import { projectCards, type ProjectGroup } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectsIndex.module.css";

type Filter = "all" | ProjectGroup;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "featured", label: "Featured" },
  { id: "personal", label: "Personal" },
  { id: "coursework", label: "Coursework" },
];

export default function ProjectsIndex() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown =
    filter === "all"
      ? projectCards
      : projectCards.filter((c) => c.group === filter);

  return (
    <>
      <div className={styles.chips} role="group" aria-label="Filter projects">
        {FILTERS.map((f) => {
          const count =
            f.id === "all"
              ? projectCards.length
              : projectCards.filter((c) => c.group === f.id).length;
          if (count === 0) return null;
          return (
            <button
              key={f.id}
              type="button"
              className={styles.chip}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label} <span aria-hidden="true">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className={styles.grid} aria-live="polite">
        {shown.map((c, i) => (
          <li key={c.key}>
            <ProjectCard project={c} priority={i < 3} />
          </li>
        ))}
      </ul>
    </>
  );
}
