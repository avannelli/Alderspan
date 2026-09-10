export interface Position {
  id: string;
  title: string;
  discipline: string;
  location: string;
  level: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

export const positions: Position[] = [
  {
    id: "AE-01",
    title: "Structural Engineer",
    discipline: "Structures",
    location: "West Alder",
    level: "Mid-level / Full time",
    summary:
      "Turn ambitious architectural ideas into clear, efficient structural systems, from first sketches through coordinated design.",
    responsibilities: [
      "Develop structural concepts for civic buildings and public crossings.",
      "Test options in steel, timber and concrete with the wider design team.",
      "Coordinate calculations, drawings and design reviews.",
    ],
    requirements: [
      "A background in structural or civil engineering.",
      "Experience developing and communicating structural designs.",
      "Curiosity about materials, collaboration and buildability.",
    ],
  },
  {
    id: "AE-02",
    title: "Civil Design Engineer",
    discipline: "Infrastructure",
    location: "Morrow District",
    level: "Mid-level / Full time",
    summary:
      "Bring drainage, movement and landscape together in infrastructure that supports everyday life.",
    responsibilities: [
      "Develop site layouts, grading and drainage concepts.",
      "Coordinate interfaces between public space and essential utilities.",
      "Communicate design decisions through clear models and drawings.",
    ],
    requirements: [
      "A background in civil or infrastructure design.",
      "Experience with site coordination and digital design tools.",
      "An interest in water-sensitive design and adaptable public spaces.",
    ],
  },
  {
    id: "AE-03",
    title: "Graduate Engineer",
    discipline: "Multidisciplinary",
    location: "North Vale",
    level: "Early career / Full time",
    summary:
      "Build your foundations through supported project work, hands-on design studies and time with different disciplines.",
    responsibilities: [
      "Assist with analysis, concept studies and technical drawings.",
      "Explore design options with an experienced project mentor.",
      "Share research and take part in collaborative design reviews.",
    ],
    requirements: [
      "An engineering degree or equivalent learning pathway.",
      "Clear communication and a willingness to ask questions.",
      "Examples of academic, personal or practical problem-solving work.",
    ],
  },
];
