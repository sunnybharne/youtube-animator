type MonitorPanel = {
  mainText: string;
  secondaryText: string | null;
  backgroundURL: string | null;
};

function looksLikeImageURL(url: string) {
  return /\.(png|jpe?g|gif|webp|avif|svg)(\?.*)?$/i.test(url) || /picsum\.photos/i.test(url);
}

type AnimationSet = {
  panelClasses: [string, string, string];
  panelDelayStep: number;
  contentDelayStart: number;
  contentDelayStep: number;
};

type TextRevealVariant = {
  tagClassName: string;
  titleClassName: string;
  barClassName: string;
};

const panelGradients = [
  "from-fuchsia-600 via-purple-700 to-indigo-900",
  "from-cyan-500 via-sky-700 to-blue-900",
  "from-amber-500 via-rose-600 to-pink-800",
] as const;

const textRevealVariants: readonly TextRevealVariant[] = [
  {
    tagClassName: "text-reveal-tag",
    titleClassName: "text-reveal-title",
    barClassName: "text-reveal-bar",
  },
  {
    tagClassName: "text-reveal-tag-alt",
    titleClassName: "text-reveal-title-alt",
    barClassName: "text-reveal-bar-alt",
  },
  {
    tagClassName: "text-reveal-tag-flash",
    titleClassName: "text-reveal-title-flash",
    barClassName: "text-reveal-bar-flash",
  },
  {
    tagClassName: "text-reveal-tag-swipe",
    titleClassName: "text-reveal-title-swipe",
    barClassName: "text-reveal-bar-swipe",
  },
  {
    tagClassName: "text-reveal-tag-burst",
    titleClassName: "text-reveal-title-burst",
    barClassName: "text-reveal-bar-burst",
  },
] as const;

const animationSets: readonly AnimationSet[] = [
  {
    panelClasses: ["monitor-enter-left", "monitor-enter-center", "monitor-enter-right"],
    panelDelayStep: 90,
    contentDelayStart: 220,
    contentDelayStep: 90,
  },
  {
    panelClasses: ["monitor-enter-top-left", "monitor-enter-top", "monitor-enter-top-right"],
    panelDelayStep: 70,
    contentDelayStart: 170,
    contentDelayStep: 65,
  },
  {
    panelClasses: [
      "monitor-enter-bottom-left",
      "monitor-enter-bottom",
      "monitor-enter-bottom-right",
    ],
    panelDelayStep: 70,
    contentDelayStart: 170,
    contentDelayStep: 65,
  },
  {
    panelClasses: ["monitor-enter-left-wide", "monitor-enter-top", "monitor-enter-right-wide"],
    panelDelayStep: 62,
    contentDelayStart: 150,
    contentDelayStep: 58,
  },
  {
    panelClasses: [
      "monitor-enter-side-skim-left",
      "monitor-enter-center-pop",
      "monitor-enter-side-skim-right",
    ],
    panelDelayStep: 48,
    contentDelayStart: 130,
    contentDelayStep: 46,
  },
  {
    panelClasses: [
      "monitor-enter-top-right",
      "monitor-enter-top-left",
      "monitor-enter-bottom-right",
    ],
    panelDelayStep: 52,
    contentDelayStart: 140,
    contentDelayStep: 48,
  },
  {
    panelClasses: [
      "monitor-enter-bottom-right",
      "monitor-enter-center-pop",
      "monitor-enter-top-left",
    ],
    panelDelayStep: 45,
    contentDelayStart: 120,
    contentDelayStep: 40,
  },
  {
    panelClasses: [
      "monitor-enter-top-left",
      "monitor-enter-side-skim-right",
      "monitor-enter-bottom",
    ],
    panelDelayStep: 38,
    contentDelayStart: 105,
    contentDelayStep: 34,
  },
  {
    panelClasses: [
      "monitor-enter-right-wide",
      "monitor-enter-top-left",
      "monitor-enter-bottom-left",
    ],
    panelDelayStep: 42,
    contentDelayStart: 120,
    contentDelayStep: 38,
  },
] as const;

export const MONITOR_ANIMATION_SET_COUNT = animationSets.length;

type MonitorDisplayProps = {
  isExiting?: boolean;
  monitors: [MonitorPanel, MonitorPanel, MonitorPanel];
  animationSetIndex?: number;
  visibleTextCount?: number;
};

