import React, { useState } from 'react'
import { debugService } from '../services/api/debugService'

interface IDebugData {
  netCoreVersion: string
  osVersion: string
}
const DebugPage = () => {
  const [data, setData] = useState<IDebugData>()

  React.useEffect(() => {
    debugService.getDebugInfo().then((info) => {
      setData(info)
    })
    return () => {}
  }, [])
  return (
    <div className="p-5 mt-6 overflow-y-auto">
      <h1>Debug this motherfucker!!</h1>
      <pre>netCoreVersion: {data?.netCoreVersion}</pre>
      <pre>osVersion: {data?.osVersion}</pre>
    </div>
  )
}

export default DebugPage
