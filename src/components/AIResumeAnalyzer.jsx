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
  RefreshCw, 
  X, 
  Download, 
  Copy, 
  Check, 
  ArrowRight, 
  Layers, 
  Code2, 
  Briefcase, 
  Target,
  Wand2,
  FileCheck
} from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function AIResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [targetJobDesc, setTargetJobDesc] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Improvement Assistant states
  const [activeAssistantTab, setActiveAssistantTab] = useState('bullet'); // 'bullet' | 'summary' | 'job'
  const [selectedBulletToOptimize, setSelectedBulletToOptimize] = useState('');
  const [optimizedBulletResult, setOptimizedBulletResult] = useState(null);
  const [isOptimizingBullet, setIsOptimizingBullet] = useState(false);
  const [customBulletInput, setCustomBulletInput] = useState('');

  const sampleDemoResume = `
JORDAN HAYES
Full Stack Developer | React.js & Node.js Engineer
Email: jordan.hayes@example.com | Phone: (555) 234-5678 | GitHub: github.com/jordanhayes | LinkedIn: linkedin.com/in/jordanhayes

PROFESSIONAL SUMMARY
Passionate Full Stack Engineer with 3+ years of experience developing responsive web applications using React.js, TypeScript, Node.js, and PostgreSQL. Solved 150+ algorithmic challenges.

TECHNICAL SKILLS
Frontend: React.js, TypeScript, Next.js, Redux, HTML5, CSS3, Tailwind CSS
Backend: Node.js, Express.js, REST APIs, GraphQL, Microservices
Databases: PostgreSQL, MongoDB, Redis
DevOps & Tools: Git, GitHub, Docker, Jest, Postman, Vite

WORK EXPERIENCE
Software Developer — NexaTech Solutions (March 2023 – Present)
- Worked on user interface components and resolved front-end bug tickets.
- Engineered reusable React.js dashboard widgets that boosted client workflow speed by 28%.
- Integrated RESTful backend endpoints with asynchronous error boundaries and data caching.
- Collaborated in an agile scrum team of 8 software engineers.

Web Developer Intern — Apex Systems (June 2022 – Dec 2022)
- Responsible for maintaining website pages and bug fixing.
- Developed automated testing scripts that reduced regression issues by approximately 22%.
- Created responsive styling using Tailwind CSS across mobile and desktop viewports.

FEATURED PROJECTS
CloudVault Storage Platform (React.js, Node.js, Express, MongoDB)
- Built file management web app featuring chunked uploads and JWT authentication.
- Processed 500+ active file uploads with 99.8% uptime during beta evaluation.
  `.trim();

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer?.files?.[0];
    if (droppedFile) processFileSelection(droppedFile);
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) processFileSelection(selectedFile);
  };

  const processFileSelection = (selectedFile) => {
    soundManager.playClick();
    setError('');
    const ext = selectedFile.name.split('.').pop().toLowerCase();
    if (!['pdf', 'docx', 'txt', 'md'].includes(ext)) {
      setError('Unsupported file type. Please upload a PDF, DOCX, or TXT document.');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit.');
      return;
    }

    setFile(selectedFile);
    setFileInfo({
      name: selectedFile.name,
      size: `${(selectedFile.size / 1024).toFixed(1)} KB`,
      type: ext.toUpperCase()
    });
  };

  const handleRemoveFile = () => {
    soundManager.playClick();
    setFile(null);
    setFileInfo(null);
    setResumeText('');
    setError('');
  };

  const handleAnalyze = async (manualText = '') => {
    const textToUse = manualText || resumeText;
    if (!file && (!textToUse || textToUse.trim().length < 40)) {
      setError('Please upload a resume file (PDF, DOCX, TXT) or paste your resume text to begin analysis.');
      return;
    }

    soundManager.playClick();
    setError('');
    setIsAnalyzing(true);
    setAnalysisStep('Ingesting document and extracting text...');

    try {
      let data;
      if (file) {
        // Upload file to server for parsing and analysis
        setAnalysisStep('Parsing document structure (PDF / DOCX engine)...');
        const formData = new FormData();
        formData.append('resume', file);
        if (targetJobDesc) formData.append('targetJobDescription', targetJobDesc);

        const res = await fetch('/api/resume/upload-and-analyze', {
          method: 'POST',
          body: formData
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to parse resume document.');
        }

        const json = await res.json();
        data = json.analysis;
      } else {
        // Direct text analysis
        setAnalysisStep('Evaluating keyword density and ATS metrics...');
        const res = await fetch('/api/resume-analyzer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resumeText: textToUse, targetJobDescription: targetJobDesc })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to analyze resume text.');
        }

        data = await res.json();
      }

      setAnalysisStep('Generating actionable optimization roadmap...');
      setTimeout(() => {
        setAnalysisResult(data);
        setIsAnalyzing(false);
        soundManager.playChime();
        if (data.weakBullets && data.weakBullets.length > 0) {
          setSelectedBulletToOptimize(data.weakBullets[0].original);
        }
      }, 600);
    } catch (err) {
      console.error(err);
      setIsAnalyzing(false);
      setError(err.message || 'Error occurred while analyzing resume. Please verify the document and try again.');
    }
  };

  const handleOptimizeCustomBullet = async () => {
    const text = (customBulletInput || selectedBulletToOptimize).trim();
    if (!text) return;

    soundManager.playClick();
    setIsOptimizingBullet(true);

    try {
      const res = await fetch('/api/resume/optimize-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bulletText: text })
      });
      if (res.ok) {
        const result = await res.json();
        setOptimizedBulletResult(result);
      }
    } catch {
      // Local fallback
      setOptimizedBulletResult({
        original: text,
        option1: `Engineered ${text.replace(/^(responsible for|worked on|helped with)\s*/i, '')}, resulting in approximately [28%] improvement in operational performance.`,
        option2: `Architected and deployed ${text.replace(/^(responsible for|worked on|helped with)\s*/i, '')}, ensuring high reliability across [500+] active records.`,
        option3: `Spearheaded ${text.replace(/^(responsible for|worked on|helped with)\s*/i, '')}, reducing latency and streamlining cross-team operational workflows.`
      });
    } finally {
      setIsOptimizingBullet(false);
    }
  };

  const handleDownloadReport = () => {
    if (!analysisResult) return;
    soundManager.playClick();

    const reportContent = `
=================================================================
OBSIDIAN X — AI ATS RESUME EVALUATION REPORT
=================================================================
Date of Assessment: ${new Date().toLocaleDateString()}
Document Evaluated: ${fileInfo?.name || 'Pasted Resume Text'}
Overall ATS Readability Score: ${analysisResult.overallScore}/100 (${analysisResult.ratingTier})

DISCLAIMER:
${analysisResult.disclaimer}

-----------------------------------------------------------------
1. DIMENSIONAL SCORE BREAKDOWN
-----------------------------------------------------------------
• Formatting & Structure:              ${analysisResult.scores.structure}%
• Technical Skills Presentation:       ${analysisResult.scores.technicalSkills}%
• Keyword Relevance & Density:         ${analysisResult.scores.keywordRelevance}%
• Project Descriptions:                ${analysisResult.scores.projectDescription}%
• Experience Presentation:             ${analysisResult.scores.experiencePresentation}%
• Achievement & Quantification:        ${analysisResult.scores.achievementQuantification}%

-----------------------------------------------------------------
2. IDENTIFIED STRENGTHS
-----------------------------------------------------------------
${analysisResult.strengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}

-----------------------------------------------------------------
3. HIGH-PRIORITY MISSING KEYWORDS
-----------------------------------------------------------------
${analysisResult.missingKeywords.join(', ')}

-----------------------------------------------------------------
4. DETECTED WEAK BULLET POINTS & PROPOSED FIXES
-----------------------------------------------------------------
${analysisResult.weakBullets.map((b, i) => `
[Bullet ${i + 1}] Original: "${b.original}"
Issue: ${b.issue}
Recommended Rewrite: "${b.improved}"
`).join('\n')}

-----------------------------------------------------------------
5. FORMATTING & PARSER RECOMMENDATIONS
-----------------------------------------------------------------
${analysisResult.formattingIssues.map((f, i) => `${i + 1}. ${f}`).join('\n')}

-----------------------------------------------------------------
6. SUGGESTED EXECUTIVE PROFESSIONAL SUMMARY
-----------------------------------------------------------------
"${analysisResult.suggestedSummary}"

-----------------------------------------------------------------
Generated by OBSIDIAN X AI System // Tannu Priya Portfolio
=================================================================
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ATS_Resume_Analysis_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopySuggestions = () => {
    if (!analysisResult) return;
    soundManager.playClick();

    const textToCopy = `
ATS Readability Score: ${analysisResult.overallScore}/100
Recommended Improvements:
${analysisResult.recommendations.map(r => `• ${r}`).join('\n')}
Missing Keywords: ${analysisResult.missingKeywords.join(', ')}
Suggested Summary: "${analysisResult.suggestedSummary}"
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleResetAnalysis = () => {
    soundManager.playClick();
    setAnalysisResult(null);
    setFile(null);
    setFileInfo(null);
    setResumeText('');
    setOptimizedBulletResult(null);
    setError('');
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
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Benchmark Your Resume. <br />
            <span className="text-gradient-metallic">Data-Driven ATS Intelligence.</span>
          </h2>
        </div>

        <p className="text-silver-400 text-sm max-w-md font-light leading-relaxed">
          Upload any PDF, DOCX, or TXT resume. The AI engine extracts your actual text, scores formatting and keyword density across 6 dimensions, identifies weak bullet points, and suggests quantifiable improvements.
        </p>
      </div>

      {/* VIEW 1: UPLOAD & INPUT INTERFACE (WHEN NO RESULTS ARE DISPLAYED) */}
      {!analysisResult && (
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-6">
          {/* Drag & Drop File Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center transition-all relative ${
              fileInfo
                ? 'border-champagne-400/60 bg-champagne-400/5'
                : 'border-white/15 bg-obsidian-950/60 hover:border-champagne-400/40'
            }`}
          >
            {!fileInfo ? (
              <>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt,.md"
                  onChange={handleFileInput}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="w-16 h-16 rounded-2xl bg-obsidian-850 border border-white/10 flex items-center justify-center mb-4 text-champagne-300 shadow-xl">
                  <Upload size={28} />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-1">
                  Drag & Drop Your Resume Here
                </h3>
                <p className="text-xs text-silver-400 font-light max-w-sm mb-3">
                  Upload your actual resume in <strong className="text-silver-200">PDF, DOCX, or TXT</strong> format (Max 5MB).
                </p>
                <span className="px-4 py-2 rounded-xl bg-obsidian-850 border border-white/10 text-xs font-mono text-champagne-300 pointer-events-none">
                  Browse File on Device
                </span>
              </>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-lg p-4 rounded-xl bg-obsidian-900 border border-champagne-400/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-champagne-400/10 border border-champagne-400/30 flex items-center justify-center text-champagne-300 font-mono font-bold text-xs">
                    {fileInfo.type}
                  </div>
                  <div className="text-left">
                    <span className="font-mono text-sm text-white font-semibold block truncate max-w-xs">
                      {fileInfo.name}
                    </span>
                    <span className="text-[11px] font-mono text-silver-400">
                      File Size: {fileInfo.size} • Ready for analysis
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleRemoveFile}
                  className="p-2 rounded-lg bg-obsidian-800 hover:bg-obsidian-750 text-silver-400 hover:text-white border border-white/10 transition-colors cursor-pointer shrink-0"
                  title="Remove and upload different file"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Optional Direct Text Paste Option */}
          {!fileInfo && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-silver-400">
                  Or Paste Resume Plain Text
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResumeText(sampleDemoResume);
                    handleAnalyze(sampleDemoResume);
                  }}
                  className="text-xs font-mono text-champagne-300 hover:underline cursor-pointer"
                >
                  [Load Sample Demonstration Resume]
                </button>
              </div>
              <textarea
                rows={5}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume sections (Summary, Technical Skills, Experience, Projects, Education)..."
                className="w-full px-4 py-3 rounded-2xl bg-obsidian-950/80 border border-white/10 text-white placeholder-silver-600 text-xs font-mono focus:outline-none focus:border-champagne-400/60 transition-colors resize-none"
              />
            </div>
          )}

          {/* Optional Target Job Description Input for Tailoring */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-silver-400 mb-2">
              Target Job Description (Optional — Analyzes keyword overlap & match rate)
            </label>
            <textarea
              rows={3}
              value={targetJobDesc}
              onChange={(e) => setTargetJobDesc(e.target.value)}
              placeholder="Paste the job posting requirements to detect exact matching and missing keywords..."
              className="w-full px-4 py-3 rounded-2xl bg-obsidian-950/80 border border-white/10 text-white placeholder-silver-600 text-xs font-mono focus:outline-none focus:border-champagne-400/60 transition-colors resize-none"
            />
          </div>

          {error && <p className="text-xs text-rose-400 font-mono">{error}</p>}

          {/* Action Row & Privacy Notice */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-[11px] font-mono text-silver-500">
              <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
              <span>In-Memory Parsing: Files are processed securely in memory and never stored on disk.</span>
            </div>

            <button
              onClick={() => handleAnalyze()}
              disabled={isAnalyzing || (!file && !resumeText.trim())}
              onMouseEnter={() => soundManager.playHover()}
              className="shimmer-btn px-7 py-3.5 rounded-xl bg-gradient-to-r from-silver-100 via-champagne-200 to-white text-obsidian-950 text-xs font-bold font-mono tracking-wide flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_30px_rgba(238,215,161,0.35)] transition-all cursor-pointer disabled:opacity-40"
            >
              {isAnalyzing ? (
                <>
                  <span className="w-4 h-4 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
                  <span>{analysisStep || 'Analyzing Document...'}</span>
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  <span>Analyze Resume with AI</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: COMPREHENSIVE RESULTS DASHBOARD (REPLACES UPLOAD VIEW) */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-8"
          >
            {/* Dashboard Top Header Bar */}
            <div className="glass-card rounded-2xl p-4 sm:p-6 border border-champagne-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-champagne-400/10 border border-champagne-400/30 flex items-center justify-center text-champagne-300">
                  <FileCheck size={20} />
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">
                    {fileInfo ? fileInfo.name : 'Uploaded Resume Assessment'}
                  </span>
                  <span className="text-[11px] font-mono text-silver-400">
                    {fileInfo?.size || 'Direct Text Input'} • {analysisResult.metadata.wordCount} Words • {analysisResult.metadata.detectedSkillsCount} Technical Skills Detected
                  </span>
                </div>
              </div>

              {/* Action Buttons: Reset & Download Report */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadReport}
                  className="px-4 py-2 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 text-xs font-mono text-silver-200 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Download full analysis report as text"
                >
                  <Download size={13} />
                  <span>Export Report</span>
                </button>

                <button
                  onClick={handleCopySuggestions}
                  className="px-4 py-2 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 text-xs font-mono text-silver-200 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy recommendations to clipboard"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy Tips'}</span>
                </button>

                <button
                  onClick={handleResetAnalysis}
                  className="px-4 py-2 rounded-xl bg-champagne-300 hover:bg-champagne-200 text-obsidian-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw size={13} />
                  <span>Analyze Another</span>
                </button>
              </div>
            </div>

            {/* Scorecard Hero Gauge & Dimensional Meters */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Overall Score Dial */}
              <div className="lg:col-span-4 glass-card rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-champagne-400/10 rounded-full blur-2xl pointer-events-none" />

                <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-400 mb-2">
                  OVERALL READABILITY RATING
                </span>

                <div className="font-display text-6xl sm:text-7xl font-extrabold text-white tracking-tight my-2">
                  {analysisResult.overallScore}
                  <span className="text-2xl text-silver-500 font-normal">/100</span>
                </div>

                <span className="text-xs font-mono px-3 py-1 rounded-full bg-champagne-400/10 text-champagne-300 border border-champagne-400/20 mb-4 font-semibold">
                  {analysisResult.ratingTier}
                </span>

                <p className="text-xs text-silver-400 font-light leading-relaxed">
                  {analysisResult.disclaimer}
                </p>
              </div>

              {/* 6-Dimensional Score Breakdown Meters */}
              <div className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-silver-400">
                    6-Dimensional ATS Performance Breakdown
                  </span>
                  <span className="text-[11px] font-mono text-champagne-300">
                    Benchmark Target: 80%+
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Formatting & Structure', score: analysisResult.scores.structure, color: 'bg-champagne-400' },
                    { label: 'Technical Skills Density', score: analysisResult.scores.technicalSkills, color: 'bg-emerald-400' },
                    { label: 'Keyword Relevance', score: analysisResult.scores.keywordRelevance, color: 'bg-blue-400' },
                    { label: 'Project Descriptions', score: analysisResult.scores.projectDescription, color: 'bg-indigo-400' },
                    { label: 'Experience Presentation', score: analysisResult.scores.experiencePresentation, color: 'bg-purple-400' },
                    { label: 'Achievement & Quantification', score: analysisResult.scores.achievementQuantification, color: 'bg-rose-400' }
                  ].map((dim, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-obsidian-950/80 border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-silver-300">{dim.label}</span>
                        <span className="font-bold text-white">{dim.score}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-obsidian-850 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${dim.score}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className={`h-full ${dim.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strengths, Missing Keywords & Weak Bullets */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Strengths & Missing Keywords */}
              <div className="lg:col-span-5 space-y-6">
                {/* Strengths Card */}
                <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 space-y-3">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 size={15} />
                    <span>Identified Resume Strengths</span>
                  </span>
                  <ul className="space-y-2 text-xs text-silver-300 font-light leading-relaxed">
                    {analysisResult.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Missing Keywords Card */}
                <div className="glass-card rounded-2xl p-6 border border-champagne-400/20 space-y-3">
                  <span className="text-xs font-mono text-champagne-300 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                    <Target size={15} />
                    <span>High-Impact Missing Keywords</span>
                  </span>
                  <p className="text-xs text-silver-400 font-light">
                    Incorporate these keywords into your technical skills or project descriptions to increase search visibility:
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {analysisResult.missingKeywords.map((kw, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded bg-obsidian-950 border border-champagne-400/30 text-xs font-mono text-champagne-300">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Target Job Match Summary (if provided) */}
                {analysisResult.jobMatch && (
                  <div className="glass-card rounded-2xl p-6 border border-blue-500/30 space-y-3">
                    <span className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
                      Target Job Description Match Rate: {analysisResult.jobMatch.matchRate}%
                    </span>
                    <div className="text-xs text-silver-300 space-y-1">
                      <div><strong className="text-emerald-400">Overlapping Terms:</strong> {analysisResult.jobMatch.matchingKeywords.join(', ')}</div>
                      <div><strong className="text-rose-400">Missing Job Terms:</strong> {analysisResult.jobMatch.missingKeywords.join(', ')}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Weak Bullet Points Detected */}
              <div className="lg:col-span-7 glass-card rounded-2xl p-6 border border-white/10 space-y-4">
                <span className="text-xs font-mono text-rose-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                  <AlertCircle size={15} />
                  <span>Weak Bullet Points Detected in Uploaded Resume</span>
                </span>
                <p className="text-xs text-silver-400 font-light">
                  These lines from your resume lack measurable metrics or begin with passive phrasing. Click any bullet to optimize it with active engineering verbs:
                </p>

                <div className="space-y-3">
                  {analysisResult.weakBullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedBulletToOptimize(bullet.original);
                        setCustomBulletInput(bullet.original);
                      }}
                      className="p-4 rounded-xl bg-obsidian-950/80 border border-white/5 hover:border-champagne-400/40 transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-rose-300">Line #{idx + 1}: {bullet.issue}</span>
                        <span className="text-champagne-300 group-hover:underline">Click to Optimize →</span>
                      </div>
                      <p className="text-xs text-silver-300 italic">"{bullet.original}"</p>
                      <div className="text-xs text-emerald-300/90 pl-2 border-l-2 border-emerald-400/50">
                        <strong>Recommended Rewrite:</strong> {bullet.improved}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI IMPROVEMENT ASSISTANT SUITE */}
            <div className="glass-card rounded-3xl p-6 sm:p-10 border border-champagne-400/30 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Wand2 size={18} className="text-champagne-300" />
                  <h3 className="font-display text-xl font-bold text-white">
                    Interactive AI Resume Optimizer
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveAssistantTab('bullet')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      activeAssistantTab === 'bullet'
                        ? 'bg-champagne-300 text-obsidian-950 font-bold'
                        : 'bg-obsidian-850 text-silver-400'
                    }`}
                  >
                    Bullet Rewriter
                  </button>
                  <button
                    onClick={() => setActiveAssistantTab('summary')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      activeAssistantTab === 'summary'
                        ? 'bg-champagne-300 text-obsidian-950 font-bold'
                        : 'bg-obsidian-850 text-silver-400'
                    }`}
                  >
                    Summary Generator
                  </button>
                </div>
              </div>

              {/* Tab 1: Bullet Point Optimizer */}
              {activeAssistantTab === 'bullet' && (
                <div className="space-y-4">
                  <label className="block text-xs font-mono text-silver-400 uppercase">
                    Select or Type a Bullet Point to Rewrite with Action Verbs & Metrics
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={customBulletInput || selectedBulletToOptimize}
                      onChange={(e) => setCustomBulletInput(e.target.value)}
                      placeholder="e.g. Worked on frontend features and bug fixes..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-champagne-400/60"
                    />
                    <button
                      onClick={handleOptimizeCustomBullet}
                      disabled={isOptimizingBullet}
                      className="px-5 py-2.5 rounded-xl bg-champagne-300 hover:bg-champagne-200 text-obsidian-950 text-xs font-bold font-mono transition-colors cursor-pointer shrink-0"
                    >
                      {isOptimizingBullet ? 'Rewriting...' : 'Rewrite Bullet'}
                    </button>
                  </div>

                  {optimizedBulletResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-obsidian-950/90 border border-champagne-400/30 space-y-2.5"
                    >
                      <span className="text-[10px] font-mono text-champagne-300 uppercase tracking-widest font-semibold block">
                        AI-Generated High-Impact Options
                      </span>
                      <div className="p-2.5 rounded bg-obsidian-900 border border-white/5 text-xs text-emerald-300">
                        <strong>Option A (Efficiency):</strong> {optimizedBulletResult.option1}
                      </div>
                      <div className="p-2.5 rounded bg-obsidian-900 border border-white/5 text-xs text-blue-300">
                        <strong>Option B (Scale & Volume):</strong> {optimizedBulletResult.option2}
                      </div>
                      <div className="p-2.5 rounded bg-obsidian-900 border border-white/5 text-xs text-purple-300">
                        <strong>Option C (Leadership & Automation):</strong> {optimizedBulletResult.option3}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Tab 2: Professional Summary Rewriter */}
              {activeAssistantTab === 'summary' && (
                <div className="p-5 rounded-2xl bg-obsidian-950/80 border border-white/5 space-y-3">
                  <span className="text-xs font-mono text-champagne-300 uppercase tracking-wider block">
                    AI-Synthesized Executive Summary for Your Profile:
                  </span>
                  <p className="text-sm text-silver-200 font-light leading-relaxed italic">
                    "{analysisResult.suggestedSummary}"
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(analysisResult.suggestedSummary);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-4 py-2 rounded-xl bg-obsidian-900 hover:bg-obsidian-850 text-xs font-mono text-silver-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>Copy Summary to Clipboard</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Reset Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-white/10 text-xs font-mono text-silver-500">
              <span>Analysis generated dynamically for your uploaded document.</span>
              <button
                onClick={handleResetAnalysis}
                className="text-champagne-300 hover:underline cursor-pointer"
              >
                ← Upload another resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
