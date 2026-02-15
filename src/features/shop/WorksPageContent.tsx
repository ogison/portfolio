"use client";

import { useState } from "react";
import Link from "next/link";
import GameHeader from "@/features/header/GameHeader";
import MessageWindow from "@/features/message/MessageWindow";
import WorksShowcase, { type WorkItem } from "@/features/shop/WorksShowcase";
import styles from "./WorksPageContent.module.scss";

export default function WorksPageContent() {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  return (
    <div className={styles.gameContainer}>
      <GameHeader />
      <main className={styles.main}>
        <div className={styles.backButtonRow}>
          <Link href="/home?from=shop" className={styles.backButton}>
            BACK TO HOME
          </Link>
        </div>
        <section className={styles.showcase}>
          <WorksShowcase onSelectedWorkChange={setSelectedWork} />
        </section>
        <section className={styles.message}>
          <MessageWindow
            key={selectedWork?.id ?? "works-default-message"}
            selectedMenuItem="works"
            customMessage={selectedWork ? selectedWork.description : undefined}
            plainTextOnly
          />
        </section>
      </main>
    </div>
  );
}
