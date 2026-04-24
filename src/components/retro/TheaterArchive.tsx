import React, { useState } from 'react';
import { generateLoreLine } from '../../lib/LoreEngine';

const TheaterArchive: React.FC = () => {
  const [view, setView] = useState<'scripts' | 'cast' | 'manifest'>('scripts');

  const scripts = [
    { title: 'Wesele w Murzynnie', year: '1995', desc: 'Dramat w trzech aktach o znikającym akordeonie.' },
    { title: 'Czekając na Poloneza', year: '1998', desc: 'Etiuda egzystencjalna na przystanku PKS.' },
    { title: 'Inscenizacja Bazaru', year: '2001', desc: 'Widowisko masowe z udziałem 50 handlarzy.' },
    { title: 'Ostatni Kujawiak', year: '2024', desc: 'Misterium pożegnalne z epoką analogową.' }
  ];

  return (
    <div style={{ padding: '15px', height: '100%', color: '#000', fontFamily: 'monospace', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
        <button className="win95-button" onClick={() => setView('scripts')}>SCENARIUSZE</button>
        <button className="win95-button" onClick={() => setView('cast')}>OBSADA</button>
        <button className="win95-button" onClick={() => setView('manifest')}>MANIFEST</button>
      </div>

      <div className="win95-inset" style={{ flexGrow: 1, background: '#fff', padding: '15px', overflowY: 'auto' }}>
        {view === 'scripts' && (
          <div>
            <h3 style={{ borderBottom: '1px solid #000' }}>ARCHIWUM SCENARIUSZY</h3>
            {scripts.map((s, i) => (
              <div key={i} style={{ marginTop: '15px', borderBottom: '1px dashed #ccc', paddingBottom: '5px' }}>
                <div style={{ fontWeight: 'bold' }}>{s.title} ({s.year})</div>
                <div style={{ fontSize: '0.85rem' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        )}

        {view === 'cast' && (
          <div>
            <h3 style={{ borderBottom: '1px solid #000' }}>OBSADA STAŁA</h3>
            <ul style={{ marginTop: '10px' }}>
              <li><strong>MIREK:</strong> Pierwszy Głos, Operator Miecha, Reżyser Ruchu.</li>
              <li><strong>JANEK:</strong> Pierwsze Skrzypce, Przekaźnik Emocji, Scenografia.</li>
              <li><strong>STASZEK:</strong> Sekcja Rytmiczna, Bęben Obrzędowy, Kontrola Chaosu.</li>
              <li><strong>PIOTREK:</strong> Wizualizacje VHS, Archiwista Snów, Światło.</li>
            </ul>
          </div>
        )}

        {view === 'manifest' && (
          <div>
            <h3 style={{ borderBottom: '1px solid #000' }}>MANIFEST TEATRU PRĘDKOŚCI</h3>
            <p style={{ marginTop: '10px', fontStyle: 'italic' }}>
              "Teatr to nie budynek. Teatr to moment, w którym prawda regionu przebija się przez szum współczesności. 
              Graj tak, jakby od tego zależał stan twojego akumulatora w Polonezie."
            </p>
            <p style={{ marginTop: '10px' }}>{generateLoreLine()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TheaterArchive;
