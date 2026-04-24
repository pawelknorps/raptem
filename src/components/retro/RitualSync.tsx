import React, { useState, useEffect } from 'react';

const RitualSync: React.FC = () => {
  const [step, setStep] = useState(0);
  const [glitchLevel, setGlitchLevel] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [feedback, setFeedback] = useState("OCZEKIWANIE NA INICJACJĘ...");

  const ritualSteps = [
    { text: "WYPEŁNIJ MIECH", action: "miech" },
    { text: "NUTA G", action: "nuta" },
    { text: "CZEKAJ NA BAZAR", action: "bazar" }
  ];

  const handleAction = (action: string) => {
    if (isSuccess) return;

    if (action === ritualSteps[step].action) {
      if (step === ritualSteps.length - 1) {
        setIsSuccess(true);
        setFeedback("SYNCHRONIZACJA ZAKOŃCZONA. BAZAR JEST W TOBIE.");
        // Trigger global chaos event?
        const event = new CustomEvent('chaos-update', { detail: { level: 1.0 } });
        window.dispatchEvent(event);
      } else {
        setStep(s => s + 1);
        setFeedback(`KROK ${step + 2}: ${ritualSteps[step + 1].text}`);
        setGlitchLevel(prev => prev + 1);
      }
    } else {
      setStep(0);
      setFeedback("BŁĄD RYTUAŁU. SPRÓBUJ PONOWNIE.");
      setGlitchLevel(0);
    }
  };

  return (
    <div style={{ 
      background: '#000', 
      color: '#0f0', 
      padding: '20px', 
      fontFamily: 'monospace', 
      textAlign: 'center',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '20px'
    }}>
      <div style={{ fontSize: '14px', fontWeight: 'bold', textShadow: '0 0 10px #0f0' }}>
        PROTOKÓŁ SYNCHRONIZACJI v1.0
      </div>

      <div style={{ fontSize: '10px', color: '#888' }}>
        {feedback}
      </div>

      {!isSuccess ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
          <button 
            className="win95-button" 
            onClick={() => handleAction('miech')}
            style={{ color: '#000', background: step === 0 ? '#0f0' : '#ccc' }}
          >
            WYPEŁNIJ MIECH (SPIRYTUS)
          </button>
          <button 
            className="win95-button" 
            onClick={() => handleAction('nuta')}
            style={{ color: '#000', background: step === 1 ? '#0f0' : '#ccc' }}
          >
            ZAGRAJ NUTĘ G (BITCRUSH)
          </button>
          <button 
            className="win95-button" 
            onClick={() => handleAction('bazar')}
            style={{ color: '#000', background: step === 2 ? '#0f0' : '#ccc' }}
          >
            NASŁUCHUJ BAZARU
          </button>
        </div>
      ) : (
        <div style={{ animation: 'blink 0.5s infinite' }}>
          <img src="assets/new.gif" style={{ height: '50px' }} />
          <div style={{ marginTop: '10px' }}>OTRZYMANO: ZŁOTA KASETA</div>
        </div>
      )}

      <div style={{ fontSize: '9px', opacity: 0.5 }}>
        Wskazówka: Szukaj kroków w MANIFEST.EXE / RYTUAŁY
      </div>
    </div>
  );
};

export default RitualSync;
