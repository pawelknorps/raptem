import React, { useEffect, useRef, useState } from 'react';
import './AccordionGame.css';

type TuningType = 'STANDARD' | 'KUJAWY' | 'BROKEN';
type Register = 'MASTER' | 'VIOLIN' | 'BASSON' | 'MUSETTE';

const KEYS_MAP = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'];
const BASE_FREQS = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

interface Voice {
  oscillators: { node: OscillatorNode; gain: GainNode }[];
  mainGain: GainNode;
  noiseNode?: AudioBufferSourceNode;
}

const AccordionGame: React.FC = () => {
  const [tuning, setTuning] = useState<TuningType>('STANDARD');
  const [register, setRegister] = useState<Register>('MASTER');
  const [condition, setCondition] = useState(0.9);
  const [bellows, setBellows] = useState(0.6);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const voicesRef = useRef<Map<string, Voice>>(new Map());
  const masterGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
      audioCtxRef.current = new AudioContextClass();
      
      filterRef.current = audioCtxRef.current.createBiquadFilter();
      filterRef.current.type = 'lowpass';
      
      masterGainRef.current = audioCtxRef.current.createGain();
      
      filterRef.current.connect(masterGainRef.current);
      masterGainRef.current.connect(audioCtxRef.current.destination);
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Update filter and gain based on bellows
  useEffect(() => {
    if (filterRef.current && masterGainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      const freq = 500 + (bellows * 4000);
      filterRef.current.frequency.setTargetAtTime(freq, ctx.currentTime, 0.05);
      masterGainRef.current.gain.setTargetAtTime(bellows * 0.4, ctx.currentTime, 0.05);
    }
  }, [bellows]);

  const getFreq = (index: number) => {
    let freq = BASE_FREQS[index];
    if (tuning === 'KUJAWY') {
      // Just Intonation or specific folk shift
      const ratios = [1/1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2/1];
      freq = BASE_FREQS[0] * ratios[index];
    } else if (tuning === 'BROKEN') {
      freq += (Math.random() - 0.5) * (1 - condition) * 40;
    }
    return freq;
  };

  const playClick = (ctx: AudioContext, gainNode: AudioNode) => {
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'sine';
    clickOsc.frequency.setValueAtTime(50, ctx.currentTime);
    clickOsc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.02);
    clickGain.gain.setValueAtTime(0.05, ctx.currentTime);
    clickGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.02);
    clickOsc.connect(clickGain);
    clickGain.connect(gainNode);
    clickOsc.start();
    clickOsc.stop(ctx.currentTime + 0.02);
  };

  const startNote = (key: string, index: number) => {
    initAudio();
    if (!audioCtxRef.current || !filterRef.current || voicesRef.current.has(key)) return;

    const ctx = audioCtxRef.current;
    const freq = getFreq(index);
    const voiceGain = ctx.createGain();
    voiceGain.connect(filterRef.current);
    
    playClick(ctx, voiceGain);

    const oscs: { node: OscillatorNode; gain: GainNode }[] = [];

    const addReed = (f: number, type: OscillatorType, gainVal: number, detune = 0) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      osc.detune.setValueAtTime(detune, ctx.currentTime);
      g.gain.setValueAtTime(gainVal, ctx.currentTime);
      osc.connect(g);
      g.connect(voiceGain);
      osc.start();
      oscs.push({ node: osc, gain: g });
    };

    // Registers logic
    if (register === 'MASTER' || register === 'BASSON') {
      addReed(freq / 2, 'sawtooth', 0.2); // L
    }
    if (register === 'MASTER' || register === 'VIOLIN' || register === 'MUSETTE') {
      addReed(freq, 'square', 0.3); // M
    }
    if (register === 'MASTER' || register === 'MUSETTE' || register === 'VIOLIN') {
      const tremolo = (1 - condition) * 15 + 4;
      addReed(freq, 'square', 0.2, tremolo); // M+ (Tremolo)
    }
    if (register === 'MASTER') {
      addReed(freq * 2, 'sawtooth', 0.1); // H
    }

    voiceGain.gain.setValueAtTime(0, ctx.currentTime);
    voiceGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.03);

    voicesRef.current.set(key, { oscillators: oscs, mainGain: voiceGain });
    setActiveKeys(prev => new Set(prev).add(key));
  };

  const stopNote = (key: string) => {
    const voice = voicesRef.current.get(key);
    if (voice && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      voice.mainGain.gain.cancelScheduledValues(ctx.currentTime);
      voice.mainGain.gain.setTargetAtTime(0, ctx.currentTime, 0.03);
      
      setTimeout(() => {
        voice.oscillators.forEach(o => {
          o.node.stop();
          o.node.disconnect();
        });
        voice.mainGain.disconnect();
        voicesRef.current.delete(key);
      }, 100);
    }
    setActiveKeys(prev => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const index = KEYS_MAP.indexOf(key);
      if (index !== -1 && !e.repeat) startNote(key, index);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (KEYS_MAP.includes(key)) stopNote(key);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [tuning, register, condition, bellows]);

  return (
    <div className="accordion-game-container win95-inset">
      <div className="accordion-header">
        <span>AKORDEON MIRKA v1.2 (PRO)</span>
        <div className="win95-close-btn">×</div>
      </div>
      
      <div className="register-bank">
        {(['MASTER', 'VIOLIN', 'BASSON', 'MUSETTE'] as Register[]).map(r => (
          <button 
            key={r} 
            className={`register-btn ${register === r ? 'active' : ''}`}
            onClick={() => setRegister(r)}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="bellows-area">
        <div className="bellows-animation" style={{ transform: `scaleX(${0.4 + bellows * 0.6})` }}>
          {[...Array(12)].map((_, i) => (
            <div key={i} className="fold"></div>
          ))}
        </div>
        <div className="bellows-control">
          <label>CIŚNIENIE MIECHA</label>
          <input 
            type="range" min="0.1" max="1" step="0.01" 
            value={bellows} onChange={(e) => setBellows(parseFloat(e.target.value))} 
          />
        </div>
      </div>

      <div className="accordion-main">
        <div className="settings-panel">
          <div className="setting">
            <label>STRÓJ</label>
            <select value={tuning} onChange={e => setTuning(e.target.value as TuningType)}>
              <option value="STANDARD">12-TET (Wesele)</option>
              <option value="KUJAWY">Just Intonation (Folk)</option>
              <option value="BROKEN">Bazar (Zepsuty)</option>
            </select>
          </div>
          <div className="setting">
            <label>STAN</label>
            <input 
              type="range" min="0" max="1" step="0.1" 
              value={condition} onChange={e => setCondition(parseFloat(e.target.value))} 
            />
          </div>
        </div>

        <div className="keys-bank">
          {KEYS_MAP.map((k, i) => (
            <button 
              key={k} 
              className={`key ${activeKeys.has(k) ? 'pressed' : ''}`}
              onMouseDown={() => startNote(k, i)}
              onMouseUp={() => stopNote(k)}
              onMouseLeave={() => stopNote(k)}
            >
              <span className="key-cap"></span>
              <span className="key-label">{k}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="accordion-footer-bar">
        <div className="lcd-display">
          {register} | {tuning} | {Math.round(bellows * 100)}% PSI
        </div>
      </div>
    </div>
  );
};

export default AccordionGame;
