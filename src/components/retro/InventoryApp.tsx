import React, { useState, useEffect } from 'react';
import { bazarInventory, type BazarItem } from '../../lib/BazarInventory';

const InventoryApp: React.FC = () => {
  const [items, setItems] = useState<BazarItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<BazarItem | null>(null);

  useEffect(() => {
    return bazarInventory.subscribe(setItems);
  }, []);

  return (
    <div className="inventory-app" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      background: '#c0c0c0', 
      color: '#000',
      padding: '5px'
    }}>
      <div style={{ display: 'flex', flexGrow: 1, gap: '5px', overflow: 'hidden' }}>
        {/* Item List */}
        <div className="win95-inset" style={{ 
          width: '60%', 
          background: '#fff', 
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
          gap: '5px',
          padding: '10px',
          alignContent: 'start'
        }}>
          {items.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', paddingTop: '20px', color: '#888', fontSize: '0.8rem' }}>
              PLECAK JEST PUSTY...<br/>Znajdź artefakty na bazarze.
            </div>
          )}
          {items.map(item => (
            <div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '5px',
                cursor: 'pointer',
                background: selectedItem?.id === item.id ? '#000080' : 'transparent',
                color: selectedItem?.id === item.id ? '#fff' : '#000',
                border: '1px dotted #888'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>
                {item.type === 'gif' ? '🖼️' : item.type === 'sound' ? '🔊' : '📜'}
              </div>
              <div style={{ fontSize: '0.6rem', textAlign: 'center', wordBreak: 'break-all' }}>
                {item.name}
              </div>
            </div>
          ))}
        </div>

        {/* Details Panel */}
        <div className="win95-inset" style={{ width: '40%', padding: '10px', fontSize: '0.8rem', background: '#d0d0d0' }}>
          {selectedItem ? (
            <div>
              <h3 style={{ fontSize: '0.9rem', marginBottom: '10px', borderBottom: '1px solid #000' }}>
                {selectedItem.name.toUpperCase()}
              </h3>
              <div style={{ marginBottom: '10px', fontSize: '0.7rem', fontStyle: 'italic' }}>
                Typ: {selectedItem.type.toUpperCase()}
              </div>
              <p style={{ marginBottom: '15px' }}>{selectedItem.description}</p>
              
              <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                {selectedItem.image && (
                  <img src={selectedItem.image} alt={selectedItem.name} style={{ maxWidth: '100%', height: 'auto', border: '1px solid #000' }} />
                )}
              </div>

              <button 
                className="win95-button" 
                style={{ width: '100%', fontSize: '0.7rem' }}
                onClick={() => {
                   if (selectedItem.type === 'gif' && selectedItem.image) {
                     document.documentElement.style.setProperty('--main-bg', `url("${selectedItem.image}")`);
                   }
                }}
              >
                UŻYJ ARTEFAKTU
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', paddingTop: '40px', color: '#666' }}>
              Wybierz przedmiot,<br/>aby zobaczyć szczegóły.
            </div>
          )}
        </div>
      </div>

      <footer style={{ marginTop: '5px', fontSize: '0.7rem', padding: '2px', borderTop: '1px solid #888' }}>
        Znaleziono {items.length} z 99 ukrytych skarbów Kujaw.
      </footer>
    </div>
  );
};

export default InventoryApp;
