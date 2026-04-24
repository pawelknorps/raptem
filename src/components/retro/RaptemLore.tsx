import React, { useState, useEffect, useRef } from 'react';
import { generateLoreLine, DEEP_LORE, generateFolkLyric } from '../../lib/LoreEngine';

const RaptemLore: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'live' | 'archive' | 'rituals' | 'lyrics'>('live');
  const [currentLyric, setCurrentLyric] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLines([
      "MANIFEST PROTOKOŁU RAPTEM v2.5 INITIALIZED...",
      "Ładowanie głębokich warstw mitologii kujawskiej...",
      "Synchronizacja z bazarem centralnym...",
      generateLoreLine(),
      generateLoreLine()
    ]);

    const interval = setInterval(() => {
      if (activeTab === 'live') {
        setLines(prev => [...prev, generateLoreLine()].slice(-50));
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'lyrics') {
      setCurrentLyric(generateFolkLyric());
    }
  }, [activeTab]);

  useEffect(() => {
    if (scrollRef.current && activeTab === 'live') {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, activeTab]);

  return (
    <div className="raptem-lore-container" style={{ 
      fontFamily: 'var(--font-mono)', 
      color: '#000', 
      lineHeight: '1.4',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: '450px'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '10px', borderBottom: '2px double #000', paddingBottom: '5px' }}>
        <h1 className="wordart-rainbow" style={{ fontSize: '1.2rem', margin: '0' }}>ARCHIWUM TEATRALNE</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '10px', flexWrap: 'wrap' }}>
          <button className={`win95-button ${activeTab === 'live' ? 'active-tab' : ''}`} onClick={() => setActiveTab('live')}>LIVE_FEED</button>
          <button className={`win95-button ${activeTab === 'archive' ? 'active-tab' : ''}`} onClick={() => setActiveTab('archive')}>KRONIKI</button>
          <button className={`win95-button ${activeTab === 'rituals' ? 'active-tab' : ''}`} onClick={() => setActiveTab('rituals')}>OBRZĘDY</button>
          <button className={`win95-button ${activeTab === 'lyrics' ? 'active-tab' : ''}`} onClick={() => setActiveTab('lyrics')}>PIEŚNI</button>
        </div>
      </header>

      <div className="lore-content-area win95-inset" style={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: activeTab === 'live' ? '#000' : '#fff' }}>
        {activeTab === 'live' && (
          <div ref={scrollRef} className="lore-live-feed" style={{ flexGrow: 1, overflowY: 'auto', padding: '10px', color: '#0f0', fontSize: '0.75rem' }}>
            {lines.map((line, i) => (
              <div key={i} style={{ marginBottom: '4px' }}>
                <span style={{ color: '#888', marginRight: '8px' }}>[{new Date().toLocaleTimeString()}]</span>
                {line}
              </div>
            ))}
            <div className="blink" style={{ display: 'inline-block', width: '8px', height: '12px', background: '#0f0' }}></div>
          </div>
        )}

        {activeTab === 'archive' && (
          <div style={{ padding: '15px', overflowY: 'auto', color: '#000' }}>
            <h3 style={{ borderBottom: '1px solid #000', paddingBottom: '5px' }}>DZIEJE SPEKTAKLU</h3>
            {DEEP_LORE.events.map((event, i) => (
              <div key={i} style={{ marginBottom: '20px', borderBottom: '1px dashed #ccc', paddingBottom: '10px' }}>
                <div style={{ fontWeight: 'bold', color: '#000080' }}>[{event.date}] {event.name}</div>
                <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>{event.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rituals' && (
          <div style={{ padding: '15px', overflowY: 'auto', color: '#000' }}>
            <h3 style={{ borderBottom: '1px solid #000', paddingBottom: '5px' }}>MANUAL OBSŁUGI RZECZYWISTOŚCI</h3>
            {DEEP_LORE.rituals.map((ritual, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{ritual.name}</div>
                <ol style={{ fontSize: '0.85rem', marginTop: '5px', paddingLeft: '20px' }}>
                  {ritual.steps.map((step, j) => <li key={j}>{step}</li>)}
                </ol>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'lyrics' && (
          <div style={{ padding: '20px', overflowY: 'auto', color: '#000', textAlign: 'center', background: '#fdf6e3' }}>
            <h3 style={{ borderBottom: '1px solid #000', paddingBottom: '10px', marginBottom: '15px' }}>ALGORYTMICZNA PIEŚŃ LUDOWA</h3>
            <div style={{ fontStyle: 'italic', fontSize: '1rem', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
              {currentLyric}
            </div>
            <button 
              className="win95-button" 
              style={{ marginTop: '20px', padding: '5px 15px' }}
              onClick={() => setCurrentLyric(generateFolkLyric())}
            >
              GENERUJ NOWĄ
            </button>
          </div>
        )}
      </div>

      <footer style={{ marginTop: '10px', fontSize: '0.7rem', display: 'flex', justifyContent: 'space-between' }}>
        <span>PROTOKÓŁ: RAPTEM_DEEP</span>
        <span className="blink">STATUS: {activeTab === 'live' ? 'REŻYSERIA' : 'LEKTURA'}</span>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .active-tab {
          background: #808080 !important;
          color: white !important;
          border: 2px inset #fff !important;
        }
      `}} />
    </div>
  );
};

export default RaptemLore;
