import { Bulle } from "./Buble";
import { HeaderBar } from "./header";
import { navigate } from "raviger";

const slides = [
  {
    id: 1,
    title: "Bonsoir Alexian !",
    text:
      "J’ai besoin de toi, mon sable magique qui protège les rêves disparaît.\n\n" +
      "Quand il n’y en a plus assez, le Croque-Mitaine s’approche et transforme les nuits en cauchemars.",
    cta: "LIRE LA SUITE",
  },
  {
    id: 2,
    text:
      "La nuit était censée être douce.\n\n" +
      "Une nuit comme celles que le marchand de sable aimait tant : silencieuse, profonde, tapissée de rêves…",
    cta: "SUITE",
  },
  {
    id: 3,
    title: "Veux tu m’aider ?",
    text:
      "Vos choix affectent l’histoire !\n\n" +
      "Chaque choix apporte des poussières de sable différentes, faites le bon choix.",
  },
];

export function Chapter() {
  return (
    <div style={{ padding: 12, position: "relative", minHeight: "100vh" }}>
      <HeaderBar />

      <div style={{ marginTop: 12 }}>
        <h1>Chapitre 1</h1>
        <h2>Le commencement</h2>
      </div>

      {/* La bulle */}
      <div style={{ marginTop: 18, display: "flex", justifyContent: "center" }}>
        <Bulle
          slides={slides}
          startId={1}
          choices={[
            { id: "wait", label: "ATTENDRE" },
            { id: "help", label: "AIDER" },
          ]}
          onChoice={(choiceId) => {
            if (choiceId === "wait") navigate("/choice/wait");
            if (choiceId === "help") navigate("/choice/help");
          }}
          showCounter={false}
        />
      </div>

      {/* ici image du marchand de sable */}
    </div>
  );
}
