import React, { useState, useEffect } from 'react';

const SystemWarnings: React.FC = () => {
  const [warnings, setWarnings] = useState<{ id: number, text: string }[]>([]);

  useEffect(() => {
    const handleChaos = (e: any) => {
      const { level } = e.detail;
      if (level > 0.9 && Math.random() < 0.1) {
        const id = Date.now();
        setWarnings(prev => [...prev, { id, text: "UWAŻAJ! SYSTEM SIĘ PRZEGRZEWA!" }]);
        setTimeout(() => setWarnings(prev => prev.filter(w => w.id !== id)), 3000);
      }
    };

    window.addEventListener('chaos-update', handleChaos);
    return () => window.removeEventListener('chaos-update', handleChaos);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '50px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 200000,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      pointerEvents: 'none'
    }}>
      {warnings.map(w => (
        <div key={w.id} style={{
          background: 'yellow',
          color: 'red',
          border: '3px double red',
          padding: '10px 20px',
          fontWeight: 'bold',
          fontSize: '14px',
          animation: 'blink 0.5s step-end infinite',
          boxShadow: '0 0 20px rgba(255,0,0,0.5)'
        }}>
          {w.text}
        </div>
      ))}
    </div>
  );
};

export default SystemWarnings;
