import React, { useState, useRef, useEffect } from 'react';
import { vibeManager } from '../../lib/LoreEngine';
import { useWindowStore } from '../../lib/windowStore';
import { usePlayerStore, WorldAura } from '../../lib/playerStore';
import KujawiakShapes from './KujawiakShapes';

const DesktopSurface: React.FC = () => {
  const [lasso, setLasso] = useState<{ startX: number, startY: number, currentX: number, currentY: number } | null>(null);
  const [chaosLevel, setChaosLevel] = useState(0);
  const [showShapes, setShowShapes] = useState(false);
  const [aura, setAura] = useState<WorldAura>('NEUTRAL');
  const { currentWorkspace } = useWindowStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.target !== containerRef.current) return;
    
    setLasso({
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY
    });
  };

  useEffect(() => {
    // Occasional shape shuffle
    const interval = setInterval(() => {
      setShowShapes(prev => !prev);
    }, 45000); // Toggle every 45s

    const handleChaos = (e: any) => {
      setChaosLevel(e.detail.level);
    };
    window.addEventListener('chaos-update', handleChaos);

    // Aura Reactivity
    const updateAura = () => {
      const currentAura = usePlayerStore.getState().getWorldAura();
      setAura(currentAura);
      
      const root = document.documentElement;
      if (currentAura === 'CHAOS') {
        root.style.setProperty('--win-blue', '#500'); // Blood red for chaos
        root.style.setProperty('--win-blue-light', '#a00');
      } else if (currentAura === 'TRADITION') {
        root.style.setProperty('--win-blue', '#004000'); // Forest green for tradition
        root.style.setProperty('--win-blue-light', '#008000');
      } else {
        root.style.setProperty('--win-blue', '#000080'); // Classic Win95 Blue
        root.style.setProperty('--win-blue-light', '#1084d0');
      }
    };

    updateAura();
    const unsubPlayer = usePlayerStore.subscribe(updateAura);

    const unsubVibe = vibeManager.subscribe((vibe) => {
      const root = document.documentElement;
      switch (vibe) {
        case 'KUJAWIAK_PHOTO':
          root.style.setProperty('--win-teal', '#704214'); // Sepia/Brown
          root.style.setProperty('--main-bg', 'url("assets/wood_pattern.webp")');
          break;
        case 'POLISH_MOUSE':
          root.style.setProperty('--win-teal', '#808080'); // Grey
          root.style.setProperty('--main-bg', 'url("assets/pixel_grid.webp")');
          break;
        case 'VAPORWAVE':
          root.style.setProperty('--win-teal', '#ff71ce'); // Pink
          root.style.setProperty('--main-bg', 'url("assets/vapor_grid.webp")');
          break;
        case 'BAZAR_WAVE':
          root.style.setProperty('--win-teal', '#fffb00'); // Yellow
          root.style.setProperty('--main-bg', 'url("assets/bazar_stripes.webp")');
          break;
        case 'POLAND_WAVE':
          root.style.setProperty('--win-teal', '#444444'); // Concrete
          root.style.setProperty('--main-bg', 'url("assets/concrete_pattern.webp")');
          break;
        default:
          root.style.setProperty('--win-teal', '#008080'); // Classic Teal
          root.style.setProperty('--main-bg', 'url("assets/kujawy_pattern.webp")');
      }
    });

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
      clearInterval(interval);
      window.removeEventListener('chaos-update', handleChaos);
      unsubVibe();
      unsubPlayer();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [lasso]);

  return (
    <div 
      ref={containerRef}
      className="desktop-surface breathing"
      onMouseDown={onMouseDown}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 5,
        pointerEvents: 'auto',
        overflow: 'hidden',
        transition: 'background-position 0.5s ease-in-out'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '300%',
          height: '100%',
          display: 'flex',
          transform: `translateX(-${(currentWorkspace * 100) / 3}%)`,
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          filter: aura === 'CHAOS' ? 'contrast(1.5) grayscale(0.5) sepia(0.5) hue-rotate(-50deg)' : 
                  aura === 'TRADITION' ? 'saturate(0.8) sepia(0.2) contrast(0.9)' : 
                  aura === 'DYSTOPIA' ? 'invert(1) grayscale(1) contrast(2)' :
                  aura === 'HARMONY' ? 'saturate(2) brightness(1.2) hue-rotate(10deg)' : 'none'
        }}>
        {/* Workspace 1: Main */}
        <div style={{ width: '33.33%', height: '100%', position: 'relative' }}>
          {showShapes && <KujawiakShapes count={5} speed={0.5} />}
          {aura === 'CHAOS' && <div style={{ position: 'absolute', top: '10%', right: '10%', opacity: 0.1, fontSize: '5rem', color: '#f00' }}>RADIO BABILON</div>}
          {aura === 'TRADITION' && <div style={{ position: 'absolute', top: '10%', right: '10%', opacity: 0.1, fontSize: '5rem', color: '#fff' }}>TEATR RAPTUM</div>}
        </div>
        
        {/* Workspace 2: Multimedia */}
        <div style={{ width: '33.33%', height: '100%', position: 'relative', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ position: 'absolute', top: '20%', left: '10%', opacity: 0.2, fontSize: '10rem', fontWeight: 'bold', color: '#fff', pointerEvents: 'none' }}>VIDEO</div>
        </div>

        {/* Workspace 3: Archive */}
        <div style={{ width: '33.33%', height: '100%', position: 'relative', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ position: 'absolute', top: '20%', left: '10%', opacity: 0.2, fontSize: '10rem', fontWeight: 'bold', color: '#fff', pointerEvents: 'none' }}>FOTO</div>
        </div>
      </div>
      {/* Background Shapes Layer */}
      {showShapes && <KujawiakShapes count={15} speed={0.5} />}

      {/* Corruption Layer */}
      {chaosLevel > 0.5 && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `repeating-linear-gradient(0deg, rgba(0,255,0,${(chaosLevel - 0.5) * 0.1}) 0px, transparent 1px, transparent 2px)`,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          animation: 'flicker 0.1s infinite'
        }} />
      )}

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
