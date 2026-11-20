import { KNOWLEDGE_BASE } from './knowledgeBase.js';

export class AIService {
  constructor() {
    this.inquiries = [];
  }

  // A. Personal AI Assistant
  async answerQuery(query, history = []) {
    const q = query.toLowerCase().trim();

    if (/^(hi|hello|hey|greetings|hola)\b/i.test(q)) {
      return {
        reply: `Hello! I am Tannu Priya's AI Assistant. I can answer questions about her engineering background, 350+ DSA problem solutions, production projects (Medishare, Aurelle, RealTimeBid, Disaster Relief Allocator), or help you start a project with her. What would you like to explore?`,
        suggestedQuestions: [
          "Who is Tannu Priya?",
          "What technologies does she work with?",
          "Tell me about Medishare",
          "Can she build an e-commerce website?",
          "How can I hire her?"
        ]
      };
    }

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

    if (q.includes('medishare') || q.includes('medicine') || q.includes('ngo') || q.includes('pharmacy')) {
      return {
        reply: `**MEDISHARE** is a real-time medicine-sharing and redistribution platform designed to prevent pharmaceutical waste by connecting pharmacies, medical dispensaries, and verified NGOs.\n\n• **Key Problem**: Thousands of life-saving medicines expire on shelves while underserved clinics face acute shortages.\n• **Tannu's Solution**: Engineered a custom DSA-based earliest-expiry prioritization algorithm paired with geographical location matching.\n• **Impact**: Successfully handled 500+ medicine records, achieving approximately 25% improvement in resource utilization.\n• **Stack**: React.js, Node.js, REST APIs, DSA Sorting logic.`,
        suggestedQuestions: [
          "How did DSA sorting work in Medishare?",
          "Tell me about her other algorithmic projects",
          "Can I see the GitHub repository?"
        ]
      };
    }

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

  // C. AI Project Consultant
  async consultProject(idea, serviceType = 'Full Stack Application') {
    const text = idea.trim();
    if (!text) throw new Error('Project idea description is required.');

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

  // D. ADVANCED DYNAMIC AI ATS RESUME ANALYZER
  async analyzeResume(resumeText, targetJobDescription = '') {
    if (!resumeText || resumeText.trim().length < 40) {
      throw new Error('Please provide substantial resume text (minimum 40 characters) to analyze.');
    }

    const raw = resumeText.trim();
    const lower = raw.toLowerCase();
    const words = raw.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    // 1. Section Header Detection
    const hasContact = /(email|phone|linkedin|github|portfolio|tel:|@)/i.test(lower);
    const hasSummary = /(summary|profile|about me|objective|professional summary)/i.test(lower);
    const hasEducation = /(bachelor|master|b\.tech|m\.tech|degree|university|college|education|gpa|cgpa|diploma)/i.test(lower);
    const hasExperience = /(experience|employment|work history|intern|internship|developer|engineer|associate)/i.test(lower);
    const hasProjects = /(projects|portfolio projects|key projects|applications built)/i.test(lower);
    const hasSkills = /(skills|technical skills|competencies|technologies|tools|stack)/i.test(lower);

    // 2. Technical Skills Extraction & Scoring
    const commonTechDictionary = [
      'react', 'react.js', 'javascript', 'typescript', 'node.js', 'node', 'express', 'express.js',
      'python', 'java', 'c++', 'c#', 'c', 'sql', 'mysql', 'postgresql', 'mongodb', 'redis',
      'html', 'html5', 'css', 'css3', 'tailwind', 'tailwind css', 'bootstrap', 'git', 'github',
      'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'rest', 'restful', 'graphql', 'api', 'apis',
      'ci/cd', 'agile', 'scrum', 'jira', 'linux', 'unix', 'vite', 'webpack', 'next.js', 'redux'
    ];

    const detectedTech = [];
    commonTechDictionary.forEach(t => {
      const regex = new RegExp(`\\b${t.replace('.', '\\.')}\\b`, 'i');
      if (regex.test(lower) && !detectedTech.includes(t)) {
        detectedTech.push(t);
      }
    });

    // 3. Quantification & Metrics Analysis
    const lines = raw.split(/[\r\n]+/).map(l => l.trim()).filter(l => l.length > 10);
    const metricRegex = /(\d+%\s*|\d+\+\s*|\$\s*\d+|\b\d+\s*(users|clients|records|requests|ms|seconds|minutes|hours|days|teams|projects|downloads|views|stars)\b|\b(reduced|increased|boosted|improved|saved|optimized|accelerated)\b)/i;
    const strongActionVerbRegex = /^(architected|engineered|spearheaded|developed|optimized|implemented|orchestrated|designed|constructed|refactored|deployed|accelerated|automated|integrated|streamlined)\b/i;
    const weakStartRegex = /^(helped with|responsible for|worked on|tasked with|assisted in|participated in|handled)\b/i;

    const weakBullets = [];
    const strongBullets = [];

    lines.forEach(line => {
      // Check bullet-like lines
      if (/^[-*•]|\b(developed|engineered|built|worked|implemented|responsible|helped)\b/i.test(line)) {
        const cleanLine = line.replace(/^[-*•\s]+/, '');
        const hasMetrics = metricRegex.test(cleanLine);
        const hasStrongVerb = strongActionVerbRegex.test(cleanLine);
        const startsWeak = weakStartRegex.test(cleanLine);

        if (!hasMetrics || startsWeak) {
          if (weakBullets.length < 4) {
            weakBullets.push({
              original: cleanLine,
              issue: startsWeak ? "Begins with passive phrasing" : "Lacks quantifiable metrics or measurable outcomes",
              improved: `Engineered ${cleanLine.toLowerCase().replace(/^(responsible for|worked on|helped with)\s*/i, '')}, improving performance by [X%] and streamlining system workflow.`
            });
          }
        } else if (hasMetrics && hasStrongVerb) {
          if (strongBullets.length < 3) {
            strongBullets.push(cleanLine);
          }
        }
      }
    });

    // 4. Detailed Dimension Scoring (0 - 100)
    // Dimension A: Formatting & Structure
    let structureScore = 55;
    if (hasContact) structureScore += 10;
    if (hasEducation) structureScore += 9;
    if (hasExperience) structureScore += 10;
    if (hasProjects) structureScore += 8;
    if (hasSkills) structureScore += 8;
    // Length penalty if under 150 words or over 900 words
    if (wordCount >= 200 && wordCount <= 750) structureScore += 5;
    structureScore = Math.min(98, Math.max(35, structureScore));

    // Dimension B: Technical Skills Score
    let techScore = 40 + Math.min(50, detectedTech.length * 4.5);
    techScore = Math.min(98, Math.max(30, Math.round(techScore)));

    // Dimension C: Keyword Relevance & Missing Keywords
    const standardTargetKeywords = [
      'REST APIs', 'React.js', 'Node.js', 'State Management', 'Git',
      'Database Schema', 'Performance Optimization', 'Agile/Scrum', 'CI/CD Pipelines', 'Security Best Practices'
    ];
    const missingKeywords = standardTargetKeywords.filter(k => !lower.includes(k.toLowerCase()));
    let keywordScore = Math.round(100 - (missingKeywords.length * 5.5));
    keywordScore = Math.min(96, Math.max(40, keywordScore));

    // If job description provided, calculate exact matching
    let jobMatchRate = null;
    let jobMatchingKeywords = [];
    let jobMissingKeywords = [];
    if (targetJobDescription && targetJobDescription.trim().length > 20) {
      const jobWords = targetJobDescription.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
      const uniqueJobTerms = [...new Set(jobWords)].filter(w => !['the', 'and', 'for', 'with', 'that', 'this', 'you', 'will', 'our', 'are'].includes(w));
      uniqueJobTerms.forEach(term => {
        if (lower.includes(term)) {
          if (jobMatchingKeywords.length < 10) jobMatchingKeywords.push(term);
        } else {
          if (jobMissingKeywords.length < 10) jobMissingKeywords.push(term);
        }
      });
      jobMatchRate = Math.round((jobMatchingKeywords.length / Math.max(1, jobMatchingKeywords.length + jobMissingKeywords.length)) * 100);
    }

    // Dimension D: Project Description Score
    let projectScore = hasProjects ? 65 : 40;
    if (/github\.com|http|live\b/i.test(lower)) projectScore += 15;
    if (/(problem|solution|architecture|stack)/i.test(lower)) projectScore += 12;
    projectScore = Math.min(96, Math.max(30, projectScore));

    // Dimension E: Experience Presentation Score
    let experienceScore = hasExperience ? 70 : 45;
    if (/(202\d|201\d|present|intern|engineer|developer)/i.test(lower)) experienceScore += 15;
    experienceScore = Math.min(95, Math.max(35, experienceScore));

    // Dimension F: Achievement & Quantification Score
    const metricMatches = (raw.match(new RegExp(metricRegex.source, 'gi')) || []).length;
    let achievementScore = 40 + Math.min(50, metricMatches * 10);
    achievementScore = Math.min(95, Math.max(25, achievementScore));

    // Overall Composite ATS Score
    const overallScore = Math.round(
      structureScore * 0.20 +
      techScore * 0.20 +
      keywordScore * 0.15 +
      projectScore * 0.15 +
      experienceScore * 0.15 +
      achievementScore * 0.15
    );

    // Identify Strengths dynamically
    const strengths = [];
    if (detectedTech.length >= 6) strengths.push(`Comprehensive tech stack with ${detectedTech.length} identified technologies (${detectedTech.slice(0, 5).join(', ')}...).`);
    if (metricMatches >= 2) strengths.push(`Contains ${metricMatches} quantifiable metrics and achievement percentages, strengthening credibility.`);
    if (hasContact && hasEducation && hasExperience) strengths.push("Contains all fundamental ATS structural sections (Contact, Experience, Education).");
    if (hasProjects) strengths.push("Dedicated projects section communicates practical hands-on capability.");
    if (strengths.length === 0) strengths.push("Clean plain-text formatting easily parsed by standard tokenizers.");

    // Formatting & Grammar suggestions
    const formattingIssues = [];
    if (!hasContact) formattingIssues.push("Missing explicit contact information header (Email, Phone, LinkedIn, GitHub).");
    if (!hasSummary) formattingIssues.push("Missing an Executive Professional Summary section at the top of the resume.");
    if (wordCount < 180) formattingIssues.push(`Resume text is relatively brief (${wordCount} words). Consider elaborating on technical contributions.`);
    if (wordCount > 750) formattingIssues.push(`Resume length (${wordCount} words) may exceed standard 1-2 page formatting guidelines.`);
    if (formattingIssues.length === 0) formattingIssues.push("Single-column structure is well-suited for automated ATS parsers.");

    // Actionable Recommendations
    const recommendations = [
      "Quantify your bullet points with concrete metrics (e.g. 'Reduced API latency by 35%', 'Processed 1,000+ daily events').",
      "Lead each experience bullet with high-impact engineering verbs ('Architected', 'Engineered', 'Optimized', 'Automated').",
      `Incorporate high-priority missing technical keywords: ${missingKeywords.slice(0, 4).join(', ')}.`,
      "Ensure live demo URLs and GitHub repository links are included for all major projects."
    ];

    // Generated Summary rewrite
    const suggestedSummary = `Results-driven software engineer with proven experience in ${detectedTech.slice(0, 3).join(', ')}. Demonstrated track record in architecting scalable applications, optimizing system performance, and solving complex technical challenges from design through production.`;

    return {
      overallScore,
      ratingTier: overallScore >= 80 ? 'EXCELLENT ATS ALIGNMENT' : overallScore >= 65 ? 'MODERATE ATS ALIGNMENT' : 'NEEDS OPTIMIZATION',
      disclaimer: "Estimated ATS readability assessment based on standard parser algorithms, not an official employer verdict.",
      metadata: {
        wordCount,
        detectedSkillsCount: detectedTech.length,
        metricsFoundCount: metricMatches
      },
      scores: {
        structure: structureScore,
        technicalSkills: techScore,
        keywordRelevance: keywordScore,
        projectDescription: projectScore,
        experiencePresentation: experienceScore,
        achievementQuantification: achievementScore
      },
      detectedTech,
      missingKeywords: missingKeywords.slice(0, 6),
      weakBullets: weakBullets.length > 0 ? weakBullets : [
        {
          original: "Worked on frontend features and bug fixes.",
          issue: "Lacks action verb and measurable result",
          improved: "Engineered responsive frontend UI components and resolved critical bugs, boosting user workflow speed by [25%]."
        }
      ],
      strengths,
      formattingIssues,
      recommendations,
      suggestedSummary,
      jobMatch: jobMatchRate !== null ? {
        matchRate: jobMatchRate,
        matchingKeywords: jobMatchingKeywords,
        missingKeywords: jobMissingKeywords
      } : null
    };
  }

  // Optimize a single bullet point
  async optimizeBullet(bulletText) {
    const raw = bulletText.trim();
    if (!raw) throw new Error('Bullet text is required.');

    return {
      original: raw,
      option1: `Engineered ${raw.replace(/^(responsible for|worked on|helped with)\s*/i, '')}, resulting in approximately [25-30%] improvement in execution efficiency.`,
      option2: `Architected and deployed ${raw.replace(/^(responsible for|worked on|helped with)\s*/i, '')}, ensuring high reliability across [500+] active records.`,
      option3: `Spearheaded ${raw.replace(/^(responsible for|worked on|helped with)\s*/i, '')}, reducing latency and streamlining cross-team operational workflows.`
    };
  }

  // E. AI Smart Project Finder
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

      const words = q.split(/\s+/).filter(w => w.length > 2);
      words.forEach(word => {
        if (haystack.includes(word)) score += 2;
      });

      return { project: p, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.filter(s => s.score > 0).map(s => s.project);
  }

  // G. AI Lead Intake
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
