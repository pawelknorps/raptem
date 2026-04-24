import { create } from 'zustand';
import { usePlayerStore } from './playerStore';

export type NPC = 'MIREK' | 'JANEK' | 'STASZEK' | 'SOLTYS';
export type Branch = 'TRADITION' | 'CHAOS' | 'NEUTRAL';

export interface Quest {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  isAccepted: boolean;
  giver?: NPC;
  branch: Branch;
  rewardXP: number;
  prerequisiteId?: string;
}

interface QuestStore {
  quests: Quest[];
  unlockQuest: (id: string) => void;
  acceptQuest: (id: string) => void;
  completeQuest: (id: string) => void;
  getQuestsByGiver: (npc: NPC) => Quest[];
  getActiveQuests: () => Quest[];
}

export const useQuestStore = create<QuestStore>((set, get) => ({
  quests: [
    { 
      id: 'start', 
      title: 'Początek Wixy', 
      description: 'Otwórz manifest projektu (LORE) i poczytaj o Murzynnie.', 
      isCompleted: false, 
      isUnlocked: true, 
      isAccepted: true, 
      branch: 'NEUTRAL', 
      rewardXP: 100 
    },
    { 
      id: 'music', 
      title: 'Meloman Bazarowy', 
      description: 'Włącz muzykę w WinAmpie.', 
      isCompleted: false, 
      isUnlocked: true, 
      isAccepted: true, 
      branch: 'NEUTRAL', 
      rewardXP: 50 
    },
    { 
      id: 'mirek_drink', 
      title: 'Kolejka u Mirka', 
      description: 'Postaw Mirkowi wirtualny spirytus w czacie.', 
      isCompleted: false, 
      isUnlocked: true, 
      isAccepted: false, 
      giver: 'MIREK', 
      branch: 'CHAOS', 
      rewardXP: 150 
    },
    { 
      id: 'janek_tradition', 
      title: 'Lekcja u Janka', 
      description: 'Ustaw strój na "FOLK" w akordeonie i zagraj 10 nut.', 
      isCompleted: false, 
      isUnlocked: false, 
      isAccepted: false, 
      giver: 'JANEK', 
      branch: 'TRADITION', 
      rewardXP: 200,
      prerequisiteId: 'start'
    },
    { 
      id: 'chaos_master', 
      title: 'Manifest Destrukcji', 
      description: 'Osiągnij 80% Chaos Affinity.', 
      isCompleted: false, 
      isUnlocked: false, 
      isAccepted: false, 
      branch: 'CHAOS', 
      rewardXP: 500,
      prerequisiteId: 'mirek_drink'
    },
    { 
      id: 'radio_babilon_signal', 
      title: 'Sygnał z Babilonu', 
      description: 'Znajdź tajemniczy przekaźnik na mapie Kujaw.', 
      isCompleted: false, 
      isUnlocked: false, 
      isAccepted: false, 
      giver: 'MIREK', 
      branch: 'CHAOS', 
      rewardXP: 300,
      prerequisiteId: 'chaos_master'
    },
    { 
      id: 'janek_ritual_restore', 
      title: 'Czystość Obrzędu', 
      description: 'Zabij 5 cyfrowych wirusów w Skanerze Folkloru.', 
      isCompleted: false, 
      isUnlocked: false, 
      isAccepted: false, 
      giver: 'JANEK', 
      branch: 'TRADITION', 
      rewardXP: 350,
      prerequisiteId: 'janek_tradition'
    },
    { 
      id: 'staszek_antena', 
      title: 'Antena Staszka', 
      description: 'Zmontuj antenę na stodole (Mini-gra w przygotowaniu).', 
      isCompleted: false, 
      isUnlocked: true, 
      isAccepted: false, 
      giver: 'STASZEK', 
      branch: 'NEUTRAL', 
      rewardXP: 150
    }
  ],

  unlockQuest: (id) => set((state) => ({
    quests: state.quests.map(q => q.id === id ? { ...q, isUnlocked: true } : q)
  })),

  acceptQuest: (id) => set((state) => ({
    quests: state.quests.map(q => q.id === id ? { ...q, isAccepted: true } : q)
  })),

  completeQuest: (id) => {
    const quest = get().quests.find(q => q.id === id);
    if (quest && !quest.isCompleted) {
      // Reward player
      usePlayerStore.getState().addXP(quest.rewardXP);
      if (quest.branch === 'TRADITION') usePlayerStore.getState().updateStat('folkPurity', 5);
      if (quest.branch === 'CHAOS') usePlayerStore.getState().updateStat('chaosAffinity', 5);

      set((state) => ({
        quests: state.quests.map(q => q.id === id ? { ...q, isCompleted: true } : q)
      }));

      // Auto-unlock next quests
      get().quests.forEach(q => {
        if (q.prerequisiteId === id) get().unlockQuest(q.id);
      });
    }
  },

  getQuestsByGiver: (npc) => get().quests.filter(q => q.giver === npc && q.isUnlocked && !q.isCompleted),
  getActiveQuests: () => get().quests.filter(q => q.isAccepted && !q.isCompleted)
}));
