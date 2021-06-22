import React, { useState } from 'react'
import { MixModel } from '../../data/models'
import mixService from '../../services/api/mixService'
import MixListItem from './MixListItem'

const MixList = () => {
  const [loading, setLoading] = useState(true)
  const [mixes, setMixes] = useState<Array<MixModel>>()

  React.useEffect(() => {
    mixService.getMixes().then((m: Array<MixModel>) => {
      setLoading(false)
      setMixes(m)
    })
  }, [])
  return (
    <React.Fragment>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {mixes?.map((r) => (
            <MixListItem key={r.id} mix={r} />
          ))}
        </div>
      )}
    </React.Fragment>
  )
}
export default MixList
