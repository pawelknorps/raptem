import React, { useState } from 'react';
import { bazarInventory } from '../../lib/BazarInventory';

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
    { id: 'mirek_final', name: 'mirek_final.webp', src: 'assets/1000001791.webp', desc: 'Portret Mistrza Mirka w formacie cyfrowym.' },
    { id: 'remiza_interior', name: 'remiza_interior.webp', src: 'assets/TeatrGospoda_jan26.webp', desc: 'Wnętrze remizy, gdzie czas płynie wolniej.' },
    { id: 'polonez_drift', name: 'polonez_drift.gif', src: 'assets/low_poly_polonez.webp', desc: 'Legendarny Polonez w pętli driftingu.' }
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
            <div key={a.name} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
               <img src={a.src} style={{ width: '100%', border: '1px solid #000', flexGrow: 1, objectFit: 'cover' }} alt={a.name} />
               <p style={{ fontSize: '8px', wordBreak: 'break-all', margin: '4px 0' }}>{a.name}</p>
               <button 
                 className="win95-button" 
                 style={{ fontSize: '8px', padding: '2px' }}
                 onClick={() => {
                   bazarInventory.addItem({
                     id: a.id,
                     name: a.name,
                     type: 'gif',
                     image: a.src,
                     description: a.desc
                   });
                   alert(`Dodano ${a.name} do plecaka!`);
                 }}
               >
                 ZABIERZ
               </button>
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
