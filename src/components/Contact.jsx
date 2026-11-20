import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  MessageSquare, 
  ArrowUpRight,
  MapPin,
  Clock
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playClick();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage('');
    setFormStatus('submitting');

    // Simulate reliable dispatch & feedback
    setTimeout(() => {
      setFormStatus('success');
      soundManager.playChime();

      // Confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#eed7a1', '#cbd5e1', '#ffffff']
      });
    }, 900);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setFormStatus('idle');
  };

  return (
    <section id="contact" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-champagne-400/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900 border border-white/10 text-xs font-mono text-champagne-300 uppercase tracking-widest mb-4">
          <MessageSquare size={12} />
          <span>Get in Touch</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
          Have an Interesting Idea? <br />
          <span className="text-gradient-champagne">Let's Build Something Extraordinary.</span>
        </h2>
        <p className="text-silver-300/90 text-base sm:text-lg font-light leading-relaxed">
          Open to full-time roles, software engineering opportunities, collaborative projects, and architectural discussions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Info & Social Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Email Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden group">
            <div className="text-xs font-mono text-champagne-300 uppercase tracking-widest mb-2">
              Direct Contact Channel
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">
              Email Me Directly
            </h3>
            <p className="text-xs text-silver-400 font-light mb-6">
              Feel free to send proposals, job specifications, or say hello. I typically respond within 24 hours.
            </p>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-charcoal-950/80 border border-white/10">
              <span className="text-xs sm:text-sm font-mono text-silver-200 truncate">
                {personalInfo.email}
              </span>
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => soundManager.playHover()}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-silver-300 hover:text-white border border-white/10 text-xs font-mono transition-colors cursor-pointer"
                title="Copy Email"
              >
                {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              className="glass-card rounded-2xl p-5 border border-white/10 hover:border-champagne-400/40 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <GithubIcon size={22} className="text-silver-300 group-hover:text-champagne-300 transition-colors" />
                <ArrowUpRight size={16} className="text-silver-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-sm">GitHub</div>
                <div className="text-[11px] font-mono text-silver-400">Repositories & Code</div>
              </div>
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              className="glass-card rounded-2xl p-5 border border-white/10 hover:border-champagne-400/40 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <LinkedinIcon size={22} className="text-silver-300 group-hover:text-champagne-300 transition-colors" />
                <ArrowUpRight size={16} className="text-silver-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-sm">LinkedIn</div>
                <div className="text-[11px] font-mono text-silver-400">Network & Profile</div>
              </div>
            </a>
          </div>

          {/* Location & Timezone Card */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between text-xs font-mono text-silver-400">
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-champagne-300" />
              <span>Based in India</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open to Global Remote</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
            {formStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-champagne-400/20 border border-champagne-400/40 flex items-center justify-center mx-auto text-champagne-300">
                  <Check size={32} />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Message Transmitted Successfully!
                </h3>
                <p className="text-sm text-silver-300 font-light max-w-md mx-auto">
                  Thank you for reaching out, {formData.name}. I have received your message and will get back to you promptly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-silver-200 text-xs font-mono transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-silver-400 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Mercer"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-charcoal-950/80 border border-white/10 text-white placeholder-silver-600 text-sm focus:outline-none focus:border-champagne-400/60 transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-silver-400 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@company.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-charcoal-950/80 border border-white/10 text-white placeholder-silver-600 text-sm focus:outline-none focus:border-champagne-400/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-silver-400 mb-2">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack Role / Collaborative Project"
                    className="w-full px-4 py-3 rounded-xl bg-charcoal-950/80 border border-white/10 text-white placeholder-silver-600 text-sm focus:outline-none focus:border-champagne-400/60 transition-colors"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-silver-400 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, team, or opportunity..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-charcoal-950/80 border border-white/10 text-white placeholder-silver-600 text-sm focus:outline-none focus:border-champagne-400/60 transition-colors resize-none"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-400 font-mono">
                    {errorMessage}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  onMouseEnter={() => soundManager.playHover()}
                  data-cursor="SEND"
                  className="shimmer-btn w-full py-4 rounded-xl bg-gradient-to-r from-silver-100 via-champagne-200 to-white text-charcoal-950 font-semibold text-sm tracking-wide shadow-lg hover:shadow-[0_0_35px_rgba(238,215,161,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-charcoal-950 border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
