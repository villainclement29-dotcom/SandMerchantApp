import { useMemo } from "react";
import { useStore } from "@nanostores/react";
import { navigate } from "raviger";
import { HeaderBar } from "./header"; // adapte le chemin si besoin
import {
  $wardrobe,
  setCategory,
  toggleDrawer,
  equip,
  prevPage,
  nextPage,
} from "../../store/wardrobestore";

// ✅ Tu peux remplacer ces datas par les tiennes + tes images
const CATEGORIES = [
  { id: "hat", icon: "/icons/hat.png", label: "Chapeau" },
  { id: "top", icon: "/icons/top.png", label: "Haut" },
  { id: "pants", icon: "/icons/pants.png", label: "Pantalon" },
  { id: "shoes", icon: "/icons/shoes.png", label: "Chaussures" },
  { id: "bag", icon: "/icons/bag.png", label: "Sac" },
];

// Chaque item = une image “overlay” qui se pose sur le perso
const ITEMS = {
  hat: [
    { id: "hat_1", thumb: "/thumbs/hat_1.png", overlay: "/overlays/hat_1.png" },
    { id: "hat_2", thumb: "/thumbs/hat_2.png", overlay: "/overlays/hat_2.png" },
    { id: "hat_3", thumb: "/thumbs/hat_3.png", overlay: "/overlays/hat_3.png" },
  ],
  top: [
    { id: "top_1", thumb: "/thumbs/top_1.png", overlay: "/overlays/top_1.png" },
    { id: "top_2", thumb: "/thumbs/top_2.png", overlay: "/overlays/top_2.png" },
    { id: "top_3", thumb: "/thumbs/top_3.png", overlay: "/overlays/top_3.png" },
  ],
  pants: [
    {
      id: "pants_1",
      thumb: "/thumbs/pants_1.png",
      overlay: "/overlays/pants_1.png",
    },
    {
      id: "pants_2",
      thumb: "/thumbs/pants_2.png",
      overlay: "/overlays/pants_2.png",
    },
    {
      id: "pants_3",
      thumb: "/thumbs/pants_3.png",
      overlay: "/overlays/pants_3.png",
    },
  ],
  shoes: [
    {
      id: "shoes_1",
      thumb: "/thumbs/shoes_1.png",
      overlay: "/overlays/shoes_1.png",
    },
    {
      id: "shoes_2",
      thumb: "/thumbs/shoes_2.png",
      overlay: "/overlays/shoes_2.png",
    },
    {
      id: "shoes_3",
      thumb: "/thumbs/shoes_3.png",
      overlay: "/overlays/shoes_3.png",
    },
  ],
  bag: [
    { id: "bag_1", thumb: "/thumbs/bag_1.png", overlay: "/overlays/bag_1.png" },
    { id: "bag_2", thumb: "/thumbs/bag_2.png", overlay: "/overlays/bag_2.png" },
    { id: "bag_3", thumb: "/thumbs/bag_3.png", overlay: "/overlays/bag_3.png" },
  ],
};

