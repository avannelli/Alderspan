export interface Project {
  slug: string;
  title: string;
  discipline: string;
  location: string;
  year: string;
  type: string;
  image: string;
  alt: string;
  intro: string;
  challenge: string;
  approach: string;
  outcome: string;
  client: string;
  scale: string;
  services: string;
}
export const projects: Project[] = [
  {
    slug: "north-basin-crossing",
    title: "North Basin Crossing",
    discipline: "Structures + Transportation",
    location: "Fairhaven District",
    year: "2026",
    type: "Pedestrian crossing",
    image: "/images/north-basin.svg",
    alt: "Original architectural concept illustration of a slender concrete crossing over still water, with rhythmic structural piers.",
    intro:
      "A quiet connection. A structure that gives the landscape room to breathe.",
    challenge:
      "Two disconnected banks called for a public crossing with a light presence. Soft basin ground and a changing waterline shaped the fictional design brief.",
    approach:
      "A continuous, slender deck distributes loads across paired piers. Repeated precast elements simplify assembly, while a restrained edge profile opens uninterrupted views over the water.",
    outcome:
      "The concept provides a shared walking and cycling route with generous resting points. A repeatable structural system brings clarity to both the silhouette and the proposed construction sequence.",
    client: "North Basin Public Realm Collective (fictional)",
    scale: "216 m crossing / 6 m deck",
    services: "Structural design, bridge engineering, construction sequencing",
  },
  {
    slug: "morrow-viaduct",
    title: "Morrow Viaduct",
    discipline: "Civil + Infrastructure",
    location: "Morrow Basin",
    year: "2025",
    type: "Regional connection",
    image: "/images/morrow-viaduct.svg",
    alt: "Original concept illustration of an elevated viaduct crossing an abstract wooded valley.",
    intro: "Continuity across a complex landscape.",
    challenge:
      "The fictional corridor needed to traverse a deep valley while preserving the ground below for water and wildlife.",
    approach:
      "Long, balanced spans reduce the number of foundations. A consistent pier family responds to changing heights without introducing unnecessary complexity.",
    outcome:
      "An integrated viaduct concept with a clear load path and a staged erection strategy, designed around minimal intervention at valley level.",
    client: "Morrow Regional Connections Office (fictional)",
    scale: "480 m alignment / 8 spans",
    services: "Civil engineering, structural analysis, foundation concept",
  },
  {
    slug: "east-reach-waterworks",
    title: "East Reach Waterworks",
    discipline: "Water + Infrastructure",
    location: "East Reach Quarter",
    year: "2026",
    type: "Water infrastructure",
    image: "/images/east-reach.svg",
    alt: "Original architectural concept illustration of circular water treatment basins and concrete service buildings.",
    intro: "Essential infrastructure, made part of everyday life.",
    challenge:
      "The imagined district required a new water facility that could sit comfortably beside a future public landscape.",
    approach:
      "Gravity-led process routes connect a compact sequence of treatment basins. Robust concrete forms create a legible system with accessible maintenance edges.",
    outcome:
      "A coordinated water infrastructure concept that accommodates phased capacity and makes space for a public learning route.",
    client: "East Reach Water Assembly (fictional)",
    scale: "18,000 m² site / 3 treatment basins",
    services: "Water systems, civil design, structural coordination",
  },
  {
    slug: "cedar-transit-hall",
    title: "Cedar Transit Hall",
    discipline: "Structures + Transportation",
    location: "North Vale",
    year: "2024",
    type: "Public transport",
    image: "/images/cedar-hall.svg",
    alt: "Original architectural concept illustration of a transit hall with a rhythmic folded roof and slender columns.",
    intro: "An open room for a district on the move.",
    challenge:
      "The fictional interchange needed a generous, sheltered concourse without a forest of columns interrupting passenger movement.",
    approach:
      "A series of folded roof beams spans between perimeter supports. The structural rhythm doubles as a wayfinding device, bringing daylight deep into the hall.",
    outcome:
      "A clear-span station concept with adaptable circulation and a roof system designed for repeatable off-site fabrication.",
    client: "North Vale Mobility Partnership (fictional)",
    scale: "8,400 m² hall / 42 m clear span",
    services: "Structural engineering, roof design, fabrication studies",
  },
];
