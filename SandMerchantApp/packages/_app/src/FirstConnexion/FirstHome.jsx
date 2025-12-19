import { navigate } from "raviger";
import { HeaderBar } from "../../base/components/HeaderBar";
import { BulleStart } from "../../base/components/BulleStart";

const slides = [
  {
    id: 1,
    title: "Des explications s’imposent !",
    text: "Voici votre chambre, tous les jours vous pouvez y venir accomplir votre mission quotidienne, elle se divise en 3 parties :",
    cta: "SUITE",
  },
  {
    id: 2,
    title: "Les pièces",
    text:
      "- La bibliothèque où vous trouvez une histoire par jour\n\n" +
      "- Le dressing où vous personnalisez votre personnage \n\n" +
      "- Le lit qui vous permet de dormir et faire de beaux rêves",
    cta: "SUITE",
  },
  {
    id: 3,
    title: "Les poussières de sable",
    text: "Elles servent à rendre plus fort le marchand de sable pour qu’il combatte le croque-mitaine le 24 décembre.",
    cta: "DECOUVRIR",
  },
];

export function FirstHome() {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
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
