import React, { useState } from 'react';

const MerchWizard: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { title: 'Wstęp', content: 'Witamy w instalatorze Kaset Raptem v1.0. Czy chcesz nabyć nową kasetę?' },
    { title: 'Wybór', content: 'Wybierz produkt: [X] KUJAWIAK SPEKTAKL (2026) - 15 ZŁ' },
    { title: 'Płatność', content: 'Proszę zostawić pieniądze pod kamieniem obok remizy.' },
    { title: 'Finał', content: 'Dziękujemy! Kaseta zostanie dostarczona przez gołębia pocztowego.' }
  ];

  return (
    <div style={{ padding: '20px', background: '#c0c0c0', color: '#000', fontFamily: 'sans-serif', fontSize: '12px' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ width: '100px', height: '150px', background: '#808080', border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="assets/new.gif" style={{ width: '50px' }} alt="Install" />
        </div>
        <div style={{ flexGrow: 1 }}>
          <h3 style={{ marginBottom: '10px' }}>{steps[step].title}</h3>
          <p style={{ height: '60px' }}>{steps[step].content}</p>
          <div style={{ borderTop: '1px solid #808080', marginTop: '20px', paddingTop: '10px', textAlign: 'right' }}>
            <button 
              className="win95-button" 
              disabled={step === 0} 
              onClick={() => setStep(step - 1)}
              style={{ marginRight: '5px' }}
            >
              &lt; Wstecz
            </button>
            <button 
              className="win95-button" 
              onClick={() => step < steps.length - 1 ? setStep(step + 1) : alert('INSTALACJA ZAKOŃCZONA!')}
            >
              {step === steps.length - 1 ? 'Zakończ' : 'Dalej >'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchWizard;
