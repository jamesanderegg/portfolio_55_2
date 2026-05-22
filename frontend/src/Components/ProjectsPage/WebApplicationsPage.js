import React from "react";
import "./WebApplicationsPage.css";

function WebApplicationsPage({ projects = [] }) {
  return (
    <article className="web-applications-page" aria-label="web application projects">
      <section
        className="web-applications-page__content web-applications-page__index"
        aria-label="web application project cards"
      >
        <ol className="web-applications-page__project-grid">
          {projects.map((project) => (
            <li className="web-applications-page__project-item" key={project.id}>
              <a
                className="web-applications-page__project-card"
                href={project.href}
                target="_blank"
                rel="noreferrer"
              >
                {project.thumbnail ? (
                  <img
                    className="web-applications-page__project-image"
                    src={project.thumbnail}
                    alt={`${project.name} preview`}
                    loading="lazy"
                  />
                ) : null}
                <div className="web-applications-page__project-main">
                  <div className="web-applications-page__project-heading">
                    <h2 className="web-applications-page__project-title">
                      {project.name}
                    </h2>
                    <span className="web-applications-page__project-meta">
                      {project.actionLabel || "View project"}
                    </span>
                  </div>
                  <p className="web-applications-page__project-summary">
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

export default WebApplicationsPage;
