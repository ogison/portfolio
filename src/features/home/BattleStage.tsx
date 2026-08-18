"use client";

import styles from "./BattleStage.module.scss";
import SettingsMenu from "@/components/SettingsMenu";
import PixelAvatar from "@/features/avatar/PixelAvatar";
import { useHeaderStats } from "@/features/header/useHeaderStats";
import { type Locale, useLocale } from "@/features/i18n/LocaleProvider";

const NAME = "ogison";
const JOB = "Product Developer";

// LV / HP / MP と同じくレトロゲームの意匠として、名前と職業は日本語版でも英字のまま置く。
const appearedText: Record<Locale, string> = {
  ja: `${NAME} が あらわれた！`,
  en: `${NAME} appeared!`,
};

interface BattleStageProps {
  isTyping?: boolean;
  /** 値が変わるたびに決定時のフラッシュを1回流す。 */
  flashKey?: number;
}

export default function BattleStage({ isTyping = false, flashKey = 0 }: BattleStageProps) {
  const { level, hp, mp } = useHeaderStats();
  const { locale } = useLocale();

  return (
    <div className={styles.stage}>
      <span className={styles.cornerBottomLeft} aria-hidden="true"></span>
      <span className={styles.cornerBottomRight} aria-hidden="true"></span>

      {flashKey > 0 && <span key={flashKey} className={styles.flash} aria-hidden="true"></span>}

      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.ground}></span>
        <span className={styles.groundLine}></span>
        <span className={`${styles.sparkle} ${styles.sparkleA}`}></span>
        <span className={`${styles.sparkle} ${styles.sparkleB}`}></span>
        <span className={`${styles.sparkle} ${styles.sparkleC}`}></span>
      </div>

      <div className={styles.status}>
        <div className={styles.statusList}>
          <p>{NAME}</p>
          <p className={styles.job}>{JOB}</p>
          <p>LV : {level}</p>
          <p>HP : {hp}/100</p>
          <p>MP : {mp}/100</p>
        </div>
      </div>

      <div className={styles.settings}>
        <SettingsMenu />
      </div>

      <div className={styles.encounter}>
        <PixelAvatar isTyping={isTyping} className={styles.avatar} />
        <p className={styles.appeared}>{appearedText[locale]}</p>
      </div>
    </div>
  );
}
