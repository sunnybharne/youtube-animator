import fs from "fs";
import path from "path";

export type HomeContent = {
  mainText: string;
  secondaryText: string;
};

const DEFAULT_HOME_CONTENT: HomeContent = {
  mainText: "SUBSCRIBE",
  secondaryText: "New videos every week. Tap A to launch your display scene.",
};

export function getHomeContent(): HomeContent {
  const filePath = path.join(process.cwd(), "home", "home.json");

  if (!fs.existsSync(filePath)) {
    return DEFAULT_HOME_CONTENT;
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as Partial<HomeContent>;

    if (
      typeof parsed.mainText === "string" &&
      parsed.mainText.length > 0 &&
      typeof parsed.secondaryText === "string" &&
      parsed.secondaryText.length > 0
    ) {
      return {
        mainText: parsed.mainText,
        secondaryText: parsed.secondaryText,
      };
    }
  } catch {
    // Fall back to defaults if JSON is malformed.
  }

  return DEFAULT_HOME_CONTENT;
}
