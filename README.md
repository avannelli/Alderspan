# Alderspan Engineering

A fictional engineering consultancy portfolio. All projects, people, locations, statistics and outcomes are invented. All architectural imagery and structural drawings are original SVG illustrations, not photographs of real projects.

## Run

`npm install` then `npm run dev`. `npm run build` checks TypeScript and creates the production build in `dist`. `npm run preview` serves that build. Production hosting must rewrite unknown paths to `index.html` for React Router.

## Structure

- `src/components/Identity.tsx`: SVG identity, navigation, session intro and footer.
- `src/components/Editorial.tsx`: reusable project features, expertise rows, statistics and structural diagram.
- `src/pages/Home.tsx`: editorial homepage.
- `src/pages/Pages.tsx`: projects index and filters, project details, expertise, about, contact and 404.
- `src/data/projects.ts`: typed project content. Add an object here and an image in `public/images/` to publish another project. Its route and portfolio feature are created automatically. Add its slug to related entries in `src/data/expertise.ts` if appropriate.
- `src/data/expertise.ts` and `src/data/people.ts`: service and fictional profile content.
- `src/styles/variables.css`: color and spacing tokens.
- `src/styles/global.css`: typography, layout, component styling, responsive rules and motion.
- `public/images/`: four original, scalable architectural concept illustrations.

## Identity and motion

The SVG mark combines a vertical support with a triangular cantilever and an intermediate chord. The same header link and SVG are animated with the Web Animations API: measured header bounds establish a centered starting transform; the mark draws, the wordmark appears, and the lockup moves to its actual header position over 1.75 seconds. The header always reserves the final logo space. `sessionStorage` skips the full sequence after its first completion; reduced-motion skips it, and a viewport resize safely ends it.

The contact form validates inputs locally and displays a demo acknowledgement. It does not transmit or persist any content. The `.example` email is intentionally non-operational.

## Careers and updated navigation

`src/pages/Careers.tsx` renders expandable fictional job descriptions and a local demo application. Edit `src/data/careers.ts` to update positions. `src/styles/cards-careers.css` defines project cards and careers layouts; heading and clay accent tokens live in `src/styles/variables.css`. Primary routes are `/projects`, `/expertise`, `/about`, `/careers`, and `/contact`. Old `/work` and `/studio` links redirect to the corresponding new routes. Run `npm test` for browser checks (Microsoft Edge).
