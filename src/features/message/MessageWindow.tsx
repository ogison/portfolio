"use client";

import { useEffect, useRef, useState } from "react";
import type { MenuItem } from "../menu/MenuGrid";
import styles from "./MessageWindow.module.scss";
import { useLocale } from "@/features/i18n/LocaleProvider";
import { formatContactText, formatWorksText } from "@/features/message/contactUtils";
import { messages } from "@/features/message/messages";
import { useSound, useSoundSettings } from "@/features/message/useSound";

interface MessageWindowProps {
  selectedMenuItem: MenuItem;
  onTypingChange?: (isTyping: boolean) => void;
  customMessage?: string;
  plainTextOnly?: boolean;
}

const BASE_SPEED = 20; // 1文字あたりの基本スピード（ms）
const MAX_TYPING_DURATION = 4000; // 表示し切るまでの上限（ms）
const MIN_INTERVAL = 16; // setIntervalの実用的な下限（ms）

// メッセージ量に応じて表示スピードを動的に計算する。
// 基本は1文字20msだが、そのままだと4秒を超える長さのときは
// 1文字あたりの時間を圧縮し、全体が MAX_TYPING_DURATION に収まるようにする。
// 圧縮の結果 MIN_INTERVAL を下回る場合は、1tickで複数文字ずつ進めて帳尻を合わせる
// （setIntervalは数msの間隔を正確に刻めないため）。
const calculateTypingPlan = (messageLength: number): { interval: number; charsPerTick: number } => {
  if (messageLength <= 0) {
    return { interval: BASE_SPEED, charsPerTick: 1 };
  }

  const idealInterval = Math.min(BASE_SPEED, MAX_TYPING_DURATION / messageLength);
  const charsPerTick = Math.max(1, Math.ceil(MIN_INTERVAL / idealInterval));

  return { interval: idealInterval * charsPerTick, charsPerTick };
};

export default function MessageWindow({
  selectedMenuItem,
  onTypingChange,
  customMessage,
  plainTextOnly = false,
}: MessageWindowProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const { soundEnabled } = useSoundSettings();
  const { locale } = useLocale();
  // aboutのランダム選択はマウント時に一度だけ決める。
  // こうしないと言語を切り替えるたびに別のエピソードに変わってしまう。
  const aboutIndexRef = useRef<number | null>(null);
  const typeSound = useSound("/sounds/message-type.mp3", {
    volume: 0.3,
    preload: true,
  });

  useEffect(() => {
    const localeMessages = messages[locale];
    let message: string;

    if (customMessage !== undefined) {
      message = customMessage;
    } else if (selectedMenuItem === "about") {
      // aboutの場合はランダムに選択
      const aboutMessages = localeMessages.about;
      if (aboutIndexRef.current === null) {
        aboutIndexRef.current = Math.floor(Math.random() * aboutMessages.length);
      }
      message = aboutMessages[aboutIndexRef.current % aboutMessages.length];
    } else {
      message = localeMessages[selectedMenuItem];
    }

    // メッセージ長に基づいて動的にタイピングスピードを計算
    const { interval: typingSpeed, charsPerTick } = calculateTypingPlan(message.length);

    setDisplayedText("");
    setShowCursor(false);
    setIsTypingComplete(false);
    onTypingChange?.(true);

    let currentIndex = 0;
    let lastSoundTime = 0;
    const soundInterval = 100;

    if (soundEnabled) {
      typeSound.play();
    }

    const typeInterval = setInterval(() => {
      if (currentIndex < message.length) {
        const nextIndex = Math.min(currentIndex + charsPerTick, message.length);
        setDisplayedText(message.slice(0, nextIndex));

        const currentTime = Date.now();
        if (
          soundEnabled &&
          currentTime - lastSoundTime > soundInterval &&
          message[currentIndex] !== "\n" &&
          message[currentIndex] !== " "
        ) {
          typeSound.stop();
          typeSound.play();
          lastSoundTime = currentTime;
        }

        currentIndex = nextIndex;
      } else {
        if (soundEnabled) {
          typeSound.stop();
        }
        setShowCursor(true);
        setIsTypingComplete(true);
        onTypingChange?.(false);
        clearInterval(typeInterval);
      }
    }, typingSpeed);

    return () => {
      clearInterval(typeInterval);
      typeSound.stop();
      onTypingChange?.(false);
    };
  }, [customMessage, selectedMenuItem, onTypingChange, soundEnabled, locale]);

  const formatText = (text: string) => {
    const lines = text.split("\n");

    if (plainTextOnly || customMessage !== undefined) {
      return lines.map((line, index) => (
        <span key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ));
    }

    if (selectedMenuItem === "contact") {
      return formatContactText(text, isTypingComplete, styles.link);
    }

    if (selectedMenuItem === "works") {
      return formatWorksText(text, isTypingComplete, styles.link);
    }

    return lines.map((line, index) => (
      <span key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className={`${styles.container} ${styles.bottomCorners}`}>
      <div className={styles.textArea}>
        <p className={styles.text}>
          {formatText(displayedText)}
          {showCursor && <span className={styles.cursor}></span>}
        </p>
      </div>
      <div className={styles.arrow}>▼</div>
    </div>
  );
}
