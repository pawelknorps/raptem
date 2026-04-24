import React, { useState } from 'react';

const PolonezBrowser: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('C:\\');
  const files = [
    { name: 'KONCERTY.XLS', type: 'file', icon: '📄' },
    { name: 'SPEKTAKL_PLANS.DOC', type: 'file', icon: '📄' },
    { name: 'SPIRYTUS_STOCKS.LOG', type: 'file', icon: '📄' },
    { name: 'ZDJECIA_Z_REMIZY', type: 'dir', icon: '📁' },
    { name: 'BAZAR_SECRET.EXE', type: 'file', icon: '⚙️' },
  ];

  return (
    <div style={{ background: '#fff', height: '300px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#eee', padding: '5px', borderBottom: '1px solid #888', fontSize: '11px', display: 'flex', gap: '10px' }}>
        <span>Adres:</span>
        <div style={{ background: '#fff', border: '1px inset #fff', flexGrow: 1, padding: '0 5px' }}>{currentPath}</div>
      </div>
      <div style={{ flexGrow: 1, padding: '10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 70px)', gap: '10px', alignContent: 'start' }}>
        {files.map(f => (
          <div 
            key={f.name} 
            style={{ textAlign: 'center', cursor: 'pointer' }}
            onDoubleClick={() => alert(`Nie można otworzyć ${f.name}. Brak uprawnień Sołtysa.`)}
          >
            <div style={{ fontSize: '32px' }}>{f.icon}</div>
            <div style={{ fontSize: '9px', wordBreak: 'break-all' }}>{f.name}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#eee', padding: '2px 5px', borderTop: '1px solid #888', fontSize: '10px' }}>
        5 obiekt(ów) - 1.44 MB (Wolne miejsce: 0 KB)
      </div>
    </div>
  );
};

export default PolonezBrowser;
