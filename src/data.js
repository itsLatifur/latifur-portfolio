export const personalData = {
  // Basic personal info
  name: "Latifur Rahman Limon",
  role: ["Software Engineer"],
  oneLiner: "Building Nilamee (auction marketplace) using React & .NET",
  // Product or project name to highlight on small screens (editable)
  projectName: "Nilamee",

  // Structured one-liner variants (editable) used by the hero rotator.
  // Editable prefix used by the hero and meta injection. Change this to update the "Currently building" text site-wide.
  oneLinerPrefix: "Building",
  // Each item can be a simple string or an object with parts to highlight.
  // Shape: { before, highlightA, middle, highlightB }
  oneLinerVariants: [
    {
      before: "",
      highlightA: "Nilamee",
      middle: "(auction marketplace) using",
      highlightB: "ASP.NET",
    },
    {
      before: "",
      highlightA: "Nilamee",
      middle: "(auction marketplace) using",
      highlightB: "React.js",
    },
    //{
    //  before: "",
    //  highlightA: "Nilamee",
    //  middle: "(auction marketplace) using",
    //  highlightB: "SQL",
    //},
    // ,
    // {
    //   before: "the",
    //   highlightA: "auction marketplace backend",
    //   middle: "with",
    //   highlightB: "ASP.NET & EF Core",
    // },
    // {
    //   before: "high-performance",
    //   highlightA: ".NET Web APIs",
    //   middle: "for",
    //   highlightB: "auctions",
    // },
  ],
  // About section text
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
  profileImage: "/latifur-rahman-limon.webp",
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
  // Prioritized for backend-focused .NET development
  // Keep labels short; order controls display priority
  skills: [
    // Backend Languages & Core
    { label: "C#", order: 1 },
    { label: "ASP.NET Core", order: 2 },
    { label: "Web API", order: 3 },
    { label: "EF Core", order: 4 },
    { label: "LINQ", order: 5 },
    // Database
    { label: "SQL Server", order: 6 },
    { label: "MySQL", order: 7 },
    // Frontend Frameworks
    // { label: "ASP.NET MVC", order: 8 },
    { label: "Bootstrap", order: 9 },
    // Tools & Version Control
    { label: "Git/GitHub", order: 10 },
    { label: "Postman", order: 11 },
    // { label: "Visual Studio", order: 12 },
    // { label: "VS Code", order: 13 },
    // Secondary languages & frameworks
    { label: "JavaScript", order: 14 },
    { label: "React", order: 15 },
    { label: "HTML & CSS", order: 16 },
    { label: "Tailwind CSS", order: 17 },
    // { label: "Java", order: 18 },
    // { label: "C/C++", order: 19 },
    { label: "Netlify", order: 20 },
  ],

  // Certifications / Achievements (shown under About)
  certifications: [
    {
      name: "Web Development Essentials (80 hours)",
      issuer:
        "Department of CSE, Jagannath University • EDGE Project, Bangladesh Computer Council (ICT Division)",
      year: "2025",
      url: "https://training.edge.gov.bd/certificate-validation?certificate_no=EDGE-DSTS-106-2619-00006",
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
        "IUBAT - International University of Business Agriculture and Technology",
      // Optional link to paper/preprint or repo when available
      url: "",
      order: 1,
    },
  ],
};

export const experiencesData = [
  {
    years: "Oct 2025 - Jan 2026",
    role: "Software Engineer Intern",
    company: "Prime Tech Solutions Ltd.",
    companyUrl: "https://primetechbd.com/",
    location: "T.K. Bhaban, Karwan Bazar",
    locationMapUrl: "https://maps.app.goo.gl/d1QCx5UNbAnQNa4S6",
    workMode: "On-site",
    employmentType: "Internship",
    description: "ASP.NET Core development",
    logo: "/primetech.jpg", // add custom logo path if not auto-fetched
  },
];
