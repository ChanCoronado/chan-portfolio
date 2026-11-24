import Image from "next/image";
import styles from "./ChanAvatar.module.css";

type Props = {
  waving?: boolean;
  size?: "launcher" | "small";
  priority?: boolean;
};

/* Colors sampled from the cartoon so the drawn hand matches it */
const SKIN = "#E8B888";
const SHADE = "#C89870";
const LINE = "#001820";

/* Open palm for the "Hi" wave, drawn in the avatar's own 353 x 350 space.
   Fingers are capsules fanned out from the palm; the thumb is on the side
   facing the body. Every shape is drawn twice (outline, then skin) so the
   combined silhouette has one clean outline. */
const FINGERS = [
  { x: 33, y: 52, w: 12, h: 46, r: -14 },
  { x: 47, y: 40, w: 12, h: 58, r: -5 },
  { x: 61, y: 40, w: 12, h: 58, r: 5 },
  { x: 75, y: 52, w: 12, h: 46, r: 13 },
];

function Shapes({ paint, stroke }: { paint: string; stroke?: string }) {
  const common = {
    fill: paint,
    stroke,
    strokeWidth: stroke ? 11 : 0,
    strokeLinejoin: "round" as const,
  };
  return (
    <>
      {/* forearm, running down behind the sleeve */}
      <rect x="44" y="104" width="30" height="104" rx="10" {...common} />
      {FINGERS.map((f) => (
        <rect
          key={f.x}
          x={f.x}
          y={f.y}
          width={f.w}
          height={f.h}
          rx="6"
          transform={`rotate(${f.r} ${f.x + f.w / 2} ${f.y + f.h})`}
          {...common}
        />
      ))}
      {/* palm */}
      <ellipse cx="59" cy="96" rx="29" ry="25" {...common} />
      {/* thumb */}
      <rect
        x="82"
        y="84"
        width="13"
        height="38"
        rx="6.5"
        transform="rotate(-38 88 118)"
        {...common}
      />
    </>
  );
}

/* Chan's cartoon. The body, the salute hand and the waving hand are separate
   layers, so the hand can wave on its own. Decorative: the buttons around it
   carry the labels. */
export default function ChanAvatar({
  waving = false,
  size = "launcher",
  priority = false,
}: Props) {
  return (
    <span
      className={`${styles.avatar} ${styles[size]}`}
      data-waving={waving}
      aria-hidden="true"
    >
      <svg className={styles.wave} viewBox="0 0 353 350" focusable="false">
        <Shapes paint={LINE} stroke={LINE} />
        <Shapes paint={SKIN} />
        {/* a little shading under the fingers and along the palm */}
        <path
          d="M36 100 Q59 112 82 100"
          fill="none"
          stroke={SHADE}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M53 62 V82 M65 62 V82"
          stroke={SHADE}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <Image
        src="/images/chan-body-matcha.webp"
        alt=""
        width={353}
        height={350}
        sizes="4.5rem"
        priority={priority}
        className={styles.body}
      />
      <Image
        src="/images/chan-hand-matcha.webp"
        alt=""
        width={353}
        height={350}
        sizes="4.5rem"
        priority={priority}
        className={styles.hand}
      />
    </span>
  );
}
