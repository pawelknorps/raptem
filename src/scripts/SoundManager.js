class SoundManager {
  constructor() {
    this.enabled = false;
  }

  toggleSound(enabled) {
    this.enabled = enabled;
  }

  // Helper to create a single accordion reed
  createReed(ctx, freq, type, gainVal, duration, detune = 0, startTime = 0) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
    osc.detune.setValueAtTime(detune, ctx.currentTime + startTime);
    
    gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
    gain.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + duration);
  }

  play(soundName) {
    if (!this.enabled) return;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    if (soundName === 'click') {
      // Short reed chirp
      this.createReed(ctx, 600, 'sawtooth', 0.1, 0.1);
      this.createReed(ctx, 605, 'square', 0.05, 0.1, 15);
    } else if (soundName === 'error') {
      // Low broken reed groan
      this.createReed(ctx, 120, 'sawtooth', 0.2, 0.4);
      this.createReed(ctx, 122, 'square', 0.1, 0.4, 40);
    } else if (soundName === 'startup') {
      // Grand accordion chord (A Major)
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((f, i) => {
        this.createReed(ctx, f, 'sawtooth', 0.1, 1.5, 0, i * 0.1);
        this.createReed(ctx, f + 2, 'square', 0.05, 1.5, 10, i * 0.1);
      });
    } else if (soundName === 'hover') {
      // Very soft reed swell
      this.createReed(ctx, 800, 'sine', 0.02, 0.05);
    }
  }
}

export default new SoundManager();
