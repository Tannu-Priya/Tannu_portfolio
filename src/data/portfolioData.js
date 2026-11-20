export const personalInfo = {
  name: "Tannu Priya",
  title: "Full Stack Developer | React.js Developer | Software Engineer",
  tagline: "Engineering Digital Experiences.",
  introduction:
    "I build intelligent digital experiences by combining creative design, modern technologies, and problem-solving.",
  bio: [
    "I am a passionate software engineer and full-stack developer dedicated to bridging the gap between rigorous algorithmic logic and high-craft digital experiences.",
    "With a strong foundation in Computer Science and Engineering (B.Tech CSE), I thrive on turning complex problems into intuitive, scalable, and responsive web applications. Whether architecting real-time systems or refining micro-interactions, I focus on performance, accessibility, and clean architecture.",
    "Constantly exploring modern web technologies, real-time protocols, and AI-assisted interfaces, I aim to create software that feels effortless, reliable, and visually unforgettable."
  ],
  availability: "Actively Seeking Opportunities",
  location: "India",
  email: "tannupriya4537@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  resumeUrl: "#resume-section",
  stats: [
    {
      value: "350+",
      label: "DSA Problems Solved",
      subtext: "LeetCode & GeeksforGeeks",
      badge: "Algorithmic Rigor"
    },
    {
      value: "3+",
      label: "Major Full-Stack Projects",
      subtext: "Production Architectures",
      badge: "End-to-End"
    },
    {
      value: "Intern",
      label: "Web Developer Experience",
      subtext: "Ediglobe (April - July 2025)",
      badge: "Industry Proven"
    },
    {
      value: "B.Tech",
      label: "Computer Science & Engg.",
      subtext: "Core CS Foundations",
      badge: "Academic Foundation"
    }
  ]
};

