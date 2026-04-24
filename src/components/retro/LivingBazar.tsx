import React, { useState, useEffect } from 'react';
import engine from '../../scripts/ChaosEngine';

const LivingBazar: React.FC = () => {
  const [popups, setPopups] = useState<number[]>([]);
  const [isRaining, setIsRaining] = useState(false);
  const [chaosLevel, setChaosLevel] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    engine.subscribe((level) => {
      setChaosLevel(level);
    });

    const onFlash = () => {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 200);
    };

    window.addEventListener('chaos-flash', onFlash);

    // Randomly trigger ambient effects
    const interval = setInterval(() => {
      const rand = Math.random();
      
      // Spawn popups more frequently with chaos
      if (rand < (0.02 + chaosLevel * 0.1)) {
        setPopups(prev => [...prev, Date.now()]);
      }

      // Trigger "Vapor Rain"
      if (rand > (0.95 - chaosLevel * 0.1)) {
        setIsRaining(true);
        setTimeout(() => setIsRaining(false), 5000);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('chaos-flash', onFlash);
    };
  }, [chaosLevel]);

  return (
    <>
      {/* Pixel/Vapor Rain Effect */}
      {isRaining && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9998,
          background: `repeating-linear-gradient(transparent, transparent 10px, hsla(${(chaosLevel * 360)}, 100%, 50%, 0.1) 10px, hsla(${(chaosLevel * 360)}, 100%, 50%, 0.1) 20px)`,
          animation: 'rain 0.5s linear infinite'
        }} />
      )}

      {/* Global Flash Effect */}
      {isFlashing && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          opacity: 0.3,
          zIndex: 100000,
          pointerEvents: 'none'
        }} />
      )}

      {/* Ambient Popups */}
      {popups.map(id => {
        const isGlitch = chaosLevel > 0.6 && Math.random() > 0.5;
        return (
          <div 
            key={id}
            className={`ambient-popup ${isGlitch ? 'glitch-popup' : ''}`}
            style={{
              position: 'fixed',
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              zIndex: 10001,
              background: isGlitch ? '#f0f' : '#c0c0c0',
              border: '2px outset #fff',
              padding: '5px',
              fontSize: '10px',
              animation: 'popup-float 3s ease-in-out forwards',
              color: isGlitch ? '#fff' : '#000'
            }}
          >
            <div style={{ background: isGlitch ? '#0ff' : 'blue', color: 'white', padding: '2px' }}>
              {isGlitch ? 'SYSTEM ERROR' : 'INFO'}
            </div>
            <p style={{ padding: '5px' }}>
              {isGlitch ? 'BAZAR OVERFLOW: C0000005' : 'OKAZJA! SPIRYTUS 50% TANIEJ!'}
            </p>
            <button className="win95-button" onClick={() => setPopups(prev => prev.filter(p => p !== id))}>
              {isGlitch ? 'FIX ME' : 'OK'}
            </button>
          </div>
        );
      })}

      <style>{`
        @keyframes rain {
          from { background-position: 0 0; }
          to { background-position: 0 100%; }
        }
        @keyframes popup-float {
          0% { transform: scale(0) rotate(-5deg); opacity: 0; }
          20% { transform: scale(1) rotate(0deg); opacity: 1; }
          80% { transform: scale(1) rotate(0deg); opacity: 1; }
          100% { transform: scale(0.8) rotate(5deg); opacity: 0; }
        }
        .glitch-popup {
          animation: popup-float 3s ease-in-out forwards, jitter 0.1s infinite !important;
        }
      `}</style>
    </>
  );
};

export default LivingBazar;
