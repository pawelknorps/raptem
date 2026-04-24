import React, { useState, useRef, useEffect } from 'react';
import { generateLoreLine } from '../../lib/LoreEngine';
import { usePlayerStore } from '../../lib/playerStore';

const BazarTerminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    "KujawiakOS v1.0 (Bazar-Kernel)",
    "Typ 'help' dla listy komend.",
    ""
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, () => string> = {
    help: () => "Dostępne komendy: help, cls, whoami, teatr, polonez, spiritus, date, lore, manifest",
    cls: () => { setHistory([]); return ""; },
    whoami: () => "Użytkownik: WIDZ_TEATRALNY_2026",
    teatr: () => "!!! SPEKTAKL ROZPOCZĘTY !!! PODNOSZĘ KURTYNĘ...",
    polonez: () => "VROOOOOM! Polonez driftuje po C:\\",
    spiritus: () => "Status: 95% czystości. Zalecane rozcieńczenie.",
    date: () => new Date().toLocaleString(),
    lore: () => generateLoreLine(),
    manifest: () => "Otwieranie MANIFEST_TEATRU.DOC... (Sprawdź okno na pulpicie)",
    ritual: () => "KALIBRACJA AKORDEONU: KROK 1: Wypełnij miech ciszą przedburzową. KROK 2: Zagraj nutę G. KROK 3: Czekaj na teatr.",
    mirek: () => "Mirek jest w pętli. Mirek jest Polonezem. Mirek nie wraca.",
    pks: () => "AUTOBUS RELACJI INOWROCŁAW-WŁOCŁAWEK: STATUS: MOBILNA SCENA LUDOWA.",
    "1994": () => "INAUGURACJA TEATRU PRĘDKOŚCI 1994: POZIOM EKSPRESJI PRZEKROCZYŁ KRYTYCZNĄ MASĘ. REMIZA STAŁA SIĘ SCENĄ NARODOWĄ.",
    bazar: () => "BAZAR CENTRALNY: TU SIĘ HANDLUJE ARCHETYPAMI W FORMACIE VHS.",
    murzynno: () => "MURZYNNO: KOLEBKA RYTMU. TU ZIEMIA DRŻY W TAKCIE SPEKTAKLU.",
    murzynek: () => "MURZYNEK: BRAMA MIĘDZYWYMIAROWA. STĄD NADAJE RAPTEM.",
    ps: () => "PID  NAME\n---  ----\n101  Gadu-Mirek\n102  StagePlayer\n103  SpiritusShield\n104  Defragmentator",
    kill: () => "Błąd: Brak uprawnień reżysera (Pan Janek musi zatwierdzić).",
    defrag: () => {
      window.dispatchEvent(new CustomEvent('open-window', { detail: 'defrag' }));
      return "Uruchamiam Defragmentator... Przesuwanie bloków pamięci ludowej.";
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let response = "";

    if (cmd) {
      const { addXP, updateStat } = usePlayerStore.getState();
      addXP(5);
      updateStat('chaosAffinity', 0.5);

      if (cmd === 'spiritus' || cmd === 'spirytus') {
        window.dispatchEvent(new CustomEvent('quest-complete', { detail: 'terminal' }));
        addXP(200);
      }
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
