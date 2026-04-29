"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MonitorDisplay from "../../components/MonitorDisplay";
import type { Scene } from "../../lib/scenes";

type SceneClientProps = {
  scene: Scene;
  revealMode: "all" | "step";
};

const ANIMATION_SEQUENCE_STORAGE_KEY = "scene:monitor-animation-sequence:v1";

export default function SceneClient({ scene, revealMode }: SceneClientProps) {
  const router = useRouter();
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isExitingRef = useRef(false);
  const [isExiting, setIsExiting] = useState(false);
  const [visibleTextCount, setVisibleTextCount] = useState(revealMode === "step" ? 0 : 3);
  const [animationSetIndex] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    const rawValue = window.sessionStorage.getItem(ANIMATION_SEQUENCE_STORAGE_KEY);
    const parsed = rawValue ? Number.parseInt(rawValue, 10) : 0;

    return Number.isFinite(parsed) ? parsed : 0;
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
      const key = event.key.toLowerCase();
      const isAKey = key === "a" || event.code === "KeyA";

      if (revealMode === "step") {
        const isJKey = key === "j" || event.code === "KeyJ";
        const isKKey = key === "k" || event.code === "KeyK";

        if (isJKey) {
          event.preventDefault();
          setVisibleTextCount((current) => Math.min(3, current + 1));
          return;
        }

        if (isKKey) {
          event.preventDefault();
          setVisibleTextCount((current) => Math.max(0, current - 1));
          return;
        }
      }

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
  }, [revealMode, router, startExit]);

  return (
    <MonitorDisplay
      isExiting={isExiting}
      animationSetIndex={animationSetIndex}
      visibleTextCount={visibleTextCount}
      monitors={[
        {
          mainText: scene.monitorOneMainText,
          secondaryText: scene.monitorOneSecondaryText,
          backgroundURL: scene.monitorOneURL,
        },
        {
          mainText: scene.monitorTwoMainText,
          secondaryText: scene.monitorTwoSecondaryText,
          backgroundURL: scene.monitorTwoURL,
        },
        {
          mainText: scene.monitorThreeMainText,
          secondaryText: scene.monitorThreeSecondaryText,
          backgroundURL: scene.monitorThreeURL,
        },
      ]}
    />
  );
}