export default function MonitorDisplay({
  isExiting = false,
  monitors,
  animationSetIndex = 0,
  visibleTextCount = 3,
}: MonitorDisplayProps) {
  const selectedAnimationSet =
    animationSets[((animationSetIndex % MONITOR_ANIMATION_SET_COUNT) + MONITOR_ANIMATION_SET_COUNT) %
      MONITOR_ANIMATION_SET_COUNT];

  return (
    <div className="monitor-page relative h-screen w-screen overflow-hidden bg-slate-950">
      <div className="monitor-background absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 -top-72 h-144 w-xl rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-36 -bottom-64 h-136 w-136 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="monitor-stage relative z-10 h-full w-full px-3 py-4 md:px-4 md:py-5">
        <div className="grid h-full w-full grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {monitors.map((monitor, i) => {
            const isTextVisible = i < visibleTextCount;
            const hasURL =
              typeof monitor.backgroundURL === "string" && monitor.backgroundURL.length > 0;
            const hasImageBackground = hasURL && looksLikeImageURL(monitor.backgroundURL!);
            const textRevealVariant =
              textRevealVariants[
                ((animationSetIndex * 7 + i * 3) % textRevealVariants.length +
                  textRevealVariants.length) %
                  textRevealVariants.length
              ];

            return (
              <section
                key={`${monitor.mainText}-${i}`}
                className={`${isExiting ? "monitor-exit" : "monitor-enter"} relative flex h-[28vh] items-center justify-center overflow-hidden rounded-3xl border border-white/25 shadow-[0_26px_80px_rgba(0,0,0,0.55)] md:h-full ${hasImageBackground ? "bg-slate-900" : `bg-linear-to-br ${panelGradients[i]}`} ${selectedAnimationSet.panelClasses[i]}`}
                style={{
                  animationDelay: `${isExiting ? i * 40 : i * selectedAnimationSet.panelDelayStep}ms`,
                }}
              >
                {hasImageBackground ? (
                  <>
                    <div
                      className="pointer-events-none absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${encodeURI(monitor.backgroundURL!)}')` }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/35" />
                  </>
                ) : null}

                <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                  }}
                />

                <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-black/35 blur-3xl" />

                <div
                  className={`${isExiting ? "monitor-content-exit" : "monitor-content-enter"} relative z-10 flex flex-col items-center gap-6 text-center`}
                  style={{
                    animationDelay: `${
                      isExiting
                        ? i * 20
                        : selectedAnimationSet.contentDelayStart +
                          i * selectedAnimationSet.contentDelayStep
                    }ms`,
                  }}
                >
                  {isTextVisible && monitor.secondaryText ? (
                    <div
                      className={`${textRevealVariant.tagClassName} relative overflow-hidden rounded-md border border-cyan-200/45 bg-black/35 px-4 py-2 shadow-[0_0_30px_rgba(56,189,248,0.35)]`}
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-400/20 via-transparent to-fuchsia-400/20" />
                      <div className="relative flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
                        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-cyan-100/95">
                          {monitor.secondaryText}
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {isTextVisible ? (
                    <>
                      <div className={textRevealVariant.titleClassName}>
                        <h1 className="subscribe-fancy px-4 text-6xl font-black uppercase leading-none tracking-tight md:text-7xl">
                          {monitor.mainText}
                        </h1>
                      </div>
                      <div
                        className={`${textRevealVariant.barClassName} h-1 w-36 rounded-full bg-white/70`}
                      />

                      {hasURL && !hasImageBackground ? (
                        <div className="text-reveal-embed w-[92%] max-w-136 overflow-hidden rounded-xl border border-white/25 bg-black/40 shadow-[0_14px_36px_rgba(0,0,0,0.45)]">
                          <iframe
                            src={monitor.backgroundURL!}
                            title={`${monitor.mainText} embedded site`}
                            className="h-40 w-full bg-white md:h-48"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          />

                          <div className="flex items-center justify-end border-t border-white/10 bg-black/45 px-3 py-2">
                            <a
                              href={monitor.backgroundURL!}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cyan-100/90"
                            >
                              Open URL
                            </a>
                          </div>
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
