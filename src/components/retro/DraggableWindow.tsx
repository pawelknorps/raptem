import React, { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '../../lib/windowStore';

interface DraggableWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  onClose?: () => void;
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({ 
  id,
  title, 
  children, 
  initialX = 100, 
  initialY = 100,
  onClose 
}) => {
  const { windows, registerWindow, toggleMinimize, focusWindow, closeWindow, openWindow } = useWindowStore();
  
  // Load initial position from localStorage if available
  const getSavedPos = () => {
    if (typeof window === 'undefined') return { x: initialX, y: initialY };
    const saved = localStorage.getItem(`win_pos_${id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { x: parseInt(parsed.left), y: parseInt(parsed.top) };
      } catch (e) {
        return { x: initialX, y: initialY };
      }
    }
    return { x: initialX, y: initialY };
  };

  const [pos, setPos] = useState(getSavedPos());
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const snapThreshold = 20;

  const winState = windows[id];

  useEffect(() => {
    if (!winState) {
      registerWindow(id, title);
    }
  }, [id, title, winState, registerWindow]);

  const handleMouseDown = (e: React.MouseEvent) => {
    focusWindow(id);
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && windowRef.current) {
        let newX = e.clientX - offset.current.x;
        let newY = e.clientY - offset.current.y;

        // Snapping logic
        const width = windowRef.current.offsetWidth;
        const height = windowRef.current.offsetHeight;

        if (Math.abs(newX) < snapThreshold) newX = 0;
        if (Math.abs(newY) < snapThreshold) newY = 0;
        if (Math.abs(window.innerWidth - (newX + width)) < snapThreshold) {
          newX = window.innerWidth - width;
        }
        if (Math.abs(window.innerHeight - (newY + height + 32)) < snapThreshold) {
          newY = window.innerHeight - height - 32;
        }

        setPos({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        // Save position to localStorage
        localStorage.setItem(`win_pos_${id}`, JSON.stringify({
          left: `${pos.x}px`,
          top: `${pos.y}px`
        }));
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, pos.x, pos.y, id]);

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

  if (!winState || !winState.isOpen) return null;

  const isFocused = winState.zIndex === Math.max(...Object.values(windows).map(w => w.zIndex));

  return (
    <div 
      ref={windowRef}
      className={`win95-window ${winState.isMinimized ? 'minimized' : ''} draggable-window`}
      data-window-id={id}
      style={{
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        zIndex: winState.zIndex,
        minWidth: '300px',
        background: '#c0c0c0',
        border: '2px outset #fff',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
        display: winState.isMinimized ? 'none' : 'flex',
        flexDirection: 'column'
      }}
      onMouseDown={() => focusWindow(id)}
    >
      <div 
        className="window-title-bar window-title"
        onMouseDown={handleMouseDown}
        style={{
          background: isFocused 
            ? 'linear-gradient(90deg, #000080, #1084d0)' 
            : '#808080',
          color: 'white',
          padding: '2px 4px',
          fontWeight: 'bold',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'move',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>{title}</span>
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button 
            className="win95-button" 
            style={{ padding: '0 4px', fontSize: '10px' }}
            onClick={(e) => {
              e.stopPropagation();
              toggleMinimize(id);
            }}
          >
            _
          </button>
          <button 
            className="win95-button" 
            style={{ padding: '0 4px', fontSize: '10px' }} 
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
              if (onClose) onClose();
            }}
          >
            X
          </button>
        </div>
      </div>
      <div className="window-content" style={{ padding: '10px', overflow: 'auto', maxHeight: '80vh' }}>
        {children}
      </div>
    </div>
  );
};

export default DraggableWindow;
