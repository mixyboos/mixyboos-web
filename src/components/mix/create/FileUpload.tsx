import React from 'react'
import uploadService from '../../../services/api/uploadService'

interface IFileUploadProps {
  mixId: string
  onError: (error: string) => void
  onUploadStart: () => void
  onUploadComplete: () => void
  onUploadProgress: (total: number, loaded: number) => void
}

const FileUpload = ({
  mixId,
  onError,
  onUploadStart,
  onUploadComplete,
  onUploadProgress,
}: IFileUploadProps) => {
  const startUpload = async (event: React.FormEvent<HTMLInputElement>) => {
    const url = '/upload/audio'
    const formData = new FormData()
    if (!event.currentTarget.files) return

    formData.append('id', mixId)
    // formData.append('file', event.target.value files[0])
    formData.append('file', event.currentTarget.files[0])
    try {
      onUploadStart()
      const result = await uploadService.uploadAudio(
        mixId,
        formData,
        onUploadProgress
      )
      onUploadComplete()
    } catch (err) {
      console.error('Upload', 'Error', err)
      onError(
        'Error uploading file, please refresh your browser and try again!'
      )
    }
  }
  return (
    <React.Fragment>
      <div className="flex justify-center w-full">
        <div className="flex p-4 rounded-md shadow-md lg:w-1/2 bg-gray-50">
          <div className="flex flex-col justify-center flex-grow m-5">
            <div className="font-semibold text-gray-700">
              Let's do a mixyboo
            </div>
            <div className="text-sm text-gray-900 sm:text-center">
              Give us what you got... we'll do our best to process it.
            </div>
          </div>
          <label className="flex flex-col items-center w-64 px-4 py-6 tracking-wide text-gray-600 uppercase bg-white border rounded-lg shadow-lg cursor-pointer text-blue border-blue hover:bg-blue hover:text-gray-400">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => startUpload(e)}
            />
          </label>
        </div>
      </div>{' '}
    </React.Fragment>
  )
}
export default FileUpload
