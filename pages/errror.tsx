import React from 'react'

const ErrorPage = () => {
  return (
    <div className="bg-gradient-to-r from-purple-300 to-blue-200">
      <div className="flex items-center justify-center w-9/12 min-h-screen py-16 m-auto">
        <div className="pb-8 overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="pt-8 text-center border-t border-gray-200">
            <h1 className="font-bold text-purple-400 bg-podnoms text-9xl">
              error
            </h1>
            <section className="container max-w-screen-lg pb-10 mx-auto hero">
              <img className="mx-auto" src="/img/error.png" alt="Error" />
            </section>
            <div className="px-12 pb-8 text-2xl font-medium text-gray-600">
              we're having trouble reaching MixyBoo's services.
              <div className="pb-8 text-sm font-semibold text-gray-400">
                this makes us sad too
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
