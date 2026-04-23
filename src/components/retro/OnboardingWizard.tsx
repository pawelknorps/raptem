import React, { useState, useEffect } from 'react';
import { useWindowStore } from '../../lib/windowStore';

const OnboardingWizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const { closeWindow } = useWindowStore();

  const steps = [
    {
      title: "Witamy w KujawiakOS!",
      content: "Gratulacje! Właśnie uruchomiłeś najbardziej zaawansowany system operacyjny na Kujawach. Ten krótki przewodnik pokaże Ci, jak przetrwać na Bazarze.",
      image: "/assets/polonez.png"
    },
    {
      title: "Okna i Wixy",
      content: "Wszystkie programy otwierają się w oknach. Możesz je przeciągać, minimalizować do paska zadań na dole i zamykać iksem. Każda Twoja akcja zwiększa POZIOM WIXY!",
      image: "/assets/new.gif"
    },
    {
      title: "Ikony Pulpitu",
      content: "Kliknij dwa razy (Double Click), aby uruchomić program. Możesz też przeciągać ikony do Kosza, jeśli Mirek Cię zdenerwuje.",
      image: "/assets/spirytus.png"
    },
    {
      title: "Terminal Sołtysa",
      content: "Dla zaawansowanych użytkowników mamy Terminal. Wpisz 'help', aby zobaczyć listę komend. Pamiętaj: 'wixa' to Twoja ulubiona komenda.",
      image: "/assets/construction.gif"
    },
    {
      title: "Gotowy na Wixę?",
      content: "To wszystko! Eksploruj, klikaj i nie bój się błędów systemowych - w tym systemie błędy to po prostu styl życia.",
      image: "/assets/dancer_pixel.png"
    }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      closeWindow('onboarding');
    }
  };

  return (
    <div style={{
      width: '400px',
      background: '#c0c0c0',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      fontFamily: 'var(--font-win95)'
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <img 
          src={steps[step].image} 
          style={{ width: '64px', height: '64px', imageRendering: 'pixelated' }} 
          alt="Wizard Step" 
        />
        <div>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', borderBottom: '2px solid #888' }}>{steps[step].title}</h3>
          <p style={{ fontSize: '12px', lineHeight: '1.4' }}>{steps[step].content}</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px', borderTop: '1px solid #fff', paddingTop: '10px' }}>
        <button 
          className="win95-button" 
          style={{ minWidth: '80px' }}
          onClick={() => closeWindow('onboarding')}
        >
          Anuluj
        </button>
        <button 
          className="win95-button" 
          style={{ minWidth: '80px', fontWeight: 'bold' }}
          onClick={nextStep}
        >
          {step === steps.length - 1 ? "Zakończ" : "Dalej >"}
        </button>
      </div>
    </div>
  );
};

export default OnboardingWizard;
