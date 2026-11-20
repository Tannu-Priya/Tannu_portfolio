import { KNOWLEDGE_BASE } from './knowledgeBase.js';

// Pluggable LLM integration layer with deterministic RAG fallback engine

export class AIService {
  constructor() {
    this.inquiries = [];
  }

  // A. Personal AI Assistant: Answer queries strictly grounded in knowledge base
  async answerQuery(query, history = []) {
    const q = query.toLowerCase().trim();

    // 1. Check for greeting
    if (/^(hi|hello|hey|greetings|hola)\b/i.test(q)) {
      return {
        reply: `Hello! I am Tannu Priya's AI Assistant. I can answer questions about her engineering background, 350+ DSA problem-solving track record, projects (such as Medishare, Aurelle, RealTimeBid, and the Disaster Relief Allocator), skills in React.js and Node.js, or help you start a project with her. What would you like to explore?`,
        suggestedQuestions: [
          "Who is Tannu Priya?",
          "What technologies does she specialize in?",
          "Tell me about Medishare",
          "Can she build an e-commerce application?",
          "How can I hire her for a project?"
        ]
      };
    }

    // 2. Who is Tannu Priya?
    if (q.includes('who is') || q.includes('about tannu') || q.includes('tell me about herself') || q.includes('background') || q.includes('bio')) {
      return {
        reply: `Tannu Priya is a Full Stack Developer, React.js specialist, and Software Engineer with a B.Tech in Computer Science & Engineering. She has solved over 350+ DSA problems across LeetCode and GeeksforGeeks, completed a Web Developer Internship at Ediglobe (April - July 2025), and architected 4 major production-ready applications spanning healthcare logistics, e-commerce, real-time auctions, and algorithmic resource allocation. Her engineering philosophy centers on merging algorithmic precision with high-craft digital experiences.`,
        suggestedQuestions: [
          "What technologies does she work with?",
          "What did she do at Ediglobe?",
          "What projects has she built?"
        ]
      };
    }

    // 3. Technologies & Skills
    if (q.includes('technolog') || q.includes('skill') || q.includes('stack') || q.includes('language') || q.includes('framework') || q.includes('tools')) {
      return {
        reply: `Tannu's verified technical competencies encompass:\n\n• **Frontend**: React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS\n• **Backend & APIs**: Node.js, Express.js, REST APIs\n• **Programming Languages**: Java, Python, C++, C, JavaScript\n• **Databases**: MongoDB, MySQL\n• **Tools**: Git, GitHub, Postman, Vite\n• **Core Computer Science**: Data Structures & Algorithms (350+ Solved), Object-Oriented Programming (OOP), DBMS, and Operating Systems/Networks fundamentals.`,
        suggestedQuestions: [
          "Has she worked with React.js in production?",
          "Show me her algorithmic projects",
          "Can she develop backend REST APIs?"
        ]
      };
    }

    // 4. React.js Specific Question
    if (q.includes('react') || q.includes('frontend')) {
      return {
        reply: `Yes, React.js is one of Tannu's core specializations. She has developed multiple production-grade SPAs utilizing modular component architectures, custom hooks, context-driven state management, responsive Tailwind CSS layouts, and modern animations (as showcased in Aurelle and Medishare). During her internship at Ediglobe, she engineered reusable React UI components and connected them to asynchronous REST endpoints.`,
        suggestedQuestions: [
          "Tell me about Aurelle",
          "Can she develop an e-commerce website?",
          "Explore her project case studies"
        ]
      };
    }

    // 5. Medishare
    if (q.includes('medishare') || q.includes('medicine') || q.includes('ngo') || q.includes('pharmacy')) {
      const p = KNOWLEDGE_BASE.projects.find(x => x.id === 'medishare');
      return {
        reply: `**MEDISHARE** is a real-time medicine-sharing and redistribution platform designed to prevent pharmaceutical waste by connecting pharmacies, medical dispensaries, and verified NGOs.\n\n• **Key Problem**: Thousands of life-saving medicines expire on shelves while underserved clinics face acute shortages.\n• **Tannu's Solution**: Engineered a custom DSA-based earliest-expiry prioritization algorithm paired with geographical location matching.\n• **Impact**: Successfully handled 500+ medicine records, achieving approximately 25% improvement in resource utilization.\n• **Stack**: React.js, Node.js, REST APIs, DSA Sorting logic.`,
        suggestedQuestions: [
          "How did DSA sorting work in Medishare?",
          "Tell me about her other algorithmic projects",
          "Can I see the GitHub repository?"
        ]
      };
    }

    // 6. Aurelle / E-Commerce
    if (q.includes('aurelle') || q.includes('ecommerce') || q.includes('e-commerce') || q.includes('fashion') || q.includes('shopping')) {
      return {
        reply: `Yes, Tannu has extensive experience building premium e-commerce applications, demonstrated by **AURELLE**.\n\nAURELLE is a high-end fashion and lifestyle digital brand experience featuring:\n• Cinematic visual storytelling with magazine-grade editorial layouts.\n• Fluid micro-interactions and GPU-accelerated page transitions.\n• Dynamic catalog curation and responsive touch-first lookbooks.\n• Built using React.js, modern ES6+, and responsive Tailwind CSS.`,
        suggestedQuestions: [
          "Tell me about RealTimeBid Engine",
          "Can she build an e-commerce site for my business?",
          "How can I contact Tannu?"
        ]
      };
    }

    // 7. RealTimeBid Engine
    if (q.includes('realtimebid') || q.includes('auction') || q.includes('bid') || q.includes('real-time')) {
      return {
        reply: `**REALTIMEBID ENGINE** is an interactive online auction platform built for live competitive bidding.\n\n• **Core Engineering**: Implemented monotonic bid integrity validation preventing race conditions or stale bids.\n• **Key Features**: Live bidding interface with zero full-page reloads, synchronized auction expiration countdowns, and transparent bid history logs.\n• **Stack**: React.js, JavaScript, PHP, MySQL, and asynchronous API communication.`,
        suggestedQuestions: [
          "Tell me about the Disaster Relief Allocator",
          "What technologies does she work with?",
          "Can she build real-time systems?"
        ]
      };
    }

    // 8. Disaster Relief Allocator
    if (q.includes('disaster') || q.includes('relief') || q.includes('allocat') || q.includes('fcfs') || q.includes('priority queue')) {
      return {
        reply: `The **DISASTER RELIEF RESOURCE ALLOCATOR** is an algorithmic triage and distribution system created to replace inefficient First-Come, First-Served (FCFS) logistics during humanitarian crises.\n\n• **Algorithmic Engine**: Implemented a priority queue (max-heap) evaluation model scoring casualty severity, medical urgency, supply deficit, and distance.\n• **Evaluated Outcome**: Demonstrated an approximate 30% improvement in critical need fulfillment compared to conventional FCFS distribution.`,
        suggestedQuestions: [
          "How many DSA problems has Tannu solved?",
          "Tell me about Medishare",
          "How can I hire her?"
        ]
      };
    }

    // 9. What makes her projects different / problem-solving approach
    if (q.includes('different') || q.includes('stand out') || q.includes('why hire') || q.includes('philosophy') || q.includes('problem-solving')) {
      return {
        reply: `What distinguishes Tannu's engineering is the synthesis of **mathematical/algorithmic rigor** with **high-craft digital aesthetics**.\n\nWith 350+ DSA problems solved across LeetCode and GeeksforGeeks, she designs systems from first principles—evaluating time/space complexity, modular component boundaries, and determinism. At the same time, she refuses to produce generic templates, obsessing over micro-interactions, responsive fluidity, and editorial storytelling.`,
        suggestedQuestions: [
          "Tell me about her internship at Ediglobe",
          "What services does she offer?",
          "How can I start a project with her?"
        ]
      };
    }

    // 10. Internship at Ediglobe
    if (q.includes('ediglobe') || q.includes('intern') || q.includes('work experience')) {
      return {
        reply: `Tannu worked as a **Web Developer Intern at Ediglobe** from April 2025 to July 2025.\n\nDuring her tenure, she:\n• Engineered reusable, responsive UI components using React.js and modern CSS.\n• Collaborated on RESTful API endpoint integration and client-side asynchronous data state.\n• Participated in sprint code reviews, bug fixes, and performance optimization across diverse mobile and desktop screen sizes.\n• Applied version control best practices using Git and GitHub.`,
        suggestedQuestions: [
          "What is her educational background?",
          "Can she develop full-stack applications?",
          "How can I get in touch with her?"
        ]
      };
    }

    // 11. Hiring / Lead Generation
    if (q.includes('hire') || q.includes('contact') || q.includes('reach out') || q.includes('email') || q.includes('consult') || q.includes('work together') || q.includes('available')) {
      return {
        reply: `Tannu is currently **Open to Opportunities**—including full-time software engineering roles, full-stack contracts, and custom web development engagements.\n\n• **Direct Email**: tannupriya4537@gmail.com\n• **LinkedIn**: https://linkedin.com\n• **GitHub**: https://github.com\n\nWould you like to use our **AI Project Consultant** to plan an architecture for your idea, or submit an inquiry right now?`,
        isLeadPrompt: true,
        suggestedQuestions: [
          "Plan a project using AI Project Consultant",
          "What services does she provide?",
          "Copy Tannu's direct email"
        ]
      };
    }

    // Default Fallback
    return {
      reply: `I can provide verified information regarding Tannu Priya's software engineering background, her 350+ DSA problem solutions, production projects (Medishare, Aurelle, RealTimeBid Engine, and Disaster Relief Allocator), or connect you directly to collaborate. Would you like to explore her technical stack, inspect a specific project case study, or plan a project with her?`,
      suggestedQuestions: [
        "Tell me about Tannu Priya",
        "What technologies does she work with?",
        "Tell me about Medishare",
        "How can I hire her?"
      ]
    };
  }

