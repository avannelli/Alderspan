import { Link } from "react-router-dom";
import { ArchArt } from "../components/PageArt";
import {
  ExpertiseIndex,
  ProjectGallery,
  SectionLabel,
  Stats,
  TechnicalDiagram,
} from "../components/Editorial";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-top">
          <span className="micro">
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
          </div>
          <ArchArt />
        </div>
      </section>
      <section id="selected-work" className="section selected projects-showcase">
        <SectionLabel>Projects</SectionLabel>
        <ProjectGallery />
      </section>
      <section className="section expertise-section">
        <SectionLabel>Expertise</SectionLabel>
        <ExpertiseIndex />
      </section>
      <section className="section practice">
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
      <section className="section process">
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
      <section className="careers-preview">
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
      <section className="contact-strip">
        <SectionLabel>Contact</SectionLabel>
        <Link to="/contact">
          What could we build together? <span>↗</span>
        </Link>
      </section>
    </>
  );
}
