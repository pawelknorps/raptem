import React, { useState, useEffect, useRef } from 'react';

const SUBJECTS = [
  "Duch Bazaru", "KujawiakOS", "Polonez Caro", "Akordeon Mirek", "Ortalionowy Wojownik", 
  "Kaseta VHS", "Czysty Spirytus", "Remiza w Kowalu", "Bitcrusher", "Sygnał Telewizyjny", 
  "Kod binarny", "Przystanek PKS", "Kujawska Kiełbasa", "Oberek-Widmo", "Spektakl Przejścia",
  "Archiwum ZIP", "Głos Przodka", "Błękitny Ekran Śmierci", "Lampa Kineskopowa", "Drift w Ciemności"
];

const VERBS = [
  "defragmentuje", "przenika", "re-animuje", "szumi w", "transmutuje", 
  "wywołuje", "handluje", "tańczy z", "generuje", "pętluje", 
  "zakłóca", "destyluje", "hakuje", "skanuje", "rozszczepia",
  "pasteryzuje", "synchronizuje", "filtruje", "nadaje", "odbiera"
];

const OBJECTS = [
  "cyfrową entropię", "ludową duszę", "przestrzeń bazaru", "zapomniane rytuały", 
  "szumy i trzaski", "regionalne widma", "kujawską glebę", "napięcie w sieci", 
  "ortalionowe sny", "analogową pustkę", "pamięć operacyjną", "dźwięk akordeonu",
  "ciężar tradycji", "błędy systemu", "prymitywną wixę", "zapach ozonu",
  "echo przeszłości", "cyber-folklor", "algorytm obrzędu", "bitrate kujawiaka"
];

const MODIFIERS = [
  "w oparach dziegciu", "pod wpływem wixy", "bez filtra", "z prędkością 56kbps", 
  "w liminalnej pustce", "między stodołą a serwerownią", "na krawędzi chaosu", 
  "w formacie .WAV", "poprzez złącze SCART", "w rytmie 3/4", "zgodnie z protokołem",
  "wbrew logice", "w cyfrowym czyśćcu", "pod osłoną nocy", "w blasku monitora",
  "przy 88 stopniach Celsjusza", "w nieskończonej pętli", "zniekształcając rzeczywistość"
];

const generateLoreLine = () => {
  const s = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
  const v = VERBS[Math.floor(Math.random() * VERBS.length)];
  const o = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
  const m = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
  return `${s} ${v} ${o} ${m}.`;
};

const RaptemLore: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial lines
    setLines([
      "MANIFEST PROTOKOŁU RAPTEM v1.0 INITIALIZED...",
      "Ładowanie modułów folkloru eksperymentalnego...",
      "Podłączanie do bazy duchów Kujaw...",
      generateLoreLine(),
      generateLoreLine(),
      generateLoreLine()
    ]);

    const interval = setInterval(() => {
      setLines(prev => [...prev, generateLoreLine()].slice(-50)); // Keep last 50 lines
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="raptem-lore-container" style={{ 
      fontFamily: 'var(--font-mono)', 
      color: '#000', 
      lineHeight: '1.4',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: '400px'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '15px', borderBottom: '2px double #000', paddingBottom: '10px' }}>
        <h1 className="wordart-rainbow" style={{ fontSize: '1.5rem', margin: '0' }}>MANIFEST ALGORYTMICZNY</h1>
        <p style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>[ LIVE_LORE_STREAMING: ACTIVE ]</p>
      </header>

      <div className="lore-static-intro" style={{ marginBottom: '20px', fontSize: '0.9rem' }}>
        <p>
          To jest <strong>Nieskończone Archiwum Rytuału</strong>. Lore projektu Raptem nie jest statyczne – ono generuje się w czasie rzeczywistym, 
          pobierając dane z szumu bazaru i pamięci zbiorowej Kujaw. Każda linia to unikalny fragment naszej mitologii.
        </p>
      </div>

      <div 
        ref={scrollRef}
        className="lore-live-feed win95-inset" 
        style={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          background: '#000', 
          color: '#0f0', 
          padding: '10px', 
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)',
          border: '2px inset #fff'
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ marginBottom: '4px', opacity: i === lines.length - 1 ? 1 : 0.7 }}>
            <span style={{ color: '#888', marginRight: '8px' }}>[{new Date().toLocaleTimeString()}]</span>
            {line}
          </div>
        ))}
        <div className="blink" style={{ display: 'inline-block', width: '8px', height: '12px', background: '#0f0', marginLeft: '4px' }}></div>
      </div>

      <footer style={{ marginTop: '15px', fontSize: '0.7rem', fontStyle: 'italic', color: '#444' }}>
        <p>Protokół Raptem v2.1-INFINITE. Wygenerowano algorytmicznie w oparach spirytusu.</p>
      </footer>
    </div>
  );
};

export default RaptemLore;
