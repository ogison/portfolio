"use client";

import styles from "./GameHeader.module.scss";
import { useHeaderStats } from "./useHeaderStats";
import SettingsMenu from "@/components/SettingsMenu";

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
  const { level, hp, mp } = useHeaderStats({
    level: initialLevel,
    hp: initialHp,
    mp: initialMp,
  });

  return (
    <header className={styles.header}>
      <span className={styles.cornerBottomLeft} aria-hidden="true"></span>
      <span className={styles.cornerBottomRight} aria-hidden="true"></span>
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
          <SettingsMenu />
        </div>
      </div>
    </header>
  );
}
