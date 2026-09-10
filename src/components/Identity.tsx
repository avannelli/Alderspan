import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
export function Logo() {
  return (
    <>
      <svg
        className="logo-mark"
        viewBox="0 0 44 44"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 37V7h8v30M14 7h26L14 30M14 18h14"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="miter"
        />
      </svg>
      <span className="wordmark">
        ALDERSPAN<span>ENGINEERING</span>
      </span>
    </>
  );
}
export function Header() {
  const logo = useRef<HTMLAnchorElement>(null);
  const [menu, setMenu] = useState(false);
  const [stuck, setStuck] = useState(false);
  const location = useLocation();
  useLayoutEffect(() => {
    setMenu(false);
  }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let seen = false;
    try {
      seen = sessionStorage.getItem("alderspan-intro") === "seen";
    } catch {
      /* Storage is optional. */
    }
    if (seen || reduced.matches || !logo.current) return;
    const element = logo.current;
    const rect = element.getBoundingClientRect();
    const scale = Math.min(2.8, (window.innerWidth - 64) / rect.width);
    const x = window.innerWidth / 2 - (rect.left + rect.width / 2);
    const y = window.innerHeight / 2 - (rect.top + rect.height / 2);
    document.documentElement.classList.add("intro-active");
    const motion = element.animate(
      [
        { transform: `translate(${x}px, ${y}px) scale(${scale})`, offset: 0 },
        {
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          offset: 0.55,
        },
        { transform: "translate(0,0) scale(1)", offset: 1 },
      ],
      { duration: 1750, easing: "cubic-bezier(.65,0,.2,1)", fill: "both" },
    );
    const finish = () => {
      motion.cancel();
      document.documentElement.classList.remove("intro-active");
      try {
        sessionStorage.setItem("alderspan-intro", "seen");
      } catch {
        /* Storage is optional. */
      }
    };
    motion.onfinish = finish;
    const skip = () => finish();
    window.addEventListener("resize", skip, { once: true });
    reduced.addEventListener("change", skip, { once: true });
    return () => {
      motion.cancel();
      document.documentElement.classList.remove("intro-active");
      window.removeEventListener("resize", skip);
      reduced.removeEventListener("change", skip);
    };
  }, []);
  return (
    <>
      <div className="intro-screen" aria-hidden="true" />
      <header className="header">
        <Link
          ref={logo}
          to="/"
          className="logo"
          aria-label="Alderspan Engineering home"
        >
          <Logo />
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="main-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close −" : "Menu +"}
        </button>
        <nav
          id="main-nav"
          className={
            (menu ? "nav open" : "nav") + (stuck ? " stuck" : "")
          }
          aria-label="Main navigation"
        >
          {["projects", "expertise", "about", "careers", "contact"].map(
            (item) => (
              <NavLink
                key={item}
                to={"/" + item}
                onClick={() => setMenu(false)}
              >
                {item}
                <span>↗</span>
              </NavLink>
            ),
          )}
        </nav>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <Link className="logo" to="/" aria-label="Alderspan Engineering home">
          <Logo />
        </Link>
        <p>
          Good questions.
          <br />
          Considered answers.
        </p>
        <a className="text-link" href="mailto:studio@alderspan.example">
          studio@alderspan.example ↗
        </a>
      </div>
      <div className="footer-bottom">
        <small>
          Alderspan Engineering is a fictional design concept created for
          portfolio demonstration.
        </small>
        <nav aria-label="Footer navigation">
          {["Projects", "Expertise", "About", "Careers", "Contact"].map((x) => (
            <Link to={"/" + x.toLowerCase()} key={x}>
              {x}
            </Link>
          ))}
        </nav>
        <span className="micro">© 2026 ALDERSPAN</span>
      </div>
    </footer>
  );
}
