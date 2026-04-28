"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MonitorDisplay, {
  MONITOR_ANIMATION_SET_COUNT,
} from "../../components/MonitorDisplay";
import type { Scene } from "../../lib/scenes";

type SceneClientProps = {
  scene: Scene;
};

const ANIMATION_SEQUENCE_STORAGE_KEY = "scene:monitor-animation-sequence:v1";

export default function SceneClient({ scene }: SceneClientProps) {
  const router = useRouter();
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isExitingRef = useRef(false);
  const [isExiting, setIsExiting] = useState(false);
  const [animationSetIndex] = useState(() => {
    const rawValue = window.sessionStorage.getItem(ANIMATION_SEQUENCE_STORAGE_KEY);
    const parsed = rawValue ? Number.parseInt(rawValue, 10) : 0;
    const safeCurrent = Number.isFinite(parsed)
      ? ((parsed % MONITOR_ANIMATION_SET_COUNT) + MONITOR_ANIMATION_SET_COUNT) %
        MONITOR_ANIMATION_SET_COUNT
      : 0;
    const next = (safeCurrent + 1) % MONITOR_ANIMATION_SET_COUNT;

    window.sessionStorage.setItem(ANIMATION_SEQUENCE_STORAGE_KEY, String(next));

    return safeCurrent;
  });

  const navigateHome = useCallback(() => {
    router.push("/");
  }, [router]);

  const startExit = useCallback(() => {
    if (isExitingRef.current) {
      return;
    }

    isExitingRef.current = true;
    setIsExiting(true);
    exitTimeoutRef.current = setTimeout(navigateHome, 240);
  }, [navigateHome]);

  useEffect(() => {
    router.prefetch("/");

    const handleKeyDown = (event: KeyboardEvent) => {
      const isAKey = event.key.toLowerCase() === "a" || event.code === "KeyA";

      if (!isAKey) {
        return;
      }

      event.preventDefault();
      startExit();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }
    };
  }, [router, startExit]);

  return (
    <MonitorDisplay
      isExiting={isExiting}
      animationSetIndex={animationSetIndex}
      monitors={[
        { mainText: scene.monitorOneMainText, secondaryText: scene.monitorOneSecondaryText },
        { mainText: scene.monitorTwoMainText, secondaryText: scene.monitorTwoSecondaryText },
        { mainText: scene.monitorThreeMainText, secondaryText: scene.monitorThreeSecondaryText },
      ]}
    />
  );
}
