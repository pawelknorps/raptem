import React, { useState, useEffect } from 'react';
import { globalStage } from '../../../scripts/StageEngine';
import { usePlayerStore } from '../../../lib/playerStore';

const tracks = [
  "RAPTEM - KUJAWIAK SPEKTAKL.MP3",
  "RAPTEM - SPIRYTUS DANCE.MP3",
  "RAPTEM - MURZYNNO DRIFT.MP3",
  "RAPTEM - BAZAR WAVE ANTHEM.MP3",
  "RAPTEM - TEATR GOSPODA LIVE.MP3"
];

const WinAmp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [time, setTime] = useState("00:00");
  const [visualData, setVisualData] = useState<number[]>([]);

  const trackName = tracks[trackIndex];

  useEffect(() => {
    let frame: number;
    const update = () => {
      if (isPlaying) {
        const data = globalStage.getByteFrequencyData();
        const simplified = Array.from(data.slice(0, 25)).map(v => (v / 255) * 100);
        setVisualData(simplified);
      }
      frame = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frame);
  }, [isPlaying]);

  const handlePlayToggle = async () => {
    const active = await globalStage.toggleStage();
    setIsPlaying(!!active);
    if (active) {
      window.dispatchEvent(new CustomEvent('quest-complete', { detail: 'music' }));
      const { addXP, updateStat } = usePlayerStore.getState();
      addXP(50);
      updateStat('wixaMana', 20); // Initial boost
    }
  };

  useEffect(() => {
    let manaInterval: number;
    if (isPlaying) {
      manaInterval = setInterval(() => {
        usePlayerStore.getState().updateStat('wixaMana', 0.5);
      }, 1000) as unknown as number;
    }
    return () => clearInterval(manaInterval);
  }, [isPlaying]);

  return (
    <div className="winamp-container" style={{
      width: '275px',
      background: '#222',
      border: '2px solid #555',
      padding: '5px',
      color: '#0f0',
      fontFamily: 'monospace',
      fontSize: '10px',
      boxShadow: '4px 4px 0 #000'
    }}>
      {/* Title Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #000080, #1084d0)',
        height: '14px',
        padding: '0 4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '4px'
      }}>
        <span>WINAMP</span>
        <div style={{ display: 'flex', gap: '2px' }}>
          <div style={{ width: '8px', height: '8px', border: '1px solid #fff' }}></div>
          <div style={{ width: '8px', height: '8px', border: '1px solid #fff' }}></div>
        </div>
      </div>

      {/* Main Panel */}
      <div style={{ background: '#000', padding: '10px', border: '1px solid #444' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <div style={{ width: '60px', height: '60px', border: '1px solid #0f0', position: 'relative', overflow: 'hidden' }}>
            <img src="assets/1000001788.webp" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.5) brightness(0.8)' }} alt="Album Art" />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,255,0,0.1), transparent)' }}></div>
          </div>
          <div style={{ flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '20px', color: '#0f0', textShadow: '0 0 5px #0f0' }}>{time}</span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '8px' }}>
                <span>kbps: 128</span>
                <span>khz: 44.1</span>
              </div>
            </div>
            <div style={{ 
              background: '#111', 
              border: '1px inset #333', 
              height: '15px', 
              overflow: 'hidden'
            }}>
              <marquee scrollamount="2">{trackName}</marquee>
            </div>
          </div>
        </div>
        
        {/* EQ / Visualizer Simulation */}
        <div style={{ display: 'flex', gap: '2px', height: '30px', alignItems: 'flex-end', marginBottom: '10px' }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} style={{
              flexGrow: 1,
              background: isPlaying ? `hsl(${120 + (visualData[i] || 0)}, 100%, 50%)` : '#050',
              height: isPlaying ? `${Math.max(5, visualData[i] || 0)}%` : '2px',
              transition: 'height 0.05s, background 0.05s'
            }}></div>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            <button className="win95-button" style={{ padding: '2px 5px', fontSize: '8px' }} onClick={() => setTrackIndex(prev => (prev - 1 + tracks.length) % tracks.length)}>PREV</button>
            <button className="win95-button" style={{ padding: '2px 5px', fontSize: '8px' }} onClick={handlePlayToggle}>
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
            <button className="win95-button" style={{ padding: '2px 5px', fontSize: '8px' }} onClick={() => setIsPlaying(false)}>STOP</button>
            <button className="win95-button" style={{ padding: '2px 5px', fontSize: '8px' }} onClick={() => setTrackIndex(prev => (prev + 1) % tracks.length)}>NEXT</button>
          </div>
          <button className="win95-button" style={{ padding: '2px 5px', fontSize: '8px' }}>EJ</button>
        </div>
      </div>
    </div>
  );
};

export default WinAmp;
