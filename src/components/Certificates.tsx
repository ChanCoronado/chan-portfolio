"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { certificates, type CertGroup, type Certificate } from "@/data/about";
import styles from "./Certificates.module.css";

type Filter = "all" | CertGroup;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "technical", label: "Technical" },
  { id: "community", label: "Leadership and community" },
  { id: "academic", label: "Academic" },
];

/* A wall of the actual certificates. "View certificate" opens the full image
   in a native dialog, which handles focus trapping and Escape for us. */
export default function Certificates() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<Certificate | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);

  const shown =
    filter === "all"
      ? certificates
      : certificates.filter((c) => c.group === filter);

  const open = (cert: Certificate, trigger: HTMLElement) => {
    openerRef.current = trigger;
    setCurrent(cert);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  return (
    <>
      <div
        className={styles.chips}
        role="group"
        aria-label="Filter certificates"
      >
        {FILTERS.map((f) => {
          const count =
            f.id === "all"
              ? certificates.length
              : certificates.filter((c) => c.group === f.id).length;
          if (count === 0) return null;
          return (
            <button
              key={f.id}
              type="button"
              className={styles.chip}
              aria-pressed={filter === f.id}
              onClick={() => {
                setFilter(f.id);
                setExpanded(false);
              }}
            >
              {f.label} <span aria-hidden="true">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className={styles.grid} data-collapsed={!expanded} aria-live="polite">
        {shown.map((c) => {
          const body = (
            <>
              <span className={styles.thumb}>
                {c.image ? (
                  <Image
                    src={c.image}
                    alt=""
                    width={480}
                    height={360}
                    sizes="(min-width: 1100px) 20rem, (min-width: 640px) 45vw, 92vw"
                    quality={75}
                  />
                ) : (
                  <span className={styles.noImage}>{c.issuer}</span>
                )}
              </span>
              <span className={styles.body}>
                <span className={styles.when}>{c.when}</span>
                <span className={styles.title}>{c.title}</span>
                <span className={styles.issuer}>{c.issuer}</span>
                {c.image && (
                  <span className={styles.view}>
                    View certificate <span aria-hidden="true">&#8599;</span>
                  </span>
                )}
              </span>
            </>
          );

          return (
            <li key={c.title}>
              {c.image ? (
                <button
                  type="button"
                  className={styles.card}
                  onClick={(e) => open(c, e.currentTarget)}
                  aria-haspopup="dialog"
                >
                  {body}
                  <span className="visually-hidden">: {c.title}</span>
                </button>
              ) : (
                <div className={`${styles.card} ${styles.plain}`}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>

      {shown.length > 4 && (
        <button
          type="button"
          className={`${styles.more} ${shown.length <= 6 ? styles.phoneOnly : ""}`}
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Show fewer" : `Show all ${shown.length}`}{" "}
          <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
        </button>
      )}

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={current ? `Certificate: ${current.title}` : "Certificate"}
        onClose={() => {
          setCurrent(null);
          openerRef.current?.focus();
        }}
        onClick={(e) => {
          // Clicking the dark backdrop (the dialog itself) closes it
          if (e.target === e.currentTarget) close();
        }}
      >
        {current?.image && (
          <figure className={styles.figure}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.image} alt={`Certificate: ${current.title}`} />
            <figcaption>{current.title}</figcaption>
          </figure>
        )}
        <button type="button" className={styles.close} onClick={close}>
          Close
        </button>
      </dialog>
    </>
  );
}