  // C. AI Project Consultant: Systematic Project Scoping & Architecture
  async consultProject(idea, serviceType = 'Full Stack Application') {
    const text = idea.trim();
    if (!text) {
      throw new Error('Project idea description is required.');
    }

    // Determine domain & recommend architecture
    const isEcom = /shop|store|cart|product|checkout|ecom|retail|brand/i.test(text);
    const isHealthcare = /medic|health|clinic|doctor|patient|hospital/i.test(text);
    const isRealTime = /bid|auction|chat|real-time|live|stream|notification/i.test(text);
    const isAlgo = /algorithm|priority|schedul|allocat|optimi|match/i.test(text);

    let stack = ["React.js", "Node.js", "Express.js", "REST APIs", "Tailwind CSS"];
    let db = "MongoDB (Mongoose ODM)";
    let highlight = "Scalable modular architecture with reactive state";

    if (isRealTime) {
      stack.push("WebSocket / Socket.io", "MySQL (ACID Transactions)");
      db = "MySQL Relational Schema";
      highlight = "Low-latency event-driven pipeline with transactional integrity";
    } else if (isEcom) {
      stack.push("Stripe API", "Cloudinary", "Framer Motion");
      highlight = "Editorial product presentation with secure checkout and catalog caching";
    } else if (isAlgo || isHealthcare) {
      stack.push("Priority Queue Engine", "Geospatial Indexing");
      highlight = "Algorithmic resource prioritization and optimal query optimization";
    }

    return {
      projectSummary: `A production-ready ${serviceType.toLowerCase()} tailored to: "${text}". Engineered for low latency, modular component boundaries, and high visual craft.`,
      recommendedStack: {
        frontend: "React.js + Tailwind CSS + Framer Motion (Responsive SPA)",
        backend: "Node.js + Express.js modular REST API pipeline",
        database: db,
        tooling: "Vite, Git/GitHub, Postman endpoint documentation"
      },
      keyFeatures: [
        "Responsive, accessible user interface optimized across mobile and desktop viewports",
        "Secure RESTful API integration with request validation and token authentication",
        "Centralized state management with asynchronous optimistic UI updates",
        highlight,
        "Comprehensive error handling boundaries and telemetry logging"
      ],
      highLevelArchitecture: "Three-tier decoupled client-server architecture: React client layer communicating asynchronously via JSON REST APIs to an Express middleware pipeline backed by persistent database schemas.",
      developmentRoadmap: [
        { phase: "Phase 1: Architecture & UI Prototype", deliverables: "Schema design, component hierarchy, responsive layouts" },
        { phase: "Phase 2: Backend Integration & Logic", deliverables: "REST endpoints, business logic, algorithmic pipelines, database models" },
        { phase: "Phase 3: QA, Performance & Polish", deliverables: "Stress testing, cross-browser audits, accessibility tuning, and deployment" }
      ],
      initialScope: "Designed for a clean, deterministic MVP deliverable that can easily scale into an enterprise web product.",
      nextSteps: "Tannu can engineer this exact architecture for your organization. You can submit this scope directly through the Client Inquiry suite."
    };
  }

