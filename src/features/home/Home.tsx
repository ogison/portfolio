"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GameHeader from "@/features/header/GameHeader";
import PixelAvatar from "@/features/avatar/PixelAvatar";
import MenuGrid, { type MenuItem } from "@/features/menu/MenuGrid";
import MessageWindow from "@/features/message/MessageWindow";
import styles from "./Home.module.scss";

const menuItems = [
  { id: "about" as MenuItem, label: "はなす" },
  { id: "skills" as MenuItem, label: "封印の書物（スキル） " },
  { id: "works" as MenuItem, label: "展示された宝（作品） " },
  { id: "contact" as MenuItem, label: "旅人へのしるべ（コンタクト）" },
];

export default function Home() {
  const searchParams = useSearchParams();
  const fromShop = searchParams.get("from") === "shop";
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem>(
    fromShop ? "returnHome" : "welcome",
  );
  const [isTyping, setIsTyping] = useState(false);
  const [menuSelectKey, setMenuSelectKey] = useState(0);
  const router = useRouter();

  const handleMenuSelect = (item: MenuItem) => {
    if (item === "works") {
      router.push("/shop");
      return;
    }
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
