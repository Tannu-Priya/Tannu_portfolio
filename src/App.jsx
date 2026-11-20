import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import CinematicIntro from './components/CinematicIntro';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AIProjectConsultant from './components/AIProjectConsultant';
import AIResumeAnalyzer from './components/AIResumeAnalyzer';
import ClientConversion from './components/ClientConversion';
import Experience from './components/Experience';
import LearningRoadmap from './components/LearningRoadmap';
import ResumeSection from './components/ResumeSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AskTannuAI from './components/AskTannuAI';
import NarratorDock from './components/NarratorDock';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // Initialize Lenis Smooth Scrolling for luxury feel
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030305] text-[#cbd5e1] selection:bg-[#eed7a1] selection:text-[#030305] font-sans">
      {/* Cinematic Intro Preloader */}
      {!introFinished && (
        <CinematicIntro onComplete={() => setIntroFinished(true)} />
      )}

      {/* Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Main Portfolio Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Featured Projects with AI Smart Project Finder */}
        <Projects />

        {/* AI Project Architect & Consultant */}
        <AIProjectConsultant />

        {/* AI Resume & ATS Scorecard Analyzer */}
        <AIResumeAnalyzer />

        {/* Client Conversion Section */}
        <ClientConversion />

        {/* Experience Section */}
        <Experience />

        {/* Learning Roadmap Section */}
        <LearningRoadmap />

        {/* Resume Section */}
        <ResumeSection />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Personal AI & Voice Assistant ("Ask Tannu AI") */}
      <AskTannuAI />

      {/* Floating AI Voice Narrator Subtitle & Control Dock */}
      <NarratorDock />
    </div>
  );
}
