import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  GraduationCap, 
  Briefcase, 
  FolderGit2, 
  Cpu, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { personalInfo, experienceData, projectsData, skillsData } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

export default function ResumeSection() {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    soundManager.playClick();
    // Direct trigger to download or print
    window.print();
  };

  const handleCopyText = () => {
    soundManager.playClick();
    const resumeText = `
TANNU PRIYA
Full Stack Developer | React.js Developer | Software Engineer
Location: India | Email: ${personalInfo.email}
LinkedIn: ${personalInfo.linkedin} | GitHub: ${personalInfo.github}

PROFESSIONAL SUMMARY
${personalInfo.introduction}
${personalInfo.bio.join('\n')}

EDUCATION
Bachelor of Technology (B.Tech) in Computer Science & Engineering

EXPERIENCE
${experienceData.map(e => `${e.role} - ${e.company} (${e.period})\n${e.responsibilities.join('\n')}`).join('\n\n')}

FEATURED PROJECTS
${projectsData.map(p => `${p.title} (${p.techStack.join(', ')})\n- ${p.tagline}\n- ${p.keyFeatures.slice(0, 3).join('\n- ')}`).join('\n\n')}

TECHNICAL SKILLS & COMPETITIVE PROBLEM SOLVING
- Data Structures & Algorithms: 350+ solved on LeetCode & GeeksforGeeks
- Frontend: React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express.js, REST APIs
- Languages: Java, Python, C++, C
- Databases: MongoDB, MySQL
- Tools: Git, GitHub, Postman, Vite
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="resume" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-champagne-400/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900 border border-white/10 text-xs font-mono text-champagne-300 uppercase tracking-widest mb-3">
            <FileText size={12} />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Executive Summary & <br />
            <span className="text-gradient-champagne">Resume Showcase</span>
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopyText}
            onMouseEnter={() => soundManager.playHover()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-silver-300 hover:text-white border border-white/10 text-xs font-mono transition-colors cursor-pointer"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Plain Text'}</span>
          </button>

          <button
            onClick={handleDownload}
            onMouseEnter={() => soundManager.playHover()}
            className="shimmer-btn flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-silver-100 to-champagne-200 text-charcoal-950 text-xs font-semibold tracking-wide hover:shadow-[0_0_25px_rgba(238,215,161,0.3)] transition-all cursor-pointer"
          >
            <Download size={14} />
            <span>Download CV / Print</span>
          </button>
        </div>
      </div>

      {/* Editorial Resume Document Container */}
      <div className="glass-card rounded-3xl p-6 sm:p-12 border border-white/10 relative overflow-hidden shadow-2xl">
        {/* Document Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-white/10 gap-4">
          <div>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {personalInfo.name}
            </h3>
            <p className="text-sm font-mono text-champagne-300 mt-1">
              {personalInfo.title}
            </p>
          </div>

          <div className="flex flex-col md:items-end text-xs font-mono text-silver-400 gap-1">
            <span>Location: {personalInfo.location}</span>
            <span>Email: {personalInfo.email}</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {personalInfo.availability}
            </span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Left Section: Summary, Experience, Projects */}
          <div className="lg:col-span-8 space-y-10">
            {/* Professional Summary */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-champagne-300 mb-3 flex items-center gap-2">
                <Sparkles size={14} />
                <span>Professional Summary</span>
              </h4>
              <p className="text-sm text-silver-300 font-light leading-relaxed">
                {personalInfo.introduction} {personalInfo.bio[1]}
              </p>
            </div>

            {/* Experience */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-champagne-300 mb-4 flex items-center gap-2">
                <Briefcase size={14} />
                <span>Work Experience</span>
              </h4>
              {experienceData.map((exp, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-charcoal-950/60 border border-white/5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-display font-bold text-white text-base">
                      {exp.role} — <span className="text-champagne-300">{exp.company}</span>
                    </span>
                    <span className="text-xs font-mono text-silver-400">{exp.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="text-xs text-silver-300/90 font-light flex items-start gap-2">
                        <span className="text-champagne-400 mt-1">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-champagne-300 mb-4 flex items-center gap-2">
                <FolderGit2 size={14} />
                <span>Featured Project Highlights</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectsData.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-charcoal-950/60 border border-white/5 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-white text-sm">
                        {proj.title}
                      </span>
                      <span className="text-[10px] font-mono text-champagne-400">
                        {proj.featuredMetric}
                      </span>
                    </div>
                    <p className="text-xs text-silver-400 font-light line-clamp-2">
                      {proj.tagline}
                    </p>
                    <div className="text-[10px] font-mono text-silver-500 pt-1 border-t border-white/5">
                      {proj.techStack.slice(0, 3).join(' • ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Education & Technical Skills */}
          <div className="lg:col-span-4 space-y-10 lg:border-l lg:border-white/10 lg:pl-8">
            {/* Education */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-champagne-300 mb-3 flex items-center gap-2">
                <GraduationCap size={14} />
                <span>Education</span>
              </h4>
              <div className="p-4 rounded-xl bg-charcoal-950/60 border border-white/5">
                <div className="font-display font-bold text-white text-sm">
                  Bachelor of Technology (B.Tech)
                </div>
                <div className="text-xs font-mono text-champagne-300 mt-0.5">
                  Computer Science & Engineering
                </div>
                <div className="text-xs text-silver-400 mt-2 font-light">
                  Focus on Data Structures, Algorithms, Database Management, and Software Engineering.
                </div>
              </div>
            </div>

            {/* Problem Solving Metric */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-champagne-300 mb-3 flex items-center gap-2">
                <Cpu size={14} />
                <span>Algorithmic Rigor</span>
              </h4>
              <div className="p-4 rounded-xl bg-charcoal-950/60 border border-white/5">
                <div className="font-display text-2xl font-bold text-white">350+</div>
                <div className="text-xs font-mono text-silver-400">Problems Solved</div>
                <div className="text-[11px] text-silver-500 mt-1">
                  Active problem solver on LeetCode & GeeksforGeeks.
                </div>
              </div>
            </div>

            {/* Skills Breakdown */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-champagne-300 mb-3">
                Core Stack
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="text-[11px] font-mono text-silver-400 block mb-1">Frontend:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5/CSS3'].map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-charcoal-800 text-[10px] font-mono text-silver-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-silver-400 block mb-1">Backend & DB:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'MySQL'].map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-charcoal-800 text-[10px] font-mono text-silver-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-silver-400 block mb-1">Languages:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Java', 'Python', 'C++', 'C', 'JavaScript'].map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-charcoal-800 text-[10px] font-mono text-silver-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Replacement Notice Footer */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs font-mono text-silver-500">
            [PDF file replacement slot: link pointing to /resume.pdf in public folder]
          </p>
        </div>
      </div>
    </section>
  );
}
