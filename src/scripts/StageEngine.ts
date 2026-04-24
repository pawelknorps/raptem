export class StageEngine {
  private audioContext: AudioContext | null = null;
  private analyzer: AnalyserNode | null = null;
  private stageActive: boolean = false;

  public async init() {
    if (this.audioContext) return;
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.analyzer = this.audioContext.createAnalyser();
    this.analyzer.fftSize = 256;
  }

  public getContext() {
    return this.audioContext;
  }

  public getAnalyzer() {
    return this.analyzer;
  }

  public async toggleStage() {
    await this.init();
    this.stageActive = !this.stageActive;
    
    if (this.stageActive) {
      window.dispatchEvent(new CustomEvent('ritual-start'));
    } else {
      window.dispatchEvent(new CustomEvent('ritual-stop'));
    }
    
    return this.stageActive;
  }

  public getByteFrequencyData() {
    if (!this.analyzer) return new Uint8Array(0);
    const data = new Uint8Array(this.analyzer.frequencyBinCount);
    this.analyzer.getByteFrequencyData(data);
    return data;
  }
}

export const globalStage = new StageEngine();
