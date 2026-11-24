import { experience } from "@/data/experience";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import styles from "./Experience.module.css";

export default function Experience() {
  return (
    <section
      id="experience"
      className={styles.section}
      aria-labelledby="experience-title"
    >
      <div className={styles.inner}>
        <SectionHead
          index="02"
          label="Experience"
          title="Where I've worked"
          id="experience-title"
        />

        <ol className={styles.list}>
          {experience.map((job) => (
            <Reveal as="li" key={job.role + job.period} className={styles.item}>
              <div className={styles.when}>
                <p className={styles.period}>{job.period}</p>
                <p className={styles.duration}>{job.duration}</p>
              </div>

              <div className={styles.body}>
                <h3 className={styles.role}>{job.role}</h3>
                <p className={styles.org}>{job.org}</p>
                {job.note && <p className={styles.note}>{job.note}</p>}
                <ul className={styles.points}>
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <ul className={styles.stack} aria-label="Tools">
                  {job.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>

              <ul className={styles.metrics} aria-label="Key numbers">
                {job.metrics.map((m) => (
                  <li key={m.label}>
                    <CountUp value={m.value} />
                    <span>{m.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
