import React, { useState } from 'react'
import MixList from '../src/components/mix/MixList'

const index = () => {
  const [data, setData] = useState('')

  return (
    <div className="p-5 mt-6 overflow-y-auto">
      <div className="mx-24 mt-6">
        <MixList />
      </div>
    </div>
  )
}

export default index
