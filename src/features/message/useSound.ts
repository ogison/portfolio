"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseSoundOptions {
  volume?: number;
  loop?: boolean;
  preload?: boolean;
}

interface UseSoundReturn {
  play: () => void;
  stop: () => void;
  isPlaying: boolean;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  isMuted: boolean;
}

const SOUND_ENABLED_KEY = "portfolio-sound-enabled";

export function useSound(src: string | null, options: UseSoundOptions = {}): UseSoundReturn {
  const { volume = 0.5, loop = false, preload = true } = options;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // 初期値をlocalStorageから直接読み込む
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedSoundEnabled = localStorage.getItem(SOUND_ENABLED_KEY);
    return savedSoundEnabled === "false";
  });
  const [currentVolume, setCurrentVolume] = useState(volume);

  // localStorage変更の監視
  useEffect(() => {
    // storageイベントをリッスン（他のタブ/ウィンドウからの変更）
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SOUND_ENABLED_KEY) {
        queueMicrotask(() => {
          const savedSoundEnabled = localStorage.getItem(SOUND_ENABLED_KEY);
          setIsMuted(savedSoundEnabled === "false");
        });
      }
    };

    // カスタムイベントをリッスン（同じタブ内での変更）
    const handleSoundToggle = () => {
      queueMicrotask(() => {
        const savedSoundEnabled = localStorage.getItem(SOUND_ENABLED_KEY);
        setIsMuted(savedSoundEnabled === "false");
      });
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("soundToggle", handleSoundToggle);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("soundToggle", handleSoundToggle);
    };
  }, []);

  useEffect(() => {
    if (!src) return;

    const audio = new Audio(src);
    audio.volume = isMuted ? 0 : currentVolume;
    audio.loop = loop;

    if (preload) {
      audio.load();
    }

    audioRef.current = audio;

    const handleEnded = () => {
      if (!loop) {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [src]); // Only recreate when src changes

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : currentVolume;
      audioRef.current.loop = loop;
    }
  }, [currentVolume, isMuted, loop]);

  const play = useCallback(() => {
    if (!audioRef.current || isMuted) return;

    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.warn("Audio playback failed:", error);
        });
    }
  }, [isMuted]);

  const stop = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setCurrentVolume(clampedVolume);
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    setIsMuted(muted);
    localStorage.setItem(SOUND_ENABLED_KEY, muted ? "false" : "true");
  }, []);

  return {
    play,
    stop,
    isPlaying,
    setVolume,
    setMuted,
    isMuted,
  };
}

export function useSoundSettings() {
  // 初期値をlocalStorageから直接読み込む
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem(SOUND_ENABLED_KEY);
    return saved !== "false"; // デフォルトはtrue
  });

  useEffect(() => {
    // storageイベントをリッスン（他のタブ/ウィンドウからの変更）
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SOUND_ENABLED_KEY) {
        // 非同期で状態を更新
        queueMicrotask(() => {
          const saved = localStorage.getItem(SOUND_ENABLED_KEY);
          setSoundEnabled(saved !== "false");
        });
      }
    };

    // カスタムイベントをリッスン（同じタブ内での変更）
    const handleSoundToggle = () => {
      // 非同期で状態を更新
      queueMicrotask(() => {
        const saved = localStorage.getItem(SOUND_ENABLED_KEY);
        setSoundEnabled(saved !== "false");
      });
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("soundToggle", handleSoundToggle);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("soundToggle", handleSoundToggle);
    };
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem(SOUND_ENABLED_KEY, String(newValue));
      // カスタムイベントを発火（同じタブ内の他のコンポーネントに通知）
      window.dispatchEvent(new Event("soundToggle"));
      return newValue;
    });
  }, []);

  return { soundEnabled, toggleSound };
}
