import { create } from 'zustand';

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

interface WindowStore {
  windows: Record<string, WindowState>;
  maxZ: number;
  registerWindow: (id: string, title: string) => void;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  focusWindow: (id: string) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: {},
  maxZ: 1000,
  registerWindow: (id, title) => set((state) => {
    if (state.windows[id]) return state;
    return {
      windows: {
        ...state.windows,
        [id]: { id, title, isOpen: false, isMinimized: false, zIndex: 1000 }
      }
    };
  }),
  openWindow: (id) => set((state) => ({
    maxZ: state.maxZ + 1,
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isOpen: true, isMinimized: false, zIndex: state.maxZ + 1 }
    }
  })),
  closeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isOpen: false }
    }
  })),
  toggleMinimize: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMinimized: !state.windows[id].isMinimized }
    }
  })),
  focusWindow: (id) => set((state) => {
    const newZ = state.maxZ + 1;
    return {
      maxZ: newZ,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: true, isMinimized: false, zIndex: newZ }
      }
    };
  }),
}));
