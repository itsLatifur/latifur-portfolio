import BlogsGif from "./images/collage/blogs.gif";
import PoetryGif from "./images/collage/poetry.gif";
import GalleryGif from "./images/collage/gallery.gif";
import MusicGif from "./images/collage/music.gif";
import PhilosophyGif from "./images/collage/philosophy.gif";

export const personalData = {
  name: "Latifur Rahman Limon",
  role: ["Software Engineer"],
  description: "I build scalable web applications with ASP.NET",
  // About section text (independent from hero description)
  about:
    "I specialize in building robust backend systems and web applications using ASP.NET Core, C#, Entity Framework Core, and SQL Server. I focus on writing clean, maintainable code with proper architecture patterns like MVC, and have experience with RESTful API development, database design, and modern .NET development practices.",
  // Education and location (used to render a meta line under About)
  education: {
    status: "Final‑year CSE student (12th semester)",
    institution: "IUBAT",
    url: "https://iubat.edu",
  },
  location: "Dhaka, Bangladesh",

  showProfileImage: true, // can be toggled to show(true)/hide(false) profile image
  profileImage: "/profile.png",
  // Navbar logo (public path like "/my-logo.svg" or imported asset). Leave empty to use default SVG mark.
  navLogo: "/favicon.png",
  linkedIn: "https://www.linkedin.com/in/latifur/",
  github: "https://github.com/itsLatifur",
  email: "itslatifur@gmail.com",
  resumeLink: "/Latifur_Rahman_Resume.pdf",
  showExperiences: true, // can be toggled to show(true)/hide(false) experience section
  showCollage: false, // toggle entire collage section on/off
  showSkills: true, // toggle skills chips section
  showCertifications: true, // toggle certifications section
  showResearch: true, // toggle research section
  // Projects visibility on the homepage (always visible on /projects route)
  showProjectsOnHome: true,

  // Analytics configuration (set your GA4 ID here to enable analytics)
  analytics: {
    gaMeasurementId: "G-Z060NRM34Q", // Google Analytics Measurement ID
  },

  // Skills & tooling chips (shown under the hero)
  // Prioritized for current .NET-focused internship at Prime Tech Solutions Ltd.
  // Keep labels short; order controls display priority
  skills: [
    { label: "C#", order: 1 },
    { label: ".NET", order: 2 },
    // { label: "ASP.NET Core", order: 3 },
    { label: "EF Core", order: 4 },
    { label: "LINQ", order: 5 },
    { label: "SQL Server", order: 6 },
    { label: "Web API (REST)", order: 7 },
    // { label: "Azure", order: 8 },
    { label: "Git/GitHub", order: 9 },
    // { label: "xUnit", order: 10 },
    // { label: "Dependency Injection", order: 11 },
    // { label: "Docker", order: 12 },

    // Secondary/front‑end skills kept for breadth
    { label: "JavaScript", order: 13 },
    { label: "React", order: 14 },
    { label: "HTML/CSS", order: 15 },
    { label: "Bootstrap", order: 16 },
    { label: "Tailwind CSS", order: 17 },
  ],

  // Certifications / Achievements (shown under About)
  certifications: [
    {
      name: "Web Development Essentials (80 hours)",
      issuer:
        "Department of CSE, Jagannath University • EDGE Project, Bangladesh Computer Council (ICT Division)",
      year: "2025",
      url: "https://training.edge.gov.bd/certificate-validation?certificate_no=EDGE-DSTS-106-2619-00006",
      // Optional metadata for future UI
      credentialId: "EDGE-DSTS-106-2619-00006",
      order: 1,
    },
  ],

  // Research / Thesis work (shown next to Certifications)
  research: [
    {
      title:
        "Low-Resource Sentiment Classification for Regional Bangla Dialects Using BanglaBERT",
      status: "Ongoing",
      year: "2025",
      institution:
        "IUBAT — International University of Business Agriculture and Technology",
      // Optional link to paper/preprint or repo when available
      url: "",
      order: 1,
    },
  ],
};

export const experiencesData = [
  {
    years: "Oct 2025 - present",
    role: "Software Engineer Intern",
    company: "Prime Tech Solutions Ltd.",
    companyUrl: "https://primetechbd.com/",
    location: "T.K. Bhaban, Kawran Bazar",
    locationMapUrl: "https://maps.app.goo.gl/d1QCx5UNbAnQNa4S6",
    workMode: "On-site",
    employmentType: "Internship",
    description: ".NET-based development.",
    logo: "/primetech.jpg", // add custom logo path if not auto-fetched
  },
];

// Collage configuration
// Each item supports:
// - label: string (shown under the tile)
// - href: string (optional; opens in a new tab if provided)
// - img: imported asset (preferred for local src images)
// - src: string URL or public path (e.g., "/my-image.jpg")

// Collage tiles (directory) — control count, labels, links, and images here
// Tip: replace the img with your own imported asset, or set `src: "/public-path.png"`
export const collageItems = [
  {
    label: "Blogs",
    img: BlogsGif,
    href: "https://blogs.latifur.dev/?utm_source=portfolio&utm_medium=collage&utm_campaign=directory&utm_content=blogs",
    visible: true,
  },
  {
    label: "Poetry",
    img: PoetryGif,
    href: "https://poetry.latifur.dev/?utm_source=portfolio&utm_medium=collage&utm_campaign=directory&utm_content=poetry",
    visible: true,
  },
  {
    label: "Gallery",
    img: GalleryGif,
    href: "https://gallery.latifur.dev/?utm_source=portfolio&utm_medium=collage&utm_campaign=directory&utm_content=gallery",
    visible: true,
  },
  {
    label: "Music",
    img: MusicGif,
    href: "https://music.latifur.dev/?utm_source=portfolio&utm_medium=collage&utm_campaign=directory&utm_content=music",
    visible: true,
  },
  {
    label: "Philosophy",
    img: PhilosophyGif,
    href: "https://philosophy.latifur.dev/?utm_source=portfolio&utm_medium=collage&utm_campaign=directory&utm_content=philosophy",
    visible: true,
  },
];
