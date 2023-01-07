'use client';
import create from 'zustand';
import { createContext } from 'react';

export interface IUiState {
  hasHeader: boolean;
  hasSidebar: boolean;
  setHasHeader: (hasHeader: boolean) => void;
  setHasSidebar: (hasSidebar: boolean) => void;
}

const useUiStore = create<IUiState>()((set, get) => ({
  hasHeader: true,
  hasSidebar: false,
  setHasHeader: (hasHeader: boolean) => {
    set({ hasHeader });
  },
  setHasSidebar: (hasSidebar: boolean) => {
    if (get().hasSidebar !== hasSidebar) {
      set({ hasSidebar });
    }
  },
}));

// if (process.env.NODE_ENV === 'development') {
//   mountStoreDevtool('Store', useUiStore);
// }
export const UIContext = createContext<IUiState | null>(null);
export default useUiStore;
