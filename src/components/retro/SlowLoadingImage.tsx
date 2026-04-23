import React, { useState, useEffect } from 'react';

interface SlowLoadingImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

const SlowLoadingImage: React.FC<SlowLoadingImageProps> = ({ src, alt, width = '100%', height = 'auto' }) => {
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      position: 'relative', 
      width, 
      height, 
      overflow: 'hidden', 
      background: '#000',
      border: '2px inset #fff'
    }}>
      <img 
        src={src} 
        alt={alt} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          clipPath: `inset(0 0 ${100 - loadProgress}% 0)`,
          imageRendering: 'pixelated'
        }} 
      />
      {loadProgress < 100 && (
        <div style={{
          position: 'absolute',
          bottom: `${100 - loadProgress}%`,
          left: 0,
          width: '100%',
          height: '2px',
          background: '#0f0',
          boxShadow: '0 0 5px #0f0',
          zIndex: 10
        }} />
      )}
    </div>
  );
};

export default SlowLoadingImage;
