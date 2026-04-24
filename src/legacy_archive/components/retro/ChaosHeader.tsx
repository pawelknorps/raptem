import React, { useEffect, useState } from 'react';
import chaosEngine from '../../scripts/ChaosEngine';

const ChaosHeader: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sub = (l: number, c: number) => {
      setLevel(l);
      setCount(c);
    };
    chaosEngine.subscribe(sub);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '18px',
      background: '#000',
      color: '#0f0',
      fontSize: '9px',
      fontFamily: 'monospace',
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px',
      zIndex: 100001,
      borderBottom: '1px solid #333'
    }}>
      <div style={{ display: 'flex', gap: '15px', flexGrow: 1 }}>
        <span>SYS_STATUS: {level > 0.8 ? '!! OVERLOAD !!' : 'STABLE'}</span>
        <span>CPU_USAGE: {(level * 100).toFixed(1)}%</span>
        <span>SPEKTAKL_COUNT: {count}</span>
        <span style={{ marginLeft: 'auto' }}>KERNEL_V: KUJAWIAK-2026.04</span>
      </div>
      <div style={{ width: '50px', height: '10px', background: '#222', marginLeft: '10px', position: 'relative' }}>
         <div style={{ 
           height: '100%', 
           background: level > 0.8 ? '#f00' : '#0f0', 
           width: `${level * 100}%`,
           boxShadow: level > 0.8 ? '0 0 5px #f00' : 'none'
         }} />
      </div>
    </div>
  );
};

export default ChaosHeader;
