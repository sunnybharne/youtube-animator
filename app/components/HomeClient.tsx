"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { HomeContent } from "../lib/homeContent";
import type { Scene } from "../lib/scenes";

const WALLPAPER_STORAGE_KEY = "home:selected-wallpapers:v1";
const SELECTED_SCREEN_STORAGE_KEY = "home:selected-screen:v1";
const ANIMATION_SEQUENCE_STORAGE_KEY = "scene:monitor-animation-sequence:v1";

const wallpapers = [
  "/homewallpapers/ChatGPT Image Mar 29, 2025 at 11_25_33 PM.png",
  "/homewallpapers/ChatGPT Image Mar 30, 2025 at 03_44_26 PM.png",
  "/homewallpapers/ChatGPT Image Mar 30, 2025 at 03_47_39 PM.png",
  "/homewallpapers/ChatGPT Image Mar 30, 2025 at 03_50_11 PM.png",
  "/homewallpapers/ChatGPT Image Mar 30, 2025 at 03_53_45 PM.png",
  "/homewallpapers/ChatGPT Image Mar 30, 2025 at 03_57_43 PM.png",
  "/homewallpapers/ChatGPT Image Mar 30, 2025 at 04_05_13 PM.png",
  "/homewallpapers/ChatGPT Image Mar 30, 2025 at 04_11_52 PM.png",
  "/homewallpapers/ChatGPT Image Mar 30, 2025 at 04_15_15 PM.png",
  "/homewallpapers/ChatGPT Image Mar 30, 2025 at 10_56_12 PM.png",
  "/homewallpapers/ChatGPT Image Mar 30, 2025 at 10_56_14 PM.png",
  "/homewallpapers/ChatGPT Image Mar 30, 2025 at 11_00_58 PM.png",
  "/homewallpapers/ChatGPT Image Mar 30, 2025 at 11_03_53 PM.png",
  "/homewallpapers/ChatGPT Image Mar 30, 2025 at 11_07_47 PM.png",
  "/homewallpapers/ChatGPT Image Mar 30, 2025 at 11_11_11 PM.png",
  "/homewallpapers/ChatGPT Image Mar 30, 2025 at 11_14_02 PM.png",
  "/homewallpapers/ChatGPT Image Mar 30, 2025 at 11_17_07 PM.png",
  "/homewallpapers/ChatGPT Image Mar 31, 2025 at 12_04_11 AM.png",
  "/homewallpapers/ChatGPT Image Mar 31, 2025 at 01_32_04 PM.png",
] as const;

function pickUniqueWallpapers(count: number) {
  const pool = [...wallpapers];

  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, Math.min(count, pool.length));
}

type HomeClientProps = {
  scenes: Scene[];
  homeContent: HomeContent;
};

export default function HomeClient({ scenes, homeContent }: HomeClientProps) {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const stored = window.sessionStorage.getItem(SELECTED_SCREEN_STORAGE_KEY);
    const isValid = scenes.some((s) => s.id === stored);

    return isValid ? stored : null;
  });

  const [selectedWallpapers] = useState<string[]>(() => {
    if (typeof window === "undefined") {
      return pickUniqueWallpapers(3);
    }

    try {
      const stored = window.sessionStorage.getItem(WALLPAPER_STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        if (
          Array.isArray(parsed) &&
          parsed.length > 0 &&
          parsed.every((item) => typeof item === "string")
        ) {
          return parsed.slice(0, 3);
        }
      }
    } catch {
      // Ignore malformed session storage data and pick fresh wallpapers.
    }

    const nextSelection = pickUniqueWallpapers(3);

    try {
      window.sessionStorage.setItem(
        WALLPAPER_STORAGE_KEY,
        JSON.stringify(nextSelection),
      );
    } catch {
      // Ignore storage write failures (e.g., private mode restrictions).
    }

    return nextSelection;
  });

  // Persist selected scene id across navigations.
  useEffect(() => {
    if (!selectedId) {
      window.sessionStorage.removeItem(SELECTED_SCREEN_STORAGE_KEY);
      return;
    }

    window.sessionStorage.setItem(SELECTED_SCREEN_STORAGE_KEY, selectedId);
  }, [selectedId]);

  // Prefetch all scene routes eagerly.
  useEffect(() => {
    for (const scene of scenes) {
      router.prefetch(`/scene/${scene.id}`);
    }
  }, [router, scenes]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const isHKey = key === "h" || event.code === "KeyH";
      const isAKey = key === "a" || event.code === "KeyA";

      if (isAKey) {
        if (!selectedId) {
          return;
        }

        event.preventDefault();

        // Advance animation sequence once per deliberate scene entry.
        const rawValue = window.sessionStorage.getItem(ANIMATION_SEQUENCE_STORAGE_KEY);
        const parsed = rawValue ? Number.parseInt(rawValue, 10) : -1;
        const nextValue = Number.isFinite(parsed) ? parsed + 1 : 0;

        window.sessionStorage.setItem(
          ANIMATION_SEQUENCE_STORAGE_KEY,
          String(nextValue),
        );

        const revealMode = event.shiftKey ? "step" : "all";

        router.push(`/scene/${selectedId}?reveal=${revealMode}`);
        return;
      }

      if (isHKey) {
        setShowOptions((current) => !current);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router, selectedId]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 grid grid-cols-3">
        {selectedWallpapers.map((wallpaper, index) => (
          <section
            key={wallpaper}
            className="relative h-full w-full overflow-hidden border-r border-white/15 last:border-r-0"
          >
            <div
              className="home-wallpaper-enter absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${encodeURI(wallpaper)}')`,
                animationDelay: `${index * 80}ms`,
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/25 to-black/35" />
          </section>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-8 px-4 text-center md:px-8">
        <h1 className="subscribe-fancy text-center text-5xl font-black uppercase tracking-tight md:text-7xl">
          {homeContent.mainText}
        </h1>

        <p className="home-secondary-text max-w-2xl text-sm font-medium uppercase tracking-[0.2em] text-white/85 md:text-base">
          {homeContent.secondaryText}
        </p>

        {showOptions ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/20 bg-black/25 px-6 py-4 backdrop-blur-md">
            <div className="flex flex-col items-center gap-3">
              {scenes.map((scene) => (
                <label
                  key={scene.id}
                  className="flex cursor-pointer items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-white"
                >
                  <input
                    type="checkbox"
                    checked={selectedId === scene.id}
                    onChange={(event) => {
                      setSelectedId(event.target.checked ? scene.id : null);
                    }}
                    className="h-4 w-4 accent-white"
                  />
                  {scene.label}
                </label>
              ))}
            </div>

            <div className="w-full border-t border-white/15 pt-3 text-left text-xs uppercase tracking-[0.2em] text-white/75">
              <p>Shortcuts</p>
              <p className="mt-2">H: Show or hide options</p>
              <p className="mt-1">A: Go to scene (all text visible)</p>
              <p className="mt-1">Shift + A: Go to scene (step reveal mode)</p>
              <p className="mt-1">In step mode: J reveal next, K go back</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
