import styles from "./ProcessFlow.module.css";

/* Flow diagram for the confidential Notarial Document System.
   It uses only what the project is known to do, and no client data. */
const STEPS = [
  { title: "Document comes in", note: "Saved in the records system" },
  { title: "Numbered automatically", note: "Document numbering" },
  { title: "PDF renamed", note: "Consistent file names" },
  {
    title: "Official books generated",
    note: "Notarial Register and Records Book",
  },
];

const SAFEGUARDS = [
  "Login authentication",
  "CSRF protection",
  "Rate limiting",
  "Automated backups",
];

export default function ProcessFlow() {
  return (
    <div className={styles.wrap}>
      <ol
        className={styles.steps}
        aria-label="How a document moves through the system"
      >
        {STEPS.map((s, i) => (
          <li key={s.title} className={styles.step}>
            <span className={styles.num}>0{i + 1}</span>
            <strong>{s.title}</strong>
            <span>{s.note}</span>
          </li>
        ))}
      </ol>

      <div className={styles.rows}>
        <div>
          <h3>Protected by</h3>
          <ul>
            {SAFEGUARDS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Shipped with</h3>
          <ul>
            <li>Git version control</li>
            <li>GitHub Actions CI</li>
            <li>Automated tests</li>
          </ul>
        </div>
      </div>

      <p className={styles.note}>
        Diagram only. No screenshots or client data are shown, out of respect
        for confidentiality.
      </p>
    </div>
  );
}
