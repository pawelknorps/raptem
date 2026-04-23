import React, { useState, useEffect, useRef } from 'react';

interface WixaPlayerProps {
  audioUrl: string;
}

const WixaPlayer: React.FC<WixaPlayerProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    // Initialize AudioContext
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Load and decode audio
    fetch(audioUrl)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContextRef.current?.decodeAudioData(arrayBuffer))
      .then(decodedBuffer => {
        if (decodedBuffer) {
          bufferRef.current = decodedBuffer;
        }
      })
      .catch(err => console.error('Error loading audio:', err));

    return () => {
      audioContextRef.current?.close();
    };
  }, [audioUrl]);

  const togglePlayback = async () => {
    if (!audioContextRef.current || !bufferRef.current) return;

    if (isPlaying) {
      sourceNodeRef.current?.stop();
      setIsPlaying(false);
    } else {
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const source = audioContextRef.current.createBufferSource();
      source.buffer = bufferRef.current;
      
      // Apply the "Screwed" effect: -400 cents detune
      source.detune.value = -400;
      
      // Add a low-pass filter for the "muddy" 90s feel
      const filter = audioContextRef.current.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 3000;

      source.connect(filter);
      filter.connect(audioContextRef.current.destination);
      
      source.start(0);
      sourceNodeRef.current = source;
      setIsPlaying(true);
      
      source.onended = () => setIsPlaying(false);
    }
  };

  return (
    <div className="wixa-player" style={{ textAlign: 'center', margin: '20px 0' }}>
      <button 
        className="win95-button" 
        onClick={togglePlayback}
        style={{ fontSize: '1.5rem', padding: '15px 30px', backgroundColor: '#ff00ff', color: 'white' }}
      >
        {isPlaying ? 'STOP WIXA' : 'KLIKNIJ ABY ODPALIĆ WIXĘ'}
      </button>
      <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--text-lime)', fontFamily: 'var(--font-mono)' }}>
        {isPlaying ? '>>> WIXA IN PROGRESS <<<' : '--- SYSTEM READY ---'}
      </div>
    </div>
  );
};

export default WixaPlayer;
