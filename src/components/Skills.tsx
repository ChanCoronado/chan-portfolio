"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { skillCategories } from "@/data/skills";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import SkillIcon from "./SkillIcon";
import styles from "./Skills.module.css";

export default function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active =
    skillCategories.find((c) => c.id === activeId) ?? skillCategories[0];

  /* Arrow keys move between categories, like a standard tab list */
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = skillCategories.length - 1;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight")
      next = index === last ? 0 : index + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft")
      next = index === 0 ? last : index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next < 0) return;
    e.preventDefault();
    setActiveId(skillCategories[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="skills"
      className={styles.section}
      aria-labelledby="skills-title"
    >
      <div className={styles.inner}>
        <SectionHead
          index="03"
          label="Skills"
          title="What I work with"
          id="skills-title"
        />

        <Reveal className={styles.switcher}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Skill categories"
            aria-orientation="vertical"
          >
            {skillCategories.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={c.id === activeId}
                aria-controls={`panel-${c.id}`}
                tabIndex={c.id === activeId ? 0 : -1}
                className={styles.tab}
                onClick={() => setActiveId(c.id)}
                onMouseEnter={(e) => {
                  // Hover previews on devices with a real pointer; taps still use click
                  if (
                    e.nativeEvent instanceof MouseEvent &&
                    window.matchMedia("(hover: hover)").matches
                  ) {
                    setActiveId(c.id);
                  }
                }}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className={styles.tabIndex}>0{i + 1}</span>
                <span className={styles.tabTitle}>{c.title}</span>
                <span className={styles.tabCount} aria-hidden="true">
                  {c.skills.length}
                </span>
              </button>
            ))}
          </div>

          <div
            key={active.id}
            className={styles.panel}
            role="tabpanel"
            id={`panel-${active.id}`}
            aria-labelledby={`tab-${active.id}`}
          >
            <p className={styles.blurb}>{active.blurb}</p>
            <ul className={styles.grid}>
              {active.skills.map((s) => (
                <li key={s.name} className={styles.card}>
                  <span className={styles.icon}>
                    <SkillIcon skill={s} />
                  </span>
                  <span className={styles.name}>{s.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
