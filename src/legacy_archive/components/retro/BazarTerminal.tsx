import React, { useState, useRef, useEffect } from 'react';

const BazarTerminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    "KujawiakOS v1.0 (Bazar-Kernel)",
    "Typ 'help' dla listy komend.",
    ""
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, () => string> = {
    help: () => "Dostępne komendy: help, cls, whoami, teatr, polonez, spiritus, date",
    cls: () => { setHistory([]); return ""; },
    whoami: () => "Użytkownik: GOŚĆ_WESELNY_2026",
    teatr: () => "!!! SPEKTAKL DETECTED !!! PODKRĘCAM BASY...",
    polonez: () => "VROOOOOM! Polonez driftuje po C:\\",
    spiritus: () => "Status: 95% czystości. Zalecane rozcieńczenie.",
    date: () => new Date().toLocaleString()
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let response = "";

    if (cmd) {
      if (commands[cmd]) {
        response = commands[cmd]();
      } else {
        response = `Błąd: Nie znaleziono komendy '${cmd}'`;
      }
      
      setHistory(prev => [...prev, `> ${input}`, response].filter(x => x !== ""));
    }
    setInput("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div style={{
      background: '#000',
      color: '#0f0',
      fontFamily: 'monospace',
      fontSize: '12px',
      padding: '10px',
      height: '300px',
      overflowY: 'auto',
      border: '2px inset #fff'
    }}>
      {history.map((line, i) => (
        <div key={i} style={{ marginBottom: '4px' }}>{line}</div>
      ))}
      <form onSubmit={handleCommand} style={{ display: 'flex' }}>
        <span style={{ marginRight: '5px' }}>&gt;</span>
        <input 
          autoFocus
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#0f0',
            fontFamily: 'monospace',
            fontSize: '12px',
            outline: 'none',
            width: '100%'
          }}
        />
      </form>
      <div ref={scrollRef} />
    </div>
  );
};

export default BazarTerminal;
