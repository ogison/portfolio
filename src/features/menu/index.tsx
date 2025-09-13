"use client";

import { useEffect, useState } from "react";
import styles from "./menu.module.scss";

export type MenuItem = "welcome" | "about" | "skills" | "works" | "contact";

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

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const colCount = 2;
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        onMenuChange((activeIndex - colCount + menuItems.length) % menuItems.length);
        break;
      case "ArrowDown":
        e.preventDefault();
        onMenuChange((activeIndex + colCount) % menuItems.length);
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (activeIndex % colCount !== 0) {
          onMenuChange(activeIndex - 1);
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (activeIndex % colCount !== colCount - 1) {
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
      <div className={`${styles.container} ${styles.bottomCorners}`}>
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
    <div
      className={`${styles.container} ${styles.bottomCorners}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
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
