import Image from "next/image";
import Link from "next/link";
import { featuredProjects, moreProjects } from "@/data/projects";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section
      id="projects"
      className={styles.section}
      aria-labelledby="projects-title"
    >
      <div className={styles.inner}>
        <SectionHead
          index="01"
          label="Projects"
          title="Selected work"
          id="projects-title"
        />

        <ol className={styles.list}>
          {featuredProjects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 80}>
              <Link href={`/projects/${p.slug}`} className={styles.row}>
                <span className={styles.index}>0{i + 1}</span>

                <div className={styles.main}>
                  <h3 className={styles.name}>{p.title}</h3>
                  <p className={styles.sub}>{p.subtitle}</p>
                  <p className={styles.summary}>{p.summary}</p>
                </div>

                <dl className={styles.meta}>
                  <div>
                    <dt>Type</dt>
                    <dd>
                      {p.kind}
                      {p.period ? ` · ${p.period}` : ""}
                    </dd>
                  </div>
                  {p.role && (
                    <div>
                      <dt>Role</dt>
                      <dd>{p.role}</dd>
                    </div>
                  )}
                  {p.stack.length > 0 && (
                    <div>
                      <dt>Stack</dt>
                      <dd>{p.stack.join(" · ")}</dd>
                    </div>
                  )}
                </dl>

                {(p.screens || p.hoverPreview) && (
                  <span className={styles.preview} aria-hidden="true">
                    <span className={styles.laptop}>
                      <Image
                        src={p.screens?.desktop ?? p.hoverPreview!.src}
                        alt=""
                        width={720}
                        height={450}
                        sizes="(min-width: 900px) 24rem, 92vw"
                        style={{
                          aspectRatio: p.screens
                            ? p.screens.desktopRatio
                            : p.hoverPreview!.ratio,
                        }}
                      />
                    </span>
                    {p.screens?.phone && (
                      <span className={styles.handset}>
                        <Image
                          src={p.screens.phone}
                          alt=""
                          width={195}
                          height={422}
                          sizes="7rem"
                        />
                      </span>
                    )}
                  </span>
                )}

                <span className={styles.arrow} aria-hidden="true">
                  &#8599;
                </span>
                <span className="visually-hidden">View the project</span>
              </Link>
            </Reveal>
          ))}
          <Reveal as="li" delay={featuredProjects.length * 80}>
            <Link
              href="/projects"
              className={`${styles.row} ${styles.moreRow}`}
            >
              <span className={styles.index}>+{moreProjects.length}</span>

              <div className={styles.main}>
                <h3 className={styles.name}>More projects</h3>
                <p className={styles.sub}>
                  A typing test, a student planner, an arcade game and more
                </p>
                <p className={styles.moreCta}>
                  See all projects <span aria-hidden="true">&rarr;</span>
                </p>
              </div>

              <span className={styles.fan} aria-hidden="true">
                {moreProjects.slice(0, 3).map((m) => (
                  <span key={m.name} className={styles.fanCard}>
                    <Image
                      src={m.image}
                      alt=""
                      width={480}
                      height={300}
                      sizes="12rem"
                      quality={75}
                    />
                  </span>
                ))}
              </span>

              <span className={styles.arrow} aria-hidden="true">
                &#8599;
              </span>
            </Link>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
