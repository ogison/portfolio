"use client";

import { useEffect, useState } from "react";
import type { MenuItem } from "../menu";
import styles from "./MessageWindow.module.scss";

interface MessageWindowProps {
  selectedMenuItem: MenuItem;
}

const messages = {
  about:
    "ゆうしゃ Name は なかまに なりたそうに こちらを みている！\n\n都内で働くWebエンジニアです。面白い技術とおいしいコーヒーが好きです。フロントエンドからバックエンドまで、冒険の仲間を募集しています！",
  skills:
    "ゆうしゃは かずかずの じゅもんを おぼえた！\n\nメラ：HTML\nギラ：CSS\nヒャド：JavaScript\nイオ：React/Vue\nライデイン：Node.js\nベホイミ：Git/GitHub\nルーラ：AWS",
  works:
    "これまでに てにいれた どうぐの いちらんだ。\n\n・伝説の剣(ポートフォリオ)\n・賢者の石(ブログ)\n・王者の盾(〇〇社でのプロジェクト)",
  contact:
    "てんのおつげを ききますか？\n\n・ほうしの とまりぎ (GitHub)\n・たびびとの さかば (X/Twitter)\n・てんしへの いのり (Email)",
};

export default function MessageWindow({ selectedMenuItem }: MessageWindowProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const message = messages[selectedMenuItem];
    setDisplayedText("");
    setShowCursor(false);

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText(message.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setShowCursor(true);
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [selectedMenuItem]);

  const formatText = (text: string) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
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
