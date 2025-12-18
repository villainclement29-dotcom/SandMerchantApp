import { useRoutes } from "raviger";
import Connexion from "./Connexion/Connexion";
import { FirstConnexion } from "./FirstConnexion/FirstConnexion";
import { Home } from "./Home/Home";
import starsBg from "/StarBackground.png";
import WardrobeBg from "/wardrobe.png";
import homeBg from "/3VChmbre.jpg"; // <-- ton image large en 3 parties
import { BackgroundLayout } from "../base/components/BackgroundLayout";
import { Chapter } from "../base/components/Chapter";
import { Chapters } from "../base/components/Chapters";
import { Wardrobe } from "../base/components/Wardrobe";
import { Bed } from "../base/components/Bed";

export function App() {
  const route = useRoutes({
    "/": () => (
      <BackgroundLayout bg={starsBg}>
        <Connexion />
      </BackgroundLayout>
    ),

    "/FirstConnexion": () => (
      <BackgroundLayout bg={starsBg}>
        <FirstConnexion />
      </BackgroundLayout>
    ),

    "/home": () => <Home bg={homeBg} />,
    "/chapter/1": () => (
      <BackgroundLayout bg={starsBg}>
        <Chapter />
      </BackgroundLayout>
    ),
    "/bed": () => (
      <BackgroundLayout bg={starsBg}>
        <Bed />
      </BackgroundLayout>
    ),
    "/chapters": () => (
      <BackgroundLayout bg={starsBg}>
        <Chapters />
      </BackgroundLayout>
    ),
    "/wardrobe": () => (
      <BackgroundLayout bg={WardrobeBg}>
        <Wardrobe />
      </BackgroundLayout>
    ),
  });

  return route;
}
