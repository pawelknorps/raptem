import React, { useState, useEffect, useRef } from 'react';

const SystemLogs: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Inicjalizacja KujawiakOS v1.0...",
    "[INFO] Ładowanie sterowników Poloneza...",
    "[INFO] Spiritus Shield: Status Zielony.",
    "[SYSTEM] Bazar gotowy do wixy."
  ]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleChaos = (e: any) => {
      const { level } = e.detail;
      if (Math.random() < 0.2) {
        let msg = "[INFO] Stabilizacja oberków...";
        if (level > 0.5) msg = "[WARN] Wykryto podwyższone tętno basów.";
        if (level > 0.8) msg = "[CRITICAL] SPIRYTUS LEVEL LOW! NATYCHMIASTOWA DOSTAWA REKOMENDOWANA!";
        
        setLogs(prev => [...prev, msg].slice(-20)); // Keep last 20
      }
    };

    window.addEventListener('chaos-update', handleChaos);
    return () => window.removeEventListener('chaos-update', handleChaos);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div style={{ 
      background: '#000', 
      color: '#0f0', 
      fontFamily: 'monospace', 
      fontSize: '11px', 
      padding: '10px', 
      height: '200px', 
      overflowY: 'auto',
      border: '2px inset #fff'
    }}>
      {logs.map((log, i) => (
        <div key={i} style={{ marginBottom: '2px' }}>
          <span style={{ opacity: 0.5 }}>[{new Date().toLocaleTimeString()}]</span> {log}
        </div>
      ))}
      <div ref={logEndRef} />
    </div>
  );
};

export default SystemLogs;
