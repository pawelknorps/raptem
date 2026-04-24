import React, { useState, useRef, useEffect } from 'react';
import './KujawyMap.css';
import SoundManager from '../../scripts/SoundManager';

interface Village {
  id: string;
  name: string;
  x: number;
  y: number;
  description: string;
  image?: string;
  gallery?: string[];
}

const VILLAGES: Village[] = [
  { id: 'inowroclaw', name: 'INOWROCŁAW', x: 80, y: 70, description: 'Tu Mirek kupił swój pierwszy akordeon na bazarze. Prawdziwa kolebka wixy.', image: 'assets/1000001787.webp', gallery: ['assets/1000001787.webp', 'assets/accordion.webp'] },
  { id: 'kruszwica', name: 'KRUSZWICA', x: 85, y: 80, description: 'Koncert pod Mysią Wieżą. Szczury uciekały z jeziora Gopło tak szybko, że aż fale robiły.', image: 'assets/1000001815.webp', gallery: ['assets/1000001815.webp', 'assets/basy.webp'] },
  { id: 'kowal', name: 'KOWAL', x: 110, y: 100, description: 'Wielka feta w remizie. Sołtys osobiście otwierał pierwszą kasetę RAPTEM.', image: 'assets/TeatrGospoda_jan26.webp', gallery: ['assets/TeatrGospoda_jan26.webp', 'assets/soltys_placeholder.webp'] },
  { id: 'konin', name: 'KONIN', x: 75, y: 100, description: 'Przystanek PKS Konin - tu powstał teledysk do "Oberka". Betonowe wiaty drżały w posadach.', image: 'assets/1000002066.webp', gallery: ['assets/1000002066.webp', 'assets/pks_stop.webp'] },
  { id: 'torun', name: 'TORUŃ', x: 92, y: 60, description: 'Pierniki i teatr. Graliśmy pod pomnikiem Kopernika, on się nie ruszył, ale my tak.', image: 'assets/1000001791.webp', gallery: ['assets/1000001791.webp', 'assets/Screenshot_20260423-171126~3.webp'] },
  { id: 'poznan', name: 'POZNAŃ', x: 60, y: 80, description: 'Koziołki trykały się w rytm techno-mazurka na Starym Rynku.', image: 'assets/1000001851.webp', gallery: ['assets/1000001851.webp', 'assets/6d11a141-15f4-40c6-91d3-1222905371ed.webp'] },
  { id: 'wroclaw', name: 'WROCŁAW', x: 50, y: 110, description: 'Krasnale uciekały przed nagłośnieniem RAPTEM. Prawdziwy breslau-wave.', image: 'assets/1000001927.webp', gallery: ['assets/1000001927.webp', 'assets/spirytus.webp'] },
  { id: 'berlin', name: 'BERLIN', x: 20, y: 80, description: 'Wielki koncert pod Bramą Brandenburską. Niemcy nie wiedzieli co się dzieje, ale tupali nóżką.', image: 'assets/1000002334.webp', gallery: ['assets/1000002334.webp', 'assets/low_poly_polonez.webp'] },
  { id: 'szwecja', name: 'SZWECJA', x: 60, y: 20, description: 'Prom Świnoujście-Ystad. Graliśmy "Oberka" na górnym pokładzie, mewy ogłuchły od basu.', image: 'assets/1000003330.webp', gallery: ['assets/1000003330.webp', 'assets/dancer_pixel.webp'] },
  { id: 'gniewkowo', name: 'GNIEWKOWO', x: 88, y: 65, description: 'Serce Kujaw. Tu basy niosą się aż po sam Toruń. Miasto zakochanych w wixie.', image: 'assets/1000001788.webp', gallery: ['assets/1000001788.webp', 'assets/polonez.webp'] },
  { id: 'murzynno', name: 'MURZYNNO', x: 86, y: 66, description: 'Legendarny przystanek PKS. Tu Mirek zgubił kluczyk od bagażnika Poloneza.', image: 'assets/pks_stop.webp', gallery: ['assets/pks_stop.webp', 'assets/IMG_20260125_110507892.webp'] },
  { id: 'murzynko', name: 'MURZYNKO', x: 87, y: 67, description: 'Mały brat Murzynna. Obok, ale teatr dwa razy większa. Sołtys płakał jak słuchał.', image: 'assets/soltys_placeholder.webp' },
  { id: 'wegajty', name: 'WĘGAJTY', x: 130, y: 50, description: 'Kultowe spotkanie z teatrem wiejskim. Polonez wjechał na podwórko w tumanach kurzu.', image: 'assets/TeatrGospoda_jan26.webp' },
  { id: 'taurku', name: 'TAURKU (TURKU)', x: 100, y: 10, description: 'Północny bastion wixy. Zimno, ale parkiet gorący. Finlandia oszalała.', image: 'assets/1000001787.webp' },
  { id: 'brodnica', name: 'BRODNICA', x: 115, y: 55, description: 'Brama do Mazur. Ostatni bastion przed wielką wodą. Jeziora zadrżały.', image: 'assets/1000001815.webp' },
  { id: 'hidden_spirytus', name: 'VAULT SPIRYTUSU', x: 140, y: 80, description: 'Ściśle tajne laboratorium. Tu spirytus miesza się z dymem z wytwornicy.', image: 'assets/spirytus.webp', gallery: ['assets/spirytus.webp', 'assets/6d11a141-15f4-40c6-91d3-1222905371ed.webp'] },
  { id: 'polonez_spot', name: 'POLONEZ DRIFT AREA', x: 40, y: 50, description: 'Miejsce gdzie opony palą się w rytm kujawiaka. Mirek tu trenuje przed każdym weselem.', image: 'assets/polonez_3d_render.webp', gallery: ['assets/polonez_3d_render.webp', 'assets/low_poly_polonez.webp', 'assets/polonez.webp'] },
];

