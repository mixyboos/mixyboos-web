import React from 'react'
import { CreateShow, Show } from '../components/live'
import liveService from '../services/api/liveService'

enum ShowStatus {
  setup,
  inProgress,
  ending,
}
export const LivePage = () => {
  const [title, setTitle] = React.useState('Tongue punch my fart box')
  const [showStatus, setShowStatus] = React.useState<ShowStatus>(
    ShowStatus.setup
  )

  const startShow = async (title: string) => {
    if (title) {
      await liveService.startShow(title)
      setTitle(title)
      setShowStatus(ShowStatus.inProgress)
    } else {
      //TODO
      alert('Please enter a title for your live show')
    }
  }
  return (
    <div className="p-5 mt-6 overflow-y-auto">
      {showStatus === ShowStatus.setup ? (
        <CreateShow startShow={startShow} />
      ) : (
        <Show title={title} />
      )}
    </div>
  )
}
export default LivePage
