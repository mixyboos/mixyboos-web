import { MixModel } from '@lib/data/models';
import create from 'zustand';

enum PlayState {
  stopped = 1,
  playing = 2,
  paused = 3,
}

interface IAudioState {
  nowPlaying?: MixModel;
  position: number;
  seekPosition: number;
  duration: number;
  playState: PlayState;
  currentVolume: number;
  muted: boolean;
  setNowPlaying: (mix: MixModel) => void;
  setPosition: (position: number) => void;
  setDuration: (duration: number) => void;
  setSeekPosition: (duration: number) => void;
  setPlayState: (playState: PlayState) => void;
  togglePlayState: () => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  toggleMuted: () => void;
}

const useAudioStore = create<IAudioState>()((set, get) => ({
  id: '',
  url: '',
  nowPlaying: undefined,
  position: -1,
  seekPosition: -1,
  duration: 0,
  playState: PlayState.stopped,
  currentVolume: 50,
  muted: false,

  setPosition: (position: number) => set((state) => ({ position })),
  setSeekPosition: (seekPosition: number) => set((state) => ({ seekPosition })),
  setDuration: (duration: number) => set((state) => ({ duration })),
  setNowPlaying: (mix: MixModel) => set((state) => ({ nowPlaying: mix })),
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
  setVolume: (volume: number) => set({ currentVolume: volume }),
  setMuted: (muted: boolean) => set({ muted }),
  toggleMuted: () => set((state) => ({ muted: !state.muted })),
}));

export type { IAudioState };
export { PlayState };
export default useAudioStore;
