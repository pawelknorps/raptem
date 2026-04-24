import React, { useMemo } from 'react';

interface ShapeProps {
  count: number;
  speed: number;
}

const KujawiakShapes: React.FC<ShapeProps> = ({ count, speed }) => {
  const shapes = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: 20 + Math.random() * 60,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${(15 + Math.random() * 20) / speed}s`,
      rotation: `${Math.random() * 360}deg`,
      type: Math.random() > 0.5 ? 'rhombus' : 'square'
    }));
  }, [count, speed]);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
      overflow: 'hidden',
      opacity: 0.15
    }}>
      {shapes.map(s => (
        <div 
          key={s.id}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            border: '2px solid #000080',
            transform: `rotate(${s.rotation})`,
            animation: `float-shapes ${s.duration} linear infinite`,
            animationDelay: s.delay,
            clipPath: s.type === 'rhombus' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 'none'
          }}
        />
      ))}
      <style>{`
        @keyframes float-shapes {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(100px, -200px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default KujawiakShapes;
