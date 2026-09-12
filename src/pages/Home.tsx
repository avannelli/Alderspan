import { Link } from "react-router-dom";
import { ArchArt } from "../components/PageArt";
import { useReveal } from "../components/useReveal";
import {
  ExpertiseIndex,
  ProjectGallery,
  SectionLabel,
  Stats,
  TechnicalDiagram,
} from "../components/Editorial";
export default function Home() {
  useReveal();
  return (
    <>
      <section className="hero">
        <div className="hero-backdrop" aria-hidden="true">
          <span className="hero-grid" />
          <span className="hero-glow hero-glow-petrol" />
          <span className="hero-glow hero-glow-copper" />
        </div>
        <div className="hero-inner">
          <div className="hero-top">
            <span className="micro hero-badge">
              <i className="status-dot" /> Independent thinking. Lasting impact.
            </span>
            <span className="micro hero-note">
              Structures / Infrastructure / Public realm
            </span>
          </div>
          <div className="hero-main">
            <div className="intro-copy">
              <h1>
                Engineering
                <br />
                <span>with consequence.</span>
              </h1>
              <p className="hero-lede">
                We work across structures, infrastructure
                <br className="desktop-break" /> and the public realm.
              </p>
              <div className="hero-actions">
                <Link className="button-primary" to="/projects">
                  Selected work <span aria-hidden="true">↗</span>
                </Link>
                <Link className="button-ghost" to="/contact">
                  Start a conversation
                </Link>
              </div>
            </div>
            <div className="blueprint" aria-hidden="false">
              <span className="blueprint-curl blueprint-curl-top" />
              <div className="blueprint-sheet">
                <ArchArt />
              </div>
              <span className="blueprint-curl blueprint-curl-bottom" />
            </div>
          </div>
          <dl className="hero-meta">
            <div>
              <dt className="micro">Founded</dt>
              <dd>2011</dd>
            </div>
            <div>
              <dt className="micro">Disciplines</dt>
              <dd>Six</dd>
            </div>
            <div>
              <dt className="micro">Practice</dt>
              <dd>Independent</dd>
            </div>
          </dl>
        </div>
      </section>
      <section
        id="selected-work"
        className="section selected projects-showcase"
        data-reveal
      >
        <SectionLabel>Projects</SectionLabel>
        <ProjectGallery />
      </section>
      <section className="section expertise-section" data-reveal>
        <SectionLabel>Expertise</SectionLabel>
        <ExpertiseIndex />
      </section>
      <section className="section practice" data-reveal>
        <SectionLabel>About</SectionLabel>
        <div className="practice-copy">
          <p>
            Less material. Clearer systems. Better outcomes.
            <br />
            We are a collective of curious minds, working at the intersection of
            technical rigour and thoughtful design.
          </p>
          <Link className="text-link" to="/about">
            Meet Alderspan ↗
          </Link>
        </div>
        <Stats />
        <p className="micro fictional-note">
          Practice figures are illustrative, for this fictional portfolio
          concept.
        </p>
      </section>
      <section className="section process" data-reveal>
        <div>
          <SectionLabel>Process</SectionLabel>
          <p>
            We look closely. Test assumptions. Refine the essential.
            <br />A considered process, from the first sketch to the last
            detail.
          </p>
          <ol>
            {["Analyze", "Resolve", "Detail", "Deliver"].map((s, i) => (
              <li key={s}>
                <span className="micro">0{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
        <TechnicalDiagram />
      </section>
      <section className="careers-preview" data-reveal>
        <SectionLabel>Careers</SectionLabel>
        <div className="careers-preview-content">
          <p>
            Join a collaborative practice built around careful thinking, shared
            learning and meaningful work.
          </p>
          <Link className="text-link" to="/careers">
            View openings <span>↗</span>
          </Link>
        </div>
      </section>
      <section className="contact-strip" data-reveal>
        <SectionLabel>Contact</SectionLabel>
        <Link to="/contact">
          What could we build together? <span>↗</span>
        </Link>
      </section>
    </>
  );
}
