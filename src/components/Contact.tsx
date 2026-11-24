import ContactEmail from "./ContactEmail";
import Reveal from "./Reveal";
import styles from "./Contact.module.css";

const LINKS = [
  {
    label: "LinkedIn",
    detail: "christian-coronado",
    href: "https://www.linkedin.com/in/christian-coronado-82a426390/",
  },
  {
    label: "GitHub",
    detail: "ChanCoronado",
    href: "https://github.com/ChanCoronado",
  },
  { label: "View CV", detail: "PDF", href: "/files/Christian_Coronado_CV.pdf" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-title"
    >
      <div className={styles.inner}>
        <p className={styles.label}>
          <span>05</span> Contact
        </p>
        <h2 id="contact-title" className={styles.title}>
          Let&apos;s <span>talk</span>
        </h2>

        <Reveal className={styles.body}>
          <p className={styles.lead}>
            I am available for Junior Software Engineer and Full-Stack Web
            Developer roles. Email is the quickest way to reach me.
          </p>

          <ContactEmail />

          <ul className={styles.links}>
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  <span className={styles.linkLabel}>{l.label}</span>
                  <span className={styles.linkDetail}>{l.detail}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    &#8599;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <footer className={styles.footer}>
          <p>&copy; 2026 Christian Coronado</p>
          <p>Nagcarlan, Laguna, Philippines</p>
        </footer>
      </div>
    </section>
  );
}
