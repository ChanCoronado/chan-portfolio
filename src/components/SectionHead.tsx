import styles from "./SectionHead.module.css";

type Props = { index: string; label: string; title: string; id?: string };

export default function SectionHead({ index, label, title, id }: Props) {
  return (
    <div className={styles.head}>
      <p className={styles.label}>
        <span>{index}</span> {label}
      </p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
    </div>
  );
}
