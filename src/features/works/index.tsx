"use client";

import { useEffect, useState } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";
import styles from "./works.module.scss";

export type WorkItem = {
  id: string;
  title: string;
  price: string;
  description: string;
  link: string;
  iconPath: string;
};

const works: WorkItem[] = [
  {
    id: "portfolio",
    title: "ポートフォリオ",
    price: "50,000 G",
    description:
      "RPGみたいな世界観で作った、遊べるポートフォリオだよ。\n" +
      "UIも音も動きも、ひとつずつこだわって仕上げてるんだ。\n" +
      "よかったら実際に触って、雰囲気を感じてみてね。",
    link: "https://portfolio-ogison.vercel.app/",
    iconPath: "/images/works/portfolio.svg",
  },
  {
    id: "awawari",
    title: "割り勘計算アプリ",
    price: "10,000 G",
    description:
      "ビールをモチーフにした、気軽に使える割り勘アプリだよ。\n" +
      "人数と金額を入れるだけで、だれがいくら払うかすぐ分かるんだ。\n" +
      "飲み会の会計をサッと決めたいときに使ってみてね。",
    link: "https://dutch-treat-smoky.vercel.app/",
    iconPath: "/images/works/awawari.svg",
  },
  {
    id: "suzuki",
    title: "鈴木たけろう ホームページ",
    price: "60,000 G",
    description:
      "各務原市議会議員・鈴木たけろうさんの活動や政策をまとめたホームページだよ。\n" +
      "知りたい情報に迷わずたどり着けるよう、構成を分かりやすく整えてるんだ。\n" +
      "必要な情報をすぐ読めることを大事にして作ったよ。",
    link: "https://suzukitakero-kakamigahara.jp/",
    iconPath: "/images/works/suzuki.svg",
  },
];

interface WorksShowcaseProps {
  onSelectedWorkChange?: (work: WorkItem | null) => void;
}

interface WorksListPanelProps {
  works: WorkItem[];
  activeIndex: number;
  selectedIndex: number | null;
  onListKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onSelect: (index: number) => void;
}

function WorksListPanel({
  works,
  activeIndex,
  selectedIndex,
  onListKeyDown,
  onSelect,
}: WorksListPanelProps) {
  return (
    <div className={styles.listPanel} tabIndex={0} onKeyDown={onListKeyDown}>
      <ul className={styles.list}>
        {works.map((item, index) => (
          <li
            key={item.id}
            className={`${styles.listItem} ${index === activeIndex ? styles.active : ""} ${
              index === selectedIndex ? styles.selected : ""
            }`}
            onClick={() => onSelect(index)}
          >
            <span className={styles.itemName}>{item.title}</span>
            <span className={styles.itemPrice}>{item.price}</span>
          </li>
        ))}
      </ul>
      <div className={styles.listBottomRow}>
        <div className={styles.listCommand}>[UP/DOWN] SELECT</div>
        <div className={styles.listFooter}>GOLD: 999,999</div>
      </div>
    </div>
  );
}

interface PreviewPanelProps {
  selectedItem: WorkItem | null;
}

function PreviewPanel({ selectedItem }: PreviewPanelProps) {
  return (
    <div className={styles.detailPanel}>
      <div className={styles.previewFrame}>
        {selectedItem ? (
          <div className={styles.previewContent}>
            <Image
              className={styles.previewIcon}
              src={selectedItem.iconPath}
              alt={`${selectedItem.title} icon`}
              width={240}
              height={240}
            />
          </div>
        ) : (
          <div className={styles.previewEmpty}>SELECT AN ITEM</div>
        )}
      </div>
      <div className={styles.previewLinkRow}>
        {selectedItem ? (
          <a className={styles.link} href={selectedItem.link} target="_blank" rel="noreferrer">
            OPEN PROJECT
          </a>
        ) : (
          <span className={styles.previewLinkPlaceholder}>SELECT TO OPEN</span>
        )}
      </div>
    </div>
  );
}

export default function WorksShowcase({ onSelectedWorkChange }: WorksShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedItem = selectedIndex === null ? null : works[selectedIndex];

  useEffect(() => {
    onSelectedWorkChange?.(selectedItem);
  }, [onSelectedWorkChange, selectedItem]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + works.length) % works.length);
        break;
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % works.length);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        setSelectedIndex(activeIndex);
        break;
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <WorksListPanel
          works={works}
          activeIndex={activeIndex}
          selectedIndex={selectedIndex}
          onListKeyDown={handleKeyDown}
          onSelect={(index) => {
            setActiveIndex(index);
            setSelectedIndex(index);
          }}
        />

        <PreviewPanel selectedItem={selectedItem} />
      </div>
    </section>
  );
}
