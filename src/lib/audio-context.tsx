import { create } from "zustand";
import type { MixModel } from "@/lib/models/mix";
import logger from "@/lib/logger";

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
    logger.debugLog("audio-context", "setPosition", position);
    const progressPercentage = (position / get().duration) * 100;
    set({ position, progressPercentage });

    // TODO: refactor this out to a service
    // update local storage with the positions of all items
    const positions = JSON.parse(localStorage.getItem("_p") || "[]");
    const currentItem = positions.find((p: { id: string; position: number }) => p.id === get().nowPlayingId);
    if (currentItem) {
      currentItem.position = position;
    } else {
      positions.push({ id: get().nowPlayingId, position });
    }
    localStorage.setItem("_p", JSON.stringify(positions));
    // TODO: end
  },
  setSeekPosition: (seekPosition: number) => set(() => ({ seekPosition })),
  setDuration: (duration: number) => set(() => ({ duration })),
  clearNowPlaying: () =>
    set({ nowPlaying: undefined, nowPlayingUrl: "", nowPlayingId: "" }),
  setNowPlaying: (mix: MixModel, url: string, id: string) =>
    set(() => ({ nowPlaying: mix, nowPlayingUrl: url, nowPlayingId: id })),
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
