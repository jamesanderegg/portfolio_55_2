import React from "react";
import "./CoverPage.css";
import Sentence from "../Sentence/Sentence";

function CoverPage() {
  const sentences = [
    "data driven web applications",
    "dashboards and reporting",
    "point of sale systems",
    "data automation",
    "local AI solutions",
  ];

  return (
    <div
      className="cover-page"
      aria-label={`DataFluent services: ${sentences.join(", ")}`}
    >
      <div className="cover-page__sentence" aria-hidden="true">
        <Sentence
          sentences={sentences}
          color="#E4BB41"
          startDelay={500}
          typingSpeed={90}
          maxFontSize={20}
          minFontSize={20}
          exitOnComplete
          holdDelay={900}
          exitDuration={520}
        />
      </div>
    </div>
  );
}

export default CoverPage;
