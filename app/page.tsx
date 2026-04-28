import HomeClient from "./components/HomeClient";
import { getHomeContent } from "./lib/homeContent";
import { getScenes } from "./lib/scenes";

export default function Home() {
  const scenes = getScenes();
  const homeContent = getHomeContent();

  return <HomeClient scenes={scenes} homeContent={homeContent} />;
}
