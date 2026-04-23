import React, { useState, useEffect } from 'react';
import SlowLoadingImage from './SlowLoadingImage';

const images = [
  { src: 'assets/1000001787.webp', alt: 'Koncert w Kowalu' },
  { src: 'assets/1000001815.webp', alt: 'Bazarowe Szaleństwo' },
  { src: 'assets/TeatrGospoda_jan26.webp', alt: 'Teatr Gospoda 2026' },
  { src: 'assets/6d11a141-15f4-40c6-91d3-1222905371ed.webp', alt: 'Kujawiak Vapor Session' }
];

const Gallery: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    // Only show next image when previous one starts loading
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < images.length) return prev + 1;
        return prev;
      });
    }, 4000); // Wait for some progress before showing next

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gallery-container" style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
      gap: '20px',
      padding: '10px',
      background: '#808080',
      border: '4px inset #fff'
    }}>
      {images.slice(0, visibleCount).map((img, idx) => (
        <div key={idx} className="gallery-item-wrapper">
          <div style={{
            background: '#c0c0c0',
            border: '2px outset #fff',
            padding: '4px',
            marginBottom: '5px',
            fontSize: '11px',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>IMAGE{idx + 1}.JPG</span>
            <span>{img.alt}</span>
          </div>
          <SlowLoadingImage 
            src={img.src} 
            alt={img.alt} 
            width="100%" 
            height="200px" 
          />
        </div>
      ))}
      
      {visibleCount < images.length && (
        <div style={{
          gridColumn: '1 / -1',
          textAlign: 'center',
          padding: '20px',
          fontFamily: 'monospace',
          color: '#fff',
          textShadow: '1px 1px #000'
        }}>
          {">>> ŁADOWANIE KOLEJNYCH PLIKÓW PRZEZ MODEM <<<"}
        </div>
      )}
    </div>
  );
};

export default Gallery;
