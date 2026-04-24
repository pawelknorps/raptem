import React, { useState } from 'react';
import { generateLoreLine } from '../../lib/LoreEngine';

const RitualDatabase: React.FC = () => {
  const [selectedRitual, setSelectedRitual] = useState<string | null>(null);

  const rituals = [
    { id: 'sceniczny', title: 'Obrządek Sceniczny', type: 'THEATER' },
    { id: 'dozynkowy', title: 'Misterium Dożynkowe', type: 'FOLK' },
    { id: 'bazarowy', title: 'Transmutacja Bazarowa', type: 'CHAOS' },
    { id: 'polonezowy', title: 'Inkantacja Silnika', type: 'TECH' }
  ];

  return (
    <div style={{ padding: '10px', height: '100%', display: 'flex', gap: '15px', color: '#000', fontFamily: 'monospace' }}>
      <div className="win95-inset" style={{ width: '150px', background: '#fff', padding: '5px', overflowY: 'auto' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #000' }}>KATEGORIE</div>
        {rituals.map(r => (
          <div 
            key={r.id} 
            onClick={() => setSelectedRitual(r.id)}
            style={{ 
              padding: '2px 5px', 
              cursor: 'pointer', 
              background: selectedRitual === r.id ? '#000080' : 'transparent',
              color: selectedRitual === r.id ? '#fff' : '#000',
              marginBottom: '2px'
            }}
          >
            {r.title}
          </div>
        ))}
      </div>

      <div className="win95-inset" style={{ flexGrow: 1, background: '#fff', padding: '15px', overflowY: 'auto', position: 'relative' }}>
        {selectedRitual ? (
          <div>
            <h2 style={{ fontSize: '1.2rem', margin: '0 0 15px 0', borderBottom: '2px double #000' }}>
              {rituals.find(r => r.id === selectedRitual)?.title}
            </h2>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
              <p style={{ fontWeight: 'bold' }}>[OPIS PROTOKOŁU]</p>
              <p>{generateLoreLine()}</p>
              <p style={{ marginTop: '10px', fontWeight: 'bold' }}>[KROKI RYTUALNE]</p>
              <ol>
                <li>{generateLoreLine()}</li>
                <li>{generateLoreLine()}</li>
                <li>{generateLoreLine()}</li>
              </ol>
              <div style={{ marginTop: '20px', padding: '10px', border: '1px dashed #666', background: '#f0f0f0' }}>
                <strong>OSTRZEŻENIE:</strong> Nieprzestrzeganie rytuału może skutkować desynchronizacją z bazarem centralnym.
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888', textAlign: 'center' }}>
            WYBIERZ RYTUAŁ Z LISTY PO LEWEJ STRONIE, ABY ROZPOCZĄĆ INICJACJĘ.
          </div>
        )}
      </div>
    </div>
  );
};

export default RitualDatabase;
