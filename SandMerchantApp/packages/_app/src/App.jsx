import { useRoutes } from "raviger";
import Connexion from "./Connexion/Connexion";
import { FirstConnexion } from "./FirstConnexion/FirstConnexion";
import { Home } from "./Home/Home";
import starsBg from "/StarBackground.png";
import homeBg from "/3VChmbre.jpg"; // <-- ton image large en 3 parties
import { BackgroundLayout } from "../../base/components/BackgroundLayout";
import { Chapter } from "../../base/components/Chapter";

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
    "/chapter": () => (
      <BackgroundLayout bg={starsBg}>
        <Chapter />
      </BackgroundLayout>
    ),
  });

  return route;
}
