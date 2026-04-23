import React from 'react';

const NewsTicker: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: '18px', // Just below the ChaosHeader
      left: 0,
      width: '100%',
      height: '24px',
      background: '#c0c0c0',
      borderBottom: '2px outset #fff',
      display: 'flex',
      alignItems: 'center',
      zIndex: 100000,
      overflow: 'hidden'
    }}>
      <div style={{
        background: '#000080',
        color: '#fff',
        padding: '0 10px',
        fontSize: '11px',
        fontWeight: 'bold',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap'
      }}>
        WIADOMOŚCI BAZARU:
      </div>
      <div style={{ flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
        <marquee style={{ fontSize: '12px', color: '#000', fontWeight: 'bold' }}>
          +++ PILNE: PANE JANEK ZNALAZŁ NOWĄ KASETĘ POD SIEDZENIEM POLONEZA +++ POGODA: NA KUJAWACH PRZEWIDYWANA WIXA I OPADY SPIRYTUSU +++ NOTOWANIA: BONY DO REMIZY W GÓRĘ O 15% +++
        </marquee>
      </div>
    </div>
  );
};

export default NewsTicker;
