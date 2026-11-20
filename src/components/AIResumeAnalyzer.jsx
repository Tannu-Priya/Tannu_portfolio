import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileSearch, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  FileText,
  RefreshCw
} from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function AIResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');

  const sampleResume = `
ALEX MORGAN
Software Engineer | Full Stack Developer
Email: alex.morgan@example.com | Phone: +1 555-0199 | GitHub: github.com/alex | LinkedIn: linkedin.com/in/alex

SUMMARY
Full stack developer with 3+ years of experience engineering high-performance web applications using React.js, Node.js, and MongoDB. Solved 200+ algorithmic challenges.

SKILLS
Frontend: React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
Backend: Node.js, Express.js, REST APIs, GraphQL
Databases: MongoDB, PostgreSQL, Redis
Tools: Git, GitHub, Docker, Postman

EXPERIENCE
Frontend Developer Intern — CloudScale Labs (Jan 2024 - June 2024)
- Architected reusable React.js components that boosted page load speed by 28%.
- Integrated RESTful API endpoints and reduced client-side rendering latency.
- Collaborated in an agile team of 6 engineers on responsive layouts.

PROJECTS
MedTrack Platform (React, Node.js, Express, MongoDB)
- Engineered real-time patient queueing system handling 1,000+ daily appointments.
- Reduced patient check-in wait times by approximately 35% through priority scheduling algorithms.
  `.trim();

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    soundManager.playClick();

    // Read text from file
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setResumeText(text);
      }
    };
    reader.readAsText(file);
  };

  const handleAnalyze = async (textToAnalyze) => {
    const input = (textToAnalyze || resumeText).trim();
    if (!input || input.length < 50) {
      setError('Please provide at least 50 characters of resume text to perform an ATS analysis.');
      return;
    }

    setError('');
    setIsAnalyzing(true);
    soundManager.playClick();

    try {
      const res = await fetch('/api/resume-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: input })
      });

      if (!res.ok) throw new Error('Analysis failed.');

      const data = await res.json();
      setAnalysisResult(data);
      setIsAnalyzing(false);
      soundManager.playChime();
    } catch {
      setIsAnalyzing(false);
      setError('Failed to analyze resume. Please try again.');
    }
  };

  return (
    <section id="ai-resume-analyzer" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-champagne-400/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-900 border border-white/10 text-xs font-mono text-champagne-300 uppercase tracking-widest mb-3">
            <FileSearch size={12} />
            <span>AI Resume & ATS Readability Analyzer</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Benchmark Your Resume. <br />
            <span className="text-gradient-metallic">Data-Driven ATS Evaluation.</span>
          </h2>
        </div>

        <p className="text-silver-400 text-sm max-w-md font-light leading-relaxed">
          Upload your resume or paste plain text. The AI evaluates structural formatting, skill keyword density, quantifiable achievement metrics, and ATS compatibility.
        </p>
      </div>

      {/* Upload & Input Container */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 mb-12 shadow-2xl">
        <div className="space-y-6">
          {/* File Upload / Paste Zone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* File Drag/Drop Box */}
            <div className="border-2 border-dashed border-white/15 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-champagne-400/40 transition-colors relative bg-obsidian-950/40">
              <input
                type="file"
                accept=".txt,.md,.pdf,.json"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Upload size={28} className="text-champagne-300 mb-2" />
              <span className="font-display font-semibold text-white text-sm">
                {fileName ? fileName : 'Upload Resume File'}
              </span>
              <span className="text-[11px] font-mono text-silver-400 mt-1">
                Supports TXT, MD, PDF or JSON text
              </span>
            </div>

            {/* Paste Action Hint */}
            <div className="flex flex-col justify-between p-6 rounded-2xl bg-obsidian-950/60 border border-white/5">
              <div className="space-y-2">
                <span className="text-xs font-mono text-champagne-300 uppercase">Quick Test Demo</span>
                <p className="text-xs text-silver-400 font-light">
                  Want to see how the ATS evaluation works immediately? Click below to populate a sample software engineer resume:
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setResumeText(sampleResume);
                  setFileName('sample_engineer_cv.txt');
                  handleAnalyze(sampleResume);
                }}
                className="mt-3 px-4 py-2 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 text-xs font-mono text-silver-200 hover:text-white transition-colors cursor-pointer text-center"
              >
                Load Sample Resume & Analyze
              </button>
            </div>
          </div>

          {/* Textarea for Direct Paste */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-silver-400 mb-2">
              Or Paste Resume Text
            </label>
            <textarea
              rows={6}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume contents (summary, skills, experience, projects)..."
              className="w-full px-4 py-3 rounded-2xl bg-obsidian-950/80 border border-white/10 text-white placeholder-silver-600 text-xs sm:text-sm font-mono focus:outline-none focus:border-champagne-400/60 transition-colors resize-none"
            />
          </div>

          {error && <p className="text-xs text-rose-400 font-mono">{error}</p>}

          {/* Action Button & Privacy Notice */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-[11px] font-mono text-silver-500">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Privacy Guaranteed: Processed in memory. Zero file retention.</span>
            </div>

            <button
              onClick={() => handleAnalyze()}
              disabled={isAnalyzing}
              onMouseEnter={() => soundManager.playHover()}
              className="shimmer-btn px-6 py-3 rounded-xl bg-gradient-to-r from-silver-100 to-champagne-200 text-obsidian-950 text-xs font-semibold tracking-wide flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
                  <span>Evaluating ATS Matrix...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Analyze Resume Scorecard</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Scorecard Results */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass-card rounded-3xl p-6 sm:p-10 border border-champagne-400/40 relative overflow-hidden shadow-2xl space-y-8"
          >
            {/* Header with Overall ATS Score */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-champagne-400/10 text-champagne-300 border border-champagne-400/20">
                  ATS Evaluation Report
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-2">
                  Comprehensive Resume Assessment
                </h3>
                <p className="text-xs text-silver-400 font-light mt-1">
                  {analysisResult.summary}
                </p>
              </div>

              {/* Big ATS Circular Score Badge */}
              <div className="px-6 py-4 rounded-2xl bg-obsidian-950 border border-champagne-400/30 text-center shrink-0">
                <div className="text-[10px] font-mono uppercase text-silver-400">ATS Readability</div>
                <div className="font-display text-4xl font-extrabold text-champagne-300">
                  {analysisResult.overallScore}<span className="text-lg text-silver-500">/100</span>
                </div>
              </div>
            </div>

            {/* Sub-Score Category Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-obsidian-950/80 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-silver-500 uppercase">Structure & Hierarchy</span>
                <div className="font-display text-2xl font-bold text-white">{analysisResult.scores.structure}%</div>
                <div className="w-full h-1 bg-obsidian-800 rounded-full overflow-hidden">
                  <div className="h-full bg-champagne-400" style={{ width: `${analysisResult.scores.structure}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-950/80 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-silver-500 uppercase">Skills Keyword Density</span>
                <div className="font-display text-2xl font-bold text-white">{analysisResult.scores.skillsPresentation}%</div>
                <div className="w-full h-1 bg-obsidian-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400" style={{ width: `${analysisResult.scores.skillsPresentation}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-950/80 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-silver-500 uppercase">Impact & Quantified Metrics</span>
                <div className="font-display text-2xl font-bold text-white">{analysisResult.scores.impactAndMetrics}%</div>
                <div className="w-full h-1 bg-obsidian-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400" style={{ width: `${analysisResult.scores.impactAndMetrics}%` }} />
                </div>
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-obsidian-950/60 border border-emerald-500/20 space-y-3">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 size={14} />
                  <span>Identified Strengths</span>
                </span>
                <ul className="space-y-2">
                  {analysisResult.strengths.map((str, idx) => (
                    <li key={idx} className="text-xs text-silver-300 font-light leading-relaxed flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-obsidian-950/60 border border-champagne-400/20 space-y-3">
                <span className="text-xs font-mono text-champagne-300 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                  <AlertCircle size={14} />
                  <span>Actionable Improvements</span>
                </span>
                <ul className="space-y-2">
                  {analysisResult.improvements.map((imp, idx) => (
                    <li key={idx} className="text-xs text-silver-300 font-light leading-relaxed flex items-start gap-2">
                      <span className="text-champagne-400">•</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
