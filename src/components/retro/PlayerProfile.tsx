import React from 'react';
import { usePlayerStore } from '../../lib/playerStore';

const PlayerProfile: React.FC = () => {
  const { folkPurity, chaosAffinity, wixaMana, xp, level, title, resetStats } = usePlayerStore();

  const nextLevelXp = level * 1000;
  const progress = (xp / nextLevelXp) * 100;

  return (
    <div style={{ padding: '20px', color: '#000', fontFamily: 'monospace', background: '#c0c0c0', height: '100%' }}>
      <div className="win95-inset" style={{ background: '#fff', padding: '15px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '80px', background: '#808080', border: '4px inset #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="assets/spirytus.webp" style={{ width: '60px', filter: chaosAffinity > 50 ? 'hue-rotate(90deg)' : 'none' }} alt="Avatar" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.2rem' }}>UZYTKOWNIK: BAZAR_USER</h2>
            <p style={{ margin: '5px 0', color: '#000080', fontWeight: 'bold' }}>TYTUŁ: {title}</p>
            <p style={{ margin: 0 }}>POZIOM: {level}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* XP BAR */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '2px' }}>
            <span>DOŚWIADCZENIE (XP)</span>
            <span>{xp} / {nextLevelXp}</span>
          </div>
          <div style={{ width: '100%', height: '15px', border: '2px inset #fff', background: '#808080' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: '#000080' }}></div>
          </div>
        </div>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div className="win95-inset" style={{ padding: '10px', background: '#eee' }}>
            <div style={{ fontWeight: 'bold', fontSize: '0.7rem' }}>FOLK_PURITY</div>
            <div style={{ fontSize: '1.5rem' }}>{folkPurity}%</div>
            <p style={{ fontSize: '0.6rem', margin: '5px 0 0 0' }}>Wpływ tradycji i obrzędowości.</p>
          </div>
          <div className="win95-inset" style={{ padding: '10px', background: '#eee' }}>
            <div style={{ fontWeight: 'bold', fontSize: '0.7rem' }}>CHAOS_AFFINITY</div>
            <div style={{ fontSize: '1.5rem' }}>{chaosAffinity}%</div>
            <p style={{ fontSize: '0.6rem', margin: '5px 0 0 0' }}>Synchronizacja z cyfrowym bazarem.</p>
          </div>
        </div>

        {/* MANA */}
        <div className="win95-inset" style={{ padding: '10px', background: '#000', color: '#0f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>WIXA_MANA</span>
            <span>{wixaMana.toFixed(0)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', border: '1px solid #0f0', marginTop: '5px' }}>
            <div style={{ width: `${wixaMana}%`, height: '100%', background: '#0f0' }}></div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'right' }}>
        <button 
          className="win95-button" 
          onClick={() => {
            if (confirm("CZY NA PEWNO CHCESZ ZRESETOWAĆ POSTĘP?")) resetStats();
          }}
          style={{ fontSize: '0.7rem', color: '#f00' }}
        >
          Twardy Reset Systemu
        </button>
      </div>
    </div>
  );
};

export default PlayerProfile;
