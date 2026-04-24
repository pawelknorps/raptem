import React, { useEffect } from 'react';
import { useQuestStore } from '../../lib/QuestEngine';

const QuestLog: React.FC = () => {
  const { quests, completeQuest } = useQuestStore();
  const activeQuest = quests.find(q => !q.isCompleted);

  useEffect(() => {
    const handleQuest = (e: any) => {
      completeQuest(e.detail);
    };
    window.addEventListener('quest-complete', handleQuest);
    return () => window.removeEventListener('quest-complete', handleQuest);
  }, []);

  return (
    <div style={{ padding: '15px', background: '#c0c0c0', color: '#000', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#000080', color: '#fff', padding: '5px', fontWeight: 'bold', marginBottom: '10px' }}>
        DZIENNIK ZADAŃ BAZAROWYCH
      </div>
      
      {activeQuest && (
        <div style={{ border: '2px inset #fff', background: '#ffffcc', padding: '10px', marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#800000' }}>AKTUALNE ZADANIE:</h4>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{activeQuest.title}</p>
          <p style={{ margin: '5px 0 0 0', fontSize: '11px' }}>{activeQuest.description}</p>
        </div>
      )}

      <div style={{ flexGrow: 1, overflowY: 'auto', border: '2px inset #fff', background: '#fff', padding: '5px' }}>
        <h5 style={{ margin: '0 0 5px 0', borderBottom: '1px solid #ccc' }}>LISTA POSTĘPU:</h5>
        {quests.map(quest => (
          <div key={quest.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            marginBottom: '5px',
            opacity: quest.isCompleted ? 0.6 : 1,
            textDecoration: quest.isCompleted ? 'line-through' : 'none'
          }}>
            <div style={{ 
              width: '14px', 
              height: '14px', 
              border: '1px solid #000', 
              background: quest.isCompleted ? '#0f0' : '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '10px'
            }}>
              {quest.isCompleted && '✓'}
            </div>
            <span style={{ fontSize: '11px' }}>{quest.title}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '10px', fontSize: '9px', textAlign: 'center', fontStyle: 'italic' }}>
        "Rób zadania, a teatr sama Cię znajdzie." -- Mirek
      </div>
    </div>
  );
};

export default QuestLog;
