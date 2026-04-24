import React, { useState, useEffect, useRef } from 'react';
import chaosEngine from '../../scripts/ChaosEngine';

const MirekChat: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'mirek' | 'user', text: string }[]>([
    { role: 'mirek', text: "No siema. Co tam na bazarze słychać? (Status: Dostępny)" }
  ]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("Dostępny");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const keywords: Record<string, string[]> = {
    "muzyka": [
      "Muzyka? My gramy TEATR PRĘDKOŚCI!",
      "Akordeon to mój modem do nieba.",
      "Kujawiak to binarny kod naszych przodków.",
      "Słuchaj basów, one Cię poprowadzą do remizy."
    ],
    "alkohol": [
      "Spirytus to chłodziwo, nie napój.",
      "Mam 95% czystości w żyłach systemu.",
      "Jedna kreska na termometrze, jedna kolejka w barze.",
      "Nie piję, ja się aktualizuję."
    ],
    "polonez": [
      "Polonez to nie auto, to styl życia.",
      "Rdza to tylko dowód, że system żyje.",
      "Mój Polonez ma wbudowany Chaos Engine.",
      "Driftujemy po krawędzi rzeczywistości."
    ],
    "bazar": [
      "Bazar to jedyny prawdziwy internet.",
      "Kup kasete, bo Ci system padnie.",
      "Tu się handluje marzeniami w formacie VHS.",
      "Najlepsze procesory są u Pana Janka pod stoiskiem."
    ],
    "teatr": [
      "!!! SPEKTAKL DETECTED !!!",
      "Gdy teatr wchodzi, system wychodzi.",
      "Podkręć basy, niech remiza drży!",
      "Spektakl to błąd w systemie, który kochamy."
    ],
    "cześć": [
      "Siema, siema. Masz jakieś nowe sample?",
      "No hej. Gotowy na kujawską inwazję?",
      "Elo. System stabilny jak Polonez na ręcznym."
    ]
  };

  const genericResponses = [
    "Ciekawe, ciekawe... Ale czy Twój system obsługuje format .wix?",
    "Nie rozumiem, mój kernel jest ustawiony na tryb OBEREK.",
    "Zajrzyj do MANIFEST.EXE, tam jest cała prawda.",
    "Błędy są częścią planu.",
    "Uważaj na chaos, właśnie rośnie.",
    "Mirek nie odpowiada, Mirek drzemie w Polonezie."
  ];

  const getResponse = (msg: string) => {
    const chaos = (chaosEngine as any).level || 0;
    
    // SOTA Humor Algorithm: High Chaos = Random Lyrics/Nonsense
    if (chaos > 0.8) {
      return "!!! EROR 404: SPIRITUS OVERLOAD !!! WI-XA! WI-XA! WI-XA!";
    }

    const lowerMsg = msg.toLowerCase();
    for (const key in keywords) {
      if (lowerMsg.includes(key)) {
        const pool = keywords[key];
        return pool[Math.floor(Math.random() * pool.length)];
      }
    }

    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getResponse(userMsg);
      setMessages(prev => [...prev, { role: 'mirek', text: reply }]);
      setIsTyping(false);
      
      // Interaction recorded in chaos engine
      chaosEngine.recordInteraction();
    }, 1500 + Math.random() * 1000);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div style={{ background: '#eee', padding: '5px', color: '#000', display: 'flex', flexDirection: 'column', height: '350px', border: '2px inset #fff' }}>
      {/* Gadu-Gadu Style Header */}
      <div style={{ background: '#000080', color: '#fff', padding: '2px 5px', fontSize: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <span>Rozmowa z: Mirek_Raptem_95</span>
        <span>{status}</span>
      </div>

      <div style={{ 
        flexGrow: 1, 
        overflowY: 'auto', 
        background: '#fff', 
        border: '1px inset #888', 
        margin: '5px 0', 
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === 'mirek' ? 'flex-start' : 'flex-end',
            maxWidth: '90%'
          }}>
            <div style={{ fontSize: '9px', color: m.role === 'mirek' ? '#f00' : '#00f', marginBottom: '2px' }}>
              <strong>{m.role === 'mirek' ? 'Mirek_Raptem_95' : 'Ty'}</strong> {new Date().toLocaleTimeString()}
            </div>
            <div style={{
              fontSize: '11px',
              lineHeight: '1.4',
              color: '#000',
              whiteSpace: 'pre-wrap'
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && <div style={{ fontSize: '9px', fontStyle: 'italic', color: '#666' }}>Mirek pisze wiadomość...</div>}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <textarea 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); } }}
          placeholder="Napisz coś..."
          style={{ 
            width: '100%', 
            height: '50px', 
            fontSize: '11px', 
            border: '1px inset #888', 
            padding: '5px', 
            resize: 'none',
            outline: 'none'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button type="button" className="win95-button" style={{ padding: '2px 5px', fontSize: '9px' }}>🙂</button>
            <button type="button" className="win95-button" style={{ padding: '2px 5px', fontSize: '9px' }}>📁</button>
          </div>
          <button className="win95-button" style={{ padding: '2px 15px', fontWeight: 'bold' }}>Wyślij</button>
        </div>
      </form>
    </div>
  );
};

export default MirekChat;
