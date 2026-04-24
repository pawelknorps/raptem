import React, { useState, useEffect } from 'react';

interface PatternProps {
  count?: number;
  opacity?: number;
}

const FolkPatternGenerator: React.FC<PatternProps> = ({ count = 5, opacity = 0.2 }) => {
  const [shapes, setShapes] = useState<{ id: number, x: number, y: number, size: number, rotation: number, color: string }[]>([]);

  const colors = ["#000080", "#ff0000", "#008000", "#ffff00", "#ffffff"]; // Navy, Red, Green, Yellow, White (Kujawy colors)

  useEffect(() => {
    const generateShapes = () => {
      const newShapes = Array.from({ length: count }).map((_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 30 + Math.random() * 50,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      setShapes(newShapes);
    };

    generateShapes();
    const interval = setInterval(generateShapes, 10000); // Change every 10s
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none', 
      overflow: 'hidden',
      opacity: opacity,
      zIndex: 1
    }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {shapes.map(s => (
          <g key={s.id} transform={`translate(${s.x}, ${s.y}) rotate(${s.rotation})`}>
            {/* Simple Kujawy-style flower */}
            <circle cx="0" cy="0" r={s.size / 10} fill={s.color} />
            {Array.from({ length: 5 }).map((_, i) => (
              <ellipse 
                key={i} 
                cx="0" 
                cy={s.size / 8} 
                rx={s.size / 20} 
                ry={s.size / 10} 
                fill={s.color} 
                transform={`rotate(${i * 72})`} 
              />
            ))}
            <path 
              d={`M -${s.size/15} 0 Q 0 -${s.size/5} ${s.size/15} 0`} 
              stroke={s.color} 
              fill="none" 
              strokeWidth="0.5" 
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default FolkPatternGenerator;
