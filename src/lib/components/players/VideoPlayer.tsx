/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import Hls, { type HlsConfig } from "hls.js";
import { StatusCodes } from "http-status-codes";
import NotFoundImageContainer from "@/components/widgets/notfound-image-container";

export interface HlsPlayerProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  hlsConfig?: HlsConfig;
  src: string;
}

function VideoPlayer({ hlsConfig, src, autoPlay, ...props }: HlsPlayerProps) {
  const playerRef = React.createRef<HTMLVideoElement>();
  const [loadError, setLoadError] = React.useState(false);
  React.useEffect(() => {
    let hls: Hls;

    function _initPlayer() {
      if (hls) {
        hls.destroy();
      }

      const newHls = new Hls({
        enableWorker: false,
        ...hlsConfig,
      });
      if (playerRef.current != null) {
        playerRef.current.volume = 0;
        newHls.attachMedia(playerRef.current);
      }

      newHls.on(Hls.Events.ERROR, (event, data) => {
        console.log("VideoPlayer", "ERROR", event, data);
        setLoadError(data.response?.code === StatusCodes.NOT_FOUND);
      });
      newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
        newHls.loadSource(src);

        newHls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (autoPlay) {
            if (playerRef.current) {
              playerRef?.current
                ?.play()
                .catch(() =>
                  console.log(
                    "Unable to autoplay prior to user interaction with the dom.",
                  ),
                );
              playerRef.current.muted = false;
            }
          }
        });
      });

      newHls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              newHls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              newHls.recoverMediaError();
              break;
            default:
              _initPlayer();
              break;
          }
        }
      });

      hls = newHls;
    }

    // Check for Media Source support
    if (Hls.isSupported()) {
      _initPlayer();
    }

    return () => {
      if (hls != null) {
        hls.destroy();
      }
    };
  }, [autoPlay, hlsConfig, playerRef, src]);
  return loadError ? (
    <NotFoundImageContainer width={1024} height={768} />
  ) : (
    <video className="videoCentered" ref={playerRef} {...props} />
  );
}

export default VideoPlayer;
