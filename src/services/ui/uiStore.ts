import create, { State } from 'zustand'

interface IUiState extends State {
  count: number
  incrementCount: () => void
  setCount: (count: number) => void
  hasHeader: boolean
  setHasHeader: (hasHeader: boolean) => void
}

const useUiStore = create<IUiState>((set) => ({
  count: 0,
  incrementCount: () =>
    set((newState) => {
      {
        count: newState.count++
      }
    }),
  setCount: (count: number) =>
    set((state) => {
      count: state.count
    }),
  hasHeader: true,
  setHasHeader: () => {
    set((newState) => {
      console.log('uiStore', 'setHasHeader', newState)
      return { hasHeader: newState.hasHeader }
    })
  },
}))

export default useUiStore
