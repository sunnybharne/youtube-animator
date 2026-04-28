import { notFound } from "next/navigation";
import { getScenes } from "../../lib/scenes";
import SceneClient from "./SceneClient";

export default async function ScenePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scene = getScenes().find((s) => s.id === id);

  if (!scene) {
    notFound();
  }

  return <SceneClient scene={scene} />;
}
