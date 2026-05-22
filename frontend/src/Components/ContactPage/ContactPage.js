import React, { useMemo, useState } from "react";
import "./ContactPage.css";

const initialForm = {
  name: "",
  email: "",
  message: "",
  website: "",
  company: "",
  hp_field: "",
};

export default function ContactPage({
  source = "Portfolio",
  title = "Contact",
  intro = "Send a note with the context, timeline, and what a useful first step would look like.",
}) {
  const submittedAt = useMemo(() => Date.now(), []);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/contact_form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          source,
          submitted_at: submittedAt,
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        const errorMessage =
          result?.errors?.email ||
          result?.errors?.message ||
          result?.error ||
          "The message could not be sent.";

        setStatus("error");
        setFeedback(errorMessage);
        return;
      }

      setForm(initialForm);
      setStatus("success");
      setFeedback("Message sent. I will reply by email.");
    } catch (error) {
      setStatus("error");
      setFeedback("The message could not be sent. Please try again later.");
    }
  };

  return (
    <div className="contact-page" onClick={(event) => event.stopPropagation()}>
      <div className="contact-page__copy">
        <p className="contact-page__eyebrow">{source}</p>
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>
      <form className="contact-page__form" onSubmit={handleSubmit}>
        <div className="contact-page__trap" aria-hidden="true">
          <label>
            Website
            <input
              name="website"
              type="text"
              tabIndex="-1"
              autoComplete="off"
              value={form.website}
              onChange={updateField}
            />
          </label>
          <label>
            Company
            <input
              name="company"
              type="text"
              tabIndex="-1"
              autoComplete="off"
              value={form.company}
              onChange={updateField}
            />
          </label>
          <label>
            Leave blank
            <input
              name="hp_field"
              type="text"
              tabIndex="-1"
              autoComplete="off"
              value={form.hp_field}
              onChange={updateField}
            />
          </label>
        </div>

        <label>
          Name
          <input
            name="name"
            type="text"
            maxLength="120"
            autoComplete="name"
            value={form.name}
            onChange={updateField}
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            maxLength="254"
            autoComplete="email"
            required
            value={form.email}
            onChange={updateField}
          />
        </label>
        <label>
          Message
          <textarea
            name="message"
            maxLength="5000"
            required
            rows="7"
            value={form.message}
            onChange={updateField}
          />
        </label>
        <div className="contact-page__footer">
          <button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending" : "Send"}
          </button>
          {feedback ? (
            <p className={`contact-page__feedback contact-page__feedback--${status}`}>
              {feedback}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
