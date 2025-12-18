import { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

export function BulleStart({
  slides = [],
  startId,
  onChoice,
  choices = [],
  onOverlayCta,
}) {
  const orderedIds = useMemo(() => slides.map((s) => String(s.id)), [slides]);

  const initialIndex = useMemo(() => {
    if (!slides.length) return 0;
    if (startId == null) return 0;
    const idx = orderedIds.indexOf(String(startId));
    return idx === -1 ? 0 : idx;
  }, [slides.length, startId, orderedIds]);

  const [index, setIndex] = useState(initialIndex);
  const [overlaySlide, setOverlaySlide] = useState(null);

  if (!slides.length) return null;

  const isFirst = index === 0;
  const isLast = index === slides.length - 1;

  const baseSlide = slides[index];
  const slide = overlaySlide ?? baseSlide;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(slides.length - 1, i + 1));

  const currentChoices = slide?.choices?.length ? slide.choices : choices;
  const hasChoices =
    !overlaySlide && Array.isArray(currentChoices) && currentChoices.length > 0;

  const openHelp = () => {
    setOverlaySlide({
      id: "__help__",
      title: null,
      text: "Vous avez gagné\n\n10 ✨\n\npoussières de sable jaune",
      cta: "MA CHAMBRE",
    });
  };

  const closeOverlay = () => setOverlaySlide(null);

  const handleChoice = (id) => {
    if (id === "help" || id === "aider") {
      openHelp();
      return;
    }
    onChoice?.(id);
  };

  const handleCta = () => {
    if (overlaySlide) {
      if (onOverlayCta) return onOverlayCta(overlaySlide);
      return closeOverlay();
    }
    if (baseSlide.cta === "COMMENCER") {
      return onOverlayCta?.(baseSlide);
    }
    next();
  };

  return (
    <div
      style={{
        zIndex: 10,
        position: "relative",
        width: 351,
        height: 366,
        backgroundColor: "#001936",
        border: "2px solid rgba(255,225,73,0.7)",
        borderRadius: 14,
        padding: 22,
        color: "white",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ✅ PLUS DE QUEUE DE BULLE */}

      {/* Contenu */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {slide.title ? (
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              marginBottom: 10,
              color: "#fff",
              fontFamily: "serif",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {slide.title}
          </div>
        ) : null}

        <div
          style={{
            lineHeight: 1.5,
            fontSize: 16,
            whiteSpace: "pre-line",
            color: "#E9F0F6",
          }}
        >
          {slide.text}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {/* Overlay */}
        {overlaySlide ? (
          <button
            onClick={handleCta}
            style={{
              width: "100%",
              height: 50,
              borderRadius: 10,
              backgroundColor: "#E6C14F",
              border: "1px solid #C8A43A",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: "serif", letterSpacing: 1 }}>
              {overlaySlide.cta ?? "MA CHAMBRE"}
            </span>
          </button>
        ) : hasChoices ? (
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              width: "100%",
            }}
          >
            {currentChoices.map((c) => (
              <button
                key={c.id}
                onClick={() => handleChoice(c.id)}
                style={{
                  width: 140,
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: "#E6C14F",
                  border: "1px solid #C8A43A",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontFamily: "serif", letterSpacing: 1 }}>
                  {c.label}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", gap: 10, width: "100%" }}>
            {!isFirst && (
              <button
                onClick={prev}
                style={{
                  width: 56,
                  height: 50,
                  borderRadius: 5,
                  backgroundColor: "transparent",
                  border: "2px solid rgba(255,225,73,0.7)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Précédent"
              >
                <ChevronLeftIcon
                  style={{ width: 22, height: 22, color: "#FFE149" }}
                />
              </button>
            )}

            <button
              onClick={handleCta}
              style={{
                width: "100%",
                height: 50,
                borderRadius: 10,
                backgroundColor: "#E6C14F",
                border: "1px solid #C8A43A",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <span style={{ fontFamily: "serif", letterSpacing: 1 }}>
                {baseSlide.cta ?? (isLast ? "TERMINER" : "LIRE LA SUITE")}
              </span>
              {!isLast && (
                <ChevronRightIcon
                  style={{ width: 22, height: 22, color: "#1E1E1E" }}
                />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
