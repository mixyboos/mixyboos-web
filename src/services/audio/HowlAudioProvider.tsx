import { Howl } from 'howler'
import React, { useRef } from 'react'
import useAudioStore, { AudioState, PlayState } from './audioStore'

export interface IAudioProviderProps {
  children: React.ReactNode
}

const AudioProvider: React.FC<IAudioProviderProps> = ({ children }) => {
  const player = useRef<Howl>()

  //TODO: WTF???
  const url = useAudioStore((state: AudioState) => state.url)
  const setPosition = useAudioStore((state: AudioState) => state.setPosition)
  const setDuration = useAudioStore((state: AudioState) => state.setDuration)
  const seekPosition = useAudioStore((state: AudioState) => state.seekPosition)
  const setPlayState = useAudioStore((state: AudioState) => state.setPlayState)
  const playState = useAudioStore((state: AudioState) => state.playState)
  //TODO: END WTF???

  React.useEffect(() => {
    if (playState === PlayState.stopped) return

    if (player.current?.playing() && playState === PlayState.playing) {
      player.current.pause()
    } else {
      player.current.play()
    }
  }, [playState])

  const progressTimer = useRef<NodeJS.Timeout>()
  React.useEffect(() => {
    if (player.current) {
      player.current.stop()
    }
    if (progressTimer.current) {
      clearInterval(progressTimer.current)
    }
    if (url) {
      player.current = _createPlayer(url)
      player.current.play()
    }
    progressTimer.current = setInterval(() => {
      setPosition((player.current?.seek() || 0) as number)
    }, 100)
  }, [url])

  React.useEffect(() => {
    player.current?.seek(seekPosition)
  }, [seekPosition])

  const _createPlayer = (src: string) => {
    const howl = new Howl({
      src: src,
      autoplay: true,
      html5: true,
      volume: 1,
    })
    howl.on('load', () => {
      console.log('AudioProvider', 'Howl Loaded')
      console.log('AudioProvider', 'Setting play state', playState)
      setTimeout(() => {
        setPlayState(PlayState.playing)
        setDuration(howl.duration())
      })
      console.log('AudioProvider', 'Set play state', playState)
    })
    return howl
  }

  return <React.Fragment>{children}</React.Fragment>
}

export default AudioProvider
