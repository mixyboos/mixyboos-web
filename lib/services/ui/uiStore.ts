import create from 'zustand';

export interface IUiState {
  count: number;
  incrementCount: () => void;
  setCount: (count: number) => void;
  hasHeader: boolean;
  setHasHeader: (hasHeader: boolean) => void;
}

const useUiStore = create<IUiState>((set) => ({
  count: 0,
  hasHeader: true,
  incrementCount: () => (set((state) => ({ count: state.count + 1 }))),
  setCount: (count: number) => (set((state) => ({ count: count }))),
  setHasHeader: () => {
    set((newState) => {
      console.log('uiStore', 'setHasHeader', newState);
      return { hasHeader: newState.hasHeader };
    });
  }
}));

export default useUiStore;
