import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeviceShowcase from "@/components/DeviceShowcase";
import ProcessFlow from "@/components/ProcessFlow";
import SimpleNav from "@/components/SimpleNav";
import { featuredProjects, getFeatured } from "@/data/projects";
import styles from "./case.module.css";

/* Every case study is known ahead of time, so there is nothing to stream.
   Next.js is told this route may wait for its data instead of showing a shell. */
export const instant = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getFeatured(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Christian Coronado`,
    description: project.summary,
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = getFeatured(slug);
  if (!project) notFound();

  const index = featuredProjects.findIndex((p) => p.slug === slug);
  const next = featuredProjects[(index + 1) % featuredProjects.length];

  return (
    <>
      <SimpleNav />
      <main id="main" className={styles.page}>
        <article className={styles.article}>
          <p className={styles.kicker}>
            0{index + 1} / {project.kind}
            {project.period ? ` / ${project.period}` : ""}
          </p>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.subtitle}>{project.subtitle}</p>

          {(project.screens || project.flow) && (
            <div className={styles.visual}>
              {project.screens && <DeviceShowcase project={project} />}
              {project.flow && <ProcessFlow />}
            </div>
          )}

          <div className={styles.grid}>
            <dl className={styles.facts}>
              {project.role && (
                <div>
                  <dt>Role</dt>
                  <dd>{project.role}</dd>
                </div>
              )}
              <div>
                <dt>Type</dt>
                <dd>{project.kind}</dd>
              </div>
              {project.period && (
                <div>
                  <dt>Period</dt>
                  <dd>{project.period}</dd>
                </div>
              )}
              {project.stack.length > 0 && (
                <div>
                  <dt>Stack</dt>
                  <dd>
                    <ul className={styles.stack}>
                      {project.stack.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>

            <div className={styles.story}>
              <section>
                <h2>Overview</h2>
                <p>{project.summary}</p>
              </section>

              {project.problem && (
                <section>
                  <h2>The problem</h2>
                  <p>{project.problem}</p>
                </section>
              )}

              {project.highlights && project.highlights.length > 0 && (
                <section>
                  <h2>What I did</h2>
                  <ul>
                    {project.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </section>
              )}

              {project.challenge && (
                <section>
                  <h2>The hard part</h2>
                  <p>{project.challenge}</p>
                </section>
              )}

              {project.result && (
                <section>
                  <h2>Result</h2>
                  <p>{project.result}</p>
                </section>
              )}

              <section>
                <h2>Links</h2>
                <ul className={styles.links}>
                  {project.demo &&
                    (project.demo.href ? (
                      <li>
                        <a
                          href={project.demo.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.demo.label}{" "}
                          <span aria-hidden="true">&#8599;</span>
                        </a>
                      </li>
                    ) : (
                      <li className={styles.muted}>{project.demo.label}</li>
                    ))}
                  {project.repo && (
                    <li>
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Source code <span aria-hidden="true">&#8599;</span>
                      </a>
                    </li>
                  )}
                </ul>
              </section>
            </div>
          </div>
        </article>

        <Link href={`/projects/${next.slug}`} className={styles.next}>
          <span>Next project</span>
          <strong>{next.title}</strong>
          <i aria-hidden="true">&rarr;</i>
        </Link>
      </main>
    </>
  );
}
