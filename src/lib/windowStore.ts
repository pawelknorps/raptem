import { create } from 'zustand';

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface WindowStore {
  windows: Record<string, WindowState>;
  maxZ: number;
  registerWindow: (id: string, title: string) => void;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, x: number, y: number) => void;
  updateSize: (id: string, width: number, height: number) => void;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  currentWorkspace: number;
  setWorkspace: (id: number) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: {},
  maxZ: 1000,
  registerWindow: (id, title) => set((state) => {
    if (state.windows[id]) return state;
    return {
      windows: {
        ...state.windows,
        [id]: { id, title, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1000 }
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
      [id]: { ...state.windows[id], isMinimized: !state.windows[id].isMinimized, isMaximized: false }
    }
  })),
  toggleMaximize: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized, isMinimized: false }
    }
  })),
  focusWindow: (id) => set((state) => {
    // Only increment maxZ if the window isn't already the top one
    const currentZ = state.windows[id]?.zIndex || 0;
    if (currentZ === state.maxZ && Object.keys(state.windows).length > 1) return state;
    
    const newZ = state.maxZ + 1;
    return {
      maxZ: newZ,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: true, isMinimized: false, zIndex: newZ }
      }
    };
  }),
  updatePosition: (id, x, y) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], x, y }
    }
  })),
  updateSize: (id, width, height) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], width, height }
    }
  })),
  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),
  currentWorkspace: 0,
  setWorkspace: (id) => set({ currentWorkspace: id }),
}));

