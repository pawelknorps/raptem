import React, { useState, useEffect } from 'react';
import { getLoreSnippet } from '../../lib/LoreEngine';

const SystemWarnings: React.FC = () => {
  const [warnings, setWarnings] = useState<{ id: number, text: string }[]>([]);

  useEffect(() => {
    const handleChaos = (e: any) => {
      const { level } = e.detail;
      
      // Traditional high chaos warning
      if (level > 0.9 && Math.random() < 0.1) {
        const id = Date.now();
        setWarnings(prev => [...prev, { id, text: "UWAŻAJ! SYSTEM SIĘ PRZEGRZEWA!" }]);
        setTimeout(() => setWarnings(prev => prev.filter(w => w.id !== id)), 3000);
      }

      // Lore glitch warning
      if (Math.random() < 0.02) {
        const id = Date.now();
        setWarnings(prev => [...prev, { id, text: `PRZEKAZ: ${getLoreSnippet()}` }]);
        setTimeout(() => setWarnings(prev => prev.filter(w => w.id !== id)), 4000);
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
          background: w.text.startsWith('PRZEKAZ') ? '#000' : 'yellow',
          color: w.text.startsWith('PRZEKAZ') ? '#0f0' : 'red',
          border: w.text.startsWith('PRZEKAZ') ? '3px double #0f0' : '3px double red',
          padding: '10px 20px',
          fontWeight: 'bold',
          fontSize: '14px',
          animation: 'blink 0.5s step-end infinite',
          boxShadow: w.text.startsWith('PRZEKAZ') ? '0 0 20px rgba(0,255,0,0.5)' : '0 0 20px rgba(255,0,0,0.5)'
        }}>
          {w.text}
        </div>
      ))}
    </div>
  );
};

export default SystemWarnings;
