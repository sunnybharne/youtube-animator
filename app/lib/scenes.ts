import fs from "fs";
import path from "path";

export type Scene = {
  id: string;
  label: string;
  monitorOneMainText: string;
  monitorOneSecondaryText: string | null;
  monitorOneURL: string | null;
  monitorTwoMainText: string;
  monitorTwoSecondaryText: string | null;
  monitorTwoURL: string | null;
  monitorThreeMainText: string;
  monitorThreeSecondaryText: string | null;
  monitorThreeURL: string | null;
};

type SceneFileConfig = Omit<Scene, "id">;

function isValidSceneConfig(value: unknown): value is SceneFileConfig {
  if (!value || typeof value !== "object") {
    return false;
  }

  const data = value as Record<string, unknown>;

  return (
    typeof data.label === "string" &&
    typeof data.monitorOneMainText === "string" &&
    (typeof data.monitorOneSecondaryText === "string" || data.monitorOneSecondaryText === null) &&
    (typeof data.monitorOneURL === "string" || data.monitorOneURL === null) &&
    typeof data.monitorTwoMainText === "string" &&
    (typeof data.monitorTwoSecondaryText === "string" || data.monitorTwoSecondaryText === null) &&
    (typeof data.monitorTwoURL === "string" || data.monitorTwoURL === null) &&
    typeof data.monitorThreeMainText === "string" &&
    (typeof data.monitorThreeSecondaryText === "string" || data.monitorThreeSecondaryText === null) &&
    (typeof data.monitorThreeURL === "string" || data.monitorThreeURL === null)
  );
}

export function getScenes(): Scene[] {
  const dir = path.join(process.cwd(), "scenes");

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((entry) => fs.statSync(path.join(dir, entry)).isDirectory())
    .flatMap((sceneId) => {
      const sceneFilePath = path.join(dir, sceneId, "scene.json");

      if (!fs.existsSync(sceneFilePath)) {
        return [];
      }

      try {
        const parsed = JSON.parse(fs.readFileSync(sceneFilePath, "utf8")) as unknown;

        if (!isValidSceneConfig(parsed)) {
          return [];
        }

        return [{ id: sceneId, ...parsed }];
      } catch {
        return [];
      }
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}
