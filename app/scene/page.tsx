import { monitorScene } from "../lib/monitor";
import SceneClient from "./SceneClient";

export default async function ScenePage({
  searchParams,
}: {
  searchParams: Promise<{ reveal?: string }>;
}) {
  const { reveal } = await searchParams;
  const revealMode = reveal === "step" ? "step" : "all";

  return <SceneClient scene={monitorScene} revealMode={revealMode} />;
}
