"use client";

import { useState, useSyncExternalStore } from "react";
import styles from "./Contact.module.css";

/* The address is put together in the browser, so it is not written as plain
   text in the page source where simple scrapers look for it. */
const USER = "coronadochristian415";
const DOMAIN = "gmail.com";

const subscribe = () => () => {};
const clientAddress = () => `${USER}@${DOMAIN}`;
const serverAddress = () => "";

export default function ContactEmail() {
  const address = useSyncExternalStore(subscribe, clientAddress, serverAddress);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; open the mail app instead
      window.location.href = `mailto:${address}`;
    }
  };

  return (
    <div className={styles.email}>
      {address ? (
        <a className={styles.address} href={`mailto:${address}`}>
          {address}
        </a>
      ) : (
        <span className={styles.address} aria-hidden="true">
          &nbsp;
        </span>
      )}
      <noscript>
        <p className={styles.noscript}>
          coronadochristian415 [at] gmail [dot] com
        </p>
      </noscript>

      <div className={styles.actions}>
        <a
          className={styles.primary}
          href={address ? `mailto:${address}` : "#contact"}
        >
          Send email
        </a>
        <button
          type="button"
          className={styles.secondary}
          onClick={copy}
          disabled={!address}
        >
          {copied ? "Copied" : "Copy email"}
        </button>
        <span className="visually-hidden" role="status" aria-live="polite">
          {copied ? "Email address copied" : ""}
        </span>
      </div>
    </div>
  );
}
