export class StageEngine {
  private ctx: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private analyzer: AnalyserNode | null = null;
  private isPlaying: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.analyzer = this.ctx.createAnalyser();
    }
  }

  public async toggleStage() {
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  private start() {
    if (!this.ctx || !this.analyzer) return;

    this.oscillator = this.ctx.createOscillator();
    this.gainNode = this.ctx.createGain();

    this.oscillator.type = 'sawtooth';
    this.oscillator.frequency.setValueAtTime(55, this.ctx.currentTime);

    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.1);

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.analyzer);
    this.analyzer.connect(this.ctx.destination);

    this.oscillator.start();
    this.isPlaying = true;
  }

  private stop() {
    if (this.oscillator && this.gainNode && this.ctx) {
      this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);
      setTimeout(() => {
        this.oscillator?.stop();
        this.isPlaying = false;
      }, 100);
    }
  }

  public setPitch(detune: number) {
    if (this.oscillator) {
      this.oscillator.detune.setValueAtTime(detune, this.ctx?.currentTime || 0);
    }
  }

  public getByteFrequencyData(): Uint8Array {
    if (!this.analyzer) return new Uint8Array(0);
    const data = new Uint8Array(this.analyzer.frequencyBinCount);
    this.analyzer.getByteFrequencyData(data);
    return data;
  }
}

export const globalStage = new StageEngine();
