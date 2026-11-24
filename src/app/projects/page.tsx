import type { Metadata } from "next";
import ProjectsIndex from "@/components/ProjectsIndex";
import SimpleNav from "@/components/SimpleNav";
import { featuredProjects, moreProjects } from "@/data/projects";
import styles from "./all.module.css";

export const metadata: Metadata = {
  title: "All projects | Christian Coronado",
  description:
    "Featured projects and smaller builds by Christian Coronado, Junior Software Engineer and Full-Stack Web Developer.",
};

const WORDS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
];

export default function AllProjects() {
  return (
    <>
      <SimpleNav back={{ href: "/#projects", label: "Home" }} />
      <main id="main" className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.kicker}>Index</p>
          <h1 className={styles.title}>All projects</h1>
          <p className={styles.lead}>
            {WORDS[featuredProjects.length]} featured projects and{" "}
            {WORDS[moreProjects.length].toLowerCase()} smaller builds. The
            featured ones open their own page; the rest open the live project or
            its source.
          </p>

          <ProjectsIndex />
        </div>
      </main>
    </>
  );
}