const KujawyMap: React.FC = () => {
  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);
  const [hoveredVillage, setHoveredVillage] = useState<Village | null>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [modalPos, setModalPos] = useState({ x: 0, y: 0 });

  const handleVillageClick = (v: Village) => {
    setSelectedVillage(v);
    setCurrentImageIdx(0);
    setModalPos({ x: 0, y: 0 }); // Reset position on new open
    SoundManager.toggleSound(true);
    SoundManager.play('click');
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedVillage?.gallery) {
      setCurrentImageIdx((prev) => (prev + 1) % selectedVillage.gallery!.length);
      SoundManager.play('click');
    }
  };

  const startDrag = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - modalPos.x,
      y: e.clientY - modalPos.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setModalPos({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y
        });
      }
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <div className="kujawy-map-container">
      <div className="win95-window-header">
        <span>Mapa_Wixy_Global_Edition.exe</span>
        <div className="header-controls">
          <button className="win95-btn-small">_</button>
          <button className="win95-btn-small">□</button>
          <button className="win95-btn-small">X</button>
        </div>
      </div>
      
      <div className="map-area">
        <svg viewBox="0 0 160 120" className="map-svg">
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="160" height="120" fill="url(#grid)" />

          {/* Sea / Baltic */}
          <path d="M0,0 L160,0 L160,40 Q100,30 60,45 Q20,35 0,50 Z" fill="#000040" />

          {/* Rough Poland/Region shape */}
          <path 
            d="M20,60 L140,60 L150,110 L10,110 Z" 
            fill="#006000" 
            stroke="#fff" 
            strokeWidth="0.5" 
            className="map-continent"
          />

          {/* Connection Lines (Tour Path) */}
          <path 
            d="M20,80 L60,80 L80,70 L92,60 L115,55 L130,50" 
            fill="none" 
            stroke="yellow" 
            strokeWidth="0.3" 
            strokeDasharray="2,1" 
            className="tour-line"
          />
          <path 
            d="M60,20 L100,10" 
            fill="none" 
            stroke="yellow" 
            strokeWidth="0.3" 
            strokeDasharray="2,1" 
            className="tour-line"
          />
          
          {VILLAGES.map((v) => (
            <g 
              key={v.id} 
              className={`map-marker ${selectedVillage?.id === v.id ? 'active' : ''}`}
              onClick={() => handleVillageClick(v)}
              onMouseEnter={() => setHoveredVillage(v)}
              onMouseLeave={() => setHoveredVillage(null)}
            >
              {v.id.includes('hidden') || v.id.includes('spot') ? (
                <rect x={v.x - 2} y={v.y - 2} width="4" height="4" className="marker-rect folder-icon" />
              ) : (
                <rect x={v.x - 1.5} y={v.y - 1.5} width="3" height="3" className="marker-rect" />
              )}
              <text x={v.x + 2} y={v.y + 1} fontSize="2.5" fill="#fff" className="marker-label">{v.name}</text>
            </g>
          ))}
        </svg>

        <div className="map-status-bar">
          {hoveredVillage ? `LOKALIZACJA: ${hoveredVillage.name} | WSPÓŁRZĘDNE: ${hoveredVillage.x}, ${hoveredVillage.y}` : 'WYBIERZ PUNKT NA MAPIE...'}
        </div>

        {selectedVillage && (
          <div className="village-modal-overlay">
            <div 
              className="win95-window folder-window draggable-window" 
              style={{ transform: `translate(${modalPos.x}px, ${modalPos.y}px)` }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="win95-window-header window-title" onMouseDown={startDrag} style={{ cursor: 'move' }}>
                <span>C:\RAPTEM_ARCHIWUM\{selectedVillage.id}.db</span>
                <button onClick={() => setSelectedVillage(null)} className="win95-btn-small">X</button>
              </div>
              <div className="window-content folder-content">
                <div className="village-detail">
                  <div className="image-container">
                    <img 
                      src={selectedVillage.gallery ? selectedVillage.gallery[currentImageIdx] : selectedVillage.image} 
                      className="folder-image" 
                      alt={selectedVillage.name} 
                    />
                    <div className="image-caption">PLIK_{currentImageIdx + 1}_Z_{selectedVillage.gallery?.length || 1}.JPG</div>
                    {selectedVillage.gallery && selectedVillage.gallery.length > 1 && (
                      <button onClick={nextImage} className="win95-button next-btn">NASTĘPNE {">>"} </button>
                    )}
                  </div>
                  <div className="village-info">
                    <h3 className="village-title">{selectedVillage.name}</h3>
                    <p className="village-status">STATUS: ODKRYTO NOWE DANE</p>
                    <div className="village-desc-box">
                      <p>{selectedVillage.description}</p>
                    </div>
                  </div>
                </div>
                <div className="window-footer">
                  <button onClick={() => setSelectedVillage(null)} className="win95-button">ZAMKNIJ</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="map-footer">
        RAPTEM MAPA WIXY v2.0 - © 1998-2026 KUJAWIAK SYSTEMS
      </div>
    </div>
  );
};

export default KujawyMap;
