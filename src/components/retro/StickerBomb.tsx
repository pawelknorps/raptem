import React, { useMemo } from 'react';

interface StickerProps {
  count: number;
}

const StickerBomb: React.FC<StickerProps> = ({ count }) => {
  const assets = [
    'assets/new.gif',
    'assets/construction.gif',
    'assets/spirytus.webp',
    'assets/dancer_pixel.webp'
  ];

  const stickers = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      src: assets[Math.floor(Math.random() * assets.length)],
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
      rotation: `${(Math.random() - 0.5) * 60}deg`,
      size: `${20 + Math.random() * 40}px`,
      opacity: 0.05 + Math.random() * 0.1
    }));
  }, [count]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 2
    }}>
      {stickers.map(s => (
        <img 
          key={s.id}
          src={s.src}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            width: s.size,
            transform: `rotate(${s.rotation})`,
            opacity: s.opacity,
            filter: 'grayscale(0.5)'
          }}
        />
      ))}
    </div>
  );
};

export default StickerBomb;
