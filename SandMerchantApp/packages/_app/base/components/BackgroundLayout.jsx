export function BackgroundLayout({
  bg,
  children,
  mode = "cover", // "cover" ou "slider"
  slideIndex = 0, // 0,1,2
  slides = 3, // nb de parties
}) {
  const style =
    mode === "slider"
      ? {
          overflow: "hidden",
          minHeight: "100vh",
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${slides * 100}% 100%`, // ex: 300% 100%
          backgroundPosition: `${(slideIndex * 100) / (slides - 1)}% center`, // 0% / 50% / 100%
        }
      : {
          overflow: "hidden",
          minHeight: "100vh",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        };

  return <main style={style}>{children}</main>;
}
