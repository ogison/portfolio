"use client";

import { useEffect, useState } from "react";

const HEADER_STATS_STORAGE_KEY = "portfolio.header.stats";
const HEADER_STATS_TTL_MS = 10 * 60 * 1000;

export type HeaderStats = {
  level: number;
  hp: number;
  mp: number;
};

type StoredHeaderStats = HeaderStats & {
  expiresAt: number;
};

export type UseHeaderStatsOptions = {
  level?: number;
  hp?: number;
  mp?: number;
};

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

/**
 * ヘッダー／バトルステータスに出すランダムな LV・HP・MP を返す。
 *
 * localStorage は初期化子ではなく useEffect の中でだけ読む（ハイドレーション不一致を避けるため）。
 * 初回レンダーは常に固定値で、マウント後に保存値または新しい乱数へ差し替える。
 * 値は 10 分間 localStorage にキャッシュされ、/home と /shop で同じ数字が出る。
 * level / hp / mp を明示的に渡した場合は乱数もキャッシュも使わない。
 */
export function useHeaderStats({ level, hp, mp }: UseHeaderStatsOptions = {}): HeaderStats {
  const [stats, setStats] = useState<HeaderStats>({
    level: level ?? 28,
    hp: hp ?? 95,
    mp: mp ?? 80,
  });

  useEffect(() => {
    if (level !== undefined || hp !== undefined || mp !== undefined) {
      return;
    }

    const storedStats = parseStoredStats(window.localStorage.getItem(HEADER_STATS_STORAGE_KEY));
    const now = Date.now();

    if (storedStats && storedStats.expiresAt > now) {
      setStats({ level: storedStats.level, hp: storedStats.hp, mp: storedStats.mp });
      return;
    }

    window.localStorage.removeItem(HEADER_STATS_STORAGE_KEY);

    const randomStats = createRandomStats();
    setStats(randomStats);

    const storedRandomStats: StoredHeaderStats = {
      ...randomStats,
      expiresAt: now + HEADER_STATS_TTL_MS,
    };

    window.localStorage.setItem(HEADER_STATS_STORAGE_KEY, JSON.stringify(storedRandomStats));
  }, [level, hp, mp]);

  return stats;
}
