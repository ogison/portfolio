"use client";

import { useSoundSettings } from "@/features/message/useSound";

interface SoundToggleProps {
  className?: string;
}

export default function SoundToggle({ className = "" }: SoundToggleProps) {
  const { soundEnabled, toggleSound } = useSoundSettings();

  return (
    <button
      onClick={toggleSound}
      className={`nes-btn is-small ${className}`}
      aria-label={soundEnabled ? "音声をオフにする" : "音声をオンにする"}
      title={soundEnabled ? "音声: オン" : "音声: オフ"}
    >
      {soundEnabled ? "🔊" : "🔇"}
    </button>
  );
}
