class ByteVoiceController {
  constructor() {
    this.synth = typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;
    this.isMuted = typeof window !== "undefined" ? localStorage.getItem("mini_byte_muted") === "true" : false;
    this.currentUtterance = null;
    this.voice = null;
    this.onMouthPulse = null;
    this.onSpeechEnd = null;
    this.mouthInterval = null;

    if (this.synth) {
      this.initVoice();
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => this.initVoice();
      }
    }
  }

  initVoice() {
    if (!this.synth) return;
    try {
      const voices = this.synth.getVoices();
      if (!voices || voices.length === 0) return;

      // Prefer a cheerful, natural English voice
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Samantha") ||
            v.name.includes("Natural") ||
            v.name.includes("Google US English") ||
            v.name.includes("Zira") ||
            v.name.includes("Jenny") ||
            v.name.includes("David"))
      );
      this.voice = preferred || voices.find((v) => v.lang.startsWith("en")) || voices[0];
    } catch {
      this.voice = null;
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    try {
      localStorage.setItem("mini_byte_muted", muted ? "true" : "false");
    } catch {
      // Storage access disabled in some sandboxes
    }
    if (muted && this.synth) {
      this.stop();
    }
  }

  getMuted() {
    return this.isMuted;
  }

  stop() {
    if (this.mouthInterval) {
      clearInterval(this.mouthInterval);
      this.mouthInterval = null;
    }
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // Safe catch
      }
    }
    this.currentUtterance = null;
    if (this.onMouthPulse) this.onMouthPulse(0);
  }

  speak(text, { onStart, onMouthPulse, onEnd } = {}) {
    this.stop();
    this.onMouthPulse = onMouthPulse;
    this.onSpeechEnd = onEnd;

    // Calculate approximate duration based on word count (avg 180 words/min = 3 words/sec)
    const words = text.split(/\s+/).length;
    const estimatedDurationMs = Math.max(1600, Math.min(8000, (words / 3.2) * 1000));

    // Mouth animation driver (syllable flap pattern)
    const startMouthRhythm = (duration) => {
      let elapsed = 0;
      const interval = 120; // 120ms mouth cycle
      if (this.mouthInterval) clearInterval(this.mouthInterval);

      this.mouthInterval = setInterval(() => {
        elapsed += interval;
        if (elapsed >= duration) {
          clearInterval(this.mouthInterval);
          this.mouthInterval = null;
          if (this.onMouthPulse) this.onMouthPulse(0);
          if (this.onSpeechEnd) this.onSpeechEnd();
        } else {
          // Semi-randomized natural mouth opening amplitude [0.3 to 1.0]
          const cycle = Math.sin((elapsed / interval) * Math.PI);
          const amplitude = Math.abs(cycle) > 0.15 ? Math.min(1, Math.abs(cycle) * (0.6 + Math.random() * 0.4)) : 0;
          if (this.onMouthPulse) this.onMouthPulse(amplitude);
        }
      }, interval);
    };

    if (this.isMuted || !this.synth) {
      // Muted or speech not supported: visual simulation only
      if (onStart) onStart();
      startMouthRhythm(estimatedDurationMs);
      return;
    }

    try {
      const cleanText = text.replace(/[*_~`]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      if (this.voice) utterance.voice = this.voice;
      utterance.rate = 1.15; // Slightly faster cartoon pace
      utterance.pitch = 1.45; // Playful, slightly higher cartoon pitch
      utterance.volume = 0.9;

      utterance.onstart = () => {
        if (onStart) onStart();
        startMouthRhythm(estimatedDurationMs);
      };

      utterance.onboundary = () => {
        // Word boundary: quick beak accent
        if (this.onMouthPulse) this.onMouthPulse(0.9);
      };

      utterance.onend = () => {
        if (this.mouthInterval) {
          clearInterval(this.mouthInterval);
          this.mouthInterval = null;
        }
        if (this.onMouthPulse) this.onMouthPulse(0);
        if (this.onSpeechEnd) this.onSpeechEnd();
      };

      utterance.onerror = () => {
        // Fallback to visual timer
        startMouthRhythm(estimatedDurationMs);
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch {
      // In case speech is blocked
      if (onStart) onStart();
      startMouthRhythm(estimatedDurationMs);
    }
  }
}

export const byteVoice = new ByteVoiceController();
