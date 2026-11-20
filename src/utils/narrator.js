// AI Portfolio Voice Narrator Service

export const NARRATION_STAGES = [
  {
    id: 1,
    title: "GREETING",
    label: "STAGE 01 // INTRODUCTION",
    text: "Hey there! Welcome to my digital space. I'm Tannu Priya, a software developer passionate about turning ideas into meaningful digital experiences.",
    targetSection: "#hero"
  },
  {
    id: 2,
    title: "PORTFOLIO ARCHITECTURE",
    label: "STAGE 02 // PORTFOLIO EXPLANATION",
    text: "Here, you'll discover my development journey, the technologies I work with, and some of the projects I've engineered. From intelligent medicine-sharing platforms to interactive web experiences, every project represents a problem I've explored and a solution I've built.",
    targetSection: "#projects"
  },
  {
    id: 3,
    title: "COLLABORATION INVITATION",
    label: "STAGE 03 // INTERACTIVE INVITATION",
    text: "Feel free to explore my work, interact with my AI assistant, or discover how we can build something extraordinary together. Let's get started!",
    targetSection: "#client-conversion"
  }
];

class PortfolioNarrator {
  constructor() {
    this.currentStageIndex = 0;
    this.status = 'idle'; // 'idle' | 'playing' | 'paused' | 'stopped'
    this.listeners = new Set();
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.progressInterval = null;
    this.stageProgress = 0;
    this.selectedVoice = null;
  }

  init() {
    if (this.synth) {
      this.loadVoice();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoice();
      }
    }
  }

  loadVoice() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize natural warm female voices
    this.selectedVoice = voices.find(v => 
      /Google UK English Female|Google US English|Microsoft Jenny|Microsoft Zira|Samantha|Victoria|Karen/i.test(v.name)
    ) || voices.find(v => /female/i.test(v.name)) || voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // Initial emit
    listener({
      status: this.status,
      currentStageIndex: this.currentStageIndex,
      currentStage: NARRATION_STAGES[this.currentStageIndex],
      stageProgress: this.stageProgress
    });
    return () => this.listeners.delete(listener);
  }

  notify() {
    const state = {
      status: this.status,
      currentStageIndex: this.currentStageIndex,
      currentStage: NARRATION_STAGES[this.currentStageIndex],
      stageProgress: this.stageProgress
    };
    this.listeners.forEach(fn => fn(state));
  }

  start(fromStageIndex = 0) {
    if (!this.synth) {
      this.status = 'idle';
      this.notify();
      return;
    }

    this.synth.cancel();
    clearInterval(this.progressInterval);

    this.currentStageIndex = fromStageIndex;
    this.status = 'playing';
    this.stageProgress = 0;
    this.notify();

    this.speakCurrentStage();
  }

  speakCurrentStage() {
    if (!this.synth || this.currentStageIndex >= NARRATION_STAGES.length) {
      this.stop();
      return;
    }

    this.loadVoice();
    const stage = NARRATION_STAGES[this.currentStageIndex];
    this.currentUtterance = new SpeechSynthesisUtterance(stage.text);
    
    if (this.selectedVoice) {
      this.currentUtterance.voice = this.selectedVoice;
    }
    this.currentUtterance.rate = 0.98; // Natural conversational pace
    this.currentUtterance.pitch = 1.05; // Warm natural pitch

    // Track simulated progress based on word count
    const words = stage.text.split(' ').length;
    const estimatedDurationMs = (words / 2.5) * 1000;
    const startTime = Date.now();

    clearInterval(this.progressInterval);
    this.progressInterval = setInterval(() => {
      if (this.status === 'playing') {
        const elapsed = Date.now() - startTime;
        this.stageProgress = Math.min(100, Math.round((elapsed / estimatedDurationMs) * 100));
        this.notify();
      }
    }, 100);

    this.currentUtterance.onend = () => {
      clearInterval(this.progressInterval);
      this.stageProgress = 100;
      this.notify();

      if (this.currentStageIndex + 1 < NARRATION_STAGES.length) {
        // Natural 800ms pause between narration sections
        setTimeout(() => {
          if (this.status === 'playing') {
            this.currentStageIndex++;
            this.stageProgress = 0;
            this.notify();
            this.speakCurrentStage();
          }
        }, 850);
      } else {
        this.status = 'stopped';
        this.notify();
      }
    };

    this.currentUtterance.onerror = () => {
      clearInterval(this.progressInterval);
      this.stop();
    };

    this.synth.speak(this.currentUtterance);
  }

  pause() {
    if (this.synth && this.status === 'playing') {
      this.synth.pause();
      this.status = 'paused';
      this.notify();
    }
  }

  resume() {
    if (this.synth && this.status === 'paused') {
      this.synth.resume();
      this.status = 'playing';
      this.notify();
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    clearInterval(this.progressInterval);
    this.status = 'stopped';
    this.stageProgress = 0;
    this.notify();
  }

  replay() {
    this.start(0);
  }

  toggle() {
    if (this.status === 'playing') {
      this.pause();
    } else if (this.status === 'paused') {
      this.resume();
    } else {
      this.start(0);
    }
  }
}

export const portfolioNarrator = new PortfolioNarrator();
if (typeof window !== 'undefined') {
  portfolioNarrator.init();
}
