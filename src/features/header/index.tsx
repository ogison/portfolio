"use client";

import { useEffect, useState } from "react";
import styles from "./GameHeader.module.scss";
import SoundToggle from "@/components/SoundToggle";

interface GameHeaderProps {
  name?: string;
  job?: string;
  level?: number;
  hp?: number;
  mp?: number;
}

export default function GameHeader({
  name = "ogison",
  job = "Product Developer",
  level: initialLevel,
  hp: initialHp,
  mp: initialMp,
}: GameHeaderProps) {
  const [level, setLevel] = useState<number>(initialLevel ?? 28);
  const [hp, setHp] = useState<number>(initialHp ?? 95);
  const [mp, setMp] = useState<number>(initialMp ?? 80);

  useEffect(() => {
    // Generate random values on mount (client-side only)
    const randomLevel = Math.floor(Math.random() * 50) + 10; // Random level between 10-59
    const randomHp = Math.floor(Math.random() * 60) + 40; // Random HP between 40-99
    const randomMp = Math.floor(Math.random() * 80) + 20; // Random MP between 20-99

    setLevel(randomLevel);
    setHp(randomHp);
    setMp(randomMp);
  }, []);
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.nameSection}>
          <p>NAME: {name}</p>
          <p>JOB : {job}</p>
        </div>
        <div className={styles.levelSection}>
          <p>LV : {level}</p>
        </div>
        <div className={styles.statsSection}>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>HP</span>
            <div className={styles.progressBarContainer}>
              <div
                className={`${styles.progressBar} ${styles.hpBar}`}
                style={{ width: `${hp}%` }}
              ></div>
            </div>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>MP</span>
            <div className={styles.progressBarContainer}>
              <div
                className={`${styles.progressBar} ${styles.mpBar}`}
                style={{ width: `${mp}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className={styles.settingsSection}>
          <SoundToggle />
        </div>
      </div>
    </header>
  );
}
