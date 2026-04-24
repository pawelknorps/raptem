import React, { useState, useEffect, useRef } from 'react';
import { generateLoreLine } from '../../lib/LoreEngine';

const SystemLogs: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Inicjalizacja KujawiakOS v1.0...",
    "[INFO] Ładowanie sterowników Poloneza...",
    "[INFO] Spiritus Shield: Status Zielony.",
    "[SYSTEM] Bazar gotowy do spektaklu."
  ]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleChaos = (e: any) => {
      const { level } = e.detail;
      if (Math.random() < 0.3) {
        let msg = "";
        if (Math.random() < 0.4) {
          msg = `[LORE] ${generateLoreLine()}`;
        } else {
          msg = "[INFO] Stabilizacja inscenizacji...";
          if (level > 0.5) msg = "[WARN] Wykryto podwyższone tętno rytualne.";
          if (level > 0.8) msg = "[CRITICAL] ARTISTIC_ENERGY LOW! NATYCHMIASTOWE PRZEBUDZENIE REKOMENDOWANE!";
        }
        
        setLogs(prev => [...prev, msg].slice(-20));
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
