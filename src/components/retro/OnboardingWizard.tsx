import React, { useState } from 'react';

const OnboardingWizard: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(s => s + 1);

  return (
    <div style={{ background: '#c0c0c0', padding: '20px', color: '#000', width: '400px' }}>
      {step === 1 && (
        <div className="wizard-step">
          <h3 style={{ borderBottom: '2px solid #888', paddingBottom: '5px' }}>Witaj w KujawiakOS Setup</h3>
          <p style={{ fontSize: '12px', margin: '15px 0' }}>
            Ten kreator pomoże Ci skonfigurować Twoje doświadczenie z grupą Raptem. 
            Prosimy o przygotowanie szklanki zimnego napoju i wyregulowanie głośników.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button className="win95-button" style={{ padding: '5px 20px' }} onClick={nextStep}>Dalej &gt;</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="wizard-step">
          <h3 style={{ borderBottom: '2px solid #888', paddingBottom: '5px' }}>Wymagania Systemowe</h3>
          <ul style={{ fontSize: '11px', margin: '15px 0' }}>
            <li>- Polonez na chodzie (lub chociaż stoi)</li>
            <li>- Tolerancja na basy powyżej 100dB</li>
            <li>- Umiejętność tańczenia oberka (opcjonalnie)</li>
          </ul>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
             <button className="win95-button" style={{ padding: '5px 20px' }} onClick={nextStep}>Instaluj Bazar &gt;</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="wizard-step" style={{ textAlign: 'center' }}>
          <img src="assets/construction.gif" style={{ height: '50px' }} />
          <h3>Instalacja Zakończona!</h3>
          <p style={{ fontSize: '11px' }}>System KujawiakOS jest gotowy do wixy. Życzymy miłego pobytu na bazarze.</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
             <button className="win95-button" style={{ padding: '5px 40px' }} onClick={() => {
               // The index.astro will handle the close via useWindowStore
               const closeEvent = new CustomEvent('close-window', { detail: { id: 'onboarding' } });
               window.dispatchEvent(closeEvent);
             }}>ZAKOŃCZ</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingWizard;
