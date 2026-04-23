import React from 'react';

interface VaporwaveTroopeProps {
  assetUrl: string;
  alt: string;
  size?: number;
  glowColor?: string;
}

const VaporwaveTroope: React.FC<VaporwaveTroopeProps> = ({ 
  assetUrl, 
  alt, 
  size = 200, 
  glowColor = '#ff00ff' 
}) => {
  return (
    <div className="vapor-troope-container" style={{
      display: 'inline-block',
      padding: '20px',
      perspective: '1000px'
    }}>
      <img 
        src={assetUrl} 
        alt={alt} 
        style={{
          width: `${size}px`,
          height: 'auto',
          filter: `drop-shadow(0 0 10px ${glowColor})`,
          animation: 'float 3s ease-in-out infinite',
          imageRendering: 'pixelated'
        }}
      />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default VaporwaveTroope;
