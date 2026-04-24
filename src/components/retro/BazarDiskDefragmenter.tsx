import React, { useState, useEffect } from 'react';
import chaosEngine from '../../scripts/ChaosEngine';

const BazarDiskDefragmenter: React.FC = () => {
  const [blocks, setBlocks] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isDefragging, setIsDefragging] = useState(false);

  const colors = ['#fff', '#000080', '#ff0', '#808080', '#f00']; // White, Blue (Data), Yellow (System), Grey (Empty), Red (Fragmented)

  useEffect(() => {
    // Initialize random fragmented disk
    const initialBlocks = Array.from({ length: 144 }).map(() => 
      colors[Math.floor(Math.random() * colors.length)]
    );
    setBlocks(initialBlocks);
  }, []);

  const startDefrag = () => {
    if (isDefragging) return;
    setIsDefragging(true);
    setProgress(0);
  };

  useEffect(() => {
    if (!isDefragging) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDefragging(false);
          // Interconnect: Reduce chaos on completion
          chaosEngine.addChaos(-30);
          return 100;
        }
        
        // Visual "sorting" effect
        setBlocks(current => {
          const next = [...current];
          const idx1 = Math.floor(Math.random() * next.length);
          const idx2 = Math.floor(Math.random() * next.length);
          // Move red (fragmented) to blue/white (sorted)
          if (next[idx1] === '#f00') next[idx1] = '#000080';
          return next;
        });

        return prev + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isDefragging]);

  return (
    <div style={{ background: '#c0c0c0', padding: '10px', color: '#000', fontFamily: 'var(--font-win95)' }}>
      <div style={{ border: '2px inset #fff', background: '#000', padding: '5px', marginBottom: '10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2px' }}>
          {blocks.map((color, i) => (
            <div key={i} style={{ width: '15px', height: '15px', background: color, border: '1px solid #444' }} />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <div style={{ fontSize: '11px', marginBottom: '2px' }}>Postęp: {progress}%</div>
        <div style={{ height: '20px', border: '2px inset #fff', background: '#808080', position: 'relative' }}>
          <div style={{ height: '100%', background: '#000080', width: `${progress}%` }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '9px' }}>
          <span style={{ color: '#000080' }}>■</span> Dane <span style={{ color: '#f00' }}>■</span> Fragmentacja
        </div>
        <button className="win95-button" style={{ padding: '2px 20px' }} onClick={startDefrag} disabled={isDefragging}>
          {isDefragging ? 'Defragmentacja...' : 'START'}
        </button>
      </div>
    </div>
  );
};

export default BazarDiskDefragmenter;
