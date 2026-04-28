"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MonitorDisplay from "../../components/MonitorDisplay";

export default function ScenePage() {
  const router = useRouter();
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isExitingRef = useRef(false);
  const [isExiting, setIsExiting] = useState(false);

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

  return <MonitorDisplay isExiting={isExiting} />;
}
