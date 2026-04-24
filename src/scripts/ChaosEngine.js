class ChaosEngine {
  constructor() {
    this.level = 0;
    this.interactionCount = 0;
    this.subscribers = [];
    this.decayRate = 0.005;
    
    this.init();
  }

  init() {
    this.buffer = "";
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', (e) => {
        this.buffer = (this.buffer + e.key.toUpperCase()).slice(-10);
        if (this.buffer.includes("SPEKTAKL") || this.buffer.includes("SPIRYTUS")) {
          this.level = 1.0;
          this.buffer = "";
          this.notify();
          this.triggerFlash();
        }
      });
    }

    setInterval(() => {
      const oldLevel = this.level;
      this.level = Math.max(0, this.level - this.decayRate);
      if (oldLevel !== this.level) {
        this.notify();
      }
      
      // Dispatch global event for non-react components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('chaos-update', { 
          detail: { level: this.level, count: this.interactionCount } 
        }));
      }
    }, 100);
  }

  recordInteraction() {
    this.interactionCount++;
    this.level = Math.min(1, this.level + 0.05);
    this.notify();
    
    if (this.level > 0.8 && Math.random() < 0.1) {
       this.triggerFlash();
    }
  }

  triggerFlash() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('chaos-flash'));
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    callback(this.level, this.interactionCount);
  }

  notify() {
    this.subscribers.forEach(cb => cb(this.level, this.interactionCount));
  }
}

const engine = new ChaosEngine();
export default engine;
