import { useEffect, useRef } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { Header, Footer } from "./components/Identity";
import Careers from "./pages/Careers";
import Home from "./pages/Home";
import {
  Projects,
  ProjectDetail,
  Expertise,
  About,
  Contact,
  NotFound,
} from "./pages/Pages";
import { projects } from "./data/projects";
import { expertise } from "./data/expertise";
export default function App() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const slug = pathname.split("/").filter(Boolean).at(-1);
    const title =
      projects.find((p) => p.slug === slug)?.title ??
      expertise.find((e) => e.slug === slug)?.name ??
      (slug
        ? slug[0].toUpperCase() + slug.slice(1)
        : "Engineering with consequence.");
    document.title = `${title} — Alderspan Engineering`;
    if (previousPath.current !== pathname) {
      document.getElementById("main")?.focus({ preventScroll: true });
      previousPath.current = pathname;
    }
  }, [pathname]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <div key={pathname} className="page-transition">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/expertise/:slug" element={<Expertise />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/work" element={<Navigate to="/projects" replace />} />
            <Route path="/work/:slug" element={<LegacyProject />} />
            <Route path="/studio" element={<Navigate to="/about" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
}

function LegacyProject() {
  const { slug } = useParams();
  return <Navigate to={`/projects/${slug}`} replace />;
}
