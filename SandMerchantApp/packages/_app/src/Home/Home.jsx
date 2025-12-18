import { useState } from "react";
import { BackgroundLayout } from "../../base/components/BackgroundLayout";
import { HeaderBar } from "../../base/components/HeaderBar";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { navigate } from "raviger";

export function Home({ bg }) {
  const slides = 3;
  const [slideIndex, setSlideIndex] = useState(1); // 0/1/2 (1 = milieu)
  const blinkStyle = `
@keyframes hotspotGlow {
  0%   { box-shadow: 0 0 0 rgba(255, 225, 73, 0); }
  50%  { box-shadow: 0 0 18px rgba(255, 225, 73, 0.95); }
  100% { box-shadow: 0 0 0 rgba(255, 225, 73, 0); }
}
`;

  const prev = () => setSlideIndex((i) => (i - 1 + slides) % slides);
  const next = () => setSlideIndex((i) => (i + 1) % slides);
  const HOTSPOTS = [
    // Slide 0 (Dressing)
    {
      id: "wardrobe",
      slide: 0,
      x: 0,
      y: 28,
      w: 44,
      h: 47,
      onClick: () => navigate("/wardrobe"),
    },

    // Slide 1 (Accueil - bibliothèque)
    {
      id: "book",
      slide: 1,
      x: 28,
      y: 21,
      w: 18,
      h: 12,
      onClick: () => navigate("/chapter/1"),
    },

    // Slide 2 (Bedroom)
    {
      id: "bed",
      slide: 2,
      x: 0,
      y: 43,
      w: 99,
      h: 46,
      onClick: () => navigate("/bed"),
    },
  ];

  return (
    <BackgroundLayout
      bg={bg}
      mode="slider"
      slideIndex={slideIndex}
      slides={slides}
    >
      <style>{blinkStyle}</style>
      <div style={{ padding: 12, position: "relative", height: "100vh" }}>
        <HeaderBar />
        {/* Contenu au-dessus du fond */}
        {HOTSPOTS.filter((h) => h.slide === slideIndex).map((h) => (
          <button
            key={h.id}
            onClick={h.onClick}
            style={{
              position: "absolute",
              left: `${h.x}%`,
              top: `${h.y}%`,
              width: `${h.w}%`,
              height: `${h.h}%`,
              animation: h.id === "book" ? "hotspotGlow 3s infinite" : "none",
              //   background: "transparent",
              background:
                h.id === "book" ? "rgba(255, 225, 73, 0.08)" : "transparent",
              border: "none",
              cursor: "pointer",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFE149ff",
              // debug (optionnel) : vois les zones
              //   outline: "2px solid rgba(255,255,0,0.6)",
            }}
            aria-label={h.id}
          >
            {h.id === "book" ? 1 : ""}
          </button>
        ))}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 8,
            position: "absolute",
            bottom: 40,
            right: 0,
            alignItems: "center",
          }}
        >
          <button
            onClick={prev}
            style={{
              width: 150,
              height: 70,
              borderRadius: "8px",
              backgroundColor: "transparent",
              border: "solid 2px #FFE149ff ",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronLeftIcon
              style={{
                width: 35,
                height: 30,
                color: "#FFE149ff",
              }}
            />
          </button>
          <button
            onClick={next}
            style={{
              width: 150,
              height: 70,
              borderRadius: "8px",
              backgroundColor: "transparent",
              border: "solid 2px #FFE149ff ",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronRightIcon
              style={{
                width: 35,
                height: 30,
                color: "#FFE149ff",
              }}
            />
          </button>
        </div>
      </div>
    </BackgroundLayout>
  );
}
