import { useRouter } from 'next/router'
import React from 'react'
import useUiStore from '../src/services/ui/uiStore'

const ErrorPage = () => {
  const setHasHeader = useUiStore((state) => state.setHasHeader)
  const router = useRouter()

  React.useEffect(() => {
    setHasHeader(false)
  }, [])

  return (
    <div className="m-auto">
      <div className="flex items-center justify-center w-9/12 min-h-screen m-auto -mt-14">
        <div className="pb-8 overflow-hidden bg-white">
          <div className="text-center">
            <div
              className="h-64 bg-cover rounded-lg"
              style={{
                backgroundImage: 'url("/img/error.gif")',
              }}
            />
            <h1 className="py-8 text-6xl font-medium">Bollocks!!</h1>
            <p className="px-12 pb-8 text-2xl font-medium">
              Something's gone wrong... bear with us as we try to fix it....
            </p>
            <button
              className="px-6 py-3 font-semibold text-white rounded-md bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500"
              onClick={() => router.back()}
            >
              Go Back?
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
