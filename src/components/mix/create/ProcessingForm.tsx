import React from 'react'

export const ProcessingForm = () => {
  return (
    <div className="relative pt-1">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="inline-block px-2 py-1 text-xs font-semibold uppercase rounded-full text-amber-600 bg-amber-200">
            Task in progress
          </span>
        </div>
        <div className="text-right">
          <span className="inline-block text-xs font-semibold text-amber-600">
            50%
          </span>
        </div>
      </div>
      <div className="flex h-2 mb-4 overflow-hidden text-xs rounded bg-amber-200">
        <div
          style={{ width: '10%' }}
          className="flex flex-col justify-center text-center text-white bg-red-500 shadow-none whitespace-nowrap"
        ></div>
        <div
          style={{ width: '15%' }}
          className="flex flex-col justify-center text-center text-white bg-orange-500 shadow-none whitespace-nowrap"
        ></div>
        <div
          style={{ width: '25%' }}
          className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap bg-amber-500"
        ></div>
      </div>
    </div>
  )
}
