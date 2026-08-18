"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ShopStage from "./ShopStage";
import styles from "./WorksPageContent.module.scss";
import WorksShowcase from "./WorksShowcase";
import { resolveWorks } from "./works";
import { useLocale } from "@/features/i18n/LocaleProvider";
import { useBeep } from "@/features/message/useBeep";
import MessageWindow from "@/features/message/MessageWindow";

export default function WorksPageContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();
  const { locale } = useLocale();
  const beep = useBeep();

  const works = resolveWorks(locale);
  const selectedWork = selectedIndex === null ? null : (works[selectedIndex] ?? null);

  const handleSelect = (index: number) => {
    beep("confirm");
    setActiveIndex(index);
    setSelectedIndex(index);
  };

  const handleActiveIndexChange = (index: number) => {
    if (index !== activeIndex) {
      beep("move");
    }
    setActiveIndex(index);
  };

  const handleBack = () => {
    beep("confirm");
    router.push("/home");
  };

  return (
    <div className={styles.gameContainer}>
      <main className={styles.main}>
        <ShopStage selectedWork={selectedWork} itemCount={works.length} isTyping={isTyping} />
        <div className={styles.goodsRow}>
          <div className={styles.goods}>
            <WorksShowcase
              works={works}
              activeIndex={activeIndex}
              selectedIndex={selectedIndex}
              onActiveIndexChange={handleActiveIndexChange}
              onSelect={handleSelect}
              onBack={handleBack}
            />
          </div>
          <div className={styles.message}>
            <MessageWindow
              key={selectedWork?.id ?? "works-default-message"}
              selectedMenuItem="works"
              customMessage={selectedWork ? selectedWork.description : undefined}
              onTypingChange={setIsTyping}
              plainTextOnly
            />
          </div>
        </div>
      </main>
    </div>
  );
}
