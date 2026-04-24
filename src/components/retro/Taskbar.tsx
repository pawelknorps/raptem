import React, { useState, useEffect } from 'react';
import engine from '../../scripts/ChaosEngine';
import { useWindowStore } from '../../lib/windowStore';
import { useQuestStore } from '../../lib/QuestEngine';

const Taskbar: React.FC = () => {
  const [time, setTime] = useState('');
  const [startOpen, setStartOpen] = useState(false);
  const [subMenu, setSubMenu] = useState<string | null>(null);
  const [chaosLevel, setChaosLevel] = useState(0);
  const { windows, focusWindow, toggleMinimize, openWindow, isMobile, currentWorkspace, setWorkspace } = useWindowStore();
  const { quests } = useQuestStore();

  useEffect(() => {
    engine.subscribe((level) => {
      setChaosLevel(level);
    });

    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeWindows = Object.values(windows).filter(w => w.isOpen);

  const showDesktop = () => {
    activeWindows.forEach(win => {
      if (!win.isMinimized) {
        toggleMinimize(win.id);
      }
    });
    setStartOpen(false);
  };

  return (
    <div className={`taskbar-container ${chaosLevel > 0.8 ? 'high-chaos-vibrate' : ''}`} style={{
      position: isMobile ? 'sticky' : 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: isMobile ? '48px' : '32px',
      background: chaosLevel > 0.9 ? `hsl(${Math.random() * 360}, 50%, 50%)` : '#c0c0c0',
      borderTop: '2px outset #fff',
      display: 'flex',
      alignItems: 'center',
      padding: '2px',
      zIndex: 11000,
      fontFamily: 'var(--font-win95)',
      transition: 'background 0.1s ease'
    }}>
      {/* Start Button */}
      <button 
        className={`win95-button ${startOpen ? 'active' : ''}`}
        onClick={() => setStartOpen(!startOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          fontWeight: 'bold',
          height: '100%',
          padding: '0 8px',
          borderStyle: startOpen ? 'inset' : 'outset'
        }}
      >
        <img src="assets/polonez.webp" style={{ height: '16px', filter: chaosLevel > 0.8 ? 'hue-rotate(90deg)' : '' }} alt="Start" />
        START
      </button>

      {/* Workspace Pager */}
      <div style={{ 
        display: 'flex', 
        gap: '2px', 
        padding: '0 5px', 
        borderRight: '1px solid #888', 
        marginLeft: '5px' 
      }}>
        {[0, 1, 2].map(id => (
          <button 
            key={id}
            onClick={() => setWorkspace(id)}
            style={{
              width: '18px',
              height: '18px',
              fontSize: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: currentWorkspace === id ? '#000080' : '#c0c0c0',
              color: currentWorkspace === id ? '#fff' : '#000',
              border: '1px outset #fff',
              cursor: 'pointer'
            }}
          >
            {id + 1}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div style={{ flexGrow: 1, display: 'flex', gap: '5px', padding: '0 8px', overflowX: 'auto', height: '100%' }}>
        {activeWindows.map(win => (
          <button 
            key={win.id}
            className={`win95-button task-item ${win.isFocused ? 'active' : ''}`}
            onClick={() => {
              if (win.isMinimized) {
                toggleMinimize(win.id);
                focusWindow(win.id);
              } else if (win.isFocused) {
                toggleMinimize(win.id);
              } else {
                focusWindow(win.id);
              }
            }}
            style={{
              padding: '0 8px',
              fontSize: isMobile ? '10px' : '11px',
              minWidth: isMobile ? '80px' : '120px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              height: '100%',
              backgroundColor: win.isFocused ? '#fff' : '#c0c0c0',
              borderStyle: win.isFocused ? 'inset' : 'outset'
            }}
          >
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{win.title}</span>
          </button>
        ))}
      </div>

      {/* Tray */}
      <div style={{
        background: '#c0c0c0',
        border: '2px inset #fff',
        padding: '0 8px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '11px',
        marginLeft: 'auto'
      }}>
        <div style={{ display: 'flex', gap: '5px', paddingRight: '5px', borderRight: '1px solid #888' }}>
          <span 
            title="Dziennik Zadań" 
            style={{ cursor: 'pointer', filter: quests.every(q => q.isCompleted) ? 'sepia(1)' : 'none' }} 
            onClick={() => openWindow('quest_log')}
          >
            📜
          </span>
          <span title="Bazar Online" style={{ cursor: 'help' }}>🌐</span>
          <span title="Głośność" style={{ cursor: 'pointer' }} onClick={() => openWindow('multimedia_props')}>🔊</span>
        </div>
        
        {/* Chaos Meter Mini */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '35px', height: '10px', background: '#000', border: '1px solid #888', position: 'relative' }}>
             <div style={{ 
               width: `${chaosLevel * 100}%`, 
               height: '100%', 
               background: chaosLevel > 0.7 ? '#f0f' : '#0f0',
               transition: 'width 0.2s ease, background 0.5s ease'
             }} />
          </div>
        </div>
        
        <img src="assets/spirytus.webp" style={{ height: '14px', animation: chaosLevel > 0.5 ? 'spin 2s linear infinite' : 'none' }} alt="Tray" />
        <span style={{ minWidth: '60px', fontWeight: 'bold' }}>{time}</span>
      </div>

      {/* Show Desktop Button */}
      <button 
        className="win95-button"
        title="Pokaż Bazar"
        onClick={showDesktop}
        style={{
          width: '12px',
          height: '100%',
          padding: '0',
          marginLeft: '4px',
          background: '#c0c0c0',
          border: '2px outset #fff'
        }}
      />

      {/* Start Menu Simulation */}
      {startOpen && (
        <div className="start-menu" style={{
          position: 'absolute',
          bottom: isMobile ? '48px' : '32px',
          left: 0,
          width: '200px',
          background: '#c0c0c0',
          border: '2px outset #fff',
          boxShadow: '2px -2px 10px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 11001
        }}>
          <div className="start-sidebar" style={{ 
            background: 'linear-gradient(0deg, #000080, #1084d0)', 
            width: '30px', 
            position: 'absolute', 
            left: 0, 
            top: 0, 
            height: '100%',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            color: 'white',
            fontWeight: 'bold',
            padding: '5px',
            fontSize: '14px',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}>
            <span className="typing-text-fast">
              {chaosLevel > 0.8 ? 'C H A O S 95' : 'KujawiakOS'}
            </span>
          </div>
          <div style={{ marginLeft: '30px', padding: '2px' }}>
            {/* Programy */}
            <div 
              className="start-item" 
              style={{ padding: '8px', cursor: 'pointer', position: 'relative' }} 
              onMouseEnter={() => !isMobile && setSubMenu('programs')}
              onMouseLeave={() => !isMobile && setSubMenu(null)}
              onClick={() => isMobile && setSubMenu(subMenu === 'programs' ? null : 'programs')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>📁 Programy</span>
                <span>{isMobile ? (subMenu === 'programs' ? '▼' : '▶') : '▶'}</span>
              </div>
              
              {subMenu === 'programs' && (
                <div style={{ 
                  position: isMobile ? 'static' : 'absolute', 
                  left: isMobile ? 0 : '100%', 
                  top: isMobile ? 0 : 0, 
                  width: isMobile ? '100%' : '180px', 
                  background: '#c0c0c0', 
                  border: isMobile ? 'none' : '2px outset #fff',
                  borderLeft: isMobile ? '2px solid #888' : '2px outset #fff',
                  boxShadow: isMobile ? 'none' : '2px 2px 10px rgba(0,0,0,0.3)',
                  zIndex: 11002,
                  marginLeft: isMobile ? '10px' : '0'
                }}>
                  <div className="start-item" style={{ padding: '8px' }} onClick={(e) => { e.stopPropagation(); openWindow('winamp'); setStartOpen(false); }}>🎧 WinAmp</div>
                  
                  {/* Multimedia (Nested) */}
                  <div 
                    className="start-item" 
                    style={{ padding: '8px', position: 'relative' }} 
                    onMouseEnter={() => !isMobile && setSubMenu('multimedia')}
                    onMouseLeave={() => !isMobile && setSubMenu('programs')}
                    onClick={(e) => { e.stopPropagation(); setSubMenu(subMenu === 'multimedia' ? 'programs' : 'multimedia'); }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>📹 Multimedia</span>
                      <span>▶</span>
                    </div>
                    {subMenu === 'multimedia' && (
                      <div style={{ 
                        position: isMobile ? 'static' : 'absolute', 
                        left: isMobile ? 0 : '100%', 
                        top: isMobile ? 0 : 0, 
                        width: isMobile ? '100%' : '180px', 
                        background: '#c0c0c0', 
                        border: isMobile ? 'none' : '2px outset #fff',
                        borderLeft: isMobile ? '2px solid #888' : '2px outset #fff',
                        zIndex: 11003,
                        marginLeft: isMobile ? '10px' : '0'
                      }}>
                        <div className="start-item" style={{ padding: '8px' }} onClick={(e) => { e.stopPropagation(); openWindow('mplayer'); setStartOpen(false); }}>🎞️ Media Player</div>
                        <div className="start-item" style={{ padding: '8px' }} onClick={(e) => { e.stopPropagation(); openWindow('sndrec'); setStartOpen(false); }}>🎙️ Sound Recorder</div>
                        <div className="start-item" style={{ padding: '8px' }} onClick={(e) => { e.stopPropagation(); openWindow('multimedia_props'); setStartOpen(false); }}>⚙️ Właściwości</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="start-item" style={{ padding: '8px' }} onClick={(e) => { e.stopPropagation(); openWindow('terminal'); setStartOpen(false); }}>💻 Terminal</div>
                  <div className="start-item" style={{ padding: '8px' }} onClick={(e) => { e.stopPropagation(); openWindow('rituals'); setStartOpen(false); }}>📜 Baza Rytuałów</div>
                  <div className="start-item" style={{ padding: '8px' }} onClick={(e) => { e.stopPropagation(); openWindow('archive'); setStartOpen(false); }}>📖 Archiwum Teatralne</div>
                  <div className="start-item" style={{ padding: '8px' }} onClick={(e) => { e.stopPropagation(); openWindow('map'); setStartOpen(false); }}>🗺️ Mapa Regionu</div>
                  <div className="start-item" style={{ padding: '8px' }} onClick={(e) => { e.stopPropagation(); openWindow('scanner'); setStartOpen(false); }}>📡 Skaner Folkloru</div>
                </div>
              )}
            </div>

            {/* Narzędzia */}
            <div 
              className="start-item" 
              style={{ padding: '8px', cursor: 'pointer', position: 'relative' }} 
              onMouseEnter={() => !isMobile && setSubMenu('tools')}
              onMouseLeave={() => !isMobile && setSubMenu(null)}
              onClick={() => isMobile && setSubMenu(subMenu === 'tools' ? null : 'tools')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>🛠️ Narzędzia</span>
                <span>▶</span>
              </div>
              {subMenu === 'tools' && (
                <div style={{ 
                  position: isMobile ? 'static' : 'absolute', 
                  left: isMobile ? 0 : '100%', 
                  top: isMobile ? 0 : 0, 
                  width: isMobile ? '100%' : '180px', 
                  background: '#c0c0c0', 
                  border: isMobile ? 'none' : '2px outset #fff',
                  borderLeft: isMobile ? '2px solid #888' : '2px outset #fff',
                  boxShadow: isMobile ? 'none' : '2px 2px 10px rgba(0,0,0,0.3)',
                  zIndex: 11002,
                  marginLeft: isMobile ? '10px' : '0'
                }}>
                  <div className="start-item" style={{ padding: '8px' }} onClick={(e) => { e.stopPropagation(); openWindow('defrag'); setStartOpen(false); }}>💾 Defragmentator</div>
                  <div className="start-item" style={{ padding: '8px' }} onClick={(e) => { e.stopPropagation(); openWindow('logs'); setStartOpen(false); }}>📝 Logi Systemu</div>
                </div>
              )}
            </div>

            <div className="start-item" style={{ padding: '8px', cursor: 'pointer' }} onClick={() => { (window as any).switchMode?.('legacy'); setStartOpen(false); }}>🏺 Wersja Oryginalna</div>
            <div className="start-item" style={{ padding: '8px', cursor: 'pointer' }} onClick={() => { openWindow('vault'); setStartOpen(false); }}>📑 Dokumenty</div>
            <div className="start-item" style={{ padding: '8px', cursor: 'pointer' }} onClick={() => { openWindow('settings'); setStartOpen(false); }}>⚙️ Ustawienia Spektaklu</div>
            <hr style={{ border: '1px inset #fff', margin: '2px 0' }} />
            <div className="start-item" style={{ padding: '8px', cursor: 'pointer' }} onClick={() => { 
              window.dispatchEvent(new CustomEvent('mirek-command', { detail: { command: 'system-reset' } }));
              setStartOpen(false);
            }}>🚪 Zakończ pracę...</div>
          </div>
        </div>
      )}

      <style>{`
        .start-item:hover {
          background: #000080;
          color: white;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .typing-text-fast {
          display: inline-block;
          overflow: hidden;
          border-right: 2px solid white;
          white-space: nowrap;
          margin: 0 auto;
          letter-spacing: 2px;
          animation: 
            typing 0.5s steps(10, end),
            blink-caret 0.5s step-end infinite;
        }
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: white }
        }
      `}</style>
    </div>
  );
};

export default Taskbar;
