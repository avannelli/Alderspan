import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import { expertise } from "../data/expertise";
import { people } from "../data/people";
import { BridgeArt, NodeArt, PlanArt, SurveyArt } from "../components/PageArt";
import {
  ExpertiseIndex,
  ProjectFeature,
  ProjectGallery,
  SectionLabel,
  Stats,
  TechnicalDiagram,
} from "../components/Editorial";
export function Projects() {
  return (
    <div className="page">
      <SectionLabel>Projects</SectionLabel>
      <div className="page-intro art-intro">
        <div className="intro-copy">
          <h1>
            Projects with
            <br />
            lasting purpose.
          </h1>
          <p>
            Four imagined projects. A shared belief in the power of considered
            engineering.
          </p>
        </div>
        <BridgeArt />
      </div>
      <ProjectGallery />
    </div>
  );
}
export function ProjectDetail() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <article className="page project-detail">
      <Link className="micro back-link" to="/projects">
        ← All projects
      </Link>
      <div className="page-intro">
        <h1>{p.title}</h1>
        <p>{p.intro}</p>
      </div>
      <div className="detail-meta micro">
        <span>{p.discipline}</span>
        <span>{p.location}</span>
        <span>
          {p.year} / {p.type}
        </span>
        <span>Fictional concept</span>
      </div>
      <img
        className="detail-hero"
        src={p.image}
        alt={p.alt}
        width="1600"
        height="960"
      />
      <div className="case-body">
        <aside>
          <SectionLabel>Project notes</SectionLabel>
          <dl>
            <dt>Client</dt>
            <dd>{p.client}</dd>
            <dt>Scale</dt>
            <dd>{p.scale}</dd>
            <dt>Services</dt>
            <dd>{p.services}</dd>
            <dt>Delivery scope</dt>
            <dd>Fictional concept through coordinated design study</dd>
          </dl>
        </aside>
        <div>
          {[
            ["Challenge", p.challenge],
            ["Approach", p.approach],
            ["Outcome", p.outcome],
          ].map(([title, copy], i) => (
            <section className="case-section" key={title}>
              <span className="micro">0{i + 1}</span>
              <h2>{title}</h2>
              <p>{copy}</p>
            </section>
          ))}
        </div>
      </div>
      <div className="drawing-panel">
        <TechnicalDiagram />
        <p className="micro">Fig. 01 / Conceptual load-path study</p>
      </div>
      <Link className="next-project" to={"/projects/" + next.slug}>
        <span className="micro">Next project</span>
        <h2>{next.title} ↗</h2>
      </Link>
    </article>
  );
}
export function Expertise() {
  const { slug } = useParams();
  const item = expertise.find((x) => x.slug === slug);
  if (slug && !item) return <NotFound />;
  return (
    <div className="page">
      <SectionLabel>Expertise</SectionLabel>
      <div className={slug ? "page-intro" : "page-intro art-intro"}>
        <div className="intro-copy">
        <h1>
          {item ? (
            item.name
          ) : (
            <>
              Connected
              <br />
              by curiosity.
            </>
          )}
        </h1>
        <p>
          {item
            ? item.description
            : "Independent disciplines. Shared knowledge. A complete view of every challenge."}
        </p>
        </div>
        {!slug && <NodeArt />}
      </div>
      {item ? (
        <>
          <div className="service-intro">
            <TechnicalDiagram />
            <div>
              <h2>
                Thinking beyond
                <br />
                the brief.
              </h2>
              <p>{item.detail}</p>
              <p>
                These services describe the imagined capabilities of Alderspan,
                a fictional practice created for portfolio demonstration.
              </p>
            </div>
          </div>
          <h2 className="related-heading">Related projects</h2>
          <div className="project-grid">
            {projects
              .filter((p) => item.projects.includes(p.slug))
              .map((p) => (
                <ProjectFeature
                  key={p.slug}
                  project={p}
                  index={projects.indexOf(p)}
                />
              ))}
          </div>
          <Link className="text-link" to="/expertise">
            ← All expertise
          </Link>
        </>
      ) : (
        <ExpertiseIndex />
      )}
    </div>
  );
}
export function About() {
  return (
    <div className="page">
      <SectionLabel>About</SectionLabel>
      <div className="page-intro art-intro">
        <div className="intro-copy">
          <h1>
            Thoughtful people.
            <br />
            Clearer possibilities.
          </h1>
          <p>
            A fictional independent practice with a shared interest in how
            things work—and how they could work better.
          </p>
        </div>
        <PlanArt />
      </div>
      <div className="studio-statement">
        <span className="micro">Our point of view</span>
        <h2>
          We believe good engineering should feel inevitable. Less material.
          Clearer systems. Better outcomes.
        </h2>
      </div>
      <Stats />
      <p className="micro fictional-note">
        All practice figures and profiles are invented for this design concept.
      </p>
      <section className="team-section">
        <div className="section-top">
          <SectionLabel>People & perspectives</SectionLabel>
          <p>
            Different ways of seeing.
            <br />A common language of care.
          </p>
        </div>
        <div className="people-grid">
          {people.map((p, i) => (
            <article key={p.name}>
              <div className={"portrait portrait-" + i} aria-hidden="true">
                <span>
                  {p.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <small className="micro">Perspective / 0{i + 1}</small>
              </div>
              <h3>{p.name}</h3>
              <span className="micro">{p.role}</span>
              <p>{p.bio}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="culture">
        <SectionLabel>A learning practice</SectionLabel>
        <h2>
          Room to question.
          <br />
          Space to grow.
        </h2>
        <p>
          Our imagined studio is a place for open sketchbooks, honest critique
          and shared discovery. Engineers, designers and technical specialists
          work around the same table, learning from each other at every stage.
        </p>
      </section>
    </div>
  );
}
export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="page">
      <SectionLabel>Contact</SectionLabel>
      <div className="page-intro art-intro">
        <div className="intro-copy">
          <h1>
            Every good project
            <br />
            starts with a question.
          </h1>
          <p>Let’s imagine what comes next.</p>
        </div>
        <SurveyArt />
      </div>
      <div className="contact-layout">
        <div>
          <a className="contact-email" href="mailto:studio@alderspan.example">
            studio@alderspan.example ↗
          </a>
          <p className="form-note">
            An example address for a fictional practice.
          </p>
          <div className="offices">
            {["West Alder", "North Vale", "Morrow District"].map((x, i) => (
              <div key={x}>
                <span className="micro">
                  Studio 0{i + 1} / Fictional location
                </span>
                <h3>{x}</h3>
                <p>By imagined appointment.</p>
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <h2>A new conversation</h2>
          <p className="form-note">
            Demonstration form only. Nothing is sent or stored.
          </p>
          <label htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              placeholder="Your name"
              onChange={() => setSent(false)}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              onChange={() => setSent(false)}
            />
          </label>
          <label htmlFor="interest">
            Area of interest
            <select id="interest" name="interest">
              <option>General enquiry</option>
              {expertise.map((x) => (
                <option key={x.slug}>{x.name}</option>
              ))}
            </select>
          </label>
          <label htmlFor="message">
            What are you thinking about?
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Tell us a little about your idea…"
              onChange={() => setSent(false)}
            />
          </label>
          <button type="submit" className="submit-button">
            Preview enquiry <span>↗</span>
          </button>
          <p role="status" className="form-status">
            {sent
              ? "Your demo enquiry is complete. No message has been sent or stored."
              : ""}
          </p>
        </form>
      </div>
    </div>
  );
}
export function NotFound() {
  return (
    <div className="page not-found">
      <span className="micro">404 / An uncharted connection</span>
      <h1>
        Nothing built here.
        <br />
        Yet.
      </h1>
      <Link className="text-link" to="/">
        Return to the homepage ↗
      </Link>
    </div>
  );
}
