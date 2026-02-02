"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StartScreen from "@/components/StartScreen";

export default function Page() {
  const [opacity, setOpacity] = useState(1);
  const [isStarting, setIsStarting] = useState(false);
  const router = useRouter();

  const handleStart = useCallback(() => {
    if (isStarting) {
      return;
    }
    setIsStarting(true);
    setOpacity(0);
    setTimeout(() => {
      router.push("/home");
    }, 500);
  }, [isStarting, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleStart();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleStart]);

  return (
    <div style={{ opacity }}>
      <StartScreen onStart={handleStart} />
    </div>
  );
}
