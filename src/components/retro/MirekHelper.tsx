import React, { useState, useEffect } from 'react';

const MirekHelper: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [tip, setTip] = useState('');
  
  const tips = [
    "Może by tak kujawiaka?",
    "System stabilny (na razie).",
    "Wykryto wysoki poziom spirytusu w systemie.",
    "Czy wiesz, że Mirek gra na basach lepiej niż Ty?",
    "Zalecane: natychmiastowe uderzenie w piksla.",
    "BŁĄD: Zbyt mała ilość oberków na minutę.",
    "UWAŻAJ! Idzie wixa!"
  ];

  useEffect(() => {
    const trigger = () => {
      if (Math.random() < 0.3) {
        setTip(tips[Math.floor(Math.random() * tips.length)]);
        setVisible(true);
        setTimeout(() => setVisible(false), 5000);
      }
    };

    const interval = setInterval(trigger, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '50px',
      right: '20px',
      zIndex: 100002,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      pointerEvents: 'none'
    }}>
      <div style={{
        background: '#ffffcc',
        border: '1px solid #000',
        padding: '10px',
        borderRadius: '10px',
        fontSize: '11px',
        color: '#000',
        maxWidth: '150px',
        marginBottom: '5px',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
        position: 'relative'
      }}>
        {tip}
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          right: '20px',
          width: '0',
          height: '0',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '10px solid #ffffcc'
        }} />
      </div>
      <img 
        src="assets/1000001791.webp" 
        style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          border: '2px solid #000',
          background: '#fff',
          objectFit: 'cover',
          filter: 'grayscale(1) contrast(1.2)'
        }} 
        alt="Mirek Helper" 
      />
    </div>
  );
};

export default MirekHelper;
