import Link from "next/link";
import styles from "./SimpleNav.module.css";

/* Slim top bar for inner pages such as the case studies */
export default function SimpleNav({
  back = { href: "/projects", label: "All projects" },
}: {
  back?: { href: string; label: string };
}) {
  return (
    <header className={styles.bar}>
      <Link
        href="/"
        className={styles.brand}
        aria-label="Christian Coronado, home"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt=""
          className={styles.logo}
          width="40"
          height="25"
        />
        <span className={styles.name}>
          <span>Christian</span> <span>Coronado</span>
        </span>
      </Link>
      <Link href={back.href} className={styles.back}>
        <span aria-hidden="true">&larr;</span> {back.label}
      </Link>
    </header>
  );
}
