import React, { useState, useEffect, useRef } from 'react';
import { globalStage } from '../../scripts/StageEngine';

interface StagePlayerProps {
  audioUrl?: string;
}

const StagePlayer: React.FC<StagePlayerProps> = ({ audioUrl = 'assets/track_01.mp3' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent('ritual-stop'));
    } else {
      await globalStage.init();
      const ctx = globalStage.getContext();
      const analyzer = globalStage.getAnalyzer();
      
      if (ctx) {
        if (ctx.state === 'suspended') {
          await ctx.resume();
        }
        
        if (analyzer && !audioRef.current.dataset.connected) {
          const source = ctx.createMediaElementSource(audioRef.current);
          source.connect(analyzer);
          analyzer.connect(ctx.destination);
          audioRef.current.dataset.connected = "true";
        }
      }

      audioRef.current.play()
      .catch(err => console.error('Error loading stage audio:', err));
      setIsPlaying(true);
      window.dispatchEvent(new CustomEvent('ritual-start'));
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        window.dispatchEvent(new CustomEvent('ritual-stop'));
      }
    };
  }, []);

  return (
    <div className="stage-player win95-inset" style={{ padding: '10px', background: '#c0c0c0', width: '200px' }}>
      {audioUrl.endsWith('.mp4') ? (
        <video ref={audioRef as any} src={audioUrl} loop style={{ display: 'none' }} />
      ) : (
        <audio ref={audioRef} src={audioUrl} loop />
      )}
      <div style={{ fontSize: '10px', marginBottom: '5px', fontWeight: 'bold' }}>BAZAR_STAGE_AUDIO.SYS</div>
      <button 
        onClick={togglePlay} 
        className="win95-button"
        style={{ width: '100%', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
      >
        {isPlaying ? '⏹ ZATRZYMAJ WIXĘ' : '▶ ODPAL WIXĘ'}
      </button>
      {isPlaying && (
        <div style={{ marginTop: '5px', height: '4px', background: '#000', overflow: 'hidden' }}>
          <div className="progress-bar-fill" style={{ height: '100%', background: '#0f0', width: '100%', animation: 'progress-indet 2s linear infinite' }}></div>
        </div>
      )}
      <style>{`
        @keyframes progress-indet {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default StagePlayer;
