import { getSession, useSession } from 'next-auth/client'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CreateShow, Show, ShowStatus } from '../src/components/live'
import StreamConnector from '../src/components/live/StreamConnector'
import LiveService from '../src/services/api/liveService'

export const LivePage = () => {
  //TODO: this should be a type, not separate vars
  const service = React.useRef<LiveService>(null)
  const [session, loading] = useSession()

  const [showId, setShowId] = React.useState(uuidv4())
  const [streamId, setStreamId] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [showStatus, setShowStatus] = React.useState<ShowStatus>(
    ShowStatus.setup
  )

  React.useEffect(() => {
    const checkForCurrentShow = async () => {
      const inProgressShowId = await service.current.getCurrentShow()
      if (inProgressShowId) {
        setShowId(inProgressShowId.id)
        setTitle(inProgressShowId.title)
        setShowStatus(ShowStatus.inProgress)
      } else {
        setShowStatus(ShowStatus.setup)
      }
    }
    if (session) {
      service.current = new LiveService(session.accessToken as string)
    }
    if (showStatus === ShowStatus.setup && session) {
      checkForCurrentShow()
    }
  }, [session])

  const startShow = async (title: string) => {
    if (title) {
      await service.current.startShow(title)
      setTitle(title)
      setShowStatus(ShowStatus.awaitingStreamConnection)
    } else {
      //TODO
      alert('Please enter a title for your live show')
    }
  }
  const _getPage = (status: ShowStatus) => {
    switch (status) {
      case ShowStatus.setup:
        return <CreateShow startShow={startShow} />
      case ShowStatus.awaitingStreamConnection:
        return <StreamConnector showId={showId} setStreamId={setStreamId} />
      case ShowStatus.inProgress:
        return (
          <Show
            title={title}
            showId={showId}
            streamId={streamId}
            showStatus={showStatus}
            setShowStatus={setShowStatus}
          />
        )
      default:
        return <div>Checking......</div>
    }
  }
  return <div className="p-5 mt-6 overflow-y-auto">{_getPage(showStatus)}</div>
}

export async function getServerSideProps(ctx) {
  try {
    const session = await getSession(ctx)
    if (session?.accessToken) {
      return {
        props: {
          session,
        },
      }
    }
    throw new Error('unauthorized')
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: `/login?redirectUri=${process.env.NEXTAUTH_URL}/live`,
      },
    }
  }
}

export default LivePage
