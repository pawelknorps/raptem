import React, { useMemo } from 'react';

const ASSETS = [
  'assets/spirytus.png',
  'assets/new.gif',
  'assets/construction.gif',
  'assets/dancer_pixel.png',
  'assets/accordion.png',
  'assets/basy.png',
  'assets/polonez.png',
  'assets/pks_stop.png',
];

const StickerBomb: React.FC<{ count?: number }> = ({ count = 15 }) => {
  const stickers = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      src: ASSETS[Math.floor(Math.random() * ASSETS.length)],
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
      rotate: `${(Math.random() - 0.5) * 60}deg`,
      size: `${Math.random() * 40 + 20}px`,
      delay: `${Math.random() * 5}s`
    }));
  }, [count]);

  return (
    <div className="sticker-bomb-layer">
      {stickers.map(s => (
        <img 
          key={s.id}
          src={s.src}
          className="bomb-sticker"
          style={{
            top: s.top,
            left: s.left,
            transform: `rotate(${s.rotate})`,
            width: s.size,
            animationDelay: s.delay
          }}
        />
      ))}
      <style dangerouslySetInnerHTML={{ __html: `
        .sticker-bomb-layer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 5; /* Behind everything but frames */
          opacity: 0.4;
        }
        .bomb-sticker {
          position: absolute;
          image-rendering: pixelated;
          animation: drift 10s ease-in-out infinite;
        }
        @keyframes drift {
          0%, 100% { transform: translate(0,0) rotate(var(--rot)); }
          50% { transform: translate(10px, -10px) rotate(calc(var(--rot) + 5deg)); }
        }
      `}} />
    </div>
  );
};

export default StickerBomb;
