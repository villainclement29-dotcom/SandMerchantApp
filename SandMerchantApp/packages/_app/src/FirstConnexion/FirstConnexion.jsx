import { navigate } from "raviger";
import { HeaderBar } from "../../base/components/HeaderBar";
import { BulleStart } from "../../base/components/BulleStart";

const slides = [
  {
    id: 1,
    title: "BONSOIR !",
    text:
      "J’ai besoin de toi, mon sable magique qui protège les rêves disparaît.\n\n" +
      "Quand il n’y en a plus assez, le Croque-Mitaine s’approche et transforme les nuits en cauchemars.",
    cta: "SUITE",
  },
  {
    id: 2,
    title: "IL FAUT FAIRE VITE.",
    text:
      "À Noël, il tentera de revenir.\n\n" +
      "Nous avons 24 nuits pour l’en empêcher, pour cela il faut ramasser un maximum de poussière de sable pour rendre le marchand de sable plus fort lors du combat final.",
    cta: "SUITE",
  },
  {
    id: 3,
    title: "VEUX TU M’AIDER ?",
    text:
      "Chaque soir, un livre t’attendra dans ta bibliothèque.\n\n" +
      "À l’intérieur, un chapitre qui te confie une mission pour retrouver des grains de sable et faire un choix crucial.\n\n" +
      "Ouvre le premier livre ce soir.",
    cta: "COMMENCER",
  },
];

export function FirstConnexion() {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundImage: "url(/StarBackground.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <HeaderBar />

      {/* ✅ Personnage centré au-dessus de la carte (comme la maquette) */}
      <img
        src="/Merchant-start.png"
        alt="Marchand de sable"
        style={{
          position: "absolute",
          top: 64, // sous la header
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(360px, 92vw)",
          height: "auto",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 1,
        }}
      />

      {/* ✅ Carte centrée sous le perso */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingTop: 211, // ajuste si besoin selon la taille du merchant
          paddingBottom: 29,
        }}
      >
        <div>
          <BulleStart
            slides={slides}
            startId={1}
            onOverlayCta={() => navigate("/home")}
          />
        </div>
      </div>
    </div>
  );
}
