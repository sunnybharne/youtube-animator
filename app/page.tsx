import HomeClient from "./components/HomeClient";
import { getScenes } from "./lib/scenes";

export default function Home() {
  const scenes = getScenes();

  return <HomeClient scenes={scenes} />;
}
