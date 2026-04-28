const monitors = ["MONITOR 1", "MONITOR 2", "MONITOR 3"] as const;

const panelGradients = [
  "from-fuchsia-600 via-purple-700 to-indigo-900",
  "from-cyan-500 via-sky-700 to-blue-900",
  "from-amber-500 via-rose-600 to-pink-800",
] as const;

const panelMotionClasses = [
  "monitor-enter-left",
  "monitor-enter-center",
  "monitor-enter-right",
] as const;

type MonitorDisplayProps = {
  isExiting?: boolean;
};

export default function MonitorDisplay({ isExiting = false }: MonitorDisplayProps) {
  return (
    <div className="monitor-page relative h-screen w-screen overflow-hidden bg-slate-950">
      <div className="monitor-background absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 -top-72 h-144 w-xl rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-36 -bottom-64 h-136 w-136 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="monitor-stage relative z-10 h-full w-full px-3 py-4 md:px-4 md:py-5">
        <div className="grid h-full w-full grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {monitors.map((label, i) => (
            <section
              key={label}
              className={`${isExiting ? "monitor-exit" : "monitor-enter"} relative flex h-[28vh] items-center justify-center overflow-hidden rounded-3xl border border-white/25 bg-linear-to-br shadow-[0_26px_80px_rgba(0,0,0,0.55)] md:h-full ${panelGradients[i]} ${panelMotionClasses[i]}`}
              style={{ animationDelay: `${isExiting ? i * 40 : i * 90}ms` }}
            >
              {/* subtle grid overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                  backgroundSize: "64px 64px",
                }}
              />

              {/* glow blobs */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-black/35 blur-3xl" />

              {/* content */}
              <div
                className={`${isExiting ? "monitor-content-exit" : "monitor-content-enter"} relative z-10 flex flex-col items-center gap-6 text-center`}
                style={{ animationDelay: `${isExiting ? i * 20 : 220 + i * 90}ms` }}
              >
                <span className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-medium uppercase tracking-[0.3em] text-white/80 backdrop-blur-md">
                  Display {i + 1} of 3
                </span>
                <h1 className="px-4 text-6xl font-black uppercase leading-none tracking-tight text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.45)] md:text-7xl">
                  {label}
                </h1>
                <div className="h-1 w-36 rounded-full bg-white/70" />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
