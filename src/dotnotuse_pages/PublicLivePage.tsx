import React from 'react'
import { useParams } from 'react-router-dom'
import { CreateShow, Show } from '../components/live'
import liveService from '../services/api/liveService'
export const PublicLivePage = () => {
  let { user } = useParams()
  const [title, setTitle] = React.useState('Tongue punch my fart box')

  const startShow = async (title: string) => {
    if (title) {
      await liveService.getShow()
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
export default PublicLivePage
