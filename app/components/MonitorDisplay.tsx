const monitors = ["MONITOR 1", "MONITOR 2", "MONITOR 3"] as const;

const panelGradients = [
  "from-fuchsia-600 via-purple-700 to-indigo-900",
  "from-cyan-500 via-sky-700 to-blue-900",
  "from-amber-500 via-rose-600 to-pink-800",
] as const;

export default function MonitorDisplay() {
  return (
    <div className="flex h-screen w-screen flex-row overflow-hidden bg-black">
      {monitors.map((label, i) => (
        <section
          key={label}
          className={`relative flex h-full w-1/3 items-center justify-center overflow-hidden bg-gradient-to-br ${panelGradients[i]}`}
        >
          {/* subtle grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* glow blobs */}
          <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-48 -left-32 h-[600px] w-[600px] rounded-full bg-black/30 blur-3xl" />

          {/* content */}
          <div className="relative z-10 flex flex-col items-center gap-8 text-center">
            <span className="rounded-full border border-white/30 bg-white/10 px-6 py-2 text-sm font-medium uppercase tracking-[0.4em] text-white/80 backdrop-blur-md">
              Display {i + 1} of 3
            </span>
            <h1 className="text-[10rem] font-black uppercase leading-none tracking-tight text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
              {label}
            </h1>
            <div className="h-1 w-48 rounded-full bg-white/70" />
          </div>

          {/* divider line between monitors */}
          {i < monitors.length - 1 && (
            <div className="absolute right-0 top-0 z-20 h-full w-px bg-white/20" />
          )}
        </section>
      ))}
    </div>
  );
}
