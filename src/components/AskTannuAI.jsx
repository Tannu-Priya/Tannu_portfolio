import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  ArrowUpRight, 
  User, 
  MessageSquare,
  RefreshCw,
  Cpu
} from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function AskTannuAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am Tannu Priya's AI Assistant. I can answer questions about her engineering background, 350+ DSA problem solutions, production projects (Medishare, Aurelle, RealTimeBid, Disaster Relief Allocator), or help you start a project with her. What would you like to know?",
      suggestions: [
        "Who is Tannu Priya?",
        "What technologies does she work with?",
        "Tell me about Medishare",
        "Can she build an e-commerce website?",
        "How can I hire her?"
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Text to Speech
  const speakText = (text) => {
    if (!voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      // Remove markdown asterisks and URLs for spoken audio
      const cleanText = text.replace(/[*_#`\[\]]/g, '').replace(/https?:\/\/\S+/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Audio play safe fallback
    }
  };

  // Speech to Text (Web Speech API)
  const handleToggleMic = () => {
    soundManager.playClick();
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by this browser. You can still type your questions!');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
        handleSendMessage(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    soundManager.playClick();

    // Append user message
    const updatedMessages = [...messages, { sender: 'user', text: query }];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      if (!res.ok) throw new Error('Network error');

      const data = await res.json();
      setIsTyping(false);

      const aiMsg = {
        sender: 'ai',
        text: data.reply,
        suggestions: data.suggestedQuestions || []
      };

      setMessages((prev) => [...prev, aiMsg]);
      speakText(data.reply);
    } catch {
      setIsTyping(false);
      // Offline / Direct RAG fallback
      const fallbackReply = `Tannu Priya is a Full Stack Developer & React.js Developer with a B.Tech in CSE and 350+ DSA problems solved. You can reach out directly at tannupriya4537@gmail.com to discuss projects.`;
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: fallbackReply,
          suggestions: ["Who is Tannu Priya?", "What technologies does she work with?"]
        }
      ]);
      speakText(fallbackReply);
    }
  };

  return (
    <>
      {/* Floating AI Orb Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => {
            soundManager.playClick();
            setIsOpen(!isOpen);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group p-3.5 sm:p-4 rounded-2xl bg-obsidian-900 border border-champagne-400/40 text-white shadow-[0_0_30px_rgba(238,215,161,0.25)] hover:shadow-[0_0_40px_rgba(238,215,161,0.4)] flex items-center gap-3 cursor-pointer transition-all"
          aria-label="Open AI Assistant"
        >
          {/* Animated AI Core Orb */}
          <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-champagne-400 to-white flex items-center justify-center overflow-hidden shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-obsidian-950 animate-ping" />
            <div className="absolute inset-0 bg-champagne-300/30 animate-spin-slow" />
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="font-display text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
              <span>Ask Tannu AI</span>
              <Sparkles size={11} className="text-champagne-300" />
            </span>
            <span className="text-[10px] font-mono text-emerald-400">
              ● Online • Grounded
            </span>
          </div>
        </motion.button>
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 w-[94vw] sm:w-[420px] max-h-[80vh] flex flex-col rounded-3xl bg-obsidian-950/95 border border-white/15 backdrop-blur-2xl shadow-2xl overflow-hidden text-silver-200"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-obsidian-900/90 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-champagne-400 to-white flex items-center justify-center shadow-lg">
                  <Bot size={16} className="text-obsidian-950" />
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                    <span>Ask Tannu AI</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-champagne-400/10 text-champagne-300 border border-champagne-400/20">
                      RAG Verified
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-silver-400">
                    Grounded in Tannu's verified portfolio
                  </div>
                </div>
              </div>

              {/* Controls: Voice Toggle & Close */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                    voiceEnabled
                      ? 'bg-champagne-400/20 border-champagne-400/40 text-champagne-300'
                      : 'bg-obsidian-800 border-white/10 text-silver-400 hover:text-white'
                  }`}
                  title={voiceEnabled ? 'Mute AI voice output' : 'Enable AI voice output'}
                >
                  {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-750 text-silver-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Audio Waveform Animation when listening */}
            {isListening && (
              <div className="px-4 py-2 bg-champagne-400/10 border-b border-champagne-400/20 flex items-center justify-between text-xs font-mono text-champagne-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-champagne-300 animate-ping" />
                  Listening to your question...
                </span>
                <div className="flex items-center gap-1">
                  <span className="w-1 h-3 bg-champagne-300 animate-pulse" />
                  <span className="w-1 h-5 bg-champagne-300 animate-pulse delay-75" />
                  <span className="w-1 h-2 bg-champagne-300 animate-pulse delay-150" />
                </div>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 max-h-[420px] custom-scrollbar text-xs sm:text-sm">
              {messages.map((msg, index) => (
                <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed font-light ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-silver-200 to-champagne-200 text-obsidian-950 font-medium rounded-br-xs'
                        : 'bg-obsidian-900 border border-white/10 text-silver-200 rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {msg.suggestions.map((suggestion, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSendMessage(suggestion)}
                          className="px-2.5 py-1 rounded-lg bg-obsidian-900 hover:bg-obsidian-850 border border-white/10 hover:border-champagne-400/30 text-[11px] font-mono text-silver-400 hover:text-champagne-300 transition-colors cursor-pointer text-left"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-obsidian-900 border border-white/10 w-20">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-300 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-300 animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-300 animate-bounce delay-200" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-obsidian-900/90 border-t border-white/10 flex items-center gap-2"
            >
              <button
                type="button"
                onClick={handleToggleMic}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isListening
                    ? 'bg-red-500 text-white border-red-400 animate-pulse'
                    : 'bg-obsidian-800 text-silver-400 hover:text-white border-white/10'
                }`}
                title="Speak question via microphone"
              >
                {isListening ? <MicOff size={15} /> : <Mic size={15} />}
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about Tannu, skills, projects, or hiring..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-silver-500 text-xs focus:outline-none focus:border-champagne-400/60 transition-colors"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 rounded-xl bg-champagne-300 hover:bg-champagne-200 text-obsidian-950 font-bold transition-all disabled:opacity-40 cursor-pointer"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
