import Image from "next/image";
import type { Project } from "@/data/projects";
import styles from "./DeviceShowcase.module.css";

type Props = { project: Pick<Project, "title" | "screens"> };

/* Desktop and phone frames built with CSS around the real screenshots.
   Renders nothing until screenshots are provided. */
export default function DeviceShowcase({ project }: Props) {
  const screens = project.screens;
  if (!screens) return null;

  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        <div className={styles.desktop}>
          <div className={styles.bar} aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <Image
            src={screens.desktop}
            alt={`${project.title} on a desktop screen`}
            width={1440}
            height={900}
            style={
              screens.desktopRatio
                ? { aspectRatio: screens.desktopRatio }
                : undefined
            }
            sizes="(min-width: 900px) 76rem, 92vw"
            quality={90}
            priority
          />
        </div>

        {screens.phone && (
          <div className={styles.phone}>
            <Image
              src={screens.phone}
              alt={`${project.title} on a phone screen`}
              width={390}
              height={844}
              sizes="(min-width: 900px) 16rem, 30vw"
              quality={90}
            />
          </div>
        )}
      </div>

      {screens.details && screens.details.length > 0 && (
        <ul className={styles.details}>
          {screens.details.map((d) => (
            <li
              key={d.src}
              className={d.portrait ? styles.portrait : undefined}
            >
              <figure>
                <Image
                  src={d.src}
                  alt={d.alt}
                  width={d.portrait ? 752 : 1440}
                  height={d.portrait ? 1350 : 900}
                  sizes={
                    d.portrait ? "14rem" : "(min-width: 900px) 40rem, 92vw"
                  }
                  quality={90}
                />
                <figcaption>{d.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
