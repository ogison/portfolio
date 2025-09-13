import styles from "./GameHeader.module.scss";

interface GameHeaderProps {
  name?: string;
  job?: string;
  level?: number;
  hp?: number;
  mp?: number;
}

export default function GameHeader({
  name = "ogison",
  job = "Web Engineer",
  level = 28,
  hp = 95,
  mp = 80,
}: GameHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.nameSection}>
          <p>NAME: {name}</p>
          <p>JOB : {job}</p>
        </div>
        <div className={styles.levelSection}>
          <p>LV : {level}</p>
        </div>
        <div className={styles.statsSection}>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>HP</span>
            <div className={styles.progressBarContainer}>
              <div
                className={`${styles.progressBar} ${styles.hpBar}`}
                style={{ width: `${hp}%` }}
              ></div>
            </div>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>MP</span>
            <div className={styles.progressBarContainer}>
              <div
                className={`${styles.progressBar} ${styles.mpBar}`}
                style={{ width: `${mp}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
