import React, { useState, useEffect } from 'react';
import { generateLoreLine, type Vibe } from '../../lib/LoreEngine';

const VIBES: Vibe[] = ['DEFAULT', 'KUJAWIAK_PHOTO', 'POLISH_MOUSE', 'VAPORWAVE', 'BAZAR_WAVE', 'POLAND_WAVE'];

const NewsTicker: React.FC = () => {
  const [lore, setLore] = useState("");

  useEffect(() => {
    const updateLore = () => {
      const randomVibe = VIBES[Math.floor(Math.random() * VIBES.length)];
      setLore(generateLoreLine(randomVibe));
    };
    updateLore();
    const interval = setInterval(updateLore, 10000); // New lore every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '18px',
      left: 0,
      width: '100%',
      height: '24px',
      background: '#c0c0c0',
      borderBottom: '2px outset #fff',
      display: 'flex',
      alignItems: 'center',
      zIndex: 100000,
      overflow: 'hidden'
    }}>
      <div style={{
        background: '#000080',
        color: '#fff',
        padding: '0 10px',
        fontSize: '11px',
        fontWeight: 'bold',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap'
      }}>
        WIADOMOŚCI BAZARU:
      </div>
      <div style={{ flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
        <marquee style={{ fontSize: '12px', color: '#000', fontWeight: 'bold' }}>
          +++ PILNE: {lore} +++ POGODA: NA KUJAWACH PRZEWIDYWANE PRZEBUDZENIE TRADYCJI I OPADY FOLKLORU +++ BILETY: NA SPEKTAKL W KOWALU WYPRZEDANE +++
        </marquee>
      </div>
    </div>
  );
};

export default NewsTicker;
