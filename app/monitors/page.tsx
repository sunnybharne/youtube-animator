"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MonitorDisplay from "../components/MonitorDisplay";

export default function MonitorsPage() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "a") {
        return;
      }

      if (window.history.length > 1) {
        router.back();
        return;
      }

      router.push("/");
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return <MonitorDisplay />;
}
