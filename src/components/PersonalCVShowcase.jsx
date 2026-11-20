import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  Eye,
  Maximize2,
  Minimize2,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Check,
  Copy,
  Mail,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { soundManager } from '../utils/sound';

// Configurable CV Document Details
const CV_CONFIG = {
  pdfPath: '/resume/Tannu_Priya_CV.pdf',
  fileName: 'Tannu_Priya_CV.pdf',
  fileSize: '63.8 KB',
  lastUpdated: 'November 2026',
  pageCount: '1 Page',
  email: 'tannupriya4537@gmail.com',
  github: 'https://github.com/Tannu-Priya',
  linkedin: 'https://www.linkedin.com/in/tannu-priya55/'
};

// Verified CV Information directly from Tannu Priya's official document
const VERIFIED_CV_DATA = {
  name: 'Tannu Priya',
  title: 'Full Stack Developer | React.js Developer | Software Engineer',
  education: [
    {
      institution: 'Lovely Professional University',
      location: 'Phagwara, Punjab',
      degree: 'Bachelor of Technology — Computer Science and Engineering',
      metric: 'CGPA: 6.74',
      period: 'Since Aug 2023',
      current: true
    },
    {
      institution: 'Purnia Mahila Maha Vidyalaya',
      location: 'Purnia, Bihar',
      degree: 'Intermediate (Senior Secondary)',
      period: 'Apr 2021 – Mar 2023',
      current: false
    },
    {
      institution: 'SR DAV Public School',
      location: 'Purnia, Bihar',
      degree: 'Matriculation (Secondary Education)',
      period: 'Apr 2020 – Mar 2021',
      current: false
    }
  ],
  experience: {
    role: 'Web Developer Intern',
    company: 'Ediglobe',
    period: 'Apr 2025 – Jul 2025',
    points: [
      'Built and enhanced web pages and developed modular ReactJS components while mastering state management.',
      'Designed, planned, and optimized relational database structures and queries using MySQL.',
      'Collaborated on responsive, user-friendly web interfaces, elevating usability and cross-browser reliability.'
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'ReactJS', 'MySQL']
  },
  skills: [
    {
      category: 'Languages',
      items: ['Java', 'JavaScript (ES6+)', 'PHP', 'SQL', 'Python', 'C++', 'Data Structures & Algorithms']
    },
    {
      category: 'Frameworks & Libraries',
      items: ['ReactJS', 'NodeJS', 'ExpressJS', 'REST APIs', 'Socket.IO', 'JWT Authentication', 'HTML5 & CSS3', 'Tailwind CSS']
    },
    {
      category: 'Databases & Tools',
      items: ['MySQL', 'MongoDB', 'SQLite', 'Git & GitHub', 'Linux', 'Unit Testing', 'Debugging']
    },
    {
      category: 'Currently Strengthening',
      items: ['Python', 'Machine Learning Fundamentals', 'Generative AI Applications']
    }
  ],
  achievements: [
    {
      title: '350+ DSA Problems Solved',
      source: 'LeetCode & GeeksforGeeks',
      description: 'Rigorous algorithmic problem-solving in Arrays, Linked Lists, Trees, Graphs, and Dynamic Programming.'
    },
    {
      title: '5-Star Java Rating',
      source: 'HackerRank',
      description: 'Demonstrated high algorithmic accuracy, OOP mastery, and clean code efficiency in Java.'
    },
    {
      title: 'Generative AI Certification',
      source: 'Infosys (Aug 2025)',
      description: 'Building Generative AI Applications and Solutions with modern AI tools.'
    },
    {
      title: 'ChatGPT-4 Prompt Engineering & LLMs',
      source: 'Infosys (Jul 2025)',
      description: 'Advanced LLM prompt architecture, conversational design, and AI workflow integration.'
    }
  ]
};

