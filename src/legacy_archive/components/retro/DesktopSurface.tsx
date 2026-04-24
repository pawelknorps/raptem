import React, { useState, useRef, useEffect } from 'react';

const DesktopSurface: React.FC = () => {
  const [lasso, setLasso] = useState<{ startX: number, startY: number, currentX: number, currentY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    // Only trigger if clicking directly on the desktop surface
    if (e.target !== containerRef.current) return;
    
    setLasso({
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY
    });
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (lasso) {
        setLasso(prev => prev ? { ...prev, currentX: e.clientX, currentY: e.clientY } : null);
      }
    };

    const onMouseUp = () => setLasso(null);

    if (lasso) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [lasso]);

  return (
    <div 
      ref={containerRef}
      className="desktop-surface"
      onMouseDown={onMouseDown}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 5, // Just above the background but below windows/icons
        pointerEvents: 'auto'
      }}
    >
      {lasso && (
        <div 
          className="lasso-selection"
          style={{
            left: Math.min(lasso.startX, lasso.currentX),
            top: Math.min(lasso.startY, lasso.currentY),
            width: Math.abs(lasso.currentX - lasso.startX),
            height: Math.abs(lasso.currentY - lasso.startY)
          }}
        />
      )}
    </div>
  );
};

export default DesktopSurface;