export const skillsData = {
  categories: [
    { id: "all", label: "All Technologies" },
    { id: "frontend", label: "Frontend Development" },
    { id: "backend", label: "Backend Development" },
    { id: "languages", label: "Programming Languages" },
    { id: "databases", label: "Databases" },
    { id: "tools", label: "Tools & Technologies" },
    { id: "core_cs", label: "Core Computer Science" }
  ],
  items: [
    // Frontend
    {
      name: "React.js",
      category: "frontend",
      level: "Advanced",
      description: "Component architecture, custom hooks, context, state management, SPA routing.",
      highlight: true
    },
    {
      name: "JavaScript (ES6+)",
      category: "frontend",
      level: "Advanced",
      description: "Asynchronous programming, event loop, closures, modern syntax, DOM APIs.",
      highlight: true
    },
    {
      name: "HTML5 & CSS3",
      category: "frontend",
      level: "Advanced",
      description: "Semantic layouts, CSS Grid, Flexbox, responsive web design, accessibility.",
      highlight: false
    },
    {
      name: "Tailwind CSS",
      category: "frontend",
      level: "Advanced",
      description: "Utility-first modern design systems, custom themes, responsive components.",
      highlight: true
    },

    // Backend
    {
      name: "Node.js",
      category: "backend",
      level: "Proficient",
      description: "Event-driven runtime, non-blocking I/O, server-side business logic, npm ecosystem.",
      highlight: true
    },
    {
      name: "Express.js",
      category: "backend",
      level: "Proficient",
      description: "Modular routing, middleware pipelines, error handling, RESTful service creation.",
      highlight: true
    },
    {
      name: "REST APIs",
      category: "backend",
      level: "Proficient",
      description: "API design principles, status codes, JWT authentication, request validation.",
      highlight: true
    },

    // Programming Languages
    {
      name: "Java",
      category: "languages",
      level: "Proficient",
      description: "Object-oriented programming, collections framework, multi-threading basics.",
      highlight: true
    },
    {
      name: "Python",
      category: "languages",
      level: "Proficient",
      description: "Scripting, algorithmic implementation, data analysis tools, backend automation.",
      highlight: true
    },
    {
      name: "C++",
      category: "languages",
      level: "Proficient",
      description: "Competitive programming, STL containers, memory management, pointers.",
      highlight: true
    },
    {
      name: "C",
      category: "languages",
      level: "Intermediate",
      description: "Fundamental systems programming, memory allocation, procedural logic.",
      highlight: false
    },

    // Databases
    {
      name: "MongoDB",
      category: "databases",
      level: "Proficient",
      description: "NoSQL document modeling, indexing, aggregation pipelines, Mongoose ODM.",
      highlight: true
    },
    {
      name: "MySQL",
      category: "databases",
      level: "Proficient",
      description: "Relational database schema design, normalization, joins, SQL queries.",
      highlight: true
    },

    // Tools & Technologies
    {
      name: "Git & GitHub",
      category: "tools",
      level: "Advanced",
      description: "Branching strategies, version control, pull requests, collaborative workflows.",
      highlight: true
    },
    {
      name: "Vite & Modern Tooling",
      category: "tools",
      level: "Proficient",
      description: "Fast bundle compilation, HMR, environment configs, build optimization.",
      highlight: false
    },
    {
      name: "Postman",
      category: "tools",
      level: "Proficient",
      description: "API testing, automated endpoint collections, mock servers, request debugging.",
      highlight: false
    },

    // Core Computer Science
    {
      name: "Data Structures & Algorithms",
      category: "core_cs",
      level: "Advanced",
      description: "Arrays, Trees, Graphs, Dynamic Programming, Sorting/Searching, Complexity Analysis (350+ solved).",
      highlight: true
    },
    {
      name: "Object-Oriented Programming (OOP)",
      category: "core_cs",
      level: "Advanced",
      description: "Encapsulation, Inheritance, Polymorphism, Abstraction, Clean Code Principles.",
      highlight: false
    },
    {
      name: "Database Management Systems (DBMS)",
      category: "core_cs",
      level: "Proficient",
      description: "ACID properties, indexing strategies, transactions, relational algebra.",
      highlight: false
    },
    {
      name: "Computer Networks & OS Basics",
      category: "core_cs",
      level: "Proficient",
      description: "HTTP/HTTPS protocols, TCP/IP, process scheduling, concurrency fundamentals.",
      highlight: false
    }
  ]
};

