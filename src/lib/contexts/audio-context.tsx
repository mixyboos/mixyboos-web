import logger from "@/lib/logger";
import { type MixModel } from "@/lib/models";
import { create } from "zustand";

enum PlayState {
  stopped = 1,
  playing = 2,
  paused = 3,
}

interface IAudioState {
  nowPlaying?: MixModel;
  nowPlayingId?: string;
  nowPlayingUrl?: string;
  position: number;
  progressPercentage: number;
  seekPosition: number;
  duration: number;
  playState: PlayState;
  currentVolume: number;
  muted: boolean;
  clearNowPlaying: () => void;
  setNowPlaying: (mix: MixModel, url: string, id: string) => void;
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
  id: "",
  url: "",
  nowPlaying: undefined,
  nowPlayingId: "",
  nowPlayingUrl: "",
  position: -1,
  seekPosition: -1,
  duration: 0,
  playState: PlayState.stopped,
  currentVolume: 500,
  muted: false,
  progressPercentage: 0,

  setPosition: (position: number) => {
    logger.debug("audio-context", "setPosition", position);
    const progressPercentage = (position / get().duration) * 100;
    set({ position, progressPercentage });
  },
  setSeekPosition: (seekPosition: number) => set((state) => ({ seekPosition })),
  setDuration: (duration: number) => set((state) => ({ duration })),
  clearNowPlaying: () =>
    set({ nowPlaying: undefined, nowPlayingUrl: "", nowPlayingId: "" }),
  setNowPlaying: (mix: MixModel, url: string, id: string) =>
    set((state) => ({ nowPlaying: mix, nowPlayingUrl: url, nowPlayingId: id })),
  setPlayState: (playState: PlayState) => {
    if (get().playState !== playState) {
      set({ playState });
    }
  },
  togglePlayState: () =>
    set((state) => {
      return {
        playState:
          state.playState === PlayState.playing ? PlayState.paused : PlayState.playing,
      };
    }),
  setVolume: (volume: number) => set({ currentVolume: volume }),
  setMuted: (muted: boolean) => set({ muted }),
  toggleMuted: () => set((state) => ({ muted: !state.muted })),
}));

export type { IAudioState };
export { PlayState };
export default useAudioStore;
