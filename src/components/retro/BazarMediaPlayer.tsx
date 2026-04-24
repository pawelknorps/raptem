import React, { useState, useEffect, useRef } from 'react';

const BazarMediaPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 124; 
  const [status, setStatus] = useState("Zatrzymano");
  const [isEnlarged, setIsEnlarged] = useState(false);
  
  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      setStatus("Odtwarzanie Manifestu...");
      interval = setInterval(() => {
        setCurrentTime(prev => (prev + 1) % duration);
      }, 1000);
    } else {
      setStatus("Oczekiwanie");
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div 
      className={`bazar-media-player ${isEnlarged ? 'manifest-enlarged' : ''}`} 
      onClick={() => !isEnlarged && setIsEnlarged(true)}
      style={{
        width: isEnlarged ? '600px' : '320px',
        background: '#c0c0c0',
        border: '3px outset #fff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-primary)',
        color: '#000',
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: isEnlarged ? 'default' : 'zoom-in',
        boxShadow: isEnlarged ? '0 0 50px rgba(0,0,0,0.8), 0 0 20px #f0f' : '2px 2px 0 #000',
        position: isEnlarged ? 'relative' : 'static',
        zIndex: isEnlarged ? 1000 : 1
      }}
    >
      {/* Manifest Header */}
      <div style={{ 
        background: isEnlarged ? 'linear-gradient(90deg, #000080, #0000ff)' : '#000080', 
        color: '#fff', 
        padding: '3px 8px', 
        fontSize: '12px', 
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '14px' }}>📽️</span>
          <div style={{ fontSize: '9px' }}>{chaosLevel > 0.6 ? 'AURA TEATRALNA' : 'SŁONECZNIE'}</div>
          <span>WIDEO MANIFEST: KUJAWIAK_DREAM.DAT</span>
        </div>
        {isEnlarged && (
          <button 
            onClick={(e) => { e.stopPropagation(); setIsEnlarged(false); }}
            style={{ background: '#c0c0c0', border: '1px outset #fff', color: '#000', padding: '0 5px', fontSize: '10px', cursor: 'pointer' }}
          >
            [X]
          </button>
        )}
      </div>

      {/* Video Display Area */}
      <div style={{
        background: '#000',
        height: isEnlarged ? '340px' : '180px',
        margin: '5px',
        border: '3px inset #fff',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'height 0.5s ease'
      }}>
        {isPlaying ? (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
             <img 
               src="assets/1000001851.webp" 
               style={{ 
                 width: '100%', 
                 height: '100%', 
                 objectFit: 'cover',
                 filter: isEnlarged ? 'sepia(0.3) contrast(1.5) brightness(1.1)' : 'sepia(0.5) contrast(1.2) brightness(0.9)',
                 animation: isEnlarged ? 'manifest-jitter 5s infinite alternate' : 'none'
               }} 
               alt="Video Content" 
             />
             {/* VHS Noise Overlay */}
             <div className="vhs-noise" style={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               background: 'url("https://media.giphy.com/media/oEI9uWUicS3Ze/giphy.gif")',
               opacity: isEnlarged ? 0.2 : 0.1,
               pointerEvents: 'none'
             }} />
             
             {isEnlarged && (
               <div style={{
                 position: 'absolute',
                 bottom: '20px',
                 left: '20px',
                 color: '#0f0',
                 fontFamily: 'monospace',
                 fontSize: '12px',
                 textShadow: '1px 1px #000',
                 background: 'rgba(0,0,0,0.5)',
                 padding: '5px'
               }}>
                 {">>> PROTOKÓŁ MANIFESTACJI AKTYWNY <<<"}<br/>
                 {">>> LOKALIZACJA: KOWAL / BAZAR <<<"}<br/>
                 {">>> STATUS: TOTALNY SPEKTAKL <<<"}
               </div>
             )}
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#555', fontSize: '3rem', animation: 'pulse 2s infinite' }}>🎞️</div>
            <div style={{ color: '#888', fontSize: '10px', marginTop: '10px' }}>KLIKNIJ ABY POWIĘKSZYĆ MANIFEST</div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div style={{ padding: '0 10px' }}>
        <div style={{ 
          height: '18px', 
          background: '#808080', 
          border: '1px inset #fff', 
          position: 'relative',
          marginBottom: '8px'
        }}>
          <div style={{ 
            height: '100%', 
            background: isEnlarged ? 'linear-gradient(90deg, #000080, #f0f)' : '#000080', 
            width: `${(currentTime / duration) * 100}%` 
          }} />
          <div style={{
            position: 'absolute',
            left: `${(currentTime / duration) * 100}%`,
            top: '-2px',
            width: '10px',
            height: '20px',
            background: '#c0c0c0',
            border: '2px outset #fff',
            transform: 'translateX(-50%)'
          }} />
        </div>
      </div>

      {/* Controls Container */}
      <div style={{ 
        padding: '8px 10px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        borderTop: '1px solid #888'
      }}>
        <button className="win95-button" style={{ padding: '3px 10px', fontWeight: 'bold' }} onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}>
          {isPlaying ? 'PAUZA' : 'ODTWÓRZ MANIFEST'}
        </button>
        <button className="win95-button" style={{ padding: '3px 10px' }} onClick={(e) => { e.stopPropagation(); setIsPlaying(false); setCurrentTime(0); }}>
          STOP
        </button>
        <div style={{ flexGrow: 1 }} />
        <div style={{ 
          background: '#000', 
          color: '#0f0', 
          padding: '3px 8px', 
          fontSize: '12px', 
          fontFamily: 'monospace',
          border: '2px inset #fff',
          width: '100px',
          textAlign: 'center'
        }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Status Bar */}
      <div style={{ 
        padding: '3px 8px', 
        fontSize: '11px', 
        borderTop: '1px solid #fff', 
        background: '#c0c0c0',
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 'bold'
      }}>
        <span>{status}</span>
        <span style={{ color: isEnlarged ? '#000080' : '#444' }}>{isEnlarged ? 'TRYB MANIFESTU GŁĘBOKIEGO' : 'BAZAR-VIDEO v2.0'}</span>
      </div>

      <style>{`
        @keyframes manifest-jitter {
          0% { filter: sepia(0.3) contrast(1.5) brightness(1.1); }
          50% { filter: sepia(0.3) contrast(1.6) brightness(1.2) hue-rotate(5deg); }
          100% { filter: sepia(0.3) contrast(1.5) brightness(1.1); }
        }
        @keyframes pulse {
          0% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.5; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default BazarMediaPlayer;
