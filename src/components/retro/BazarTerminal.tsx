import React, { useState, useEffect, useRef } from 'react';
import engine from '../../scripts/ChaosEngine';

const BazarTerminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    "KujawiakOS v1.0 (c) 1995-2026 Mirek Software",
    "System ready. Type 'help' for commands.",
    ""
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const newHistory = [...history, `> ${cmd}`];
    const c = cmd.toLowerCase().trim();

    if (c === 'help') {
      newHistory.push("Available commands: help, wixa, clear, status, mirek, whoami");
    } else if (c === 'wixa') {
      newHistory.push("WIXA ACTIVATED! Increasing chaos...");
      engine.recordInteraction();
      engine.recordInteraction();
    } else if (c === 'clear') {
      setHistory([]);
      return;
    } else if (c === 'status') {
      newHistory.push(`CPU_TEMP: 88°C`);
      newHistory.push(`CHAOS_LEVEL: ${(engine.chaosLevel * 100).toFixed(2)}%`);
      newHistory.push(`SPIRIT_LEVEL: 100%`);
    } else if (c === 'mirek') {
      newHistory.push("MIREK: 'Czego tu szukasz? Lepiej byś kujawiaka posłuchał!'");
    } else if (c === 'whoami') {
      newHistory.push("Guest User - IP: 192.168.1.wixa");
    } else if (c === '') {
      // do nothing
    } else {
      newHistory.push(`Unknown command: ${c}`);
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div style={{
      background: '#000',
      color: '#0f0',
      fontFamily: 'var(--font-mono)',
      padding: '10px',
      height: '300px',
      display: 'flex',
      flexDirection: 'column',
      fontSize: '12px'
    }}>
      <div 
        ref={scrollRef}
        style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '10px' }}
      >
        {history.map((line, i) => (
          <div key={i} style={{ marginBottom: '2px', minHeight: '1em' }}>{line}</div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <span style={{ marginRight: '5px' }}>&gt;</span>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#0f0',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            outline: 'none',
            flexGrow: 1
          }}
          autoFocus
        />
      </div>
    </div>
  );
};

export default BazarTerminal;
