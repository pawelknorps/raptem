import React, { useState, useEffect } from 'react';
import engine from '../../scripts/ChaosEngine';
import { useWindowStore } from '../../lib/windowStore';

const Taskbar: React.FC = () => {
  const [time, setTime] = useState('');
  const [startOpen, setStartOpen] = useState(false);
  const [chaosLevel, setChaosLevel] = useState(0);
  const { windows, focusWindow, toggleMinimize } = useWindowStore();

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
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '32px',
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
        <img src="assets/polonez.png" style={{ height: '16px', filter: chaosLevel > 0.8 ? 'hue-rotate(90deg)' : '' }} alt="Start" />
        START
      </button>

      {/* Task List */}
      <div style={{ flexGrow: 1, display: 'flex', gap: '5px', padding: '0 8px', overflowX: 'auto', height: '100%' }}>
        {activeWindows.map(win => (
          <button 
            key={win.id}
            className={`win95-button task-item ${win.isFocused ? 'active' : ''}`}
            onClick={() => {
              if (win.isMinimized) {
                focusWindow(win.id);
              } else if (win.isFocused) {
                toggleMinimize(win.id);
              } else {
                focusWindow(win.id);
              }
            }}
            onMouseEnter={() => {
              // Future: show thumbnail preview
            }}
            style={{
              padding: '0 8px',
              fontSize: '11px',
              minWidth: '120px',
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
        gap: '12px',
        fontSize: '12px',
        marginLeft: 'auto'
      }}>
        {/* Chaos Meter Mini */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '9px' }}>WIXA:</span>
          <div style={{ width: '40px', height: '10px', background: '#000', border: '1px solid #888', position: 'relative' }}>
             <div style={{ 
               width: `${chaosLevel * 100}%`, 
               height: '100%', 
               background: chaosLevel > 0.7 ? '#f0f' : '#0f0',
               transition: 'width 0.2s ease, background 0.5s ease'
             }} />
          </div>
        </div>
        
        <img src="assets/spirytus.png" style={{ height: '16px', animation: chaosLevel > 0.5 ? 'spin 2s linear infinite' : 'none' }} alt="Tray" />
        <span style={{ minWidth: '60px' }}>{time}</span>
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
          bottom: '32px',
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
            <div className="start-item" style={{ padding: '8px', cursor: 'pointer' }}>📁 Programy</div>
            <div className="start-item" style={{ padding: '8px', cursor: 'pointer' }}>📑 Dokumenty</div>
            <div className="start-item" style={{ padding: '8px', cursor: 'pointer' }}>⚙️ Ustawienia Wixy</div>
            <hr style={{ border: '1px inset #fff', margin: '2px 0' }} />
            <div className="start-item" style={{ padding: '8px', cursor: 'pointer' }} onClick={() => window.location.reload()}>🚪 Restart Sołtysa</div>
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
