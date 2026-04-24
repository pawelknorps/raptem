import React, { useState, useEffect, useRef } from 'react';
import { globalStage } from '../../scripts/StageEngine';

const BazarSoundRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [position, setPosition] = useState(0);
  const [visualData, setVisualData] = useState<number[]>([]);
  const duration = 60; // 60 seconds limit

  useEffect(() => {
    let frame: number;
    const update = () => {
      const data = globalStage.getByteFrequencyData();
      // Simplify data for the waveform display
      const simplified = Array.from(data.slice(0, 50)).map(v => (v / 255) * 40);
      setVisualData(simplified);
      
      if (isRecording) {
        setPosition(prev => Math.min(duration, prev + 0.1));
      }
      
      frame = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frame);
  }, [isRecording]);

  return (
    <div className="sound-recorder" style={{
      width: '280px',
      background: '#c0c0c0',
      border: '2px outset #fff',
      padding: '5px',
      fontFamily: 'var(--font-primary)',
      color: '#000'
    }}>
      <div style={{ padding: '5px', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>
        Dźwięk - Rejestrator
      </div>

      {/* Waveform Display */}
      <div style={{
        background: '#000',
        height: '60px',
        border: '2px inset #fff',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginBottom: '10px'
      }}>
        {/* Center Line */}
        <div style={{ position: 'absolute', width: '100%', height: '1px', background: '#004400' }} />
        
        {/* Waveform */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1px', width: '100%', height: '100%', padding: '0 5px' }}>
          {visualData.map((v, i) => (
            <div key={i} style={{
              flexGrow: 1,
              background: '#0f0',
              height: `${Math.max(2, v)}px`,
              transition: 'height 0.05s'
            }} />
          ))}
        </div>
      </div>

      {/* Position Slider */}
      <div style={{ marginBottom: '15px', position: 'relative', height: '20px' }}>
        <div style={{ position: 'absolute', top: '9px', width: '100%', height: '2px', background: '#808080', borderBottom: '1px solid #fff' }} />
        <div style={{
          position: 'absolute',
          left: `${(position / duration) * 100}%`,
          width: '12px',
          height: '18px',
          background: '#c0c0c0',
          border: '2px outset #fff',
          transform: 'translateX(-50%)'
        }} />
      </div>

      {/* Info Display */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '10px' }}>
        <span>Pozycja:<br/>{position.toFixed(2)} s.</span>
        <span style={{ textAlign: 'right' }}>Długość:<br/>{duration.toFixed(2)} s.</span>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', borderTop: '1px solid #888', paddingTop: '10px' }}>
        <button className="win95-button" style={{ width: '40px' }} onClick={() => setPosition(0)}>⏪</button>
        <button className="win95-button" style={{ width: '40px' }} onClick={() => setPosition(duration)}>⏩</button>
        <button className="win95-button" style={{ width: '40px' }}>▶️</button>
        <button className="win95-button" style={{ width: '40px' }} onClick={() => setIsRecording(false)}>⏹️</button>
        <button className="win95-button" style={{ width: '40px', color: isRecording ? 'red' : 'black' }} onClick={() => setIsRecording(true)}>⏺️</button>
      </div>
    </div>
  );
};

export default BazarSoundRecorder;
