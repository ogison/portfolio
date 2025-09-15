"use client";
import styles from "./StartScreen.module.scss";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className={styles.startScreen} onClick={onStart}>
      <div>
        <h1 className={styles.title}>PORTFOLIO OGISON</h1>
        <p className={styles.subtitle}>PRESS ENTER KEY</p>
      </div>
    </div>
  );
}
