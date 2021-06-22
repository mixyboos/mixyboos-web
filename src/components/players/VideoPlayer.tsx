import { default as Config, default as Hls } from 'hls.js';
import React, { RefObject } from 'react';

export interface HlsPlayerProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  hlsConfig?: Config;
  playerRef: RefObject<HTMLVideoElement>;
  src: string;
}

function VideoPlayer({
  hlsConfig,
  playerRef = React.createRef<HTMLVideoElement>(),
  src,
  autoPlay,
  ...props
}: HlsPlayerProps) {
  React.useEffect(() => {
    let hls: Hls

    function _initPlayer() {
      if (hls != null) {
        hls.destroy()
      }

      const newHls = new Hls({
        enableWorker: false,
        ...hlsConfig,
      })

      if (playerRef.current != null) {
        newHls.attachMedia(playerRef.current)
      }

      newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
        newHls.loadSource(src)

        newHls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (autoPlay) {
            playerRef?.current
              ?.play()
              .catch(() =>
                console.log(
                  'Unable to autoplay prior to user interaction with the dom.'
                )
              )
          }
        })
      })

      newHls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              newHls.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              newHls.recoverMediaError()
              break
            default:
              _initPlayer()
              break
          }
        }
      })

      hls = newHls
    }

    // Check for Media Source support
    if (Hls.isSupported()) {
      _initPlayer()
    }

    return () => {
      if (hls != null) {
        hls.destroy()
      }
    }
  }, [autoPlay, hlsConfig, playerRef, src])
  return (
    <video height="100%" className="videoCentered" ref={playerRef} {...props} />
  );
}

export default VideoPlayer;
