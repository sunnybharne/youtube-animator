import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8 bg-black text-white">
      <h1 className="text-5xl font-black uppercase tracking-tight">
        YouTube Animator
      </h1>
      <p className="text-white/60 text-lg">Select a scene to preview</p>
      <Link
        href="/monitors"
        className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-medium uppercase tracking-[0.3em] text-white/80 backdrop-blur-md transition hover:bg-white/20"
      >
        Three Monitor Display
      </Link>
    </div>
  );
}
