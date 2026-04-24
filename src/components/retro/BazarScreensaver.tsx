import React, { useEffect, useState } from 'react';
import KujawiakShapes from './KujawiakShapes';

const BazarScreensaver: React.FC = () => {
  const [active, setActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [mode, setMode] = useState<'polonez' | 'shapes' | 'pipes'>('polonez');

  useEffect(() => {
    const reset = () => {
      setTimer(0);
      if (active) setActive(false);
    };

    const interval = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);

    window.addEventListener('mousemove', reset);
    window.addEventListener('keydown', reset);
    window.addEventListener('mousedown', reset);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', reset);
      window.removeEventListener('keydown', reset);
      window.removeEventListener('mousedown', reset);
    };
  }, [active]);

  useEffect(() => {
    if (timer > 120) { // Set to 2 minutes for testing/production
      const modes: ('polonez' | 'shapes' | 'pipes')[] = ['polonez', 'shapes', 'pipes'];
      setMode(modes[Math.floor(Math.random() * modes.length)]);
      setActive(true);
    }
  }, [timer]);

  if (!active) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#000',
      zIndex: 300000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      cursor: 'none'
    }}>
      {mode === 'polonez' && (
        <div style={{
          animation: 'bounce-screensaver 12s linear infinite',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <img src="assets/low_poly_polonez.webp" style={{ width: '250px', filter: 'hue-rotate(90deg) drop-shadow(0 0 20px cyan)' }} alt="Flying Polonez" />
          <h1 style={{ color: 'cyan', fontFamily: 'monospace', fontSize: '3rem', marginTop: '20px', textShadow: '0 0 10px cyan' }}>RAPTEM OS</h1>
        </div>
      )}

      {mode === 'shapes' && (
        <>
          <KujawiakShapes count={30} speed={2} />
          <div style={{ zIndex: 1, color: '#ff00ff', fontSize: '5rem', fontWeight: 'bold', fontFamily: 'serif', opacity: 0.3 }}>
            KUJAWIAK CORE
          </div>
        </>
      )}

      {mode === 'pipes' && (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
           {/* Simple Pipes Simulation */}
           {Array.from({ length: 5 }).map((_, i) => (
             <div key={i} style={{
               position: 'absolute',
               width: '40px',
               height: '100%',
               background: `linear-gradient(90deg, #555, #eee, #555)`,
               left: `${20 * i + 10}%`,
               animation: 'pipe-move 5s linear infinite',
               animationDelay: `${i * 0.5}s`,
               opacity: 0.4
             }} />
           ))}
        </div>
      )}

      <style>{`
        @keyframes bounce-screensaver {
          0% { transform: translate(-35vw, -35vh); }
          25% { transform: translate(35vw, -15vh); }
          50% { transform: translate(-15vw, 35vh); }
          75% { transform: translate(35vw, 35vh); }
          100% { transform: translate(-35vw, -35vh); }
        }
        @keyframes pipe-move {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
      
      <div style={{ position: 'absolute', bottom: '20px', right: '20px', color: '#444', fontSize: '10px' }}>
        Porusz myszką aby powrócić do wixy...
      </div>
    </div>
  );
};

export default BazarScreensaver;
