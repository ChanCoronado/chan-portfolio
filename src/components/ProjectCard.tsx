import Image from "next/image";
import Link from "next/link";
import type { ProjectCardData } from "@/data/projects";
import styles from "./ProjectCard.module.css";

type Props = { project: ProjectCardData; priority?: boolean };

/* A screenshot in a laptop frame with the name, stack and link beneath */
export default function ProjectCard({ project: p, priority = false }: Props) {
  const inner = (
    <>
      <span className={styles.shot}>
        <span className={styles.laptop}>
          {p.image ? (
            <Image
              src={p.image}
              alt=""
              width={800}
              height={500}
              sizes="(min-width: 1100px) 24rem, (min-width: 640px) 45vw, 92vw"
              quality={90}
              priority={priority}
            />
          ) : (
            <span className={styles.blank}>Confidential</span>
          )}
        </span>
      </span>
      <span className={styles.body}>
        <span className={styles.kind}>
          {p.number} / {p.kind}
        </span>
        <span className={styles.name}>{p.title}</span>
        <span className={styles.stack}>{p.stack.join(" · ")}</span>
        {p.note && <span className={styles.note}>{p.note}</span>}
        <span className={styles.cta}>
          {p.cta} <span aria-hidden="true">{p.external ? "↗" : "→"}</span>
        </span>
      </span>
    </>
  );

  const cls = styles.card;
  return p.external ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={p.href} className={cls}>
      {inner}
    </Link>
  );
}
