import React from "react";
import "./SecretPage.css";

export default function SecretPage({ onExit }) {
  return (
    <section className="secret-page" aria-label="Secret portfolio page">
      <button className="secret-page__back" type="button" onClick={onExit}>
        &darr; HOME
      </button>
      <div className="secret-page__content">
        <p className="secret-page__eyebrow">../portfolio</p>
        <h1>Secret Page</h1>
        <p>
          You went one directory above DataFluent and About Me. This tucked-away
          layer is reserved for experiments, hidden notes, and future easter
          eggs.
        </p>
      </div>
    </section>
  );
}
