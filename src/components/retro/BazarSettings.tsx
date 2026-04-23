import React, { useEffect, useState } from 'react';
import chaosEngine from '../../scripts/ChaosEngine';

const BazarSettings: React.FC = () => {
  const [chaos, setChaos] = useState(0);
  const [interactions, setInteractions] = useState(0);

  useEffect(() => {
    const sub = (level: number, count: number) => {
      setChaos(level);
      setInteractions(count);
    };
    chaosEngine.subscribe(sub);
  }, []);

  return (
    <div style={{ padding: '15px', background: '#c0c0c0', color: '#000' }}>
      <fieldset style={{ border: '2px inset #fff', padding: '10px', marginBottom: '15px' }}>
        <legend style={{ fontSize: '11px', fontWeight: 'bold' }}>PARAMETRY BAZARU</legend>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <label style={{ fontSize: '10px' }}>POZIOM WIXY:</label>
            <div style={{ height: '20px', background: '#000', border: '1px inset #fff', position: 'relative' }}>
               <div style={{ 
                 height: '100%', 
                 background: 'linear-gradient(90deg, #f0f, #0ff)', 
                 width: `${chaos * 100}%`,
                 transition: 'width 0.3s ease'
               }} />
            </div>
          </div>
          <div style={{ fontSize: '10px' }}>
            TOTAL INTERAKCJI: <span style={{ fontWeight: 'bold' }}>{interactions}</span>
          </div>
          <div style={{ fontSize: '10px' }}>
            ZAKŁÓCENIA POLONEZA: <span style={{ color: chaos > 0.7 ? 'red' : 'green' }}>
              {chaos > 0.7 ? 'KRYTYCZNE' : 'STABILNE'}
            </span>
          </div>
        </div>
      </fieldset>

      <fieldset style={{ border: '2px inset #fff', padding: '10px', marginBottom: '15px' }}>
        <legend style={{ fontSize: '11px', fontWeight: 'bold' }}>TAPETY BAZAROWE</legend>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
          <button className="win95-button" style={{ fontSize: '9px' }} onClick={() => document.documentElement.style.setProperty('--main-bg', 'url("assets/kujawy_pattern.webp")')}>Tradycja</button>
          <button className="win95-button" style={{ fontSize: '9px' }} onClick={() => document.documentElement.style.setProperty('--main-bg', 'none')}>Czysty Teal</button>
          <button className="win95-button" style={{ fontSize: '9px' }} onClick={() => document.documentElement.style.setProperty('--main-bg', 'url("assets/low_poly_polonez.webp")')}>Polonez</button>
          <button className="win95-button" style={{ fontSize: '9px' }} onClick={() => document.documentElement.style.setProperty('--main-bg', 'url("assets/spirytus.webp")')}>Spirytus</button>
        </div>
      </fieldset>

      <fieldset style={{ border: '2px inset #fff', padding: '10px' }}>
        <legend style={{ fontSize: '11px', fontWeight: 'bold' }}>ZASOBY SYSTEMOWE</legend>
        <p style={{ fontSize: '10px' }}>PAMIĘĆ SPIRYTUSOWA: 128 MB / 512 MB</p>
        <p style={{ fontSize: '10px' }}>CPU: INTEL KUJAWIAK v2.0</p>
      </fieldset>
    </div>
  );
};

export default BazarSettings;
