"use client";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div id="start-screen" className="font-press-start cursor-pointer" onClick={onStart}>
      <div>
        <h1 className="text-2xl sm:text-4xl mb-8 text-center">PORTFOLIO QUEST</h1>
        <p className="text-lg sm:text-xl animate-pulse text-center">PRESS ENTER KEY</p>
      </div>
    </div>
  );
}