export function Wardrobe() {
  const s = useStore($wardrobe);

  const categoryItems = ITEMS[s.category] ?? [];
  const perPage = 3;

  const pages = useMemo(() => {
    const out = [];
    for (let i = 0; i < categoryItems.length; i += perPage) {
      out.push(categoryItems.slice(i, i + perPage));
    }
    return out.length ? out : [[]];
  }, [categoryItems]);

  const page = pages[s.pageIndex] ?? pages[0];

  // overlay images à afficher sur le perso
  const equippedOverlays = useMemo(() => {
    const overlays = [];
    for (const [cat, itemId] of Object.entries(s.equipped)) {
      if (!itemId) continue;
      const found = (ITEMS[cat] ?? []).find((it) => it.id === itemId);
      if (found?.overlay) overlays.push({ cat, src: found.overlay });
    }
    return overlays;
  }, [s.equipped]);

  return (
    <div
      style={{
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        backgroundImage: "url(/room.png)", // ✅ ton image de fond (la chambre)
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      {/* ✅ Top bar existante */}
      <div style={{ padding: "10px 12px 0" }}>
        <HeaderBar />
      </div>

      {/* Zone centrale */}
      <div style={{ position: "relative" }}>
        {/* Bouton retour (haut gauche) */}
        <button
          onClick={() => navigate("/home")}
          style={{
            position: "absolute",
            left: 12,
            top: 10,
            width: 52,
            height: 52,
            borderRadius: 12,
            backgroundColor: "rgba(0,25,54,0.55)",
            border: "2px solid rgba(255,225,73,0.6)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
          aria-label="Retour"
        >
          <span style={{ color: "#FFE149", fontSize: 26, lineHeight: 1 }}>
            ‹
          </span>
        </button>

        {/* Bouton settings (haut droite) */}
        <button
          onClick={() => navigate("/settings")}
          style={{
            position: "absolute",
            right: 12,
            top: 18,
            width: 40,
            height: 40,
            borderRadius: 999,
            backgroundColor: "rgba(0,25,54,0.55)",
            border: "2px solid rgba(255,225,73,0.6)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
          aria-label="Options"
        >
          <span style={{ color: "#FFE149", fontSize: 18 }}>⚙</span>
        </button>

        {/* Colonne catégories (gauche) */}
        <div
          style={{
            position: "absolute",
            left: 12,
            top: 90,
            width: 72,
            borderRadius: 12,
            backgroundColor: "rgba(0,25,54,0.72)",
            border: "2px solid rgba(255,225,73,0.45)",
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {CATEGORIES.map((c) => {
            const active = s.category === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                style={{
                  width: "100%",
                  height: 54,
                  borderRadius: 10,
                  backgroundColor: active
                    ? "rgba(255,225,73,0.15)"
                    : "transparent",
                  border: active
                    ? "1px solid rgba(255,225,73,0.7)"
                    : "1px solid rgba(255,225,73,0.25)",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                }}
                aria-label={c.label}
                title={c.label}
              >
                <img
                  src={c.icon}
                  alt=""
                  style={{ width: 36, height: 36, objectFit: "contain" }}
                />
              </button>
            );
          })}
        </div>

        {/* Perso + overlays (centré) */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 80,
            transform: "translateX(-50%)",
            width: 250,
            height: 520,
            display: "grid",
            placeItems: "center",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {/* Overlays */}
            {equippedOverlays.map((o) => (
              <img
                key={o.cat}
                src={o.src}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Drawer bas (items) */}
      <div
        style={{
          height: s.openDrawer ? 120 : 0,
          transition: "height 220ms ease",
          overflow: "hidden",
          backgroundColor: "rgba(0,25,54,0.85)",
          borderTop: "2px solid rgba(255,225,73,0.45)",
          padding: s.openDrawer ? "12px" : "0 12px",
          boxSizing: "border-box",
        }}
      >
        {/* Toggle si tu veux ouvrir/fermer */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <button
            onClick={toggleDrawer}
            style={{
              width: 140,
              height: 30,
              borderRadius: 999,
              backgroundColor: "transparent",
              border: "1px solid rgba(255,225,73,0.35)",
              color: "#FFE149",
              cursor: "pointer",
              fontFamily: "serif",
              letterSpacing: 1,
              textTransform: "uppercase",
              fontSize: 12,
              opacity: 0.9,
            }}
          >
            {s.openDrawer ? "Fermer" : "Ouvrir"}
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "42px 1fr 42px",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* flèche gauche */}
          <button
            onClick={() => prevPage(pages.length)}
            disabled={s.pageIndex === 0}
            style={{
              height: 46,
              borderRadius: 10,
              backgroundColor: "transparent",
              border: "1px solid rgba(255,225,73,0.35)",
              color: "#FFE149",
              cursor: s.pageIndex === 0 ? "not-allowed" : "pointer",
              opacity: s.pageIndex === 0 ? 0.35 : 1,
              fontSize: 24,
            }}
            aria-label="Précédent"
          >
            ‹
          </button>

          {/* items */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            {page.map((it) => {
              const isOn = s.equipped[s.category] === it.id;
              return (
                <button
                  key={it.id}
                  onClick={() => equip(s.category, it.id)}
                  style={{
                    width: 96,
                    height: 64,
                    borderRadius: 10,
                    backgroundColor: "white",
                    border: isOn
                      ? "2px solid rgba(255,225,73,0.9)"
                      : "1px solid rgba(0,0,0,0.15)",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    overflow: "hidden",
                  }}
                  aria-label={it.id}
                >
                  <img
                    src={it.thumb}
                    alt=""
                    style={{
                      width: "92%",
                      height: "92%",
                      objectFit: "contain",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* flèche droite */}
          <button
            onClick={() => nextPage(pages.length)}
            disabled={s.pageIndex === pages.length - 1}
            style={{
              height: 46,
              borderRadius: 10,
              backgroundColor: "transparent",
              border: "1px solid rgba(255,225,73,0.35)",
              color: "#FFE149",
              cursor:
                s.pageIndex === pages.length - 1 ? "not-allowed" : "pointer",
              opacity: s.pageIndex === pages.length - 1 ? 0.35 : 1,
              fontSize: 24,
            }}
            aria-label="Suivant"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
