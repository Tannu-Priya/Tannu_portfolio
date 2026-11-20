export const KNOWLEDGE_BASE = {
  profile: {
    name: "Tannu Priya",
    title: "Full Stack Developer | React.js Developer | Software Engineer",
    tagline: "Turning Ideas Into Exceptional Digital Experiences.",
    status: "Actively Seeking Opportunities / Full-Time Roles / High-Value Contracts",
    location: "India (Open to Global Remote)",
    email: "tannupriya4537@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    education: {
      degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
      curriculum: "Core Computer Science, Algorithms, Data Structures, DBMS, Operating Systems, Networking, and Software Engineering Principles"
    },
    experience: [
      {
        role: "Web Developer Intern",
        company: "Ediglobe",
        period: "April 2025 – July 2025",
        summary: "Worked on responsive frontend architecture, modular React.js UI components, RESTful API integration, and performance optimization.",
        responsibilities: [
          "Engineered responsive components using React.js and modern CSS.",
          "Integrated backend RESTful endpoints with clean error handling and asynchronous data fetching.",
          "Participated in sprint reviews, bug fixing, and cross-browser responsiveness tuning."
        ],
        technologies: ["React.js", "JavaScript (ES6+)", "HTML5/CSS3", "REST APIs", "Git"]
      }
    ],
    verifiedStats: {
      dsaSolved: "350+ problems solved across LeetCode & GeeksforGeeks",
      majorProjects: "4 major production-grade projects",
      internship: "Ediglobe Web Developer Intern (April - July 2025)",
      academicDegree: "B.Tech in Computer Science & Engineering"
    }
  },

  skills: {
    frontend: ["React.js", "JavaScript (ES6+)", "HTML5 & CSS3", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "REST APIs"],
    languages: ["Java", "Python", "C++", "C", "JavaScript"],
    databases: ["MongoDB", "MySQL"],
    tools: ["Git", "GitHub", "Vite", "Postman"],
    coreCs: ["Data Structures & Algorithms (350+ Solved)", "Object-Oriented Programming (OOP)", "Database Management Systems (DBMS)", "Computer Networks & OS Basics"]
  },

  services: [
    {
      name: "Full Stack Applications",
      description: "End-to-end development of responsive web applications with React.js frontend, Node.js/Express backend, and MongoDB or MySQL database persistence."
    },
    {
      name: "Frontend & React Engineering",
      description: "Building fast, component-driven Single Page Applications with clean state management, modular hooks, and fluid UI animations."
    },
    {
      name: "E-Commerce Development",
      description: "Cinematic, editorial digital storefronts with dynamic product catalogs, filtering, lookbooks, and checkout architectures (as demonstrated in AURELLE)."
    },
    {
      name: "UI/UX Design Implementation",
      description: "Translating complex design concepts and Figma files into pixel-perfect, accessible, and responsive code."
    },
    {
      name: "REST API & Systems Integration",
      description: "Designing modular, secure, and documented RESTful API endpoints with validation, JWT authentication, and database schemas."
    },
    {
      name: "Website Development",
      description: "High-craft corporate portfolios, brand experiences, and promotional landing pages featuring 3D elements and smooth animations."
    }
  ],

  projects: [
    {
      id: "medishare",
      title: "MEDISHARE",
      subtitle: "Real-Time Medicine Sharing & Allocation Platform",
      category: "Full Stack & Algorithmic Healthcare Logistics",
      techStack: ["React.js", "Node.js", "REST APIs", "DSA Sorting", "MongoDB/Express"],
      summary: "A real-time medicine-sharing and redistribution platform connecting pharmacies, medical stores, hospitals, and NGOs to eliminate life-saving medicine waste.",
      problem: "Uncoordinated medicine surplus causes millions in waste while critical patient communities suffer shortages due to unmonitored expiry dates and fragmented logistics.",
      solution: "Engineered an automated matching and discovery engine using custom DSA-based priority sorting algorithms that prioritize batches approaching expiration and pair them geographically with NGO demand.",
      keyFeatures: [
        "Medicine discovery and multi-parameter filtering",
        "DSA-based earliest-expiry prioritization sorting",
        "Availability and location-based matching matrix",
        "Processed 500+ records successfully with approximately 25% improvement in resource utilization",
        "Pledge tracking and fulfillment accountability"
      ],
      metrics: "~25% Resource Utilization Improvement",
      records: "500+ Medical Records Handled",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    },
    {
      id: "aurelle",
      title: "AURELLE",
      subtitle: "Premium Lifestyle & Fashion E-Commerce Brand Experience",
      category: "Creative Frontend & UI/UX Architecture",
      techStack: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "Modern Web Animations", "Responsive UI"],
      summary: "A luxury fashion and lifestyle digital flagship designed to deliver an immersive, editorial e-commerce shopping experience.",
      problem: "Traditional online retail interfaces are often cluttered and visually generic, failing to communicate haute couture prestige.",
      solution: "Designed a bespoke editorial layout with fluid micro-interactions, responsive lookbook staging, smooth transitions, and magazine-grade product presentation.",
      keyFeatures: [
        "Cinematic product storytelling and interactive lookbooks",
        "Fluid transitions and GPU-accelerated micro-interactions",
        "Responsive grid layouts adapting seamlessly from mobile to desktop",
        "Dynamic product curation and catalog browsing"
      ],
      metrics: "Editorial Interaction & Fluid Transitions",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    },
    {
      id: "realtimebid",
      title: "REALTIMEBID ENGINE",
      subtitle: "Real-Time Online Auction & Bidding Platform",
      category: "Full Stack & Real-Time Engineering",
      techStack: ["React.js", "JavaScript", "PHP", "MySQL", "REST Endpoints"],
      summary: "An interactive auction platform engineered for competitive live bidding with real-time feedback and relational transactional integrity.",
      problem: "Live bidding systems face latency discrepancies, race conditions on concurrent bids, and jarring full-page refreshes.",
      solution: "Engineered a live auction pipeline with monotonic bid validation in MySQL, zero-reload state updates, and synchronized auction countdown clocks.",
      keyFeatures: [
        "Live dynamic bidding experience with instant UI feedback",
        "Synchronized auction expiration timers",
        "Monotonically increasing bid validation ensuring transactional integrity",
        "Transparent bid history log per item",
        "Responsive, cross-device auction layout"
      ],
      metrics: "Live Monotonic Bidding Engine",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    },
    {
      id: "disaster-relief",
      title: "DISASTER RELIEF RESOURCE ALLOCATOR",
      subtitle: "Priority-Based Algorithmic Resource Distribution System",
      category: "Algorithmic Optimization & Systems Design",
      techStack: ["Algorithmic Optimization", "Data Structures", "Priority Queues", "React.js", "Node.js"],
      summary: "A priority-based algorithmic resource allocation platform designed to maximize life-saving efficiency during natural disasters and humanitarian crises.",
      problem: "Disaster supplies dispatched on a First-Come, First-Served (FCFS) basis lead to severe misallocations where critically endangered zones starve of emergency supplies.",
      solution: "Implemented a priority-weighted algorithmic model utilizing max-heaps that factors in triage severity, casualty rates, and supply depletion rates, achieving ~30% improvement over FCFS.",
      keyFeatures: [
        "Priority-based resource distribution algorithm replacing FCFS logic",
        "Dynamic triage severity scoring based on casualties, medical urgency, and supply deficit",
        "Simulated multi-zone crisis dispatch visualizer with real-time allocation feeds",
        "Measurable ~30% improvement in critical need fulfillment during project evaluation"
      ],
      metrics: "~30% Improvement over FCFS in Project Evaluation",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    }
  ]
};
