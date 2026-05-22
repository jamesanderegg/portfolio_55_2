function getArtworkTitle(fileName) {
  return fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function loadArtwork() {
  const context = require.context(
    "../assets/art-gallery",
    false,
    /\.(png|jpe?g|webp|gif|avif)$/i
  );

  return context.keys().map((path) => {
    const fileName = path.replace("./", "");

    return {
      src: context(path),
      fileName,
      title: getArtworkTitle(fileName),
    };
  });
}

export function pickRandomArtwork(artwork, count = 3) {
  return [...artwork]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}
