import { Bulle } from "./Buble";
import { navigate } from "raviger";
import { HeaderBar } from "./HeaderBar";

const slides = [
  {
    id: 1,
    text:
      "La nuit était censée être douce.\n\n" +
      "Une nuit comme celles que le marchand de sable aimait tant : silencieuse, profonde, tapissée de rêves en suspension. Les étoiles scintillaient à peine, comme si elles retenaient leur souffle. Le monde dormait — ou du moins, il aurait dû.",
    cta: "LIRE LA SUITE",
  },
  {
    id: 2,
    text:
      "Mais quelque chose n’allait pas.\n\n" +
      "Au-dessus des nuages, là où le ciel devient presque liquide, le marchand de sable s’était arrêté. Son manteau d’or flottait derrière lui, immobile, figé par une inquiétude nouvelle. Autour de ses mains, le sable des rêves tremblait, incapable de prendre forme.",
    cta: "SUITE",
  },
  {
    id: 3,
    text:
      "Les habituelles constellations de songes — dragons rieurs, îles volantes, forêts chantantes — refusaient de naître.\n\n" +
      "Il ferma les yeux..\n\n" +
      "D’ordinaire, il n’avait pas besoin de regarder le monde pour le comprendre.",
    cta: "SUITE",
  },
  {
    id: 4,
    text: " ...... ",
    cta: "SUITE",
  },
  {
    id: 5,
    text:
      "Quand tu ouvris les yeux, le monde semblait inchangé.\n\n" +
      "Mais au creux de ta main, il restait une fine poussière dorée.\n\n" +
      "La nuit n’était pas finie.\n\n" +
      "Et l’histoire ne faisait que commencer",
    cta: "SUITE",
    // ✅ c’est CETTE slide qui déclenche les choix (pas besoin d’être la dernière)
    choices: [
      { id: "wait", label: "ATTENDRE" },
      { id: "help", label: "AIDER" },
    ],
  },
];

export function Chapter() {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        padding: 12,

        // ✅ fond comme la maquette (étoiles)
        backgroundImage: "url(/StarBackground.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <HeaderBar />

      {/* ✅ Titre centré comme la maquette */}
      <div
        style={{
          marginTop: 30,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            lineHeight: 1.05,
          }}
        >
          <div
            style={{
              fontFamily: "serif",
              fontSize: 26,
              letterSpacing: 2,
              color: "#FFE149",
              textTransform: "uppercase",
            }}
          >
            Chapitre 1
          </div>
          <div
            style={{
              fontFamily: "serif",
              fontSize: 24,
              letterSpacing: 1.2,
              color: "#fff",
              textTransform: "uppercase",
              marginTop: 6,
            }}
          >
            Le commencement
          </div>
        </div>

        <img
          src="/titleOrnement.png"
          alt="Title Ornement"
          style={{
            marginTop: 15,
            marginBottom: 15,
            width: "78%",
            maxWidth: 360,
            height: "auto",
            display: "block",
          }}
        />
      </div>

      {/* ✅ Bulle centrée */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >
        <Bulle
          slides={slides}
          startId={1}
          onChoice={(choiceId) => {
            if (choiceId === "wait") navigate("/choice/wait");
            if (choiceId === "help") navigate("/choice/help");
          }}
          onOverlayCta={() => navigate("/home")}
        />
      </div>

      {/* ✅ Personnage en bas à gauche comme la maquette */}
      <img
        src="/merchant.png"
        alt="Marchand de sable"
        style={{
          position: "absolute",
          left: -7,
          bottom: 0,
          width: 434,
          height: "auto",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </div>
  );
}
