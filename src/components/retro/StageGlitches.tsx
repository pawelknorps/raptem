import React, { useEffect, useState } from 'react';

const GLITCHES = [
  { type: 'text', content: '>>> RITUAL ACTIVE <<<' },
  { type: 'text', content: '>>> TEATR PRĘDKOŚCI <<<' },
  { type: 'text', content: '>>> PROTOKÓŁ: LUDOWY <<<' },
  { type: 'text', content: '>>> BAZAR_CORE.SYS <<<' },
  { type: 'text', content: '>>> ODCZYT BAZARU: 100% <<<' },
  { type: 'text', content: '>>> TRANSMUTACJA W TOKU <<<' },
  { type: 'image', content: 'assets/spirytus.webp' },
  { type: 'image', content: 'assets/pks_stop.webp' }
];

const StageGlitches: React.FC = () => {
  const [isRitualActive, setIsRitualActive] = useState(false);
  const [glitch, setGlitch] = useState<any>(null);

  useEffect(() => {
    const handleStart = () => setIsRitualActive(true);
    const handleStop = () => setIsRitualActive(false);

    window.addEventListener('ritual-start', handleStart);
    window.addEventListener('ritual-stop', handleStop);

    return () => {
      window.removeEventListener('ritual-start', handleStart);
      window.removeEventListener('ritual-stop', handleStop);
    };
  }, []);

  useEffect(() => {
    if (!isRitualActive) {
      setGlitch(null);
      return;
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitch(GLITCHES[Math.floor(Math.random() * GLITCHES.length)]);
        setTimeout(() => setGlitch(null), 150);
      }
    }, 400); // Frequent updates during ritual

    return () => clearInterval(interval);
  }, [isRitualActive]);

  if (!isRitualActive) return null;

  return (
    <div className="ritual-glitch-overlay" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99998 }}>
      {/* Background Strobe during Ritual */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 255, 0, 0.05)', animation: 'ritual-strobe 0.2s infinite' }}></div>
      
      {glitch && (
        <div style={{
          position: 'absolute',
          top: `${Math.random() * 80}%`,
          left: `${Math.random() * 80}%`,
          padding: '10px',
          background: '#000',
          color: '#0f0',
          border: '2px solid #0f0',
          fontFamily: 'monospace',
          fontSize: '24px',
          zIndex: 99999,
          transform: `rotate(${Math.random() * 20 - 10}deg) scale(${1 + Math.random()})`
        }}>
          {glitch.type === 'text' ? glitch.content : <img src={glitch.content} style={{ width: '100px' }} />}
        </div>
      )}

      <style>{`
        @keyframes ritual-strobe {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default StageGlitches;
