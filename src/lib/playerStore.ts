import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PlayerStats {
  folkPurity: number;      // 0-100
  chaosAffinity: number;   // 0-100
  wixaMana: number;        // 0-100 (Energy resource)
  xp: number;
  level: number;
  title: string;
}

export type WorldAura = 'HARMONY' | 'CHAOS' | 'DYSTOPIA' | 'TRADITION' | 'NEUTRAL';

interface PlayerStore extends PlayerStats {
  getWorldAura: () => WorldAura;
  // Actions
  addXP: (amount: number) => void;
  updateStat: (stat: keyof Pick<PlayerStats, 'folkPurity' | 'chaosAffinity' | 'wixaMana'>, amount: number) => void;
  useMana: (amount: number) => boolean;
  levelUp: () => void;
  resetStats: () => void;
}

const getTitleForStats = (stats: PlayerStats) => {
  if (stats.level >= 10) return "LEGENDY KUJAW";
  if (stats.chaosAffinity > 80) return "WŁADCA CYFROWEGO BAZARU";
  if (stats.folkPurity > 80) return "SOŁTYS ROKU 2026";
  if (stats.level > 5) return "DOŚWIADCZONY OBRZĘDNIK";
  return "MŁODY WIXIARZ";
};

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      folkPurity: 50,
      chaosAffinity: 20,
      wixaMana: 100,
      xp: 0,
      level: 1,
      title: "MŁODY WIXIARZ",
      
      getWorldAura: () => {
        const { folkPurity, chaosAffinity } = get();
        if (folkPurity > 75 && chaosAffinity > 75) return 'HARMONY';
        if (chaosAffinity > 70) return 'CHAOS';
        if (folkPurity > 70) return 'TRADITION';
        if (chaosAffinity > 40 && folkPurity < 30) return 'DYSTOPIA';
        return 'NEUTRAL';
      },

      addXP: (amount: number) => {
        const newXp = get().xp + amount;
        const currentLevel = get().level;
        const nextLevelThreshold = currentLevel * 1000;
        
        if (newXp >= nextLevelThreshold) {
          get().levelUp();
        }
        
        set({ xp: newXp });
      },

      updateStat: (stat, amount) => {
        set((state) => {
          const newVal = Math.min(100, Math.max(0, state[stat] + amount));
          const newState = { ...state, [stat]: newVal };
          return { ...newState, title: getTitleForStats(newState) };
        });
      },

      useMana: (amount) => {
        const currentMana = get().wixaMana;
        if (currentMana >= amount) {
          set({ wixaMana: currentMana - amount });
          return true;
        }
        return false;
      },

      levelUp: () => {
        set((state) => ({ 
          level: state.level + 1,
          wixaMana: 100 // Refill mana on level up
        }));
      },

      resetStats: () => {
        set({
          folkPurity: 50,
          chaosAffinity: 20,
          wixaMana: 100,
          xp: 0,
          level: 1,
          title: "MŁODY WIXIARZ"
        });
      }
    }),
    {
      name: 'raptem_player_progress', // LocalStorage key
    }
  )
);
