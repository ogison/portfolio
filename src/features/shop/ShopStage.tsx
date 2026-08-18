"use client";

import Image from "next/image";
import styles from "./ShopStage.module.scss";
import type { WorkItem } from "./works";
import SettingsMenu from "@/components/SettingsMenu";
import PixelAvatar from "@/features/avatar/PixelAvatar";

interface ShopStageProps {
  selectedWork: WorkItem | null;
  itemCount: number;
  /** メッセージウィンドウが文字を打っている間だけ店主の口を動かす。 */
  isTyping?: boolean;
}

export default function ShopStage({ selectedWork, itemCount, isTyping = false }: ShopStageProps) {
  return (
    <div className={styles.stage}>
      <span className={styles.cornerBottomLeft} aria-hidden="true"></span>
      <span className={styles.cornerBottomRight} aria-hidden="true"></span>

      <div className={styles.backdrop} aria-hidden="true"></div>

      {selectedWork && (
        <span key={`flash-${selectedWork.id}`} className={styles.flash} aria-hidden="true"></span>
      )}

      <div className={styles.keeper}>
        <PixelAvatar isTyping={isTyping} className={styles.keeperAvatar} />
      </div>

      <span className={styles.counter} aria-hidden="true"></span>
      <span className={styles.counterEdge} aria-hidden="true"></span>

      <div className={styles.purse}>
        <div className={`${styles.purseList} font-press-start`}>
          <p>GOLD : 999,999</p>
          <p>ITEMS : {itemCount}</p>
        </div>
      </div>

      <div className={styles.settings}>
        <SettingsMenu />
      </div>

      <div
        key={`goods-${selectedWork?.id ?? "empty"}`}
        className={`${styles.goods} ${selectedWork ? styles.goodsPlaced : ""}`}
      >
        <div className={styles.goodsFrame}>
          {selectedWork ? (
            <Image
              className={styles.goodsIcon}
              src={selectedWork.iconPath}
              alt={`${selectedWork.title} icon`}
              width={240}
              height={240}
            />
          ) : (
            <span className={`${styles.goodsEmpty} font-press-start`}>SELECT AN ITEM</span>
          )}
        </div>
        {/* 作品名の長さや未選択かどうかで枠の位置がずれないよう、高さを固定した箱にまとめる。 */}
        <div className={styles.goodsCaption}>
          {selectedWork && (
            <>
              <span className={styles.goodsName}>{selectedWork.title}</span>
              <span className={`${styles.goodsPrice} font-press-start`}>{selectedWork.price}</span>
            </>
          )}
          {selectedWork ? (
            <a
              className={`${styles.goodsLink} font-press-start`}
              href={selectedWork.link}
              target="_blank"
              rel="noreferrer"
            >
              OPEN PROJECT
            </a>
          ) : (
            <span className={`${styles.goodsLinkPlaceholder} font-press-start`}>
              SELECT TO OPEN
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
