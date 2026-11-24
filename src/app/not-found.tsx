import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SimpleNav from "@/components/SimpleNav";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found | Christian Coronado",
};

export default function NotFound() {
  return (
    <>
      <SimpleNav back={{ href: "/", label: "Home" }} />
      <main id="main" className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.stage} aria-hidden="true">
            <p className={styles.code}>
              4<span>0</span>4
            </p>
            <figure className={styles.portrait}>
              <Image
                src="/images/portrait-barong-cutout.webp"
                alt=""
                width={1000}
                height={1500}
                sizes="(min-width: 900px) 18rem, 40vw"
              />
            </figure>
            <p className={styles.bubble}>Naligaw ka yata?</p>
          </div>

          <div className={styles.copy}>
            <p className={styles.kicker}>Error 404</p>
            <h1 className="visually-hidden">Page not found</h1>

            <div className={styles.terminal} aria-hidden="true">
              <span className={styles.dots}>
                <i />
                <i />
                <i />
              </span>
              <p className={`${styles.line} ${styles.l1}`}>$ cd /nope</p>
              <p className={`${styles.line} ${styles.l2}`}>bash: cd: /nope:</p>
              <p className={`${styles.line} ${styles.l3}`}>
                No such file or directory
              </p>
              <p className={`${styles.line} ${styles.l4}`}>
                $ <span className={styles.cursor} />
              </p>
            </div>

            <p className={styles.text}>
              This page doesn&apos;t exist. The link may be old or mistyped, or
              the page may have moved. You can go back home or look through my
              projects.
            </p>

            <div className={styles.actions}>
              <Link href="/" className={styles.primary}>
                Back to home
              </Link>
              <Link href="/projects" className={styles.secondary}>
                See all projects <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
