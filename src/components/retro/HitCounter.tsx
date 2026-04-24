import React, { useState, useEffect } from 'react';

interface HitCounterProps {
  initialCount?: number;
}

const HitCounter: React.FC<HitCounterProps> = ({ initialCount = 1337 }) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    // Simulate a hit on load
    const timer = setTimeout(() => {
      setCount(prev => (prev || 0) + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const digits = (count || 0).toString().padStart(6, '0').split('');

  return (
    <div style={{ 
      display: 'inline-flex', 
      background: '#000', 
      padding: '2px', 
      border: '2px inset #808080' 
    }}>
      {digits.map((digit, i) => (
        <div key={i} style={{
          width: '20px',
          height: '30px',
          background: '#111',
          color: '#0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          fontSize: '24px',
          fontWeight: 'bold',
          border: '1px solid #333',
          margin: '0 1px',
          textShadow: '0 0 5px #0f0'
        }}>
          {digit}
        </div>
      ))}
    </div>
  );
};

export default HitCounter;
