import React, { useEffect, useState } from 'react';

const BazarScreensaver: React.FC = () => {
  const [active, setActive] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const reset = () => {
      setTimer(0);
      setActive(false);
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
  }, []);

  useEffect(() => {
    if (timer > 30) setActive(true);
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
      overflow: 'hidden'
    }}>
      <div style={{
        animation: 'bounce-screensaver 10s linear infinite',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <img src="assets/low_poly_polonez.png" style={{ width: '200px' }} alt="Flying Polonez" />
        <h1 style={{ color: '#0f0', fontFamily: 'monospace', fontSize: '3rem', marginTop: '20px' }}>RAPTEM OS</h1>
      </div>
      <style>{`
        @keyframes bounce-screensaver {
          0%, 100% { transform: translate(-30vw, -30vh); }
          25% { transform: translate(30vw, -10vh); }
          50% { transform: translate(-10vw, 30vh); }
          75% { transform: translate(30vw, 30vh); }
        }
      `}</style>
      <div style={{ position: 'absolute', bottom: '20px', right: '20px', color: '#333', fontSize: '10px' }}>
        Porusz myszką aby powrócić do wixy...
      </div>
    </div>
  );
};

export default BazarScreensaver;