  // D. AI Resume Analyzer: Evaluates uploaded or pasted CVs
  async analyzeResume(resumeText) {
    if (!resumeText || resumeText.trim().length < 50) {
      throw new Error('Please provide substantial resume text (minimum 50 characters) to analyze.');
    }

    const text = resumeText.toLowerCase();

    // Check for core criteria
    const hasContact = /email|phone|linkedin|github|portfolio/i.test(text);
    const hasEducation = /bachelor|b\.tech|degree|university|college|education|gpa|cgpa/i.test(text);
    const hasSkills = /react|node|javascript|python|java|c\+\+|sql|html|css|git|aws|docker|rest/i.test(text);
    const hasProjects = /project|developed|engineered|built|implemented|designed|created/i.test(text);
    const hasMetrics = /%|\d+\+|improved|reduced|increased|boosted|optimized|users|records/i.test(text);
    const hasActionVerbs = /architected|engineered|spearheaded|developed|optimized|implemented|orchestrated/i.test(text);

    // Calculate Scores (0 - 100)
    let structureScore = 70;
    if (hasContact) structureScore += 10;
    if (hasEducation) structureScore += 10;
    if (hasProjects) structureScore += 10;
    structureScore = Math.min(98, structureScore);

    let skillsScore = 65;
    const skillMatches = (text.match(/react|node|javascript|python|java|c\+\+|sql|mongo|html|css|git|api|tailwind|docker/g) || []).length;
    skillsScore += Math.min(30, skillMatches * 4);
    skillsScore = Math.min(96, skillsScore);

    let impactScore = 60;
    if (hasMetrics) impactScore += 22;
    if (hasActionVerbs) impactScore += 14;
    impactScore = Math.min(95, impactScore);

    const overallAtsScore = Math.round((structureScore * 0.3) + (skillsScore * 0.35) + (impactScore * 0.35));

    const strengths = [];
    const improvements = [];

    if (hasSkills) strengths.push("Strong presence of modern technical keywords (frameworks & languages).");
    if (hasMetrics) strengths.push("Includes quantifiable achievement metrics and impact indicators.");
    if (hasActionVerbs) strengths.push("Strong active voice utilizing technical action verbs.");

    if (!hasMetrics) improvements.push("Quantify project outcomes with concrete numbers (e.g., '~25% improvement', '500+ records processed').");
    if (!hasActionVerbs) improvements.push("Replace passive phrases ('worked on', 'responsible for') with active engineering verbs ('engineered', 'architected', 'optimized').");
    if (skillMatches < 5) improvements.push("Categorize skills clearly into Frontend, Backend, Databases, and Core CS Fundamentals.");

    return {
      overallScore: overallAtsScore,
      scores: {
        structure: structureScore,
        skillsPresentation: skillsScore,
        impactAndMetrics: impactScore,
        atsReadability: overallAtsScore
      },
      summary: `Your resume demonstrates good technical foundations with an ATS readability score of ${overallAtsScore}/100. Incorporating more quantifiable metrics will make it stand out to hiring managers.`,
      strengths: strengths.length > 0 ? strengths : ["Clear chronological structure."],
      improvements: improvements.length > 0 ? improvements : ["Ensure formatting uses simple, ATS-parseable single-column typography."],
      actionableTips: [
        "Mirror target job descriptions by including exact technical keywords.",
        "Highlight your problem-solving foundations (e.g. DSA problem counts, competitive coding ratings).",
        "Include live demonstration URLs and clean GitHub repository links."
      ]
    };
  }

