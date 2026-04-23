import React from 'react';

const MerchListing: React.FC = () => {
  return (
    <div style={{ background: '#fff', padding: '15px', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ borderBottom: '2px solid #ff6600', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <h2 style={{ margin: 0, color: '#ff6600', fontSize: '18px' }}>BazarAllegro</h2>
        <span style={{ fontSize: '10px' }}>Kategoria: Muzyka > Kasety > Kujawiak Wix</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <img src="assets/spirytus.webp" style={{ width: '100%', border: '1px solid #ccc', padding: '5px' }} alt="Product" />
          <p style={{ fontSize: '9px', textAlign: 'center', color: '#666' }}>[ Zdjęcie poglądowe ]</p>
        </div>
        <div>
          <h1 style={{ fontSize: '16px', margin: '0 0 10px 0' }}>KASETA "KUJAWIAK WIXA" - RAPTEM (2026)</h1>
          <div style={{ background: '#f9f9f9', padding: '10px', border: '1px solid #ddd' }}>
            <p style={{ margin: '0', fontSize: '12px' }}>Cena: <strong style={{ fontSize: '20px', color: '#d00' }}>14,99 PLN</strong></p>
            <p style={{ margin: '5px 0', fontSize: '10px', color: '#444' }}>Dostępność: 3 sztuki</p>
            <button style={{ 
              background: '#ff6600', 
              color: '#fff', 
              border: 'none', 
              padding: '10px', 
              fontWeight: 'bold', 
              width: '100%', 
              cursor: 'pointer',
              marginTop: '10px'
            }}>KUP TERAZ</button>
          </div>
          <div style={{ marginTop: '15px', fontSize: '11px' }}>
            <strong>Sprzedawca:</strong> PanJanek95 (99.8% pozytywów)
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', fontSize: '11px' }}>
        <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #ccc' }}>Opis przedmiotu:</h4>
        <p>Jedyna taka kaseta na całym bazarze! Nagrana bezpośrednio w stodole Mirek-Studios. Gwarantowane drżenie szyb w Polonezie. Kupując wspierasz regionalny przemysł spirytusowy.</p>
        <p><strong>Stan:</strong> Nowa (lekko porysowana od taśmociągu)</p>
      </div>
    </div>
  );
};

export default MerchListing;
