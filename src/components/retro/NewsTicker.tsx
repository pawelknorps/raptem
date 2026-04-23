import React from 'react';

const NEWS = [
  "!!! BAZAR_NEWS !!!",
  "MIREK ZNALAZŁ NOWĄ DOSTAWĘ SPIRYTUSU W GNIEWKOWIE",
  "POLONEZ OSIĄGNĄŁ PRĘDKOŚĆ DŹWIĘKU NA TRASIE TORUŃ-POZNAŃ",
  "NOWY ALBUM 'KUJAWSKI TECHNO-FOLK' JUŻ W TWOIM RADIOMAGNETOFONIE",
  "ZAKAZ PARKOWANIA FURMANEK POD REMIZĄ W KOWALU",
  "PROCESOR 'KUJAWIAK-95' PRZEKROCZYŁ 100 MHZ",
  "WIXA DNIA: BARTŁOMIEJ TAŃCZY OBERKA NA MASCE POLONEZA",
  "RADIO BABILON NADAJE SYGNAŁ Z BRODNICY",
];

const NewsTicker: React.FC = () => {
  const repeatedNews = [...NEWS, ...NEWS, ...NEWS].join('  |  ');
  
  return (
    <div className="news-ticker-container">
      <div className="news-content">
        {repeatedNews}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .news-ticker-container {
          background: #000;
          color: #ffff00;
          height: 24px;
          overflow: hidden;
          white-space: nowrap;
          border-top: 2px solid #808080;
          border-bottom: 2px solid #fff;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          font-weight: bold;
          display: flex;
          align-items: center;
          z-index: 1001;
          position: sticky;
          top: 28px; /* Below ChaosHeader */
        }
        .news-content {
          display: inline-block;
          padding-left: 100%;
          animation: ticker 60s linear infinite;
        }
        @keyframes ticker {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-100%, 0); }
        }
      `}} />
    </div>
  );
};

export default NewsTicker;
