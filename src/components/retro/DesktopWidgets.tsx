import React, { useState, useEffect } from 'react';
import engine from '../../scripts/ChaosEngine';

const DesktopWidgets: React.FC = () => {
  const [chaosLevel, setChaosLevel] = useState(0);
  const [temp, setTemp] = useState(22);
  const [cpu, setCpu] = useState(12);

  useEffect(() => {
    engine.subscribe((level) => setChaosLevel(level));
    
    const interval = setInterval(() => {
      setTemp(prev => prev + (Math.random() > 0.5 ? 0.1 : -0.1));
      setCpu(Math.floor(Math.random() * 20) + Math.floor(chaosLevel * 80));
    }, 2000);

    return () => clearInterval(interval);
  }, [chaosLevel]);

  return (
    <div className="desktop-widgets" style={{
      position: 'absolute',
      top: '50px',
      right: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      pointerEvents: 'none',
      zIndex: 5
    }}>
      {/* Weather Widget */}
      <div className="win95-inset" style={{ background: '#c0c0c0', padding: '10px', width: '150px', color: '#000' }}>
        <div style={{ fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid #888', marginBottom: '5px' }}>POGODA: MURZYNNO</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>{chaosLevel > 0.6 ? '⛈️' : '☀️'}</span>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{temp.toFixed(1)}°C</div>
            <div style={{ fontSize: '9px' }}>{chaosLevel > 0.6 ? 'SPEKTAKL ATMOSFERYCZNA' : 'SŁONECZNIE'}</div>
          </div>
        </div>
      </div>

      {/* System Resources */}
      <div className="win95-inset" style={{ background: '#c0c0c0', padding: '10px', width: '150px', color: '#000' }}>
        <div style={{ fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid #888', marginBottom: '5px' }}>ZASOBY SYSTEMU</div>
        <div style={{ fontSize: '9px', marginBottom: '3px' }}>CPU LOAD: {cpu}%</div>
        <div style={{ width: '100%', height: '8px', background: '#000', border: '1px solid #fff', position: 'relative' }}>
          <div style={{ width: `${cpu}%`, height: '100%', background: cpu > 80 ? '#f00' : '#0f0' }} />
        </div>
        <div style={{ fontSize: '9px', marginTop: '5px', marginBottom: '3px' }}>CHAOS LEVEL: {(chaosLevel * 100).toFixed(0)}%</div>
        <div style={{ width: '100%', height: '8px', background: '#000', border: '1px solid #fff', position: 'relative' }}>
          <div style={{ width: `${chaosLevel * 100}%`, height: '100%', background: '#00f' }} />
        </div>
      </div>

      {/* Retro Clock / Calendar */}
      <div className="win95-inset" style={{ background: '#c0c0c0', padding: '10px', width: '150px', color: '#000', textAlign: 'center' }}>
        <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{new Date().toLocaleDateString('pl-PL')}</div>
        <div style={{ fontSize: '10px' }}>ROK BAZARU: 1997</div>
      </div>

      {/* Advertising Banner */}
      <div className="blink" style={{ 
        background: 'yellow', 
        border: '2px solid red', 
        padding: '5px', 
        fontSize: '10px', 
        fontWeight: 'bold', 
        color: 'red', 
        textAlign: 'center',
        transform: 'rotate(-5deg)'
      }}>
        !!! WYPRZEDAŻ KASETA !!!<br/>
        TYLKO TERAZ: 10.000 ZŁ
      </div>
    </div>
  );
};

export default DesktopWidgets;
