"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import ChanAvatar from "./ChanAvatar";
import styles from "./ChatWidget.module.css";

type Turn = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What is Chan's strongest project?",
  "What has Chan built with PHP and MySQL?",
  "Is Chan open to remote or hybrid work?",
  "What did Chan do at Knowles?",
];

const ERRORS: Record<string, string> = {
  rate_limited:
    "That is a lot of questions for now. Please try again later, or use the Contact section.",
  busy: "The assistant is busy right now. Please try again in a moment.",
  bad_request:
    "That question could not be sent. Please shorten it and try again.",
  disabled: "The assistant is switched off right now.",
  not_configured: "The assistant is not set up yet.",
  failed: "Something went wrong. Please try again, or use the Contact section.",
};

const MAX_TURNS = 6;
const SEEN_KEY = "askchan-greeted";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [waving, setWaving] = useState(false);
  const [bubble, setBubble] = useState(false);
  /* null while checking, then true or false from the server's kill switch */
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  /* Kill switch status */
  useEffect(() => {
    let alive = true;
    fetch("/api/ask")
      .then((r) => r.json())
      .then(
        (d: { enabled?: boolean }) => alive && setEnabled(Boolean(d.enabled)),
      )
      .catch(() => alive && setEnabled(false));
    return () => {
      alive = false;
    };
  }, []);

  /* Greeting: wave and a small bubble once per visit, then a wave every so often */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const wave = () => {
      if (openRef.current) return;
      setWaving(true);
      timers.push(setTimeout(() => setWaving(false), 1800));
    };

    let greeted = false;
    try {
      greeted = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* storage can be blocked; just greet */
    }

    timers.push(
      setTimeout(() => {
        wave();
        if (!greeted && !openRef.current) {
          setBubble(true);
          try {
            sessionStorage.setItem(SEEN_KEY, "1");
          } catch {
            /* ignore */
          }
          timers.push(setTimeout(() => setBubble(false), 7000));
        }
      }, 2200),
    );

    const every = setInterval(wave, 14000);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(every);
    };
  }, []);

  /* Escape closes and returns focus to the launcher */
  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    // wait a frame so the panel is visible before focusing
    const id = requestAnimationFrame(() =>
      (inputRef.current?.disabled
        ? closeRef.current
        : inputRef.current
      )?.focus(),
    );
    return () => cancelAnimationFrame(id);
  }, [open, enabled]);

  useEffect(() => {
    logRef.current?.scrollTo({
      top: logRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [turns, busy]);

  const toggle = () => {
    setBubble(false);
    setOpen((v) => !v);
  };

  const ask = async (question: string) => {
    const text = question.trim();
    if (!text || busy || !enabled) return;

    const next: Turn[] = [...turns, { role: "user", content: text }];
    const tail = next.slice(-MAX_TURNS);
    const windowed = tail[0].role === "user" ? tail : tail.slice(1);

    setTurns(next);
    setDraft("");
    setError("");
    setBusy(true);

    // If the request fails, take the question back so the chat stays valid
    const fail = (message: string) => {
      setTurns((t) => t.slice(0, -1));
      setDraft(text);
      setError(message);
    };

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: windowed }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (res.ok && data.reply) {
        const reply = data.reply;
        setTurns((t) => [...t, { role: "assistant", content: reply }]);
      } else {
        fail(ERRORS[data.error ?? "failed"] ?? ERRORS.failed);
      }
    } catch {
      fail(ERRORS.failed);
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(draft);
  };

  const off = enabled === false;

  return (
    <div className={styles.root}>
      <section
        id="ask-chan-panel"
        className={styles.panel}
        data-open={open}
        aria-label="Ask Chan"
        aria-hidden={!open}
        inert={!open}
      >
        <header className={styles.head}>
          <ChanAvatar size="small" />
          <div className={styles.headText}>
            <h2>Ask Chan</h2>
            <p>{off ? "Coming soon" : "Answers come only from this site"}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={close}
            aria-label="Close chat"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </header>

        <div
          ref={logRef}
          className={styles.log}
          role="log"
          aria-live="polite"
          aria-label="Conversation"
        >
          {off && (
            <p className={styles.soon}>
              Hi, I&apos;m Chan! This chat is not switched on yet. For now,
              everything about me is on this page, and you can reach me in the{" "}
              <a href="#contact" onClick={() => setOpen(false)}>
                Contact section
              </a>
              .
            </p>
          )}
          {!off && turns.length === 0 && (
            <p className={styles.bot}>
              Hi, I&apos;m Chan! Ask me anything about my projects, experience
              or skills.
            </p>
          )}
          {turns.map((t, i) => (
            <p key={i} className={t.role === "user" ? styles.user : styles.bot}>
              <span className="visually-hidden">
                {t.role === "user" ? "You: " : "Chan: "}
              </span>
              {t.content}
            </p>
          ))}
          {busy && (
            <p className={styles.bot} aria-label="Typing">
              <span className={styles.dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </p>
          )}
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
        </div>

        {!off && turns.length === 0 && (
          <ul className={styles.chips}>
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  disabled={enabled === null}
                  onClick={() => ask(s)}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        )}

        <form className={styles.form} onSubmit={onSubmit}>
          <label className="visually-hidden" htmlFor="ask-input">
            Your question about Chan
          </label>
          <input
            ref={inputRef}
            id="ask-input"
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={500}
            placeholder={off ? "Coming soon" : "Ask about Chan's work"}
            disabled={off || enabled === null}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={off || enabled === null || busy || !draft.trim()}
          >
            Send
          </button>
        </form>
      </section>

      <div className={styles.dock}>
        {bubble && !open && (
          <p className={styles.bubble} role="status">
            Hi! Ask me about Chan
          </p>
        )}
        <button
          ref={launcherRef}
          type="button"
          className={styles.launcher}
          onClick={toggle}
          aria-expanded={open}
          aria-controls="ask-chan-panel"
          aria-label={open ? "Close Ask Chan" : "Open Ask Chan chat"}
          onMouseEnter={() => !open && setWaving(true)}
          onMouseLeave={() => setWaving(false)}
        >
          <ChanAvatar waving={waving && !open} />
          {enabled && <span className={styles.online} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
