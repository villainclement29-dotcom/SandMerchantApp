import { Bulle } from "./Buble";
import { navigate } from "raviger";
import { HeaderBar } from "./HeaderBar";

const slides = [
  {
    id: 1,
    text:
      "La nuit n’était pas noire.\n\n" +
      "Elle était lourde.\n\n" +
      "Quelque chose pesait sur le ciel, comme si l’air lui-même hésitait à bouger. Les étoiles étaient là, mais lointaines, froides, trop immobiles. Dans les maisons, les enfants dormaient — ou du moins essayaient.",
    cta: "LIRE LA SUITE",
  },
  {
    id: 2,
    text:
      "Leurs respirations n’avaient plus le même rythme. Trop rapides. Trop irrégulières. Comme si les rêves, au lieu de les porter, leur résistaient.Le Marchand de Sable le sentit avant de le voir.\n\n" +
      "Il se posa sur le rebord d’un toit, sans bruit, comme il l’avait fait des milliers de fois. Le geste était précis, maîtrisé.",
    cta: "SUITE",
  },
  {
    id: 3,
    text:
      "Mais cette nuit, son corps mit une fraction de seconde de trop à s’immobiliser. Une infime hésitation. Presque imperceptible.\n\n" +
      "Sauf pour lui.\n\n" +
      "Il ouvrit son sac, Le sable était là. \n\n" +
      "Mais il n’était plus vivant.",
    cta: "SUITE",
  },
  {
    id: 4,
    text: "Autrefois, chaque grain vibrait d’une chaleur douce, comme un souvenir heureux qu’on ne saurait expliquer. Ce soir, le sable coulait entre ses doigts sans résistance, sans lumière, sans chant. Il n’était pas mort — non — mais vidé. Épuisé",
    cta: "SUITE",
  },
  {
    id: 5,
    text:
      "— Ils ne rêvent plus comme avant… murmura le Marchand.\n\n" +
      "Il leva la tête, Et posa les yeux sur toi.\n\n" +
      "Tu n’étais pas censé être là. Pas encore. Mais certains enfants — et certains adultes — sentent quand quelque chose se fissure. Tu faisais partie de ceux-là.",
    cta: "SUITE",
  },
  {
    id: 6,
    text:
      "— Je ne peux pas réparer ça seul, dit-il enfin.\n\n" +
      "— Et je ne peux pas te promettre que ce que nous ferons sera juste.Il referma lentement son sac.\n\n" +
      "— Dis-moi…",
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
          left: 0,
          bottom: 0,
          width: 302,
          height: "auto",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </div>
  );
}
