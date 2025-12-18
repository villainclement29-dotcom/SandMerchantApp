import { HeaderBar } from "./Header"; // adapte le chemin si besoin
import { navigate } from "raviger";

const CHAPTERS = [
  { id: 1, title: "LE COMMENCEMENT" },
  { id: 2, title: "RECHERCHE DE SABLE SACRÉ" },
  { id: 3, title: "AU BOUT DU MONDE" },
  { id: 4, title: "DÉTROUSSE DES RÊVES" },
  { id: 5, title: "EN DÉTRESSE" },
  { id: 6, title: "DU NOUVEAU" },
  { id: 7, title: "EN AVANT LES RÊVES" },
  { id: 8, title: "LA QUÊTE DE L’ÉTOILE" },
  { id: 9, title: "L’ANNEAU MAGIQUE" },
  { id: 10, title: "LA BASCULE" },
  { id: 11, title: "LE DÉBUT DES PROBLÈMES" },
  { id: 12, title: "LA QUÊTE PREMIÈRE" },
  { id: 13, title: "L’ANNEAU MAGIQUE" },
  { id: 14, title: "LE GRAND MÉCHANT" },
  { id: 15, title: "LA TERRIBLE NOUVELLE" },
  { id: 16, title: "AU TRÉPAS DES RÊVES" },
  { id: 17, title: "POUR UNE FOIS" },
  { id: 18, title: "LES PIRATES" },
  { id: 19, title: "L’OURSE BABA" },
  { id: 20, title: "LA NUIT SANS RÊVE" },
];

export function Chapters({ selectedId = 1 }) {
  return (
    <div
      style={{
        height: "100dvh",
        padding: 12,
        boxSizing: "border-box",
        backgroundImage: "url(/StarBackground.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",

        // Layout fixe : header / titre / liste / bouton
        display: "grid",
        gridTemplateRows: "auto auto 1fr auto",
        gap: 10,
      }}
    >
      {/* Top bar */}
      <HeaderBar />

      {/* Titre */}
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "serif",
            letterSpacing: 2,
            color: "#fff",
            textTransform: "uppercase",
            fontSize: 26,
          }}
        >
          Choisi ton chapitre
        </h1>
      </div>

      {/* LISTE DES CHAPITRES (scrollable uniquement ici) */}
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        <style>{`
          .chaptersScroll::-webkit-scrollbar {
            width: 0px;
            height: 0px;
          }
        `}</style>

        <div
          className="chaptersScroll"
          style={{
            padding: "0 16px 16px 16px",
          }}
        >
          {CHAPTERS.map((ch) => {
            const isSelected = ch.id === selectedId;
            const isFirst = ch.id === 1;

            return (
              <button
                key={ch.id}
                onClick={() => navigate(`/chapter/${ch.id}`)}
                style={{
                  width: "100%",
                  margin: "10px 0",
                  padding: "10px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  textAlign: "left",

                  // FOND
                  background: isFirst
                    ? "linear-gradient(180deg, rgba(40,32,5,0.9), rgba(20,16,2,0.9))"
                    : "linear-gradient(180deg, rgba(0,25,54,0.65), rgba(0,18,40,0.55))",

                  // BORDURE
                  border: isFirst
                    ? "1px solid rgba(255,225,73,0.95)"
                    : "1px solid rgba(255,225,73,0.18)",

                  // GRISAGE GLOBAL
                  opacity: isFirst ? 1 : 0.6,
                }}
              >
                {/* Numéro */}
                <div
                  style={{
                    width: 18,
                    minWidth: 18,
                    height: 40,
                    paddingRight: "5px",
                    display: "grid",
                    placeItems: "center",
                    borderRight: isFirst
                      ? "1px solid rgba(255,225,73,0.95)"
                      : "1px solid rgba(255,225,73,0.35)",
                    color: isFirst ? "#FFE149" : "#9FB0C5",
                    fontSize: 24,
                    fontFamily: "serif",
                  }}
                >
                  {ch.id}
                </div>

                {/* Titre */}
                <div
                  style={{
                    fontFamily: "serif",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    fontSize: 12,
                    color: isFirst ? "#FFE149" : "rgba(255,255,255,0.65)",
                  }}
                >
                  {ch.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* BOUTON ACCUEIL (toujours visible) */}
      <div
        style={{ display: "flex", justifyContent: "center", paddingBottom: 6 }}
      >
        <button
          onClick={() => navigate("/home")}
          style={{
            width: 170,
            height: 40,
            borderRadius: 10,
            backgroundColor: "#E6C14F",
            border: "1px solid #C8A43A",
            cursor: "pointer",
            fontFamily: "serif",
            letterSpacing: 1.2,
            textTransform: "uppercase",
          }}
        >
          ACCUEIL
        </button>
      </div>
    </div>
  );
}
