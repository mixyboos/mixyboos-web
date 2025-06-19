'use client'

import React from 'react'
import Hls from 'hls.js'
import type { PropsWithChildren } from 'react'
import logger from '@/lib/logger'
import useAudioStore, { PlayState } from '@/lib/contexts/audio-context'

const AudioProvider = ({ children }: PropsWithChildren) => {
  // don't use this directly as some of the hls callbacks don't have this in scope
  const __player = React.createRef<HTMLAudioElement>()

  const {
    nowPlayingUrl,
    setPosition,
    setDuration,
    seekPosition,
    setPlayState,
    playState,
  } = useAudioStore()

  React.useEffect(() => {
    if (!nowPlayingUrl) return
    let hls: Hls

    const __initPlayer = (player: HTMLAudioElement) => {
      if (hls) {
        hls.destroy()
      }

      hls = new Hls({
        enableWorker: false,
      })

      hls.attachMedia(player)

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(nowPlayingUrl)
        hls.on(Hls.Events.MANIFEST_PARSED, async () => {
          player.volume = 0.1
          player.ontimeupdate = () => {
            setPosition(player.currentTime)
          }
          hls.on(Hls.Events.FRAG_CHANGED, (_event, data) => {
            if (data.frag) {
              setPosition(data.frag.start)
            }
          })
          try {
            await player.play()
            setDuration(player.duration || 0)
            setPlayState(PlayState.playing)
          } catch (err) {
            logger.error('audio-provider', 'Error playing url', err)
            console.log(
              'Unable to autoplay prior to user interaction with the dom.',
            )
          }
        })
      })
      hls.on(Hls.Events.ERROR, function (_event, data) {
        logger.error('AudioProvider', 'Unable to initialise audio player', data)
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError()
              break
            default:
              if (__player.current) {
                __initPlayer(__player.current)
              }
              break
          }
        }
      })
    }
    if (Hls.isSupported() && __player.current) {
      __initPlayer(__player.current)
    }

    return () => {
      if (hls != null) {
        hls.destroy()
      }
    }
  }, [nowPlayingUrl])

  React.useEffect(() => {
    if (!__player.current) return
    if (playState === PlayState.paused) {
      __player.current.pause()
    } else if (playState === PlayState.playing) {
      __player.current
        .play()
        .catch((err) => logger.error('audio-provider', 'error resuming', err))
    }
  }, [playState, __player])

  React.useEffect(() => {
    if (!__player.current) return
    __player.current.currentTime = seekPosition
  }, [seekPosition])

  return (
    <>
      {children}
      <audio ref={__player} />
    </>
  )
}

export default AudioProvider
