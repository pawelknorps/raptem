import React, { useState, useEffect } from 'react';

const FolkloreScanner: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [spiritLevel, setSpiritLevel] = useState(70);
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] Scanner zainicjowany.", "[INFO] Czekam na sygnał z remizy..."]);

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setSpiritLevel(prev => Math.min(100, Math.max(0, prev + (Math.random() * 10 - 5))));
        if (Math.random() > 0.7) {
          const events = [
            "Wykryto obecność akordeonu w promieniu 5km.",
            "Anomalia: Zbyt wysokie stężenie folkloru w Kowalu.",
            "Sygnał Poloneza stabilny.",
            "Wykryto ślady modrego dymu.",
            "Przystanek PKS wysyła zapytanie...",
            "Mirek wszedł w tryb rezonansu."
          ];
          setLogs(prev => [events[Math.floor(Math.random() * events.length)], ...prev].slice(0, 10));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [scanning]);

  return (
    <div style={{ padding: '15px', color: '#0f0', background: '#000', fontFamily: 'monospace', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ borderBottom: '1px solid #0f0', paddingBottom: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <span>SKANER_FOLKLORU_v4.2</span>
        <button 
          onClick={() => setScanning(!scanning)}
          style={{ background: '#0f0', color: '#000', border: 'none', padding: '2px 10px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {scanning ? 'STOP' : 'START'}
        </button>
      </div>

      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ border: '1px solid #0f0', padding: '10px', position: 'relative', height: '100px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#0f0', animation: scanning ? 'scan-line 2s linear infinite' : 'none', opacity: 0.5 }}></div>
          <div style={{ fontSize: '1.5rem', textAlign: 'center', marginTop: '20px' }}>
            SPIRIT_LEVEL: {spiritLevel.toFixed(1)}%
          </div>
          <div style={{ width: '100%', height: '10px', border: '1px solid #0f0', marginTop: '10px' }}>
            <div style={{ width: `${spiritLevel}%`, height: '100%', background: '#0f0', transition: 'width 0.5s' }}></div>
          </div>
        </div>

        <div className="scanner-logs" style={{ flexGrow: 1, overflowY: 'auto', fontSize: '0.8rem', opacity: 0.8 }}>
          {logs.map((log, i) => <div key={i}>{`> ${log}`}</div>)}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan-line {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}} />
    </div>
  );
};

export default FolkloreScanner;
