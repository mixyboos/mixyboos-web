import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useUiStore from '../../../services/ui/uiStore'
import Progress from '../../progress'
import DetailsForm from './DetailsForm'
import FileUpload from './FileUpload'
import { ProcessingForm } from './ProcessingForm'

enum CreateState {
  new,
  uploading,
  processing,
  editing,
  done,
}

const MixCreate = () => {
  const [createState, setCreateState] = useState(CreateState.new)
  const [errors, setErrors] = useState('')
  const [percentageUploaded, setPercentageUploaded] = useState(0)
  const [mixId] = useState(uuidv4())
  const setHasHeader = useUiStore((state) => state.setHasHeader)
  const showHeader = useUiStore((state) => state.hasHeader)

  return (
    <React.Fragment>
      <div className="flex flex-col px-20 justify-items-center">
        <Progress percentage={percentageUploaded} mixId={mixId} />
        {errors && (
          <div className="flex w-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center justify-center w-12 bg-red-500">
              <svg
                className="w-6 h-6 text-white fill-current"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
              </svg>
            </div>
            <div className="px-4 py-2 -mx-3">
              <div className="mx-3">
                <span className="font-semibold text-red-500 dark:text-red-400">
                  Ooopsies...
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-200">
                  {errors}
                </p>
              </div>
            </div>
          </div>
        )}
        {createState === CreateState.processing && <ProcessingForm />}
        {createState === CreateState.processing ||
          createState === CreateState.new}
        {createState === CreateState.new ? (
          <FileUpload
            mixId={mixId}
            onError={(e) => setErrors(e)}
            onUploadComplete={() => setCreateState(CreateState.processing)}
            onUploadStart={() => setCreateState(CreateState.uploading)}
            onUploadProgress={(total, loaded) =>
              setPercentageUploaded(Math.round((loaded * 100) / total))
            }
          />
        ) : (
          <DetailsForm mixId={mixId} />
        )}
      </div>
    </React.Fragment>
  )
}
export default MixCreate
