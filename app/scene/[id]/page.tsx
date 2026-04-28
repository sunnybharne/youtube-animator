import { notFound } from "next/navigation";
import { getScenes } from "../../lib/scenes";
import SceneClient from "./SceneClient";

export default async function ScenePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ reveal?: string }>;
}) {
  const { id } = await params;
  const { reveal } = await searchParams;
  const revealMode = reveal === "step" ? "step" : "all";
  const scene = getScenes().find((s) => s.id === id);

  if (!scene) {
    notFound();
  }

  return <SceneClient scene={scene} revealMode={revealMode} />;
}
