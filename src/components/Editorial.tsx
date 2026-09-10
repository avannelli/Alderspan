import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import { expertise } from "../data/expertise";
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}
export function ProjectFeature({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link className="project-feature" to={"/projects/" + project.slug}>
      <div className="project-image">
        <img
          src={project.image}
          alt={project.alt}
          loading="lazy"
          width="1600"
          height="960"
        />
        <span className="image-arrow" aria-hidden="true">
          ↗
        </span>
        <span className="project-index micro">0{index + 1}</span>
      </div>
      <div className="project-card-body">
        <div className="project-heading">
          <h3>{project.title}</h3>
          <span className="project-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
        <div className="project-byline micro">
          <span>{project.location}</span>
          <span>{project.year}</span>
        </div>
        <p className="project-summary">{project.intro}</p>
        <div className="card-showcase">
          <span className="card-kicker">Project focus</span>
          <div className="focus-tags">
            {project.services.split(", ").map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>
        <div className="card-bottom"><span>{project.type}</span><span>View case study <b>↗</b></span></div>
      </div>
    </Link>
  );
}
export function ProjectGallery() {
  const [filter, setFilter] = useState("All");
  const [shown, setShown] = useState("All");
  const [fading, setFading] = useState(false);
  const filters = ["All", "Structures", "Infrastructure", "Water"];
  const filtered = projects.filter(
    (project) => shown === "All" || project.discipline.includes(shown),
  );
  useEffect(() => {
    if (filter === shown) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(filter);
      return;
    }
    setFading(true);
    const swap = window.setTimeout(() => {
      setShown(filter);
      setFading(false);
    }, 220);
    return () => window.clearTimeout(swap);
  }, [filter, shown]);

  return (
    <div className="project-gallery">
      <div className="filters" aria-label="Filter projects">
        {filters.map((item) => {
          const count =
            item === "All"
              ? projects.length
              : projects.filter((project) =>
                  project.discipline.includes(item),
                ).length;
          return (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
              <span>{String(count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>
      <div
        className={fading ? "project-grid is-fading" : "project-grid"}
        key={shown}
      >
        {filtered.map((project) => (
          <ProjectFeature
            key={project.slug}
            project={project}
            index={projects.indexOf(project)}
          />
        ))}
      </div>
      <p className="micro fictional-note">
        All projects, locations and outcomes are fictional design studies.
      </p>
    </div>
  );
}
export function ExpertiseIndex() {
  return (
    <div className="expertise-index">
      {expertise.map((item, i) => (
        <Link
          className="expertise-row"
          to={"/expertise/" + item.slug}
          key={item.slug}
        >
          <span className="micro">0{i + 1}</span>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <span className="row-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      ))}
    </div>
  );
}
export function Stats() {
  return (
    <div className="stats">
      {[
        ["48", "Engineers"],
        ["06", "Disciplines"],
        ["126", "Projects"],
        ["14", "Years in practice"],
      ].map(([value, label]) => (
        <div key={label}>
          <span>{value}</span>
          <p className="micro">{label}</p>
        </div>
      ))}
    </div>
  );
}
export function TechnicalDiagram() {
  return (
    <svg
      className="technical-diagram"
      viewBox="0 0 900 480"
      role="img"
      aria-label="Original conceptual structural diagram showing a continuous truss, support points and load directions"
    >
      <defs>
        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path
            d="M30 0H0V30"
            fill="none"
            stroke="currentColor"
            strokeWidth=".4"
            opacity=".2"
          />
        </pattern>
      </defs>
      <rect width="900" height="480" fill="url(#grid)" />
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M70 294L682 189l142 65-612 109ZM70 294V214L682 109v80M70 214l142 69L824 174v80M212 283v80M682 109l142 65" />
        {Array.from({ length: 9 }, (_, i) => {
          const x = 70 + i * 68,
            y = 214 - i * 11.67;
          return (
            <path
              key={i}
              d={`M${x} ${y}l68 68.3v-80M${x + 142} ${y + 69}l68 68.3v-80M${x} ${y}l142 69`}
            />
          );
        })}
        <path
          d="M145 281v113l28 14v-114M652 194v94l28 14v-113M70 415l612-105M70 405v20M682 300v20"
          strokeDasharray="4 4"
        />
        <path d="M130 130v50m-5-7 5 7 5-7M334 94v50m-5-7 5 7 5-7M538 60v50m-5-7 5 7 5-7" />
      </g>
      <g
        fill="currentColor"
        fontFamily="monospace"
        fontSize="10"
        letterSpacing="2"
      >
        <text x="45" y="45">
          A—01 / STRUCTURAL PRINCIPLE
        </text>
        <text x="342" y="387" transform="rotate(-10 342 387)">
          CONTINUOUS LOAD PATH
        </text>
        <text x="620" y="450">
          CONCEPT ONLY / NOT FOR CONSTRUCTION
        </text>
      </g>
    </svg>
  );
}
