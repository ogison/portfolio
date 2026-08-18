"use client";

import type { KeyboardEvent } from "react";
import Link from "next/link";
import styles from "./WorksShowcase.module.scss";
import type { WorkItem } from "./works";
import { type Locale, useLocale } from "@/features/i18n/LocaleProvider";

const titleByLocale: Record<Locale, string> = {
  ja: "しなもの",
  en: "GOODS",
};

const backLabelByLocale: Record<Locale, string> = {
  ja: "みせを でる",
  en: "LEAVE SHOP",
};

interface WorksShowcaseProps {
  works: WorkItem[];
  /** works.length は「みせを でる」の行を指す。 */
  activeIndex: number;
  selectedIndex: number | null;
  onActiveIndexChange: (index: number) => void;
  onSelect: (index: number) => void;
  onBack: () => void;
}

export default function WorksShowcase({
  works,
  activeIndex,
  selectedIndex,
  onActiveIndexChange,
  onSelect,
  onBack,
}: WorksShowcaseProps) {
  // 最終行の「みせを でる」も含めて上下で一巡させる（みせの「やめる」と同じ扱い）。
  const rowCount = works.length + 1;
  const backIndex = works.length;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        onActiveIndexChange((activeIndex - 1 + rowCount) % rowCount);
        break;
      case "ArrowDown":
        event.preventDefault();
        onActiveIndexChange((activeIndex + 1) % rowCount);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (activeIndex === backIndex) {
          onBack();
        } else {
          onSelect(activeIndex);
        }
        break;
    }
  };

  const { locale } = useLocale();

  return (
    <div className={styles.container} tabIndex={0} onKeyDown={handleKeyDown}>
      <span className={styles.cornerBottomLeft} aria-hidden="true"></span>
      <span className={styles.cornerBottomRight} aria-hidden="true"></span>
      <p className={styles.title}>{titleByLocale[locale]}</p>
      <ul className={styles.list}>
        {works.map((item, index) => (
          <li
            key={item.id}
            className={`${styles.listItem} ${index === activeIndex ? styles.active : ""} ${
              index === selectedIndex ? styles.selected : ""
            }`}
            onClick={() => onSelect(index)}
          >
            <span className={styles.itemName}>{item.title}</span>
            <span className={`${styles.itemPrice} font-press-start`}>{item.price}</span>
          </li>
        ))}
      </ul>
      <div className={`${styles.backRow} ${activeIndex === backIndex ? styles.active : ""}`}>
        <Link
          href="/home"
          className={styles.backLink}
          onMouseEnter={() => onActiveIndexChange(backIndex)}
        >
          {backLabelByLocale[locale]}
        </Link>
      </div>
    </div>
  );
}
