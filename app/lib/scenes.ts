import fs from "fs";
import path from "path";

export type Scene = {
  id: string;
  label: string;
  subText: string;
  monitorOneMainText: string;
  monitorOneSecondaryText: string;
  monitorTwoMainText: string;
  monitorTwoSecondaryText: string;
  monitorThreeMainText: string;
  monitorThreeSecondaryText: string;
};

export function getScenes(): Scene[] {
  const dir = path.join(process.cwd(), "scenes");

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as Scene)
    .sort((a, b) => a.label.localeCompare(b.label));
}
