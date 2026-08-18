"use client";

import { useCallback, useEffect, useRef } from "react";
import { useSoundSettings } from "./useSound";

/** カーソル移動と決定で鳴らす2種類のSE。 */
export type BeepKind = "move" | "confirm";

type Tone = {
  /** 周波数（Hz） */
  freq: number;
  /** 鳴り始めるまでの待ち（秒） */
  offset: number;
  /** 鳴っている長さ（秒） */
  duration: number;
};

// ファミコンの矩形波を模した短いSE。音声ファイルは持たず、WebAudioで都度合成する。
// 決定音だけ2音つないで「ピロッ」と上がる音にしている。
const TONES: Record<BeepKind, Tone[]> = {
  move: [{ freq: 880, offset: 0, duration: 0.04 }],
  confirm: [
    { freq: 988, offset: 0, duration: 0.05 },
    { freq: 1319, offset: 0.05, duration: 0.09 },
  ],
};

// message-type.mp3（0.3）より控えめにする。連続で鳴るのでうるさくなりやすい。
const PEAK_GAIN = 0.08;

/**
 * ファミコン風の効果音を鳴らす関数を返す。
 *
 * AudioContext はクリックやキー操作の中で初めて作る（ブラウザの自動再生制限のため、
 * ユーザー操作より前に作ると suspended のまま鳴らない）。
 * サウンドのON/OFFは useSoundSettings の設定に従う。
 */
export function useBeep() {
  const { soundEnabled } = useSoundSettings();
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      void contextRef.current?.close();
      contextRef.current = null;
    };
  }, []);

  return useCallback(
    (kind: BeepKind) => {
      if (!soundEnabled || typeof window === "undefined") {
        return;
      }

      const AudioContextClass =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) {
        return;
      }

      try {
        contextRef.current ??= new AudioContextClass();
        const context = contextRef.current;
        if (context.state === "suspended") {
          void context.resume();
        }

        const now = context.currentTime;
        for (const tone of TONES[kind]) {
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          oscillator.type = "square";
          oscillator.frequency.value = tone.freq;

          const start = now + tone.offset;
          const end = start + tone.duration;
          // 矩形波をそのまま切ると「プツッ」と鳴るので、両端だけ短く絞る。
          gain.gain.setValueAtTime(0, start);
          gain.gain.linearRampToValueAtTime(PEAK_GAIN, start + 0.005);
          gain.gain.setValueAtTime(PEAK_GAIN, end - 0.005);
          gain.gain.linearRampToValueAtTime(0, end);

          oscillator.connect(gain);
          gain.connect(context.destination);
          oscillator.start(start);
          oscillator.stop(end);
        }
      } catch {
        // 音が出せない環境でも操作は止めない
      }
    },
    [soundEnabled]
  );
}
