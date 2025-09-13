"use client";

import { useEffect, useState } from "react";
import type { MenuItem } from "../menu";
import styles from "./MessageWindow.module.scss";

interface MessageWindowProps {
  selectedMenuItem: MenuItem;
  onTypingChange?: (isTyping: boolean) => void;
}

const messages = {
  about:
    "おや？ 旅人よ、ようこそ 我が館へ！\n" +
    "ここでは ogison の ひみつを 少しばかり のぞくことができるんだ。\n\n" +
    "・展示された宝（作品）\n" +
    "・封印の書物（スキル） \n" +
    "・旅人へのしるべ（コンタクト）\n\n" +
    "さあ、どれを 見てみるかい？",
  skills:
    "ゆうしゃは かずかずの じゅもんを おぼえた！\n\nメラ：HTML\nギラ：CSS\nヒャド：JavaScript\nイオ：React/Vue\nライデイン：Node.js\nベホイミ：Git/GitHub\nルーラ：AWS",
  works:
    "これまでに てにいれた どうぐの いちらんだ。\n\n・伝説の剣(ポートフォリオ)\n・賢者の石(ブログ)\n・王者の盾(〇〇社でのプロジェクト)",
  contact:
    "やあ、ここまで来てくれてありがとう。\n" +
    "外の世界で また会えるように\n" +
    "しるべを 用意しておいたよ。\n\n" +
    "・ねこの かげ（GitHub）\n" +
    "・くろき X のしるし（X/Twitter）\n" +
    "さあ、好きな場所で 声をかけてくれ。",
};

const contactLinks = {
  github: "https://github.com/ogison",
  twitter: "https://x.com/ogison999",
};

export default function MessageWindow({ selectedMenuItem, onTypingChange }: MessageWindowProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const message = messages[selectedMenuItem];
    setDisplayedText("");
    setShowCursor(false);
    setIsTypingComplete(false);
    onTypingChange?.(true);

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText(message.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setShowCursor(true);
        setIsTypingComplete(true);
        onTypingChange?.(false);
        clearInterval(typeInterval);
      }
    }, 50);

    return () => {
      clearInterval(typeInterval);
      onTypingChange?.(false);
    };
  }, [selectedMenuItem, onTypingChange]);

  const formatText = (text: string) => {
    if (selectedMenuItem === "contact" && isTypingComplete) {
      const lines = text.split("\n");
      return lines.map((line, index) => {
        let processedLine: React.ReactNode = line;

        if (line.includes("GitHub")) {
          processedLine = (
            <>
              {line.substring(0, line.indexOf("GitHub"))}
              <a
                href={contactLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                GitHub
              </a>
              {line.substring(line.indexOf("GitHub") + 6)}
            </>
          );
        } else if (line.includes("X/Twitter")) {
          processedLine = (
            <>
              {line.substring(0, line.indexOf("X/Twitter"))}
              <a
                href={contactLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                X/Twitter
              </a>
              {line.substring(line.indexOf("X/Twitter") + 9)}
            </>
          );
        }

        return (
          <span key={index}>
            {processedLine}
            {index < lines.length - 1 && <br />}
          </span>
        );
      });
    }

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
