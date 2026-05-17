import HomeClient from "./components/HomeClient";
import { homeContent } from "./lib/homeContent";

export default function Home() {
  return <HomeClient homeContent={homeContent} />;
}
