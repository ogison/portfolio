"use client";

import { useEffect, useState } from "react";
import styles from "./MenuGrid.module.scss";
import { type Locale, useLocale } from "@/features/i18n/LocaleProvider";

export type MenuItem = "welcome" | "about" | "skills" | "works" | "contact";

const titleByLocale: Record<Locale, string> = {
  ja: "コマンド",
  en: "COMMAND",
};

// コマンドは縦1列に並べる。↑↓ は1つずつ移動し、←→ は動かない。
const COL_COUNT = 1;

interface MenuGridProps {
  activeIndex: number;
  onMenuSelect: (item: MenuItem) => void;
  onMenuChange: (index: number) => void;
  menuItems: Array<{ id: MenuItem; label: string }>;
}

export default function MenuGrid({
  activeIndex,
  onMenuSelect,
  onMenuChange,
  menuItems,
}: MenuGridProps) {
  const [mounted, setMounted] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        onMenuChange((activeIndex - COL_COUNT + menuItems.length) % menuItems.length);
        break;
      case "ArrowDown":
        e.preventDefault();
        onMenuChange((activeIndex + COL_COUNT) % menuItems.length);
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (activeIndex % COL_COUNT !== 0) {
          onMenuChange(activeIndex - 1);
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (activeIndex % COL_COUNT !== COL_COUNT - 1) {
          onMenuChange(activeIndex + 1);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        onMenuSelect(menuItems[activeIndex]?.id || "about");
        break;
    }
  };

  if (!mounted) {
    return (
      <div className={styles.container}>
        <span className={styles.cornerBottomLeft} aria-hidden="true"></span>
        <span className={styles.cornerBottomRight} aria-hidden="true"></span>
        <p className={styles.title}>{titleByLocale[locale]}</p>
        <div className={styles.menuGrid}>
          {menuItems.map((item) => (
            <div key={item.id} className={styles.menuItem}>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} tabIndex={0} onKeyDown={handleKeyDown}>
      <span className={styles.cornerBottomLeft} aria-hidden="true"></span>
      <span className={styles.cornerBottomRight} aria-hidden="true"></span>
      <p className={styles.title}>{titleByLocale[locale]}</p>
      <div className={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.menuItem} ${index === activeIndex ? styles.active : ""}`}
            onClick={() => onMenuSelect(item.id)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
