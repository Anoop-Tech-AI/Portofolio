/**
 * BYTE Audio & Cartoon Sound Effects Engine
 *
 * Features:
 * 1. Web Speech API Cartoon Duck Voice with consistent pitch, rate, and timbre.
 * 2. Web Audio API synthesized cartoon sound effects (zero external audio file dependencies):
 *    - Footsteps (tap/clicks for 10-frame walk cycle)
 *    - Wave sound (playful twinkle chime)
 *    - Laptop open & typing (mechanical keyboard clacks)
 *    - Jump anticipation (cartoon pitch-slide)
 *    - Dive whoosh (high-energy resonant wind sweep)
 *    - Impact burst (cinematic amber/cyan energy impact)
 */

class ByteAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.selectedVoice = null;
    this.hasUserInteracted = false;
    this.activeUtterance = null;
  }

  // Ensure AudioContext is initialized upon first user interaction
  getAudioContext() {
    if (typeof window === "undefined") return null;
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  unlockAudio() {
    this.hasUserInteracted = true;
    this.getAudioContext();
    // Warm up speech synthesis
    if ("speechSynthesis" in window) {
      this.initVoice();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (muted && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // Find and lock the best consistent cartoon voice
  initVoice() {
    if (!("speechSynthesis" in window)) return null;

    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Prefer high-clarity natural English voices that modulate well into cartoon pitch
    const preferredNames = [
      "Google US English",
      "Microsoft Zira",
      "Samantha",
      "Victoria",
      "Karen",
      "Natural",
      "English",
    ];

    let chosen = null;
    for (const name of preferredNames) {
      chosen = voices.find(
        (v) => v.lang.startsWith("en") && v.name.includes(name),
      );
      if (chosen) break;
    }

    if (!chosen) {
      chosen = voices.find((v) => v.lang.startsWith("en")) || voices[0];
    }

    this.selectedVoice = chosen;
    return chosen;
  }

  // Spoken cartoon dialogue with speech-beak synchronization callbacks
  speak(text, onStart, onEnd) {
    if (this.isMuted || !("speechSynthesis" in window)) {
      if (onStart) onStart();
      // If muted or speech not available, simulate duration based on text length
      const durationMs = Math.max(1600, text.length * 55);
      const timer = setTimeout(() => {
        if (onEnd) onEnd();
      }, durationMs);
      return () => clearTimeout(timer);
    }

    window.speechSynthesis.cancel();

    if (!this.selectedVoice) {
      this.initVoice();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    // High, cute cartoon character pitch & lively pace
    utterance.pitch = 1.45;
    utterance.rate = 1.15;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      this.activeUtterance = utterance;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.activeUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.activeUtterance = null;
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
      if (onEnd) onEnd();
    };
  }

  cancelSpeech() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  // ─── CARTOON SOUND EFFECTS (SYNTHESIZED VIA WEB AUDIO API) ───

  // 1. Cartoon Footstep tap
  playFootstep() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const baseFreq = 220 + Math.random() * 40;
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {}
  }

  // 2. Playful Twinkle Wave Chime
  playWaveSound() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + i * 0.07;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, start);

        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.22);
      });
    } catch {}
  }

  // 3. Laptop Power-on chime & typing clicks
  playLaptopOpen() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {}
  }

  playTyping() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      for (let i = 0; i < 4; i++) {
        const t = ctx.currentTime + i * 0.06;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(1200 + Math.random() * 400, t);
        gain.gain.setValueAtTime(0.03, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.03);
      }
    } catch {}
  }

  // 4. Cartoon Jump Anticipation: pitch slide up
  playJumpAnticipation() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.32);
    } catch {}
  }

  // 5. Dive Whoosh Sound
  playDiveWhoosh() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      // Noise buffer for realistic air whoosh
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(300, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(
        1800,
        ctx.currentTime + 0.25,
      );
      filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.5);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.5);
    } catch {}
  }

  // 6. Impact Energy Burst Sound
  playImpactBurst() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      // Sub-bass thump
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);

      // Shimmering chord
      [587.33, 739.99, 880.0, 1174.66].forEach((f, idx) => {
        const cOsc = ctx.createOscillator();
        const cGain = ctx.createGain();
        cOsc.type = "triangle";
        cOsc.frequency.setValueAtTime(f, ctx.currentTime);
        cGain.gain.setValueAtTime(0.08, ctx.currentTime);
        cGain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + 0.6 + idx * 0.1,
        );
        cOsc.connect(cGain);
        cGain.connect(ctx.destination);
        cOsc.start();
        cOsc.stop(ctx.currentTime + 0.7);
      });
    } catch {}
  }
}

export const byteAudio = new ByteAudioEngine();
