import { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

/**
 * slides: [
 *  { id: "1", title?: "...", text: "...", cta?: "LIRE LA SUITE" },
 *  ...
 * ]
 *
 * choices (optionnel): [
 *  { id: "wait", label: "ATTENDRE" },
 *  { id: "help", label: "AIDER" }
 * ]
 */
export function Bulle({
  slides = [],
  startId,
  onChoice,
  choices = [],
  showCounter = false,
}) {
  const byId = useMemo(() => {
    const m = new Map();
    for (const s of slides) m.set(String(s.id), s);
    return m;
  }, [slides]);

  const orderedIds = useMemo(() => slides.map((s) => String(s.id)), [slides]);

  const initialIndex = useMemo(() => {
    if (!slides.length) return 0;
    if (startId == null) return 0;
    const idx = orderedIds.indexOf(String(startId));
    return idx === -1 ? 0 : idx;
  }, [slides.length, startId, orderedIds]);

  const [index, setIndex] = useState(initialIndex);

  if (!slides.length) return null;

  const isFirst = index === 0;
  const isLast = index === slides.length - 1;

  const slide = slides[index];

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(slides.length - 1, i + 1));

  return (
    <div
      style={{
        position: "relative",
        maxWidth: 520,
        width: "92%",
        backgroundColor: "#001936",
        border: "2px solid rgba(255,225,73,0.7)",
        borderRadius: 14,
        padding: "18px 18px 16px",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      {/* “pointe” de la bulle */}
      <div
        style={{
          position: "absolute",
          right: 36,
          bottom: -18,
          width: 0,
          height: 0,
          borderLeft: "18px solid transparent",
          borderRight: "18px solid transparent",
          borderTop: "18px solid #001936",
          filter: "drop-shadow(0 -1px 0 rgba(255,225,73,0.7))",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 36,
          bottom: -20,
          width: 0,
          height: 0,
          borderLeft: "19px solid transparent",
          borderRight: "19px solid transparent",
          borderTop: "19px solid rgba(255,225,73,0.7)",
          zIndex: -1,
        }}
      />

      {slide.title ? (
        <div style={{ fontSize: 30, fontWeight: 700, marginBottom: 10 }}>
          {slide.title}
        </div>
      ) : null}

      <div style={{ lineHeight: 1.5, fontSize: 16, whiteSpace: "pre-line" }}>
        {slide.text}
      </div>

      {/* footer */}
      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        {/* Compteur optionnel */}
        <div style={{ opacity: 0.85, fontSize: 12 }}>
          {showCounter ? `${index + 1}/${slides.length}` : null}
        </div>

        {/* Navigation / Choix */}
        {!isLast ? (
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={prev}
              disabled={isFirst}
              style={{
                width: 56,
                height: 40,
                borderRadius: 10,
                backgroundColor: "transparent",
                border: "2px solid rgba(255,225,73,0.7)",
                cursor: isFirst ? "not-allowed" : "pointer",
                opacity: isFirst ? 0.4 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Précédent"
            >
              <ChevronLeftIcon style={{ width: 22, height: 22, color: "#FFE149" }} />
            </button>

            <button
              onClick={next}
              style={{
                width: 220,
                height: 40,
                borderRadius: 10,
                backgroundColor: "#E6C14F",
                border: "1px solid #C8A43A",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,

                // petit grain “pailleté”
                backgroundImage: `
                  radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px),
                  radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)
                `,
                backgroundSize: "3px 3px, 4px 4px",
                backgroundPosition: "0 0, 1px 1px",
              }}
            >
              <span style={{ fontFamily: "serif", letterSpacing: 1 }}>
                {slide.cta ?? "LIRE LA SUITE"}
              </span>
              <ChevronRightIcon style={{ width: 22, height: 22, color: "#1E1E1E" }} />
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {choices.map((c) => (
              <button
                key={c.id}
                onClick={() => onChoice?.(c.id)}
                style={{
                  minWidth: 140,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: "#E6C14F",
                  border: "1px solid #C8A43A",
                  cursor: "pointer",
                  padding: "0 14px",

                  backgroundImage: `
                    radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px),
                    radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: "3px 3px, 4px 4px",
                  backgroundPosition: "0 0, 1px 1px",
                }}
              >
                <span style={{ fontFamily: "serif", letterSpacing: 1 }}>{c.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