export const projectsData = [
  {
    id: "medishare",
    title: "MEDISHARE",
    subtitle: "Real-Time Medicine Sharing & Allocation Platform",
    category: "Full Stack / Algorithmic Platform",
    tagline: "Connecting pharmacies, medical stores, and NGOs to eliminate medical waste.",
    featuredMetric: "~25% Utilization Boost",
    featuredMetricLabel: "Resource Optimization",
    recordsProcessed: "500+ Medical Records",
    techStack: ["React.js", "Node.js", "REST APIs", "DSA Sorting", "MongoDB/Express"],
    overview:
      "MEDISHARE is an intelligent real-time medicine-sharing and redistribution platform designed to bridge the gap between pharmacies, hospitals, medical inventory holders, and charitable NGOs. It systematically prevents expired medicine waste by matching surplus inventory with verified non-profits based on urgent clinical demand.",
    problemStatement:
      "Thousands of pharmacies discard unexpired, life-saving medicines every year due to lack of an organized channel to donate surplus stock, while underserved communities suffer acute medical shortages. Conventional distribution suffers from slow manual tracking, zero real-time visibility, and disregard for perishable expiry windows.",
    solution:
      "Engineered an automated matching and discovery engine using custom DSA-based priority sorting algorithms. The platform prioritizes batches approaching expiration dates, matches them to nearest NGO requests geographically, and facilitates seamless donation handshakes.",
    keyFeatures: [
      "Dynamic medicine discovery with multi-parameter search & filtering",
      "DSA-based prioritization algorithm prioritizing earliest expiry dates first",
      "Availability and location-based matching matrix for rapid logistics",
      "Robust processing engine successfully handling 500+ medicine inventory records",
      "Real-time status tracking for donation pledges and fulfillment",
      "Verified inventory accountability preventing illicit resale"
    ],
    contribution:
      "Architected the frontend single-page interface in React.js, implemented RESTful API endpoints in Node.js, and designed the priority queuing and sorting logic that reduced medicine expiry waste by approximately 25%.",
    challengesAndSolutions: [
      {
        challenge: "Handling complex multi-factor ranking (expiry urgency vs. geographical proximity).",
        solution: "Implemented a weighted priority scoring algorithm in the backend search service that dynamically ranks available batches before returning results to the client."
      },
      {
        challenge: "Responsive performance when filtering hundreds of medicine entries in real-time.",
        solution: "Debounced search inputs, applied client-side memoization for sorted slices, and optimized REST query pagination."
      }
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: "aurelle",
    title: "AURELLE",
    subtitle: "Premium Lifestyle & Fashion E-Commerce Brand Experience",
    category: "Creative Frontend & UI/UX Architecture",
    tagline: "Cinematic visual storytelling meets modern high-performance e-commerce.",
    featuredMetric: "High-Craft Design",
    featuredMetricLabel: "Editorial Interaction",
    recordsProcessed: "Curated Collections",
    techStack: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "Modern Web Animations", "Responsive UI"],
    overview:
      "AURELLE is a high-end luxury fashion and lifestyle digital flagship designed to deliver an immersive, editorial e-commerce experience. It combines haute-couture typography, smooth interactive transitions, and modern product staging.",
    problemStatement:
      "Traditional online retail interfaces are often cluttered, slow, and visually uninspiring, failing to evoke the emotional prestige and tactile feel that luxury brand consumers seek.",
    solution:
      "Built a bespoke, brand-first digital showcase focusing on cinematic product storytelling, fluid micro-interactions, editorial grid layouts, and frictionless catalog exploration that feels like flipping through a luxury magazine.",
    keyFeatures: [
      "Cinematic visual storytelling with magazine-grade editorial layouts",
      "High-fidelity product presentation with zoom states and curated looks",
      "Fluid page transitions and tactile micro-interactions",
      "Fully responsive adaptive architecture across mobile, tablet, and desktop viewports",
      "Dynamic product curation and interactive lookbook showcases",
      "Polished typography and cohesive minimalist aesthetic system"
    ],
    contribution:
      "Conceived the complete visual design system, designed the interactive layout components in React.js, and engineered responsive animation flows utilizing Tailwind CSS and modern CSS transitions.",
    challengesAndSolutions: [
      {
        challenge: "Maintaining ultra-smooth 60fps animations while rendering high-resolution imagery.",
        solution: "Utilized modern responsive image loading techniques, CSS GPU-accelerated transforms, and lazy-loading boundaries."
      },
      {
        challenge: "Creating an unconventional editorial layout that stays strictly accessible on mobile viewports.",
        solution: "Engineered responsive CSS grid structures that gracefully reflow from magazine spreads into intuitive touch-first mobile cards."
      }
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: "realtimebid",
    title: "REALTIMEBID ENGINE",
    subtitle: "Real-Time Online Auction & Bidding Platform",
    category: "Full Stack & Real-Time Engineering",
    tagline: "Dynamic live auction platform with high-responsiveness and transactional precision.",
    featuredMetric: "Live Bidding",
    featuredMetricLabel: "Real-Time Interaction",
    recordsProcessed: "Dynamic Bidding Engine",
    techStack: ["React.js", "JavaScript", "PHP", "MySQL", "REST Endpoints"],
    overview:
      "REALTIMEBID ENGINE is an interactive auction platform engineered for competitive live bidding. It gives buyers instantaneous feedback on auction increments, countdown states, and active challenger bids with reliable database persistence.",
    problemStatement:
      "Online auction systems suffer from latency discrepancies, race conditions when multiple users bid simultaneously, and cumbersome refresh mechanisms that ruin the excitement of live competitive bidding.",
    solution:
      "Engineered an auction interaction pipeline that continuously syncs active lots, updates top bids with zero full-page reloads, and locks in bid validity against MySQL relational schemas through robust backend validations.",
    keyFeatures: [
      "Live dynamic bidding experience with instant UI feedback",
      "Responsive, clean product auction presentation and cataloging",
      "Real-time countdown timer synchronization and auction expiration states",
      "Transactional integrity ensuring bids are strictly monotonically increasing",
      "Detailed bid history log per item for transparency and trust",
      "Cross-device mobile-optimized bidding interface"
    ],
    contribution:
      "Developed the front-end user interface in React.js, established asynchronous API communication with the backend PHP layer, and modeled the MySQL schema for users, items, and bid logs.",
    challengesAndSolutions: [
      {
        challenge: "Preventing stale bids and out-of-order bid submissions in an active auction room.",
        solution: "Enforced server-side atomic validation in PHP against MySQL transactions to guarantee only bids exceeding current highest bid are registered."
      },
      {
        challenge: "Synchronizing auction countdowns precisely across client clocks.",
        solution: "Implemented server timestamp delta synchronization to avoid client-side device clock skew."
      }
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: "disaster-relief",
    title: "DISASTER RELIEF RESOURCE ALLOCATOR",
    subtitle: "Priority-Based Algorithmic Resource Distribution System",
    category: "Algorithmic Optimization & Systems Design",
    tagline: "Optimizing emergency food, water, and medical supply allocation during critical crises.",
    featuredMetric: "~30% Efficiency Gain",
    featuredMetricLabel: "vs. Standard FCFS",
    recordsProcessed: "Multi-Zone Crisis Simulation",
    techStack: ["Algorithmic Optimization", "Data Structures", "Priority Queues", "React.js", "Node.js"],
    overview:
      "A priority-based algorithmic resource allocation platform specifically designed to maximize life-saving efficiency during natural disasters and humanitarian crises by distributing limited resources to areas of highest triage severity.",
    problemStatement:
      "During humanitarian catastrophes, emergency relief is often dispatched on a First-Come, First-Served (FCFS) basis or through fragmented manual spreadsheets. This results in severe misallocations where critically endangered zones starve of supplies while low-urgency areas receive excess.",
    solution:
      "Formulated and implemented a priority-weighted algorithmic model utilizing max-heaps and custom evaluation metrics (incorporating population vulnerability, medical criticality, supply depletion rate, and transit distance). The platform demonstrated an approximate 30% improvement in resource delivery effectiveness over conventional FCFS approaches.",
    keyFeatures: [
      "Priority-based resource distribution algorithm replacing inefficient FCFS logic",
      "Dynamic severity scoring based on casualties, medical urgency, and supply deficit",
      "Simulated multi-zone crisis dispatch visualizer with real-time allocation feeds",
      "Resource inventory tracking across medical supplies, potable water, and ration kits",
      "Measurable ~30% improvement in critical need fulfillment during project evaluation",
      "Audit trail of resource dispatch decisions for disaster management authorities"
    ],
    contribution:
      "Designed the core priority queue algorithmic engine, calculated mathematical evaluation matrices, and built an interactive dashboard to visualize disaster zones, urgency scores, and automated allocations.",
    challengesAndSolutions: [
      {
        challenge: "Balancing multiple competing crisis criteria without starving distant high-severity zones.",
        solution: "Designed a multi-factor priority weighting equation that factors in both urgency level and starvation penalties to prevent logistical neglect."
      },
      {
        challenge: "Translating abstract algorithmic outputs into intuitive visual insights for emergency coordinators.",
        solution: "Built a reactive dashboard interface showing real-time allocation matrices and comparison graphs between standard FCFS and the priority system."
      }
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  }
];

export const experienceData = [
  {
    role: "Web Developer Intern",
    company: "Ediglobe",
    period: "April 2025 – July 2025",
    location: "Remote / Hybrid",
    status: "Internship Completed",
    summary:
      "Engaged as a Web Developer Intern at Ediglobe, contributing to frontend architecture, component engineering, and modern web application development.",
    responsibilities: [
      "Designed and developed responsive, reusable UI components using React.js and modern CSS practices to improve user experience.",
      "Collaborated with cross-functional team members to integrate RESTful API endpoints and handle client-side asynchronous data state.",
      "Participated in code reviews, bug fixing, and frontend performance optimization across diverse mobile and desktop screen sizes.",
      "Assisted in maintaining clean Git workflows, version control hygiene, and component documentation."
    ],
    technologies: ["React.js", "JavaScript (ES6+)", "HTML5/CSS3", "REST APIs", "Git", "Responsive Design"]
  }
];

export const roadmapData = [
  {
    id: 1,
    title: "Programming Fundamentals",
    phase: "Milestone 01",
    description: "Core syntax, procedural logic, memory models, and problem-solving foundations in C, C++, Java, and Python.",
    status: "Completed",
    skills: ["C", "C++", "Java", "Python", "Logic Building"]
  },
  {
    id: 2,
    title: "Data Structures & Algorithms",
    phase: "Milestone 02",
    description: "Deep dive into problem solving: 350+ problems solved across LeetCode & GeeksforGeeks covering Trees, Graphs, DP, Heaps, and Sorting.",
    status: "Completed",
    skills: ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming", "Greedy", "350+ Problems"]
  },
  {
    id: 3,
    title: "Modern Frontend Engineering",
    phase: "Milestone 03",
    description: "Building responsive, component-driven, and high-performance user interfaces with React.js, Tailwind CSS, and ES6+.",
    status: "Completed",
    skills: ["React.js", "State Architecture", "Tailwind CSS", "Modern JavaScript", "Component Design"]
  },
  {
    id: 4,
    title: "Backend & API Systems",
    phase: "Milestone 04",
    description: "Architecting modular backend servers, middleware pipelines, and RESTful API endpoints using Node.js and Express.js.",
    status: "Completed",
    skills: ["Node.js", "Express.js", "REST APIs", "HTTP Lifecycle", "Authentication"]
  },
  {
    id: 5,
    title: "Database Management & Persistence",
    phase: "Milestone 05",
    description: "Relational and non-relational database design, query optimization, indexing, and data integrity with MySQL and MongoDB.",
    status: "Completed",
    skills: ["MongoDB", "MySQL", "Schema Modeling", "ACID", "Query Optimization"]
  },
  {
    id: 6,
    title: "Full-Stack System Integration",
    phase: "Milestone 06",
    description: "End-to-end production web applications: real-time updates, algorithmic prioritization, and deployment pipelines.",
    status: "Active Focus",
    skills: ["Full Stack Architecture", "Real-Time Systems", "Performance Tuning", "Git CI/CD"]
  },
  {
    id: 7,
    title: "AI & Emerging Web Horizons",
    phase: "Milestone 07",
    description: "Integrating intelligent AI-assisted capabilities, modern vector workflows, and interactive 3D web experiences.",
    status: "In Progress",
    skills: ["AI-Powered Interfaces", "Three.js / WebGL", "Generative Tools", "Next-Gen Web"]
  }
];

export const certificationsData = [
  {
    title: "B.Tech in Computer Science & Engineering",
    issuer: "Engineering Institution",
    category: "Academic Degree",
    highlight: "Core CS, Algorithms, DBMS, Operating Systems & Software Engineering"
  },
  {
    title: "Web Developer Internship Credential",
    issuer: "Ediglobe",
    category: "Professional Experience",
    highlight: "April 2025 – July 2025 | Production Frontend & API Integration"
  },
  {
    title: "350+ DSA Milestone Achievement",
    issuer: "LeetCode & GeeksforGeeks",
    category: "Competitive Problem Solving",
    highlight: "Algorithmic optimization, time/space complexity analysis"
  }
];
