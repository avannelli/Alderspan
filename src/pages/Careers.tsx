import { useRef, useState } from "react";
import { SectionLabel } from "../components/Editorial";
import { FrameArt } from "../components/PageArt";
import { positions } from "../data/careers";

export default function Careers() {
  const [position, setPosition] = useState("General interest");
  const [complete, setComplete] = useState(false);
  const nameInput = useRef<HTMLInputElement>(null);
  function apply(title: string) {
    setPosition(title);
    setComplete(false);
    document
      .getElementById("application")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    nameInput.current?.focus({ preventScroll: true });
  }
  return (
    <div className="page careers-page">
      <SectionLabel>Careers</SectionLabel>
      <div className="page-intro art-intro">
        <div className="intro-copy">
          <h1>
            Bring your curiosity.
            <br />
            Build your perspective.
          </h1>
          <p>
            Good engineering starts with people who ask better questions. Find
            your place at the table.
          </p>
        </div>
        <FrameArt />
      </div>
      <div className="careers-banner">
        <span className="micro">A practice to grow with</span>
        <h2>
          Meaningful projects.
          <br />
          Room to make a difference.
        </h2>
        <p>
          Our imagined team brings different experiences to a shared task:
          making thoughtful, useful places. We value careful thinking, generous
          collaboration and a willingness to learn.
        </p>
      </div>
      <section className="career-benefits" aria-label="Life at Alderspan">
        {[
          [
            "01",
            "Learn alongside others",
            "A dedicated mentor, cross-discipline design reviews and time set aside for professional development.",
          ],
          [
            "02",
            "Find a considered balance",
            "Flexible working patterns, focused studio days and a culture that respects life beyond the project.",
          ],
          [
            "03",
            "Have a voice from day one",
            "Small project teams, open conversations and the opportunity to influence how an idea takes shape.",
          ],
        ].map(([number, title, copy]) => (
          <article key={number}>
            <span className="micro">{number} / Working here</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>
      <section className="open-positions">
        <div className="section-top">
          <SectionLabel>Open positions</SectionLabel>
          <h2>
            Different paths.
            <br />
            Shared purpose.
          </h2>
          <span className="micro vacancy-count">
            {String(positions.length).padStart(2, "0")} imagined opportunities
          </span>
        </div>
        <p className="form-note">
          These are fictional vacancies for a portfolio concept, not active job
          offers.
        </p>
        <div className="job-list">
          {positions.map((job) => (
            <details className="job" key={job.id}>
              <summary>
                <span className="micro job-id">{job.id}</span>
                <span>
                  <h3>{job.title}</h3>
                  <span className="job-meta">
                    {job.discipline} · {job.location} · {job.level}
                  </span>
                </span>
                <span className="job-expand" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="job-details">
                <p>{job.summary}</p>
                <div className="job-columns">
                  <div>
                    <h4>What you would do</h4>
                    <ul>
                      {job.responsibilities.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>What you would bring</h4>
                    <ul>
                      {job.requirements.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  className="apply-button"
                  onClick={() => apply(job.title)}
                >
                  Start a demo application <span aria-hidden="true">↗</span>
                </button>
              </div>
            </details>
          ))}
        </div>
      </section>
      <section className="application-section" id="application">
        <div>
          <SectionLabel>Introduce yourself</SectionLabel>
          <h2>
            A little about you.
            <br />A world of possibility.
          </h2>
          <p>
            Choose a role or register your general interest. We would love to
            hear what you enjoy working on and what you hope to learn next.
          </p>
          <ol className="hiring-process">
            <li>
              <span className="micro">01</span> Share your perspective
            </li>
            <li>
              <span className="micro">02</span> Meet the team
            </li>
            <li>
              <span className="micro">03</span> Explore the possibilities
            </li>
          </ol>
          <p className="form-note">
            Illustrative application process. Please use example information; no
            application is sent or stored.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setComplete(true);
          }}
          onChange={() => setComplete(false)}
        >
          <h2>Your introduction</h2>
          <p className="form-note">
            Portfolio demonstration only. This form does not accept real
            applications.
          </p>
          <label htmlFor="app-role">Position</label>
          <select
            id="app-role"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option>General interest</option>
            {positions.map((p) => (
              <option key={p.id}>{p.title}</option>
            ))}
          </select>
          <label htmlFor="app-name">
            Name
            <input
              ref={nameInput}
              id="app-name"
              autoComplete="name"
              required
              placeholder="Your example name"
            />
          </label>
          <label htmlFor="app-email">
            Email
            <input
              id="app-email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
          </label>
          <label htmlFor="app-portfolio">
            Portfolio or profile URL (optional)
            <input
              id="app-portfolio"
              type="url"
              placeholder="https://example.com/portfolio"
            />
          </label>
          <label htmlFor="app-message">
            Tell us about your interests
            <textarea
              id="app-message"
              rows={4}
              required
              placeholder="What would you like to work on?"
            />
          </label>
          <button type="submit" className="submit-button">
            Preview application <span aria-hidden="true">↗</span>
          </button>
          <p role="status" className="form-status">
            {complete
              ? `Your demo application for ${position.toLowerCase()} is ready. Nothing has been sent or stored.`
              : ""}
          </p>
        </form>
      </section>
    </div>
  );
}
