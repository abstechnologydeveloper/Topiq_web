"use client";

import { FormEvent, useState } from "react";

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
  };

  return (
    <section>
      <div className="wrap">
        <div className="split-panel">
          <div className="tour-copy">
            <h3>Send us a message</h3>
            <p>
              Fill this in and we&apos;ll get back to you — this form doesn&apos;t
              go anywhere else, and we don&apos;t share your details.
            </p>
          </div>
          <div className="tour-visual" style={{ width: "100%", display: "block" }}>
            <form
              className="contact-form"
              id="contactFormEl"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="cf-name">Name</label>
                <input
                  type="text"
                  id="cf-name"
                  name="name"
                  required
                  placeholder="Your full name"
                />
              </div>
              <div className="frow">
                <div>
                  <label htmlFor="cf-email">Email</label>
                  <input
                    type="email"
                    id="cf-email"
                    name="email"
                    required
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="cf-role">I am a...</label>
                  <select id="cf-role" name="role" defaultValue="Student">
                    <option>Student</option>
                    <option>Parent</option>
                    <option>Teacher</option>
                    <option>School / district admin</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="cf-school">
                  School or institution{" "}
                  <span style={{ color: "var(--ash)", fontWeight: 500 }}>
                    (if applicable)
                  </span>
                </label>
                <input
                  type="text"
                  id="cf-school"
                  name="school"
                  placeholder="e.g. Corona Secondary School, or your district"
                />
              </div>
              <div>
                <label htmlFor="cf-message">Message</label>
                <textarea
                  id="cf-message"
                  name="message"
                  required
                  placeholder="Tell us a little about what you need..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ alignSelf: "flex-start" }}
              >
                Send message
              </button>
              <div className={`form-success${submitted ? " show" : ""}`} id="contactSuccess">
                Thanks — we&apos;ll be in touch within a business day.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}