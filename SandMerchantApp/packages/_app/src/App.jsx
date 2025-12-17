import { useRoutes } from "raviger";
import Connexion from "./Connexion/Connexion";
import { FirstConnexion } from "./FirstConnexion/FirstConnexion";
import bg from "/StarBackground.png";

export function App() {
  const route = useRoutes({
    "/": () => <Connexion />,
    "/FirstConnexion": () => <FirstConnexion />,
    "/home": () => <Home />,
  });
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {route}
    </main>
  );
}
