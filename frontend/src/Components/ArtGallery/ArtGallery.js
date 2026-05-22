import React, { useMemo, useState } from "react";
import "./ArtGallery.css";

function loadArtwork() {
  const context = require.context(
    "../../assets/art-gallery",
    false,
    /\.(png|jpe?g|webp|gif|avif)$/i
  );

  return context.keys().map((path) => {
    const fileName = path.replace("./", "");
    const title = fileName
      .replace(/\.[^/.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase());

    return {
      src: context(path),
      fileName,
      title,
    };
  });
}

function ArtGallery() {
  const artwork = useMemo(() => loadArtwork(), []);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  return (
    <section className="art-gallery" aria-label="Art gallery">
      <div className="art-gallery__header">
        <p className="art-gallery__kicker">Artwork</p>
        <h1>Art Gallery</h1>
      </div>

      {artwork.length > 0 ? (
        <div className="art-gallery__grid">
          {artwork.map((piece) => (
            <button
              className="art-gallery__piece"
              key={piece.fileName}
              type="button"
              onClick={() => setSelectedArtwork(piece)}
            >
              <img
                src={piece.src}
                alt={piece.title}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      ) : (
        <div className="art-gallery__empty">
          <h2>Drop your artwork into the gallery folder.</h2>
          <p>
            Add image files to frontend/src/assets/art-gallery and they will
            appear here.
          </p>
        </div>
      )}

      {selectedArtwork ? (
        <div
          className="art-gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedArtwork.title}
          onClick={() => setSelectedArtwork(null)}
        >
          <button
            className="art-gallery__close"
            type="button"
            aria-label="Close artwork preview"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedArtwork(null);
            }}
          >
            x
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={selectedArtwork.src} alt={selectedArtwork.title} />
          </figure>
        </div>
      ) : null}
    </section>
  );
}

export default ArtGallery;
