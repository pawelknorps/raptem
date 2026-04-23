import React, { useEffect, useState } from 'react';

const ContextMenu: React.FC = () => {
  const [pos, setPos] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    const handleContext = (e: MouseEvent) => {
      e.preventDefault();
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => setPos(null);

    window.addEventListener('contextmenu', handleContext);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('contextmenu', handleContext);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  if (!pos) return null;

  const openWin = (id: string) => {
     window.dispatchEvent(new CustomEvent('open-window', { detail: { id } }));
  };

  return (
    <div style={{
      position: 'fixed',
      top: pos.y,
      left: pos.x,
      background: '#c0c0c0',
      border: '2px outset #fff',
      boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
      zIndex: 200000,
      width: '150px',
      padding: '2px',
      fontFamily: 'var(--font-win95)',
      fontSize: '11px',
      color: '#000'
    }}>
      <div className="ctx-item" style={{ padding: '4px 10px', cursor: 'default', color: '#888' }}>Nowy Folder</div>
      <div style={{ height: '1px', background: '#888', margin: '2px 5px' }} />
      <div className="ctx-item" onClick={() => window.location.reload()} style={{ padding: '4px 10px', cursor: 'pointer' }}>Odśwież</div>
      <div style={{ height: '1px', background: '#888', margin: '2px 5px' }} />
      <div className="ctx-item" onClick={() => openWin('settings')} style={{ padding: '4px 10px', cursor: 'pointer' }}>Właściwości</div>
      <style>{`
        .ctx-item:hover {
          background: #000080;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ContextMenu;
