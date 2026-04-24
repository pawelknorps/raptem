import React, { useState, useEffect } from 'react';

const SpiritusShield: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('SYSTEM CHRONIONY');

  const startScan = () => {
    setScanning(true);
    setProgress(0);
    setStatus('SKANOWANIE...');
  };

  useEffect(() => {
    if (scanning && progress < 100) {
      const timer = setTimeout(() => setProgress(p => p + 1), 50);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setScanning(false);
      setStatus('WYKRYTO BRAK FOLKU! ZALECANE: KUJAWIAK v2.1');
      // Interconnect: Scan result affects Mirek's mood
      window.dispatchEvent(new CustomEvent('mirek-command', { detail: { command: 'mood-angry' } }));
    }
  }, [scanning, progress]);

  return (
    <div style={{ background: '#c0c0c0', padding: '15px', color: '#000', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
        <div style={{ 
          width: '50px', 
          height: '50px', 
          background: '#000080', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#fff',
          fontSize: '24px',
          border: '2px inset #fff'
        }}>
          🛡️
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '14px' }}>SPIRYTUS SHIELD PRO</h3>
          <p style={{ margin: 0, fontSize: '10px' }}>Wersja: 1995.0.1 (Bazar Edition)</p>
        </div>
      </div>

      <div style={{ background: '#eee', border: '2px inset #fff', padding: '10px', marginBottom: '15px' }}>
        <p style={{ margin: '0 0 5px 0', fontSize: '11px' }}>Status: <strong>{status}</strong></p>
        <div style={{ height: '15px', background: '#fff', border: '1px solid #888', position: 'relative' }}>
          <div style={{ 
            height: '100%', 
            background: 'blue', 
            width: `${progress}%` 
          }} />
        </div>
        <p style={{ margin: '5px 0 0 0', fontSize: '9px', textAlign: 'right' }}>{progress}% ukończono</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button 
          className="win95-button" 
          disabled={scanning} 
          onClick={startScan}
          style={{ width: '100%', padding: '5px' }}
        >
          {scanning ? 'SKANOWANIE W TOKU...' : 'SKANUJ SYSTEM'}
        </button>
      </div>
    </div>
  );
};

export default SpiritusShield;
