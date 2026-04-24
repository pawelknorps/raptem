import React, { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '../../lib/windowStore';

interface DraggableWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  initialWidth?: number;
  initialHeight?: number;
  statusText?: string;
  onClose?: () => void;
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({ 
  id,
  title, 
  children, 
  initialX = 100, 
  initialY = 100,
  initialWidth = 400,
  initialHeight = 300,
  statusText = "Gotowy",
  onClose 
}) => {
  const { windows, registerWindow, toggleMinimize, toggleMaximize, focusWindow, closeWindow, openWindow, isMobile, updatePosition, updateSize, setIsMobile } = useWindowStore();
  
  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);

  const clampPos = (x: number, y: number, w: number, h: number) => {
    if (typeof window === 'undefined') return { x, y };
    // Very relaxed clamping: keep at least a small corner of the title bar visible
    const maxX = window.innerWidth - 40;
    const minX = -w + 40;
    const maxY = window.innerHeight - 30;
    const minY = 0; // Title bar should not go above top
    return {
      x: Math.max(minX, Math.min(x, maxX)),
      y: Math.max(minY, Math.min(y, maxY))
    };
  };

  const getSavedSize = () => {
    if (typeof window === 'undefined') return { width: initialWidth, height: initialHeight };
    const saved = localStorage.getItem(`win_size_${id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          width: Math.max(200, parseInt(parsed.width) || initialWidth),
          height: Math.max(100, parseInt(parsed.height) || initialHeight)
        };
      } catch (e) {}
    }
    return { width: initialWidth, height: initialHeight };
  };

  const getSavedPos = () => {
    const s = getSavedSize();
    if (typeof window === 'undefined') return { x: initialX, y: initialY };
    const saved = localStorage.getItem(`win_pos_${id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const savedX = parseInt(parsed.left) || initialX;
        const savedY = parseInt(parsed.top) || initialY;
        return clampPos(savedX, savedY, s.width, s.height);
      } catch (e) {
        return clampPos(initialX, initialY, s.width, s.height);
      }
    }
    return clampPos(initialX, initialY, s.width, s.height);
  };

  const [pos, setPos] = useState(getSavedPos());
  const [size, setSize] = useState(getSavedSize());
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const resizeDir = useRef<string | null>(null);
  const offset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const snapThreshold = 10;

  const winState = windows[id];

  useEffect(() => {
    if (!winState) {
      registerWindow(id, title);
    }
  }, [id, title, winState, registerWindow]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    focusWindow(id);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      offset.current = {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
      setIsDragging(true);
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent | React.TouchEvent, dir: string) => {
    e.stopPropagation();
    focusWindow(id);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    offset.current = { x: clientX, y: clientY };
    resizeDir.current = dir;
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        let newX = clientX - offset.current.x;
        let newY = clientY - offset.current.y;
        
        // Relaxed viewport clamping during drag
        const clamped = clampPos(newX, newY, size.width, size.height);
        newX = clamped.x;
        newY = clamped.y;

        if (Math.abs(newX) < snapThreshold) newX = 0;
        if (Math.abs(newY) < snapThreshold) newY = 0;

        setPos({ x: newX, y: newY });
      } else if (isResizing && resizeDir.current) {
        const deltaX = clientX - offset.current.x;
        const deltaY = clientY - offset.current.y;
        
        let newWidth = size.width;
        let newHeight = size.height;

        if (resizeDir.current.includes('e')) newWidth = Math.max(200, size.width + deltaX);
        if (resizeDir.current.includes('s')) newHeight = Math.max(100, size.height + deltaY);

        setSize({ width: newWidth, height: newHeight });
        offset.current = { x: clientX, y: clientY };
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      resizeDir.current = null;
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, isResizing, size]);

  useEffect(() => {
    if (!isDragging && !isResizing && !isMobile) {
      updatePosition(id, pos.x, pos.y);
      updateSize(id, size.width, size.height);
      localStorage.setItem(`win_pos_${id}`, JSON.stringify({ left: `${pos.x}px`, top: `${pos.y}px` }));
      localStorage.setItem(`win_size_${id}`, JSON.stringify({ width: `${size.width}px`, height: `${size.height}px` }));
    }
  }, [pos, size, isDragging, isResizing, id, isMobile, updatePosition, updateSize]);

  useEffect(() => {
    const handleOpen = (e: any) => {
      if (e.detail === id) {
        openWindow(id);
        focusWindow(id);
      }
    };
    window.addEventListener('open-window', handleOpen);
    return () => window.removeEventListener('open-window', handleOpen);
  }, [id, openWindow, focusWindow]);

  const [isShaking, setIsShaking] = useState(false);

  const handleDoubleClick = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);
    toggleMaximize(id);
  };

  if (!winState || !winState.isOpen) return null;

  const isFocused = winState.zIndex === Math.max(...Object.values(windows).map(w => w.zIndex));

  const winStyle: React.CSSProperties = isMobile
    ? {
        position: 'relative',
        width: '100%',
        height: 'auto',
        marginBottom: '20px',
        zIndex: 100,
        display: winState.isMinimized ? 'none' : 'flex',
        flexDirection: 'column',
        background: '#c0c0c0',
        border: '2px outset #fff',
      }
    : winState.isMaximized 
    ? {
        position: 'fixed',
        left: 0,
        top: '42px', // Below ChaosHeader
        width: '100vw',
        height: 'calc(100vh - 74px)', // Adjust for Taskbar
        zIndex: winState.zIndex,
        display: 'flex',
        flexDirection: 'column',
        background: '#c0c0c0',
        border: 'none',
        transform: 'translateZ(0)',
      }
    : {
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: winState.zIndex,
        minWidth: '200px',
        minHeight: '100px',
        background: '#c0c0c0',
        border: '2px outset #fff',
        boxShadow: isFocused ? '6px 6px 15px rgba(0,0,0,0.6)' : '2px 2px 5px rgba(0,0,0,0.3)',
        display: winState.isMinimized ? 'none' : 'flex',
        flexDirection: 'column',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      };

  return (
    <div 
      ref={windowRef}
      className={`win95-window ${winState.isMinimized ? 'minimized' : ''} draggable-window ${isShaking ? 'window-shake-active' : ''}`}
      data-window-id={id}
      style={winStyle}
      onMouseDown={() => focusWindow(id)}
      onTouchStart={() => focusWindow(id)}
    >
      {/* Title Bar */}
      <div 
        className="window-title-bar window-title"
        onMouseDown={!isMobile ? handleMouseDown : undefined}
        onTouchStart={!isMobile ? handleMouseDown : undefined}
        onDoubleClick={!isMobile ? handleDoubleClick : undefined}
        style={{
          background: isFocused ? 'linear-gradient(90deg, #000080, #1084d0)' : '#808080',
          color: 'white',
          padding: '3px 6px',
          fontWeight: 'bold',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: !isMobile ? 'move' : 'default',
          userSelect: 'none',
          height: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <img src="/favicon.svg" alt="" style={{ width: '14px', height: '14px', imageRendering: 'pixelated' }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button className="win95-button" style={{ width: '18px', height: '18px', padding: 0, fontSize: '10px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }} onClick={(e) => { e.stopPropagation(); toggleMinimize(id); }}>
            <span style={{ marginTop: '-4px' }}>_</span>
          </button>
          <button className="win95-button" style={{ width: '18px', height: '18px', padding: 0, fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }}>
            {winState.isMaximized ? '\u25F0' : '\u25A1'}
          </button>
          <button className="win95-button" style={{ width: '18px', height: '18px', padding: 0, fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => { e.stopPropagation(); closeWindow(id); if (onClose) onClose(); }}>
            &#10005;
          </button>
        </div>
      </div>
      
      {/* Menu Bar (Mock) */}
      <div style={{ background: '#c0c0c0', borderBottom: '1px solid #888', display: 'flex', gap: '10px', padding: '1px 5px', fontSize: '11px', color: '#000' }}>
        <span>Plik</span>
        <span>Edycja</span>
        <span>Widok</span>
        <span>Pomoc</span>
      </div>

      <div className="window-content" style={{ 
        padding: '12px', 
        overflow: 'auto', 
        flexGrow: 1,
        background: '#fff', 
        boxShadow: 'inset 2px 2px 0 #888, inset -1px -1px 0 #fff',
        margin: '2px',
        color: '#000',
        fontSize: '13px',
        position: 'relative'
      }}>
        {children}
      </div>

      {/* Status Bar */}
      <div className="window-status-bar" style={{
        background: '#c0c0c0',
        borderTop: '1px solid #888',
        padding: '2px 5px',
        fontSize: '10px',
        display: 'flex',
        gap: '12px',
        color: '#000',
        height: '20px',
        alignItems: 'center'
      }}>
        <div style={{ flex: 1, borderRight: '1px solid #888', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {statusText}
        </div>
        <div style={{ width: '60px', borderRight: '1px solid #888' }}>
          CPU: {Math.floor(Math.random() * 100)}%
        </div>
        <div style={{ width: '100px' }}>
          {Math.random() < 0.05 ? "DUCHY WYKRYTE" : "1 objects selected"}
        </div>
      </div>

      {/* Resize Handles */}
      {!winState.isMaximized && !isMobile && (
        <>
          <div 
            style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '4px', cursor: 'e-resize' }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'e')}
            onTouchStart={(e) => handleResizeMouseDown(e, 'e')}
          />
          <div 
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '4px', cursor: 's-resize' }}
            onMouseDown={(e) => handleResizeMouseDown(e, 's')}
            onTouchStart={(e) => handleResizeMouseDown(e, 's')}
          />
          <div 
            style={{ position: 'absolute', right: 0, bottom: 0, width: '10px', height: '10px', cursor: 'se-resize', zIndex: 10 }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
            onTouchStart={(e) => handleResizeMouseDown(e, 'se')}
          />
        </>
      )}
    </div>
  );
};


export default DraggableWindow;
