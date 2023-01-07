import create, { State } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

enum PlayState {
  stopped = 1,
  playing = 2,
  paused = 3,
}

interface IAudioState {
  id: string;
  url: string;
  position: number;
  seekPosition: number;
  duration: number;
  playState: PlayState;
  setNowPlaying: (id: string, url: string) => void;
  setPosition: (position: number) => void;
  setDuration: (duration: number) => void;
  setSeekPosition: (duration: number) => void;
  setPlayState: (playState: PlayState) => void;
  togglePlayState: () => void;
}

const useAudioStore = create<IAudioState>()((set, get) => ({
  id: '',
  url: '',
  position: -1,
  seekPosition: -1,
  duration: -1,
  playState: PlayState.stopped,

  setPosition: (position: number) => set((state) => ({ position })),
  setSeekPosition: (seekPosition: number) => set((state) => ({ seekPosition })),
  setDuration: (duration: number) => set((state) => ({ duration })),
  setNowPlaying: (id: string, url: string) => set((state) => ({ id, url })),
  setPlayState: (playState: PlayState) => {
    if (get().playState !== playState) {
      set({ playState });
    }
  },
  togglePlayState: () =>
    set((state) => {
      return {
        playState:
          state.playState === PlayState.playing
            ? PlayState.paused
            : PlayState.playing,
      };
    }),
}));

export type { IAudioState };
export { PlayState };
export default useAudioStore;
