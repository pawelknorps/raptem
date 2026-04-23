import React, { useState } from 'react';

const AssetVault: React.FC = () => {
  const [unzipping, setUnzipping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [unzipped, setUnzipped] = useState(false);

  const startUnzip = () => {
    setUnzipping(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setUnzipping(false);
        setUnzipped(true);
      }
    }, 100);
  };

  const assets = [
    { name: 'mirek_final.jpg', src: '/assets/1000001791.jpg' },
    { name: 'remiza_interior.png', src: '/assets/TeatrGospoda_jan26.jpg' },
    { name: 'polonez_drift.gif', src: '/assets/low_poly_polonez.png' }
  ];

  return (
    <div style={{ background: '#c0c0c0', padding: '15px', border: '2px inset #fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
        <span style={{ fontSize: '24px' }}>🗜️</span>
        <div>
          <h3 style={{ margin: 0, fontSize: '14px' }}>WinZip (Bazar Edition)</h3>
          <p style={{ margin: 0, fontSize: '10px' }}>Archiwum_Festiwalowe.zip</p>
        </div>
      </div>

      {!unzipped ? (
        <div style={{ textAlign: 'center' }}>
          {unzipping ? (
            <div style={{ padding: '10px' }}>
              <p style={{ fontSize: '11px' }}>Wypakowywanie wspomnień...</p>
              <div style={{ height: '15px', background: '#fff', border: '1px solid #000', position: 'relative' }}>
                <div style={{ height: '100%', background: 'blue', width: `${progress}%` }} />
              </div>
            </div>
          ) : (
            <button className="win95-button" onClick={startUnzip} style={{ width: '100%', padding: '10px' }}>
              WYPAKUJ ARCHIWUM
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {assets.map(a => (
            <div key={a.name} style={{ textAlign: 'center' }}>
               <img src={a.src} style={{ width: '100%', border: '1px solid #000' }} alt={a.name} />
               <p style={{ fontSize: '8px', wordBreak: 'break-all' }}>{a.name}</p>
            </div>
          ))}
          <button 
            className="win95-button" 
            style={{ gridColumn: 'span 3', marginTop: '10px', fontSize: '10px' }}
            onClick={() => setUnzipped(false)}
          >
            ZAMKNIJ ARCHIWUM
          </button>
        </div>
      )}
    </div>
  );
};

export default AssetVault;
