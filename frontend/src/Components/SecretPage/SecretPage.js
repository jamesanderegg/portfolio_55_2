import React from "react";
import "./SecretPage.css";

export default function SecretPage({ onExit }) {
  return (
    <section className="secret-page" aria-label="Secret portfolio page">
      <button className="secret-page__back" type="button" onClick={onExit}>
        &darr; HOME
      </button>
      <div className="secret-page__content">
        <h1>Secret Page</h1>
        <p>
          This is a hidden page for small experiments, notes, and ideas I may
          build later.
        </p>
      </div>
    </section>
  );
}
