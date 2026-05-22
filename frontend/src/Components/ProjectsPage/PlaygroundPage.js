import React from "react";
import "./PlaygroundPage.css";

function PlaygroundPage({ projects = [] }) {
  return (
    <article className="playground-page" aria-label="playground projects">
      <section
        className="playground-page__content playground-page__index"
        aria-label="playground project cards"
      >
        <ol className="playground-page__project-grid">
          {projects.map((project) => (
            <li className="playground-page__project-item" key={project.id}>
              <a className="playground-page__project-card" href={project.href}>
                {project.thumbnail ? (
                  <img
                    className="playground-page__project-image"
                    src={project.thumbnail}
                    alt={`${project.name} preview`}
                    loading="lazy"
                  />
                ) : null}
                <div className="playground-page__project-main">
                  <div className="playground-page__project-heading">
                    <h2 className="playground-page__project-title">
                      {project.name}
                    </h2>
                    <span className="playground-page__project-meta">
                      {project.actionLabel || "Open project"}
                    </span>
                  </div>
                  <p className="playground-page__project-summary">
                    {project.description}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}

export default PlaygroundPage;
