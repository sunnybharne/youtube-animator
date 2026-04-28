import fs from "fs";
import path from "path";

export type Scene = {
  id: string;
  label: string;
  monitorOneMainText: string;
  monitorOneSecondaryText: string;
  monitorTwoMainText: string;
  monitorTwoSecondaryText: string;
  monitorThreeMainText: string;
  monitorThreeSecondaryText: string;
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
    typeof data.monitorOneSecondaryText === "string" &&
    typeof data.monitorTwoMainText === "string" &&
    typeof data.monitorTwoSecondaryText === "string" &&
    typeof data.monitorThreeMainText === "string" &&
    typeof data.monitorThreeSecondaryText === "string"
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
