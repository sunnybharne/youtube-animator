import { getScenes } from "./lib/scenes";
import HomeClient from "./components/HomeClient";

export default function Home() {
  const scenes = getScenes();
  return <HomeClient scenes={scenes} />;
}
