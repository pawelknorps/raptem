import React, { useState, useEffect } from 'react';
import { generateLoreLine, getLoreSnippet, getRandomGlitch, type Vibe } from '../../lib/LoreEngine';

const VIBES: Vibe[] = ['DEFAULT', 'KUJAWIAK_PHOTO', 'POLISH_MOUSE', 'VAPORWAVE', 'BAZAR_WAVE', 'POLAND_WAVE'];

const LoreGlitches: React.FC = () => {
  const [floatingLore, setFloatingLore] = useState<{ id: number, text: string, x: number, y: number, opacity: number, color: string }[]>([]);

  useEffect(() => {
    // 1. Spawning floating lore
    const spawnLore = () => {
      if (Math.random() < 0.3) {
        const id = Date.now();
        const vibe = VIBES[Math.floor(Math.random() * VIBES.length)];
        
        const vibeColors: Record<Vibe, string> = {
          'DEFAULT': '#0f0',
          'KUJAWIAK_PHOTO': '#c2b280',
          'POLISH_MOUSE': '#00ffff',
          'VAPORWAVE': '#ff71ce',
          'BAZAR_WAVE': '#fffb00',
          'POLAND_WAVE': '#cccccc'
        };

        const newLore = {
          id,
          text: getLoreSnippet(vibe),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: 0,
          color: vibeColors[vibe] || '#fff'
        };
        setFloatingLore(prev => [...prev, newLore]);
        
        // Fade in and out
        setTimeout(() => {
          setFloatingLore(prev => prev.map(l => l.id === id ? { ...l, opacity: 0.8 } : l));
        }, 100);

        setTimeout(() => {
          setFloatingLore(prev => prev.map(l => l.id === id ? { ...l, opacity: 0 } : l));
          setTimeout(() => {
            setFloatingLore(prev => prev.filter(l => l.id !== id));
          }, 1000);
        }, 4000);
      }
    };

    // 2. Glitching UI elements
    const glitchUI = () => {
      const titles = document.querySelectorAll('.window-title span');
      titles.forEach(title => {
        if (Math.random() < 0.05) {
          const original = title.getAttribute('data-original') || title.textContent || '';
          if (!title.getAttribute('data-original')) title.setAttribute('data-original', original);
          
          const vibe = VIBES[Math.floor(Math.random() * VIBES.length)];
          title.textContent = generateLoreLine(vibe).substring(0, 30) + "...";
          
          setTimeout(() => {
            title.textContent = original;
          }, 2000);
        }
      });

      const menuItems = document.querySelectorAll('.win-menu-item span');
      menuItems.forEach(item => {
         if (Math.random() < 0.05) {
            const text = item.textContent || "";
            const glitched = getRandomGlitch(text.toUpperCase().replace("📁 ", ""));
            if (glitched !== text) {
              const original = text;
              item.textContent = glitched;
              setTimeout(() => { item.textContent = original; }, 3000);
            }
         }
      });
    };

    // 3. Random background drift
    const randomDrift = () => {
      if (Math.random() < 0.1) {
        const hue = Math.floor(Math.random() * 360);
        document.documentElement.style.setProperty('--chaos-hue', `${hue}deg`);
      }
    };

    const loreInterval = setInterval(spawnLore, 4000);
    const glitchInterval = setInterval(glitchUI, 8000);
    const driftInterval = setInterval(randomDrift, 12000);

    return () => {
      clearInterval(loreInterval);
      clearInterval(glitchInterval);
      clearInterval(driftInterval);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 99999 }}>
      {floatingLore.map(lore => (
        <div key={lore.id} style={{
          position: 'absolute',
          left: lore.x,
          top: lore.y,
          color: lore.color,
          fontSize: '11px',
          fontWeight: 'bold',
          fontFamily: 'var(--font-mono)',
          textShadow: '1px 1px 3px #000',
          opacity: lore.opacity,
          transition: 'opacity 1s, transform 4s linear',
          transform: `translateY(-40px)`,
          whiteSpace: 'nowrap',
          zIndex: 99999
        }}>
          {lore.text}
        </div>
      ))}
    </div>
  );
};

export default LoreGlitches;
