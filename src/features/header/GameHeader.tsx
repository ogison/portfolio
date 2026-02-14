"use client";

import { useEffect, useState } from "react";
import styles from "./GameHeader.module.scss";
import SoundToggle from "@/components/SoundToggle";

const HEADER_STATS_STORAGE_KEY = "portfolio.header.stats";
const HEADER_STATS_TTL_MS = 10 * 60 * 1000;

type HeaderStats = {
  level: number;
  hp: number;
  mp: number;
};

type StoredHeaderStats = HeaderStats & {
  expiresAt: number;
};

interface GameHeaderProps {
  name?: string;
  job?: string;
  level?: number;
  hp?: number;
  mp?: number;
}

function createRandomStats(): HeaderStats {
  return {
    level: Math.floor(Math.random() * 50) + 10, // 10-59
    hp: Math.floor(Math.random() * 60) + 40, // 40-99
    mp: Math.floor(Math.random() * 80) + 20, // 20-99
  };
}

function parseStoredStats(value: string | null): StoredHeaderStats | null {
  if (!value) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(value);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "level" in parsed &&
      "hp" in parsed &&
      "mp" in parsed &&
      "expiresAt" in parsed &&
      typeof parsed.level === "number" &&
      typeof parsed.hp === "number" &&
      typeof parsed.mp === "number" &&
      typeof parsed.expiresAt === "number"
    ) {
      return {
        level: parsed.level,
        hp: parsed.hp,
        mp: parsed.mp,
        expiresAt: parsed.expiresAt,
      };
    }
  } catch {
    return null;
  }

  return null;
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
    if (initialLevel !== undefined || initialHp !== undefined || initialMp !== undefined) {
      return;
    }

    const storedStats = parseStoredStats(window.localStorage.getItem(HEADER_STATS_STORAGE_KEY));

    const now = Date.now();

    if (storedStats && storedStats.expiresAt > now) {
      setLevel(storedStats.level);
      setHp(storedStats.hp);
      setMp(storedStats.mp);
      return;
    }

    window.localStorage.removeItem(HEADER_STATS_STORAGE_KEY);

    const randomStats = createRandomStats();
    setLevel(randomStats.level);
    setHp(randomStats.hp);
    setMp(randomStats.mp);

    const storedRandomStats: StoredHeaderStats = {
      ...randomStats,
      expiresAt: now + HEADER_STATS_TTL_MS,
    };

    window.localStorage.setItem(HEADER_STATS_STORAGE_KEY, JSON.stringify(storedRandomStats));
  }, [initialLevel, initialHp, initialMp]);

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
          <SoundToggle />
        </div>
      </div>
    </header>
  );
}
