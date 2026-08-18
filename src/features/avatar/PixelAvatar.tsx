"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type AvatarFrame = "idle" | "talk" | "blink";

const FRAMES: { name: AvatarFrame; src: string }[] = [
  { name: "idle", src: "/images/avatar.png" },
  { name: "talk", src: "/images/avatar_2.png" },
  { name: "blink", src: "/images/avatar_blink.png" },
];

const TALK_INTERVAL = 250;
const BLINK_DURATION = 130;
const BLINK_MIN_DELAY = 2500;
const BLINK_MAX_DELAY = 6500;
// たまに二度瞬きさせる確率と、その間隔
const DOUBLE_BLINK_CHANCE = 0.25;
const DOUBLE_BLINK_GAP = 170;

const randomBlinkDelay = () =>
  BLINK_MIN_DELAY + Math.random() * (BLINK_MAX_DELAY - BLINK_MIN_DELAY);

interface PixelAvatarProps {
  isTyping?: boolean;
  /** 外枠のサイズ指定を差し替える。渡さない場合は既定のサイズを使う。 */
  className?: string;
}

const DEFAULT_SIZE_CLASS = "w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 p-1";

export default function PixelAvatar({ isTyping = false, className }: PixelAvatarProps) {
  const [frame, setFrame] = useState<AvatarFrame>("idle");

  // 喋っている間は口パク
  useEffect(() => {
    if (!isTyping) return;

    setFrame("idle");
    const interval = setInterval(() => {
      setFrame((prev) => (prev === "talk" ? "idle" : "talk"));
    }, TALK_INTERVAL);

    return () => clearInterval(interval);
  }, [isTyping]);

  // 黙っている間はランダムな間隔で瞬き
  useEffect(() => {
    if (isTyping) return;

    setFrame("idle");
    let timer: ReturnType<typeof setTimeout>;

    const scheduleBlink = (delay: number, allowDouble: boolean) => {
      timer = setTimeout(() => {
        setFrame("blink");
        timer = setTimeout(() => {
          setFrame("idle");
          const isDouble = allowDouble && Math.random() < DOUBLE_BLINK_CHANCE;
          scheduleBlink(isDouble ? DOUBLE_BLINK_GAP : randomBlinkDelay(), !isDouble);
        }, BLINK_DURATION);
      }, delay);
    };

    scheduleBlink(randomBlinkDelay(), true);

    return () => clearTimeout(timer);
  }, [isTyping]);

  // 表示の瞬間に読み込むと絵が欠けるので、3枚とも重ねて置き分けを表示だけで切り替える
  return (
    <div className={className ?? DEFAULT_SIZE_CLASS}>
      <div className="relative w-full h-full" role="img" aria-label="Pixel Art Avatar">
        {FRAMES.map(({ name, src }) => (
          <Image
            key={name}
            src={src}
            alt=""
            width={256}
            height={256}
            className={`absolute inset-0 w-full h-full ${name === frame ? "" : "invisible"}`}
            style={{ imageRendering: "pixelated" }}
            priority
          />
        ))}
      </div>
    </div>
  );
}
