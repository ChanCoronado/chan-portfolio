import Image from "next/image";
import {
  aiUse,
  highlights,
  lookingFor,
  motto,
  schools,
  story,
} from "@/data/about";
import Certificates from "./Certificates";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import styles from "./About.module.css";

export default function About() {
  return (
    <section
      id="about"
      className={styles.section}
      aria-labelledby="about-title"
    >
      <div className={styles.inner}>
        <SectionHead
          index="04"
          label="About"
          title="A bit about me"
          id="about-title"
        />

        <Reveal className={styles.intro}>
          <figure className={styles.portrait}>
            <Image
              src="/images/portrait-graduation.webp"
              alt="Christian Coronado in his graduation gown holding his cap"
              width={1000}
              height={1500}
              sizes="(min-width: 900px) 24rem, 80vw"
            />
            <figcaption>PUP Sto. Tomas Campus, class of 2026</figcaption>
          </figure>

          <div className={styles.story}>
            <p className={styles.lead}>{story[0]}</p>
            <p>{story[1]}</p>
            <p>
              {motto.lead} <em>{motto.phrase}</em>: {motto.tail}
            </p>

            <aside className={styles.looking}>
              <h3>Looking for</h3>
              <p>{lookingFor}</p>
            </aside>

            <aside className={styles.aiNote}>
              <h3>How I work with AI</h3>
              <p>{aiUse}</p>
            </aside>
          </div>
        </Reveal>

        <Reveal className={styles.block}>
          <h3 className={styles.blockTitle}>Education</h3>
          <ul className={styles.schools}>
            {schools.map((s) => (
              <li key={s.name} className={styles.school}>
                <Image
                  src={s.logo}
                  alt={`${s.name} logo`}
                  width={120}
                  height={120}
                  className={styles.logo}
                />
                <div>
                  <p className={styles.period}>{s.period}</p>
                  <h4 className={styles.schoolName}>{s.name}</h4>
                  <p className={styles.detail}>{s.detail}</p>
                  {s.badges && (
                    <ul className={styles.badges}>
                      {s.badges.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className={styles.block}>
          <h3 className={styles.blockTitle}>Highlights</h3>
          <ol className={styles.highlights}>
            {highlights.map((h, i) => (
              <li key={h.title} className={styles.hCard}>
                <span className={styles.num}>0{i + 1}</span>
                <span className={styles.hYear}>{h.year}</span>
                <span className={styles.hTitle}>{h.title}</span>
                {h.note && <span className={styles.hNote}>{h.note}</span>}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className={styles.block}>
          <h3 className={styles.blockTitle}>Certifications and training</h3>
          <Certificates />
        </Reveal>
      </div>
    </section>
  );
}
