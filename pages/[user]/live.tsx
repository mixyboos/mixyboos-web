import { useRouter } from 'next/router'
import React from 'react'
import { Chat } from '../../src/components/chat'
import { VideoPlayer } from '../../src/components/players'
import { ActionButton, TagLabel } from '../../src/components/widgets'
import { ShowModel } from '../../src/data/models'
import liveService from '../../src/services/api/liveService'

export const PublicLivePage = () => {
  const router = useRouter()
  const { user } = router.query as { user: string }
  const [show, setShow] = React.useState<ShowModel>()
  const playerRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    if (!user) return
    const getCurrentShow = async () => {
      const show = await liveService.getShowInProgress(user)
      if (show && show.id) {
        setShow(show)
      }
    }
    getCurrentShow()
  }, [user])
  return show && show.id ? (
    <div className="p-5 mt-6 overflow-y-auto">
      {show.title}
      <div className="flex flex-col lg:flex-row">
        <div className="w-full mr-4 lg:w-9/12">
          <VideoPlayer
            playerRef={playerRef}
            src={`${process.env.NEXT_PUBLIC_LIVE_HOST}/hls/${show.id}/index.m3u8`}
            width="100%"
            muted={true}
            autoPlay={true}
            controls={true}
          />

          <div className="p-4 shadow-sm">
            <div className="flex items-center justify-between mt-2">
              <div className="flex space-x-3">
                <div className="text-xl text-gray-700">{show.title}</div>
              </div>
              <div className="flex items-center space-x-3">
                <ActionButton count={123}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </ActionButton>
                <ActionButton count={1}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </ActionButton>
              </div>
            </div>
          </div>

          <div id="wrapper" className="flex flex-row p-2">
            <div id="user-image" className="flex-none w-32 h-full">
              <img
                src=" http://placebeard.it/640x480"
                alt=""
                className="rounded-full"
              />
            </div>
            <div id="details" className="flex-grow mx-6">
              <div className="flex flex-col">
                <div className="text-lg text-gray-900">Fergal Moran</div>
                <div className="text-sm text-gray-700">
                  Started broadcasting 20m ago
                </div>
                <div className="flex flex-row pt-3">
                  <TagLabel title={'House'} />
                  <TagLabel title={'Disco'} />
                  <TagLabel title={'Proto MC-Hammer type stuff'} />
                </div>
              </div>
            </div>
            <div id="actions" className="flex-none w-32 h-32">
              Actions
            </div>
          </div>
        </div>
        <div className="w-full mb-16 ml-4 lg:w-3/12">
          <Chat showId={show.id} />
        </div>
      </div>
    </div>
  ) : (
    <div className="p-5 mt-6 overflow-y-auto">Looking up current show</div>
  )
}
export default PublicLivePage
