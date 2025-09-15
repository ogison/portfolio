"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PixelAvatarProps {
  isTyping?: boolean;
}

export default function PixelAvatar({ isTyping = false }: PixelAvatarProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!isTyping) {
      setCurrentImage(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 250);

    return () => clearInterval(interval);
  }, [isTyping]);

  const imageSrc = currentImage === 0 ? "/images/avatar.png" : "/images/avatar_2.png";

  return (
    <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 p-1">
      <Image
        src={imageSrc}
        alt="Pixel Art Avatar"
        width={128}
        height={128}
        className="w-full h-full"
        style={{ imageRendering: "pixelated" }}
        priority
      />
    </div>
  );
}
