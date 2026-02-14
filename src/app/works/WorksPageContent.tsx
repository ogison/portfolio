"use client";

import { useState } from "react";
import GameHeader from "@/features/header";
import MessageWindow from "@/features/message";
import WorksShowcase, { type WorkItem } from "@/features/works";
import styles from "./WorksPageContent.module.scss";

export default function WorksPageContent() {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  return (
    <div className={styles.gameContainer}>
      <GameHeader />
      <main className={styles.main}>
        <section className={styles.showcase}>
          <WorksShowcase onSelectedWorkChange={setSelectedWork} />
        </section>
        <section className={styles.message}>
          <MessageWindow
            key={selectedWork?.id ?? "works-default-message"}
            selectedMenuItem="works"
            customMessage={selectedWork ? selectedWork.summary : undefined}
            plainTextOnly
          />
        </section>
      </main>
    </div>
  );
}
