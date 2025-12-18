import { useMemo } from "react";
import { useStore } from "@nanostores/react";
import { navigate } from "raviger";
import { HeaderBar } from "./HeaderBar";
import {
  $wardrobe,
  setCategory,
  toggleDrawer,
  equip,
  prevPage,
  nextPage,
} from "../../store/wardrobeStore";

const CATEGORIES = [
  { id: "hat", icon: "/hat.png", label: "Chapeau" },
  { id: "top", icon: "/shirt.png", label: "Haut" },
  { id: "pants", icon: "/trouser.png", label: "Pantalon" },
  { id: "shoes", icon: "/shoes.png", label: "Chaussures" },
  { id: "bag", icon: "/accessories.png", label: "accessoires" },
];

const ITEMS = {
  hat: [
    { id: "hat_1", thumb: "/thumbs/hat_1.png", overlay: "/overlays/hat_1.png" },
    { id: "hat_2", thumb: "/thumbs/hat_2.png", overlay: "/overlays/hat_2.png" },
    { id: "hat_3", thumb: "/thumbs/hat_3.png", overlay: "/overlays/hat_3.png" },
  ],
  top: [
    { id: "top_1", thumb: "/tshirt1_.png", overlay: "/tshirt1_.png" },
    { id: "top_2", thumb: "/thumbs/top_2.png", overlay: "/overlays/top_2.png" },
    { id: "top_3", thumb: "/thumbs/top_3.png", overlay: "/overlays/top_3.png" },
  ],
  pants: [
    { id: "pants_1", thumb: "/pentalon1_.png", overlay: "/pentalon1_.png" },
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
    { id: "bag_1", thumb: "/combi_.png", overlay: "/combi_.png" },
    { id: "bag_2", thumb: "/thumbs/bag_2.png", overlay: "/overlays/bag_2.png" },
    { id: "bag_3", thumb: "/thumbs/bag_3.png", overlay: "/overlays/bag_3.png" },
  ],
};

/**
 * ✅ Rectangle (en %) de la zone où se trouve le garçon dans le décor
 * (ancré sur la "scene" plein écran, donc ne bouge plus avec le drawer)
 */
const BOY_BOX = {
  left: "36%",
  top: "18%",
  width: "34%",
  height: "70%",
};

/**
 * ✅ Ajustements par catégorie (dans le BOY_BOX)
 * (tu peux ajuster ces valeurs au pixel près ensuite)
 */
const OVERLAY_POS = {
  hat: { top: "-2%", left: "0%", width: "100%", height: "40%" },
  top: { top: "15%", left: "16%", width: "100%", height: "45%" },
  pants: { top: "30%", left: "9%", width: "103%", height: "76%" },
  shoes: { top: "78%", left: "0%", width: "100%", height: "22%" },
  bag: { top: "21%", left: "0%", width: "125%", height: "69%" },
};

/**
 * ✅ Ordre de rendu : t-shirt au-dessus du pantalon
 */
const OVERLAY_Z = {
  hat: 50,
  top: 40,
  bag: 60,
  pants: 30,
  shoes: 20,
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

  const equippedOverlays = useMemo(() => {
    const overlays = [];
    for (const [cat, itemId] of Object.entries(s.equipped)) {
      if (!itemId) continue;
      const found = (ITEMS[cat] ?? []).find((it) => it.id === itemId);
      if (found?.overlay) overlays.push({ cat, src: found.overlay });
    }
    // Optionnel: tri par z-index (robuste même si l'ordre d'Object.entries change)
    overlays.sort((a, b) => (OVERLAY_Z[a.cat] ?? 0) - (OVERLAY_Z[b.cat] ?? 0));
    return overlays;
  }, [s.equipped]);

  return (
    <div
      style={{
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        // ✅ IMPORTANT : le décor est rendu par BackgroundLayout, donc pas de background ici
      }}
    >
      {/* ✅ SCENE FIXE plein écran : repère immuable pour les overlays */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        {/* ✅ ANCRE : zone du garçon */}
        <div
          style={{
            position: "absolute",
            left: BOY_BOX.left,
            top: BOY_BOX.top,
            width: BOY_BOX.width,
            height: BOY_BOX.height,
            pointerEvents: "none",
          }}
        >
          {equippedOverlays.map((o) => {
            const p = OVERLAY_POS[o.cat] ?? {
              top: "0%",
              left: "0%",
              width: "100%",
              height: "100%",
            };

            return (
              <img
                key={o.cat}
                src={o.src}
                alt=""
                style={{
                  position: "absolute",
                  top: p.top,
                  left: p.left,
                  width: p.width,
                  height: p.height,
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                  zIndex: OVERLAY_Z[o.cat] ?? 10,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* ✅ UI par-dessus (ne doit pas influencer le repère des overlays) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "auto",
        }}
      >
        {/* Header */}
        <div style={{ padding: "10px 12px 0" }}>
          <HeaderBar />
        </div>

        {/* Bouton retour */}
        <button
          onClick={() => navigate("/home")}
          style={{
            position: "absolute",
            left: 12,
            top: 89,
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

        {/* Settings */}
        {/* <button
          onClick={() => navigate("/settings")}
          style={{
            position: "absolute",
            right: 12,
            top: 89,
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
        </button> */}

        {/* Colonne catégories */}
        <div
          style={{
            position: "absolute",
            left: 12,
            top: 170,
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

        {/* Drawer bas */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: s.openDrawer ? 140 : 0,
            transition: "height 220ms ease",
            overflow: "hidden",
            backgroundColor: "rgba(0,25,54,0.85)",
            borderTop: "2px solid rgba(255,225,73,0.45)",
            padding: s.openDrawer ? "12px" : "0 12px",
            boxSizing: "border-box",
          }}
        >
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
                width: 160,
                height: 32,
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
            <button
              onClick={() => prevPage(pages.length)}
              disabled={s.pageIndex === 0}
              style={{
                height: 58,
                borderRadius: 12,
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

            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              {page.map((it) => {
                const isOn = s.equipped[s.category] === it.id;
                return (
                  <button
                    key={it.id}
                    onClick={() => equip(s.category, it.id)}
                    style={{
                      width: 96,
                      height: 76,
                      borderRadius: 12,
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

            <button
              onClick={() => nextPage(pages.length)}
              disabled={s.pageIndex === pages.length - 1}
              style={{
                height: 58,
                borderRadius: 12,
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
    </div>
  );
}
