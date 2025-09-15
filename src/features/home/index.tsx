"use client";

import { useEffect, useState } from "react";
import StartScreen from "@/components/StartScreen";
import GameHeader from "@/features/header";
import PixelAvatar from "@/features/avatar";
import MenuGrid, { type MenuItem } from "@/features/menu";
import MessageWindow from "@/features/message";
import styles from "./home.module.scss";

const menuItems = [
  { id: "about" as MenuItem, label: "はなす" },
  { id: "skills" as MenuItem, label: "封印の書物（スキル） " },
  { id: "works" as MenuItem, label: "展示された宝（作品） " },
  { id: "contact" as MenuItem, label: "旅人へのしるべ（コンタクト）" },
];

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem>("welcome");
  const [startScreenOpacity, setStartScreenOpacity] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [menuSelectKey, setMenuSelectKey] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted && e.key === "Enter") {
        startGame();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted]);

  const startGame = () => {
    setStartScreenOpacity(0);
    setTimeout(() => {
      setGameStarted(true);
    }, 500);
  };

  const handleMenuSelect = (item: MenuItem) => {
    // 連続選択を確実に動作させるため、キーを更新して強制的に再レンダリングを促す
    setMenuSelectKey((prev) => prev + 1);
    setSelectedMenuItem(item);
    // 選択されたアイテムのインデックスを取得してactiveMenuIndexも更新
    const itemIndex = menuItems.findIndex((menuItem) => menuItem.id === item);
    if (itemIndex !== -1) {
      setActiveMenuIndex(itemIndex);
    }
  };

  const handleMenuChange = (index: number) => {
    setActiveMenuIndex(index);
  };

  if (!gameStarted) {
    return (
      <div style={{ opacity: startScreenOpacity }}>
        <StartScreen onStart={startGame} />
      </div>
    );
  }

  return (
    <div className={styles.gameContainer}>
      <GameHeader />
      <main>
        <div className={styles.panel}>
          <div className={styles.window}>
            <PixelAvatar isTyping={isTyping} />
          </div>
          <MenuGrid
            activeIndex={activeMenuIndex}
            onMenuSelect={handleMenuSelect}
            onMenuChange={handleMenuChange}
            menuItems={menuItems}
          />
        </div>
        <div className={styles.messageContainer}>
          <MessageWindow
            selectedMenuItem={selectedMenuItem}
            onTypingChange={setIsTyping}
            key={menuSelectKey}
          />
        </div>
      </main>
    </div>
  );
}
