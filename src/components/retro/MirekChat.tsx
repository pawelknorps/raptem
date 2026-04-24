import React, { useState, useEffect, useRef } from 'react';
import chaosEngine from '../../scripts/ChaosEngine';
import { getFolkFortune } from '../../scripts/KujawianOracle';
import { useQuestStore } from '../../lib/QuestEngine';
import { usePlayerStore } from '../../lib/playerStore';

type Mood = 'Dostępny' | 'Wstawiony' | 'Wixowy' | 'Głodny' | 'Zajęty' | 'Oświecony' | 'Mroczny';

const MirekChat: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'mirek' | 'user', text: string }[]>([
    { role: 'mirek', text: "No siema. Co tam na bazarze słychać?" }
  ]);
  const [input, setInput] = useState("");
  const [mood, setMood] = useState<Mood>("Dostępny");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const keywords: Record<string, string[]> = {
    "muzyka": ["Akordeon to mój modem do nieba.", "Kujawiak to binarny kod."],
    "alkohol": ["Spirytus to chłodziwo.", "Mam 95% czystości."],
    "polonez": ["Polonez to styl życia.", "Rdza to dowód życia."],
    "bazar": ["Bazar to prawdziwy internet.", "Kup kasete!"],
    "teatr": ["!!! SPEKTAKL DETECTED !!!", "Podkręć basy!"],
    "przyszłość": ["Czekaj, zapytam wyroczni..."]
  };

  const dispatchSystemCommand = (cmd: string) => {
    window.dispatchEvent(new CustomEvent('mirek-command', { detail: { command: cmd } }));
  };

  const getResponse = (msg: string) => {
    const lowerMsg = msg.toLowerCase();
    const aura = usePlayerStore.getState().getWorldAura();
    const { getQuestsByGiver, acceptQuest } = useQuestStore.getState();
    const mirekQuests = getQuestsByGiver('MIREK');

    // Aura reactivity
    if (aura === 'CHAOS' && mood !== 'Mroczny') setMood('Mroczny');
    if (aura === 'TRADITION' && mood !== 'Oświecony') setMood('Oświecony');

    // Lore Expansion keywords
    if (lowerMsg.includes('babilon') || lowerMsg.includes('radio')) {
      return "Ciii... Radio Babilon nadaje na falach, których nikt nie kontroluje. Słyszałeś już o nadajniku w Reszkach?";
    }
    if (lowerMsg.includes('rozpierdol') || lowerMsg.includes('teatr rozpierdol')) {
      if (aura === 'CHAOS') return "TEATR ROZPIERDOL!!! To jest prawdziwa wixa! Kurtyna w płomieniach, a sufler zapomniał języka w gębie!";
      return "Eee, Teatr Rozpierdol to nie dla takich grzecznych wixiarzy jak Ty. Musisz mieć więcej Chaosu w żyłach.";
    }

    // Quest acceptance logic
    if (lowerMsg.includes('misja') || lowerMsg.includes('zadanie') || lowerMsg.includes('quest')) {
      if (mirekQuests.length > 0) {
        const q = mirekQuests[0];
        if (!q.isAccepted) {
          acceptQuest(q.id);
          return `Dobra, słuchaj uważnie: ${q.title}. ${q.description}. Podołasz temu? (Zadanie przyjęte!)`;
        }
        return `Dalej męczysz ${q.title}? No weź się za robotę, Polonez sam się nie naprawi.`;
      }
      return "Na razie nie mam dla Ciebie roboty. Idź pograj na akordeonie albo coś.";
    }

    // Commands
    if (lowerMsg.includes('zmień tapetę') || lowerMsg.includes('tło')) {
      dispatchSystemCommand('change-wallpaper');
      return "Dobra, zmieniam tło na bardziej spiritusowe. Lepiej?";
    }
    if (lowerMsg.includes('teatr') || lowerMsg.includes('ogień')) {
      dispatchSystemCommand('trigger-teatr');
      setMood('Wixowy');
      return "SPEKTAKL!!! PODKRĘCAM OBROTY KERNELA!";
    }
    if (lowerMsg.includes('napij') || lowerMsg.includes('spirytus') || lowerMsg.includes('pić')) {
      dispatchSystemCommand('toggle-drunk');
      setMood('Wstawiony');
      useQuestStore.getState().completeQuest('mirek_drink');
      return "Polej Mireczkowi! Ooo... teraz widzę system w 4D.";
    }
    if (lowerMsg.includes('przyszłość') || lowerMsg.includes('wróżba')) {
      return `Wyrocznia mówi: "${getFolkFortune()}"`;
    }
    if (lowerMsg.includes('reset') || lowerMsg.includes('wyłącz')) {
      dispatchSystemCommand('system-reset');
      return "SYSTEM RECOVERY... Żegnaj okrutny świecie!";
    }

    // Aura specific flavor
    if (aura === 'CHAOS') {
      const chaosLines = [
        "Czujesz ten cyfrowy szum? To Babilon nas wzywa...",
        "Twoje Chaos Affinity jest wysokie. Podoba mi się to.",
        "System trzeszczy, a ja się śmieję. To jest teatr!",
        "Widzisz te glitche? To nie błędy, to rekwizyty."
      ];
      return chaosLines[Math.floor(Math.random() * chaosLines.length)];
    }
    if (aura === 'TRADITION') {
      const traditionLines = [
        "Czuję w powietrzu zapach lnianych płócien i świeżego chleba.",
        "Pamiętaj o Murzynnie, tam wszystko się zaczęło.",
        "Janek by był z Ciebie dumny. Tyle folku w jednym sołtysie!",
        "Czystość obrzędu to podstawa. Nie daj się zwieść cyfrowym demonom."
      ];
      return traditionLines[Math.floor(Math.random() * traditionLines.length)];
    }

    for (const key in keywords) {
      if (lowerMsg.includes(key)) {
        const pool = keywords[key];
        return pool[Math.floor(Math.random() * pool.length)];
      }
    }

    return "Ciekawe... Ale wolisz Poloneza czy akordeon?";
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
      chaosEngine.recordInteraction();
    }, 1000 + Math.random() * 500);
  };

  useEffect(() => {
    const handleCmd = (e: any) => {
      if (e.detail.command === 'mood-angry') {
        setMood('Zajęty');
        setMessages(prev => [...prev, { role: 'mirek', text: "SYSTEM WYKRYŁ BRAK FOLKU! To skandal! Idę polewać..." }]);
      }
    };
    window.addEventListener('mirek-command', handleCmd);
    return () => window.removeEventListener('mirek-command', handleCmd);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const moodColors: Record<Mood, string> = {
    'Dostępny': '#0f0',
    'Wstawiony': '#ff0',
    'Wixowy': '#f0f',
    'Głodny': '#f80',
    'Zajęty': '#f00',
    'Oświecony': '#fff',
    'Mroczny': '#500'
  };

  return (
    <div style={{ background: '#eee', padding: '5px', color: '#000', display: 'flex', flexDirection: 'column', height: '350px', border: '2px inset #fff' }}>
      <div style={{ background: '#000080', color: '#fff', padding: '2px 5px', fontSize: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <span>Mirek_Raptem_95</span>
        <span style={{ color: moodColors[mood] }}>● {mood}</span>
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto', background: '#fff', border: '1px inset #888', margin: '5px 0', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === 'mirek' ? 'flex-start' : 'flex-end', maxWidth: '90%' }}>
            <div style={{ fontSize: '9px', color: m.role === 'mirek' ? '#f00' : '#00f' }}>
              <strong>{m.role === 'mirek' ? 'Mirek' : 'Ty'}</strong>
            </div>
            <div style={{ fontSize: '11px' }}>{m.text}</div>
          </div>
        ))}
        {isTyping && <div style={{ fontSize: '9px', fontStyle: 'italic' }}>Mirek polewa... tzn. pisze...</div>}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <textarea 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); } }}
          placeholder="Zapytaj Mirka o przyszłość lub polej mu..."
          style={{ width: '100%', height: '40px', fontSize: '11px', border: '1px inset #888', padding: '5px', resize: 'none' }}
        />
        <button className="win95-button" style={{ padding: '2px', fontWeight: 'bold' }}>ŚLIJ</button>
      </form>
    </div>
  );
};

export default MirekChat;