export default function PersonalCVShowcase() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isViewerOpen) {
        setIsViewerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isViewerOpen]);

  // Lock body scroll when full-screen viewer is open
  useEffect(() => {
    if (isViewerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isViewerOpen]);

  const handleOpenViewer = () => {
    soundManager.playClick();
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    soundManager.playClick();
    setIsViewerOpen(false);
  };

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(CV_CONFIG.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleDownload = () => {
    soundManager.playClick();
  };

  return (
    <section id="resume" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-champagne-400/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[300px] bg-obsidian-750/30 blur-[130px] pointer-events-none rounded-full" />

      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-900 border border-white/10 text-xs font-mono text-champagne-300 uppercase tracking-widest mb-4 shadow-xl"
        >
          <FileText size={13} className="text-champagne-400" />
          <span>MY PROFESSIONAL PROFILE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6"
        >
          Beyond the Code. <br />
          <span className="text-gradient-champagne">Here's My Journey.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-silver-300 text-sm sm:text-base md:text-lg leading-relaxed"
        >
          Explore my professional journey, technical expertise, education, experience, and the projects I've built.
        </motion.p>
      </div>

      {/* DUAL ACTION BUTTON BAR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-14"
      >
        {/* BUTTON 1: VIEW MY CV */}
        <button
          onClick={handleOpenViewer}
          onMouseEnter={() => soundManager.playHover()}
          className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-champagne-400 via-champagne-300 to-silver-100 text-obsidian-950 font-semibold text-sm shadow-[0_0_30px_rgba(238,215,161,0.25)] hover:shadow-[0_0_45px_rgba(238,215,161,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Eye size={17} className="transition-transform group-hover:scale-110" />
          <span>VIEW MY CV</span>
          <span className="ml-1 text-[11px] font-mono uppercase bg-obsidian-950/15 px-2 py-0.5 rounded-full">Interactive</span>
        </button>

        {/* BUTTON 2: DOWNLOAD MY CV */}
        <a
          href={CV_CONFIG.pdfPath}
          download={CV_CONFIG.fileName}
          onClick={handleDownload}
          onMouseEnter={() => soundManager.playHover()}
          className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-2xl bg-obsidian-900/90 hover:bg-obsidian-850 text-silver-100 border border-white/15 hover:border-champagne-400/40 text-sm font-medium shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Download size={17} className="text-champagne-300 transition-transform group-hover:-translate-y-0.5" />
          <span>DOWNLOAD MY CV</span>
          <span className="text-silver-500 text-xs font-mono">({CV_CONFIG.fileSize})</span>
        </a>

        {/* EXTERNAL VIEW LINK */}
        <a
          href={CV_CONFIG.pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => soundManager.playHover()}
          className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-obsidian-900/50 hover:bg-obsidian-850 text-silver-400 hover:text-white border border-white/10 text-xs font-mono transition-colors"
          title="Open Original Document in Separate Tab"
        >
          <ExternalLink size={14} />
          <span className="hidden sm:inline">Direct Tab</span>
        </a>
      </motion.div>

      {/* MAIN SHOWCASE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: VERIFIED PROFILE & CREDENTIAL DOSSIER (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Personal Identity Header Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-champagne-300">
                  Verified Candidate
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  {VERIFIED_CV_DATA.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-silver-300 mt-1">
                  {VERIFIED_CV_DATA.title}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-obsidian-800 to-obsidian-700 border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                <ShieldCheck size={22} className="text-emerald-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-obsidian-900/60 border border-white/5">
                <span className="text-silver-500 block text-[10px] uppercase">Degree</span>
                <span className="text-silver-200 font-semibold">B.Tech CSE</span>
              </div>
              <div className="p-2.5 rounded-xl bg-obsidian-900/60 border border-white/5">
                <span className="text-silver-500 block text-[10px] uppercase">University</span>
                <span className="text-silver-200 font-semibold truncate block">LPU, Punjab</span>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs for Verified Details */}
          <div className="flex rounded-2xl bg-obsidian-900/80 p-1.5 border border-white/10 gap-1">
            {[
              { id: 'overview', label: 'Experience & Edu', icon: Briefcase },
              { id: 'skills', label: 'Technical Stack', icon: Code2 },
              { id: 'achievements', label: 'DSA & Honors', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-champagne-300 shadow-md font-semibold'
                      : 'text-silver-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={13} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB CONTENT: Experience & Education */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Experience Card */}
              <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-2 text-champagne-300 font-semibold">
                    <Briefcase size={14} />
                    {VERIFIED_CV_DATA.experience.role}
                  </span>
                  <span className="text-silver-500">{VERIFIED_CV_DATA.experience.period}</span>
                </div>
                <div className="text-sm font-semibold text-white">
                  {VERIFIED_CV_DATA.experience.company}
                </div>
                <ul className="space-y-2 text-xs text-silver-300 leading-relaxed">
                  {VERIFIED_CV_DATA.experience.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {VERIFIED_CV_DATA.experience.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-obsidian-900 border border-white/10 text-[10px] font-mono text-silver-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education Timeline */}
              <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-champagne-300 font-semibold mb-1">
                  <GraduationCap size={14} />
                  <span>Academic Qualifications</span>
                </div>
                <div className="space-y-3">
                  {VERIFIED_CV_DATA.education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="pb-3 border-b border-white/5 last:border-0 last:pb-0 text-xs"
                    >
                      <div className="flex items-center justify-between font-medium text-white">
                        <span>{edu.degree}</span>
                        <span className="font-mono text-[11px] text-silver-500">{edu.period}</span>
                      </div>
                      <div className="text-silver-400 text-[11px] mt-0.5 flex items-center justify-between">
                        <span>{edu.institution} • {edu.location}</span>
                        {edu.metric && (
                          <span className="text-champagne-300 font-mono font-semibold">{edu.metric}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB CONTENT: Skills Breakdown */}
          {activeTab === 'skills' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {VERIFIED_CV_DATA.skills.map((skillGroup, idx) => (
                <div key={idx} className="glass-card rounded-2xl p-5 border border-white/10">
                  <span className="text-xs font-mono text-champagne-300 uppercase tracking-wide block mb-2.5">
                    {skillGroup.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-lg bg-obsidian-900 border border-white/10 text-xs font-mono text-silver-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB CONTENT: DSA & Achievements */}
          {activeTab === 'achievements' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {VERIFIED_CV_DATA.achievements.map((ach, idx) => (
                <div key={idx} className="glass-card rounded-2xl p-5 border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <Award size={14} className="text-champagne-400" />
                      {ach.title}
                    </span>
                    <span className="font-mono text-champagne-300 text-[11px]">{ach.source}</span>
                  </div>
                  <p className="text-xs text-silver-300 leading-relaxed pl-5">
                    {ach.description}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* RIGHT COLUMN: INTERACTIVE EMBEDDED CV DOCUMENT VIEWER (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="glass-card rounded-3xl p-4 sm:p-6 border border-white/15 bg-obsidian-900/95 shadow-2xl relative">
            {/* DOCUMENT VIEWER TOP CONTROL BAR */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-champagne-400/10 border border-champagne-400/30 flex items-center justify-center text-champagne-300 shadow">
                  <FileText size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-white font-mono">
                      {CV_CONFIG.fileName}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[11px] font-mono text-silver-400">
                    Official Document • {CV_CONFIG.fileSize}
                  </span>
                </div>
              </div>

              {/* Quick Viewer Controls */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <button
                  onClick={handleOpenViewer}
                  onMouseEnter={() => soundManager.playHover()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-obsidian-800 hover:bg-obsidian-750 text-silver-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  title="Expand to Fullscreen Document Viewer"
                >
                  <Maximize2 size={13} className="text-champagne-300" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </button>

                <a
                  href={CV_CONFIG.pdfPath}
                  download={CV_CONFIG.fileName}
                  onClick={handleDownload}
                  onMouseEnter={() => soundManager.playHover()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-champagne-400/20 hover:bg-champagne-400/30 text-champagne-300 border border-champagne-400/40 transition-colors cursor-pointer"
                  title="Download Tannu_Priya_CV.pdf"
                >
                  <Download size={13} />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* EMBEDDED PDF PREVIEW CANVAS */}
            <div className="relative w-full h-[580px] sm:h-[680px] rounded-2xl overflow-hidden bg-obsidian-950 border border-white/10 shadow-inner group">
              {/* Native PDF Object / Iframe Embed */}
              <object
                data={`${CV_CONFIG.pdfPath}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                type="application/pdf"
                className="w-full h-full rounded-2xl bg-white shadow-2xl"
              >
                {/* Fallback iframe */}
                <iframe
                  src={`${CV_CONFIG.pdfPath}#toolbar=0&navpanes=0`}
                  title="Tannu Priya Curriculum Vitae"
                  className="w-full h-full rounded-2xl bg-white"
                />
              </object>

              {/* Hover Overlay Hint to View Fullscreen */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-obsidian-950 via-obsidian-950/80 to-transparent flex items-center justify-between text-xs font-mono text-silver-300 pointer-events-auto">
                <span className="flex items-center gap-1.5 text-champagne-300">
                  <Sparkles size={13} />
                  <span>Interactive CV Document</span>
                </span>
                <button
                  onClick={handleOpenViewer}
                  className="px-3 py-1 rounded-lg bg-champagne-400/20 border border-champagne-400/40 text-champagne-300 text-xs font-mono hover:bg-champagne-400/30 transition-all cursor-pointer flex items-center gap-1"
                >
                  <Maximize2 size={12} />
                  <span>Open Fullscreen Viewer</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM INQUIRY & LET'S CONNECT BANNER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-20 rounded-3xl bg-gradient-to-b from-obsidian-900 to-obsidian-950 border border-white/10 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-champagne-400/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900 border border-white/10 text-xs font-mono text-champagne-300 uppercase tracking-widest">
            <Mail size={12} />
            <span>Opportunities & Inquiries</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Interested in my profile? <br />
            <span className="text-gradient-champagne">Let's connect.</span>
          </h3>

          <p className="text-sm sm:text-base text-silver-300 leading-relaxed">
            I am actively seeking software engineering roles, full-stack contracts, and high-impact web development opportunities. Feel free to reach out directly via email:
          </p>

          {/* Interactive Email Copy Pill */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`mailto:${CV_CONFIG.email}`}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-champagne-400/40 text-white font-mono text-sm transition-all"
            >
              <Mail size={16} className="text-champagne-300" />
              <span>{CV_CONFIG.email}</span>
            </a>

            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => soundManager.playHover()}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-charcoal-900 hover:bg-charcoal-800 text-silver-300 hover:text-white border border-white/10 text-xs font-mono transition-colors cursor-pointer"
            >
              {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
            </button>

            <a
              href="#contact"
              onMouseEnter={() => soundManager.playHover()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-silver-100 to-champagne-200 text-obsidian-950 font-semibold text-xs tracking-wider uppercase shadow hover:shadow-[0_0_25px_rgba(238,215,161,0.3)] transition-all cursor-pointer"
            >
              <span>Send Message</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </motion.div>

      {/* FULL-SCREEN / MODAL DOCUMENT VIEWER */}
      <AnimatePresence>
        {isViewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-2 sm:p-4 md:p-6"
          >
            {/* Modal Dialog Window */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-6xl h-[95vh] rounded-3xl bg-obsidian-950 border border-white/15 flex flex-col overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)]"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-obsidian-900/90 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-champagne-400/20 border border-champagne-400/40 flex items-center justify-center text-champagne-300">
                    <FileText size={16} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white font-mono block">
                      {CV_CONFIG.fileName}
                    </span>
                    <span className="text-[11px] font-mono text-silver-400">
                      Tannu Priya — Full Stack Developer CV
                    </span>
                  </div>
                </div>

                {/* Modal Controls: Zoom, Download, Open Tab, Close */}
                <div className="flex items-center gap-2 text-xs font-mono">
                  {/* Zoom Controls */}
                  <div className="hidden sm:flex items-center gap-1 bg-obsidian-850 px-2 py-1 rounded-xl border border-white/10">
                    <button
                      onClick={() => setZoomLevel((z) => Math.max(z - 15, 70))}
                      className="p-1 text-silver-400 hover:text-white transition-colors cursor-pointer"
                      title="Zoom Out"
                    >
                      <ZoomOut size={14} />
                    </button>
                    <span className="text-silver-300 px-1 min-w-[45px] text-center text-[11px]">
                      {zoomLevel}%
                    </span>
                    <button
                      onClick={() => setZoomLevel((z) => Math.min(z + 15, 160))}
                      className="p-1 text-silver-400 hover:text-white transition-colors cursor-pointer"
                      title="Zoom In"
                    >
                      <ZoomIn size={14} />
                    </button>
                    <button
                      onClick={() => setZoomLevel(100)}
                      className="p-1 text-silver-400 hover:text-white transition-colors cursor-pointer"
                      title="Reset Zoom"
                    >
                      <RotateCw size={12} />
                    </button>
                  </div>

                  {/* Direct Download in Modal */}
                  <a
                    href={CV_CONFIG.pdfPath}
                    download={CV_CONFIG.fileName}
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-champagne-400/20 hover:bg-champagne-400/30 text-champagne-300 border border-champagne-400/40 transition-colors cursor-pointer"
                  >
                    <Download size={13} />
                    <span className="hidden sm:inline">Download</span>
                  </a>

                  {/* Open in Separate Tab */}
                  <a
                    href={CV_CONFIG.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 text-silver-300 hover:text-white border border-white/10 transition-colors"
                    title="Open PDF in new tab"
                  >
                    <ExternalLink size={14} />
                  </a>

                  {/* Close Viewer */}
                  <button
                    onClick={handleCloseViewer}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-silver-200 hover:text-white border border-white/15 transition-colors cursor-pointer"
                    title="Close Viewer (Esc)"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Viewer Body */}
              <div className="flex-1 bg-obsidian-900/60 p-2 sm:p-4 overflow-auto flex items-center justify-center">
                <div
                  style={{
                    width: `${zoomLevel}%`,
                    maxWidth: '1000px',
                    height: '100%',
                    transition: 'width 0.2s ease-out'
                  }}
                  className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white"
                >
                  <object
                    data={`${CV_CONFIG.pdfPath}#toolbar=1&navpanes=0`}
                    type="application/pdf"
                    className="w-full h-full"
                  >
                    <iframe
                      src={`${CV_CONFIG.pdfPath}`}
                      title="Tannu Priya Full CV Viewer"
                      className="w-full h-full"
                    />
                  </object>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
