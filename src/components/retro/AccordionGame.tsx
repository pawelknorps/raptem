import React, { useEffect, useRef, useState } from 'react';
import './AccordionGame.css';
import { usePlayerStore } from '../../lib/playerStore';

type TuningType = 'STANDARD' | 'KUJAWY' | 'BROKEN';
type Register = 'MASTER' | 'VIOLIN' | 'BASSON' | 'MUSETTE';

const KEYS_MAP = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'];
const BASE_FREQS = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

interface Voice {
  oscillators: { node: OscillatorNode; gain: GainNode }[];
  mainGain: GainNode;
}

const AccordionGame: React.FC = () => {
  const [tuning, setTuning] = useState<TuningType>('BROKEN'); // Default to Broken!
  const [register, setRegister] = useState<Register>('MUSETTE'); // Default to Musette for that tremolo
  const [condition, setCondition] = useState(0.4); // Default to low condition
  const [bellows, setBellows] = useState(0.6);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [songStep, setSongStep] = useState<number | null>(null);
  const [songSuccess, setSongSuccess] = useState(false);
  const [notesPlayed, setNotesPlayed] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const voicesRef = useRef<Map<string, Voice>>(new Map());
  const masterGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const distortionRef = useRef<WaveShaperNode | null>(null);
  const airNoiseRef = useRef<AudioBufferSourceNode | null>(null);
  const airGainRef = useRef<GainNode | null>(null);

  const makeDistortionCurve = (amount: number) => {
    const k = amount;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  };

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
      audioCtxRef.current = new AudioContextClass();
      
      const ctx = audioCtxRef.current;
      
      filterRef.current = ctx.createBiquadFilter();
      filterRef.current.type = 'lowpass';
      
      distortionRef.current = ctx.createWaveShaper();
      distortionRef.current.curve = makeDistortionCurve(100);
      
      masterGainRef.current = ctx.createGain();
      
      // Air Noise Node (Constant hiss)
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      airNoiseRef.current = ctx.createBufferSource();
      airNoiseRef.current.buffer = noiseBuffer;
      airNoiseRef.current.loop = true;
      airGainRef.current = ctx.createGain();
      airGainRef.current.gain.value = 0.01;
      
      const airFilter = ctx.createBiquadFilter();
      airFilter.type = 'lowpass';
      airFilter.frequency.value = 1000;
      
      airNoiseRef.current.connect(airFilter);
      airFilter.connect(airGainRef.current);
      airGainRef.current.connect(masterGainRef.current);
      airNoiseRef.current.start();

      filterRef.current.connect(distortionRef.current);
      distortionRef.current.connect(masterGainRef.current);
      masterGainRef.current.connect(ctx.destination);
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  useEffect(() => {
    if (filterRef.current && masterGainRef.current && airGainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      const freq = 400 + (bellows * 3500) * condition;
      filterRef.current.frequency.setTargetAtTime(freq, ctx.currentTime, 0.1);
      masterGainRef.current.gain.setTargetAtTime(bellows * 0.4, ctx.currentTime, 0.1);
      
      // Air leak volume follows bellows
      const airVol = (1 - condition) * 0.05 + (bellows * 0.02);
      airGainRef.current.gain.setTargetAtTime(airVol, ctx.currentTime, 0.1);
    }

    // Canvas Visualizer Loop
    if (canvasRef.current && masterGainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext('2d');
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      masterGainRef.current.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        if (!canvasCtx) return;
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        canvasCtx.fillStyle = '#040';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] / 4;
          canvasCtx.fillStyle = `rgb(0, ${barHeight * 4}, 0)`;
          canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      };
      draw();
    }
  }, [bellows, condition]);

  const SONG_SEQUENCE = ['A', 'S', 'D', 'A', 'S'];

  const getFreq = (index: number) => {
    let freq = BASE_FREQS[index];
    if (tuning === 'KUJAWY') {
      const ratios = [1/1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2/1];
      freq = BASE_FREQS[0] * ratios[index];
    } else if (tuning === 'BROKEN') {
      // Unstable bazar frequency
      const drift = Math.sin(Date.now() * 0.001 + index) * (1 - condition) * 10;
      freq += drift + (Math.random() - 0.5) * (1 - condition) * 20;
    }
    return freq;
  };

  const startNote = (key: string, index: number) => {
    initAudio();
    if (!audioCtxRef.current || !filterRef.current || voicesRef.current.has(key)) return;

    // RPG Integration: Reward for playing notes
    const { addXP, updateStat } = usePlayerStore.getState();
    addXP(2);
    updateStat('folkPurity', 0.1);
    
    setNotesPlayed(prev => {
       const next = prev + 1;
       if (next === 5) {
          window.dispatchEvent(new CustomEvent('quest-complete', { detail: 'accordion' }));
          addXP(100); // Bonus for first few notes
       }
       return next;
    });

    // Tutorial Logic
    if (songStep !== null) {
       if (key === SONG_SEQUENCE[songStep]) {
          if (songStep === SONG_SEQUENCE.length - 1) {
             setSongSuccess(true);
             setSongStep(null);
             window.dispatchEvent(new CustomEvent('mirek-command', { detail: { command: 'unlock-gold' } }));
          } else {
             setSongStep(songStep + 1);
          }
       } else {
          setSongStep(0); // Reset on error
       }
    }

    if (Math.random() > 0.95) {
       window.dispatchEvent(new CustomEvent('mirek-command', { detail: { command: 'glitch-visual' } }));
    }

    const ctx = audioCtxRef.current;
    const freq = getFreq(index);
    const voiceGain = ctx.createGain();
    voiceGain.connect(filterRef.current);
    
    // Mechanical key thump
    const thump = ctx.createOscillator();
    const thumpGain = ctx.createGain();
    thump.type = 'sine';
    thump.frequency.setValueAtTime(60, ctx.currentTime);
    thump.frequency.exponentialRampToValueAtTime(1, ctx.currentTime + 0.1);
    thumpGain.gain.setValueAtTime(0.1, ctx.currentTime);
    thumpGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
    thump.connect(thumpGain);
    thumpGain.connect(voiceGain);
    thump.start();
    thump.stop(ctx.currentTime + 0.1);

    const oscs: { node: OscillatorNode; gain: GainNode }[] = [];

    const addReed = (f: number, type: OscillatorType, gainVal: number, detune = 0) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      
      // Pitch Flutter (LFO)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 4 + Math.random() * 2;
      lfoGain.gain.value = (1 - condition) * 15;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.detune);
      lfo.start();

      osc.detune.setValueAtTime(detune, ctx.currentTime);
      g.gain.setValueAtTime(gainVal, ctx.currentTime);
      osc.connect(g);
      g.connect(voiceGain);
      osc.start();
      oscs.push({ node: osc, gain: g });
    };

    if (register === 'MASTER' || register === 'BASSON') {
      addReed(freq / 2, 'sawtooth', 0.2); 
    }
    if (register === 'MASTER' || register === 'VIOLIN' || register === 'MUSETTE') {
      addReed(freq, 'square', 0.3); 
    }
    if (register === 'MASTER' || register === 'MUSETTE' || register === 'VIOLIN') {
      const brokenTremolo = (1 - condition) * 40 + 10;
      addReed(freq, 'square', 0.2, brokenTremolo); 
    }
    if (register === 'MASTER') {
      addReed(freq * 2, 'sawtooth', 0.1); 
    }

    voiceGain.gain.setValueAtTime(0, ctx.currentTime);
    voiceGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.05);

    voicesRef.current.set(key, { oscillators: oscs, mainGain: voiceGain });
    setActiveKeys(prev => new Set(prev).add(key));
  };

  const stopNote = (key: string) => {
    const voice = voicesRef.current.get(key);
    if (voice && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      voice.mainGain.gain.cancelScheduledValues(ctx.currentTime);
      voice.mainGain.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
      
      setTimeout(() => {
        voice.oscillators.forEach(o => {
          o.node.stop();
          o.node.disconnect();
        });
        voice.mainGain.disconnect();
        voicesRef.current.delete(key);
      }, 150);
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
    <div className={`accordion-game-container win95-inset ${condition < 0.5 ? 'high-chaos-vibrate' : ''}`}>
      <div className="accordion-header">
        <span>AKORDEON MIRKA v1.3 (BAZAR-MASTER)</span>
        <button className="win95-button" style={{ fontSize: '9px', padding: '1px 5px' }} onClick={() => setSongStep(0)}>NAUKA GRY</button>
        <div className="win95-close-btn">×</div>
      </div>
      
      {songStep !== null && (
        <div style={{ background: '#ff0', color: '#000', padding: '2px 10px', fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }}>
          NASTĘPNA NUTA: {SONG_SEQUENCE[songStep]} {songSuccess ? '!!! SUKCES !!!' : ''}
        </div>
      )}
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
        <div 
          className="bellows-animation" 
          style={{ 
            transform: `scaleX(${0.4 + bellows * 0.6})`,
            filter: `hue-rotate(${(1 - condition) * 90}deg)`
          }}
        >
          {[...Array(12)].map((_, i) => (
            <div key={i} className="fold" style={{ opacity: 0.5 + Math.random() * (1 - condition) }}></div>
          ))}
        </div>
        <div className="bellows-control">
          <label>NAPRĘŻENIE MIECHA (AIR LEAK ACTIVE)</label>
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
              <option value="BROKEN">BAZAR (Zepsuty)</option>
              <option value="KUJAWY">Folk (Rozstrojony)</option>
              <option value="STANDARD">Standard (Nudny)</option>
            </select>
          </div>
          <div className="setting">
            <label>STAN (CONDITION)</label>
            <input 
              type="range" min="0" max="1" step="0.01" 
              value={condition} onChange={e => setCondition(parseFloat(e.target.value))} 
            />
            <div style={{ fontSize: '8px', color: condition < 0.3 ? 'red' : 'green', marginTop: '4px' }}>
              {condition < 0.3 ? '!!! TRUP !!!' : condition < 0.6 ? 'ŚREDNI' : 'IGŁA'}
            </div>
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
              <span className="key-cap" style={{ background: condition < 0.4 ? '#844' : '' }}></span>
              <span className="key-label">{k}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="accordion-footer-bar" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <canvas ref={canvasRef} width="100" height="20" style={{ border: '1px solid #0f0', background: '#000' }}></canvas>
        <div className="lcd-display blink" style={{ flexGrow: 1 }}>
          [ {register} ] | [ {tuning} ] | ERROR_CODE: {Math.floor((1 - condition) * 999)}
        </div>
      </div>
    </div>
  );
};

export default AccordionGame;
