"use client";

import { useEffect, useState } from "react";
import StartScreen from "@/components/StartScreen";
import GameHeader from "@/components/GameHeader";
import PixelAvatar from "@/components/PixelAvatar";
import MenuGrid, { type MenuItem } from "@/components/MenuGrid";
import MessageWindow from "@/components/MessageWindow";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem>("about");
  const [startScreenOpacity, setStartScreenOpacity] = useState(1);

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
    setSelectedMenuItem(item);
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
    <div className="game-container">
      <GameHeader />
      <main className="flex flex-col md:flex-row gap-4 flex-1">
        <div className="md:w-1/2 flex flex-col gap-4">
          <div className="window flex-grow flex items-center justify-center p-4">
            <PixelAvatar />
          </div>
          <MenuGrid
            activeIndex={activeMenuIndex}
            onMenuSelect={handleMenuSelect}
            onMenuChange={handleMenuChange}
          />
        </div>
        <MessageWindow selectedMenuItem={selectedMenuItem} />
      </main>
    </div>
  );
}
