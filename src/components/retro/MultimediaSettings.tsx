import React, { useState } from 'react';
import { vibeManager, type Vibe } from '../../lib/LoreEngine';

const MultimediaSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('audio');
  
  const vibes: { id: Vibe, name: string }[] = [
    { id: 'DEFAULT', name: 'Standardowy Kujawiak' },
    { id: 'VAPORWAVE', name: 'Estetyka (Vaporwave)' },
    { id: 'BAZAR_WAVE', name: 'Bazarowa Spektakl' },
    { id: 'POLAND_WAVE', name: 'Betonowy Ambient' }
  ];

  return (
    <div className="multimedia-settings" style={{
      width: '350px',
      background: '#c0c0c0',
      border: '2px outset #fff',
      padding: '2px',
      fontFamily: 'var(--font-primary)',
      color: '#000'
    }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '2px', padding: '2px 5px 0 5px' }}>
        {['audio', 'wideo', 'midi', 'cd'].map(tab => (
          <div 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '2px 8px',
              fontSize: '11px',
              background: activeTab === tab ? '#c0c0c0' : '#d0d0d0',
              border: '2px outset #fff',
              borderBottom: activeTab === tab ? 'none' : '2px outset #fff',
              zIndex: activeTab === tab ? 2 : 1,
              marginTop: activeTab === tab ? '0' : '2px',
              cursor: 'pointer'
            }}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div style={{
        background: '#c0c0c0',
        border: '2px outset #fff',
        padding: '15px',
        minHeight: '200px',
        marginTop: '-2px',
        position: 'relative',
        zIndex: 1
      }}>
        {activeTab === 'audio' && (
          <div style={{ fontSize: '11px' }}>
            <fieldset style={{ border: '1px solid #888', padding: '10px', marginBottom: '15px' }}>
              <legend>Odtwarzanie dźwięku</legend>
              <p>Urządzenie preferowane:</p>
              <select style={{ width: '100%', marginBottom: '10px' }}>
                <option>Sound Blaster 16 (Bazar Edition)</option>
                <option>PC Speaker (Beep Only)</option>
              </select>
              <button className="win95-button" style={{ width: '100%' }}>Głośność...</button>
            </fieldset>

            <fieldset style={{ border: '1px solid #888', padding: '10px' }}>
              <legend>Profil Atmosferyczny</legend>
              <p>Wybierz schemat dźwiękowy:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '5px' }}>
                {vibes.map(v => (
                  <label key={v.id} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input 
                      type="radio" 
                      name="vibe-audio" 
                      checked={vibeManager.getVibe() === v.id} 
                      onChange={() => vibeManager.setVibe(v.id)}
                    />
                    {v.name}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {activeTab === 'wideo' && (
          <div style={{ fontSize: '11px' }}>
             <p>Ustawienia obrazu VHS:</p>
             <label style={{ display: 'block', margin: '10px 0' }}>
               <input type="checkbox" defaultChecked /> Włącz zakłócenia trackingowe
             </label>
             <label style={{ display: 'block', margin: '10px 0' }}>
               <input type="checkbox" defaultChecked /> Efekt wypalonego kineskopu
             </label>
             <div style={{ marginTop: '20px', textAlign: 'center' }}>
               <div style={{ width: '100px', height: '60px', background: '#000', margin: '0 auto', border: '2px inset #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                 PREVIEW
               </div>
             </div>
          </div>
        )}

        {activeTab === 'midi' && (
          <div style={{ fontSize: '11px', textAlign: 'center', paddingTop: '40px' }}>
             <p>Syntezator MIDI nie został wykryty.</p>
             <p>Proszę podłączyć Akordeon Mirek do portu GamePort.</p>
          </div>
        )}

        {activeTab === 'cd' && (
          <div style={{ fontSize: '11px' }}>
             <p>Odtwarzanie cyfrowe z CD-ROM:</p>
             <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
               <input type="checkbox" defaultChecked /> Włącz błędy odczytu (Buf bufor...)
             </label>
          </div>
        )}
      </div>

      {/* Dialog Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '5px', padding: '10px' }}>
        <button className="win95-button" style={{ width: '60px' }}>OK</button>
        <button className="win95-button" style={{ width: '60px' }}>Anuluj</button>
        <button className="win95-button" style={{ width: '60px' }}>Zastosuj</button>
      </div>
    </div>
  );
};

export default MultimediaSettings;