  // E. AI Smart Project Finder: Natural language project search
  async searchProjects(naturalQuery) {
    const q = naturalQuery.toLowerCase();
    const projects = KNOWLEDGE_BASE.projects;

    const scored = projects.map((p) => {
      let score = 0;
      const haystack = `${p.title} ${p.subtitle} ${p.summary} ${p.techStack.join(' ')} ${p.category} ${p.keyFeatures.join(' ')}`.toLowerCase();

      if (q.includes('react') && haystack.includes('react')) score += 5;
      if (q.includes('node') && haystack.includes('node')) score += 5;
      if ((q.includes('algo') || q.includes('dsa') || q.includes('priority')) && (p.id === 'disaster-relief' || p.id === 'medishare')) score += 8;
      if ((q.includes('real-time') || q.includes('realtime') || q.includes('auction') || q.includes('bid')) && p.id === 'realtimebid') score += 10;
      if ((q.includes('ecommerce') || q.includes('e-commerce') || q.includes('fashion') || q.includes('store')) && p.id === 'aurelle') score += 10;
      if ((q.includes('health') || q.includes('medicine') || q.includes('ngo')) && p.id === 'medishare') score += 10;
      if ((q.includes('disaster') || q.includes('relief') || q.includes('crisis')) && p.id === 'disaster-relief') score += 10;

      // Token overlap
      const words = q.split(/\s+/).filter(w => w.length > 2);
      words.forEach(word => {
        if (haystack.includes(word)) score += 2;
      });

      return { project: p, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.filter(s => s.score > 0).map(s => s.project);
  }

  // G. AI Lead Intake: Store inquiry
  async saveInquiry(data) {
    const inquiry = {
      id: `INQ-${Date.now()}`,
      receivedAt: new Date().toISOString(),
      name: data.name,
      email: data.email,
      serviceType: data.serviceType || data.projectType || 'General Inquiry',
      budget: data.budget || 'Flexible',
      timeline: data.timeline || 'Flexible',
      description: data.description,
      status: 'NEW'
    };

    this.inquiries.push(inquiry);
    return inquiry;
  }
}

export const aiService = new AIService();
