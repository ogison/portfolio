"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SettingsMenu.module.scss";
import { type Locale, useLocale } from "@/features/i18n/LocaleProvider";
import { useSoundSettings } from "@/features/message/useSound";

interface SettingsMenuProps {
  className?: string;
}

const labels = {
  ja: {
    open: "設定をひらく",
    close: "設定をとじる",
    panel: "設定",
    language: "げんご",
    sound: "サウンド",
    soundOn: "サウンドをオンにする",
    soundOff: "サウンドをオフにする",
    toJapanese: "日本語に切り替える",
    toEnglish: "英語に切り替える",
  },
  en: {
    open: "Open settings",
    close: "Close settings",
    panel: "Settings",
    language: "LANGUAGE",
    sound: "SOUND",
    soundOn: "Turn sound on",
    soundOff: "Turn sound off",
    toJapanese: "Switch to Japanese",
    toEnglish: "Switch to English",
  },
} as const;

/** 16x16 のドット絵ギア。歯車の穴は矩形を組んで抜いている（塗りつぶさない）。 */
function GearIcon() {
  return (
    <svg
      className={styles.gear}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {/* 上下左右の歯 */}
      <rect x="6" y="1" width="4" height="2" />
      <rect x="6" y="13" width="4" height="2" />
      <rect x="1" y="6" width="2" height="4" />
      <rect x="13" y="6" width="2" height="4" />
      {/* 斜め方向の歯 */}
      <rect x="2" y="2" width="2" height="2" />
      <rect x="12" y="2" width="2" height="2" />
      <rect x="2" y="12" width="2" height="2" />
      <rect x="12" y="12" width="2" height="2" />
      {/* 本体のリング（中央 4x4 が穴になる） */}
      <rect x="3" y="3" width="10" height="3" />
      <rect x="3" y="10" width="10" height="3" />
      <rect x="3" y="3" width="3" height="10" />
      <rect x="10" y="3" width="3" height="10" />
    </svg>
  );
}

interface OptionProps {
  isActive: boolean;
  ariaLabel: string;
  onSelect: () => void;
  children: React.ReactNode;
}

function Option({ isActive, ariaLabel, onSelect, children }: OptionProps) {
  return (
    <button
      type="button"
      className={`${styles.option} ${isActive ? styles.optionActive : ""}`}
      aria-pressed={isActive}
      aria-label={ariaLabel}
      onClick={onSelect}
    >
      {children}
    </button>
  );
}

export default function SettingsMenu({ className = "" }: SettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const { soundEnabled, toggleSound } = useSoundSettings();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const label = labels[locale];

  // useSoundSettings はトグルしか公開していないので、目的の状態と違うときだけ反転させる。
  const applySound = useCallback(
    (next: boolean) => {
      if (next !== soundEnabled) {
        toggleSound();
      }
    },
    [soundEnabled, toggleSound]
  );

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  const selectLocale = (next: Locale) => setLocale(next);

  return (
    <div className={`${styles.container} ${className}`} ref={containerRef}>
      <button
        type="button"
        ref={triggerRef}
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? label.close : label.open}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <GearIcon />
      </button>

      {/* パネルは開いている間だけマウントする。閉じている初期状態では
          soundEnabled（localStorage 由来）を描画しないので SSR と食い違わない。 */}
      {isOpen && (
        <>
          <span className={styles.notch} aria-hidden="true" />
          <div className={styles.panel} role="group" aria-label={label.panel}>
            <span className={styles.cornerBottomLeft} aria-hidden="true" />
            <span className={styles.cornerBottomRight} aria-hidden="true" />

            <section className={styles.section}>
              <p className={styles.sectionLabel}>{label.language}</p>
              <div className={styles.optionRow}>
                <Option
                  isActive={locale === "ja"}
                  ariaLabel={labels[locale].toJapanese}
                  onSelect={() => selectLocale("ja")}
                >
                  日本語
                </Option>
                <Option
                  isActive={locale === "en"}
                  ariaLabel={labels[locale].toEnglish}
                  onSelect={() => selectLocale("en")}
                >
                  ENGLISH
                </Option>
              </div>
            </section>

            <section className={styles.section}>
              <p className={styles.sectionLabel}>{label.sound}</p>
              <div className={styles.optionRow}>
                <Option
                  isActive={soundEnabled}
                  ariaLabel={label.soundOn}
                  onSelect={() => applySound(true)}
                >
                  ON
                </Option>
                <Option
                  isActive={!soundEnabled}
                  ariaLabel={label.soundOff}
                  onSelect={() => applySound(false)}
                >
                  OFF
                </Option>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
