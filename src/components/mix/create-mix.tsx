import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from '@tanstack/react-router'
import type { MixModel } from '@/lib/models/mix'
import { Icons } from '@/components/icons'
import CreateMixDetails from '@/components/mix/create-mix-details'
import FileUpload from '@/components/widgets/file-upload'
import PageHeader from '@/components/widgets/page-header'
import UploadProgress from '@/components/mix/upload-progress'
import { useMixUpload, UploadPhase } from '@/lib/hooks/use-mix-upload'

const MixCreateComponent = () => {
  const router = useRouter()
  const [mixId] = React.useState(uuidv4())
  const [showDetails, setShowDetails] = React.useState(false)
  
  const {
    state,
    startUpload,
    retry,
    isCompleted,
    overallProgress,
  } = useMixUpload({
    mixId,
    onComplete: () => {
      // Automatically show the details form when upload completes
      setShowDetails(true)
    },
    onError: (error) => {
      console.error('Upload error:', error)
    },
  })

  return (
    <div className="flex flex-col justify-center space-y-4">
      <PageHeader title="Let's create a mix" />
      <div className="flex flex-col items-center justify-center">
        {/* Error Display */}
        {state.error && (
          <div className="mx-auto mb-4 flex w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-md dark:bg-slate-800">
            <div className="flex w-12 items-center justify-center bg-red-500">
              <Icons.error className="h-6 w-6 fill-current text-white" />
            </div>
            <div className="-mx-3 px-4 py-2">
              <div className="mx-3">
                <span className="font-semibold text-red-500 dark:text-red-400">
                  Oopsies...
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-200">
                  {state.error.message}
                </p>
                {state.error.details && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {state.error.details}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* File Upload - Show when idle or failed */}
        {(state.phase === UploadPhase.IDLE || state.phase === UploadPhase.FAILED) && !showDetails && (
          <div className="mx-auto my-8 w-3/5">
            <FileUpload
              mixId={mixId}
              onError={(errorMessage) => {
                console.error('FileUpload error:', errorMessage)
              }}
              onUploadComplete={() => {
                // Handled by useMixUpload hook
              }}
              onUploadStart={(file: File) => {
                startUpload(file)
              }}
              onUploadProgress={() => {
                // Progress handled by useMixUpload hook
              }}
            />
            {state.phase === UploadPhase.FAILED && state.error?.retryable && (
              <div className="mt-4 text-center">
                <button
                  onClick={retry}
                  className="text-sm text-primary hover:underline"
                >
                  Try uploading again
                </button>
              </div>
            )}
          </div>
        )}

        {/* Progress Display - Show during upload and processing */}
        {(state.phase === UploadPhase.UPLOADING || state.phase === UploadPhase.PROCESSING) && (
          <div className="mx-auto my-8 w-full max-w-2xl">
            <UploadProgress
              state={state}
              overallProgress={overallProgress}
              onRetry={retry}
            />
          </div>
        )}

        {/* Mix Details Form - Show after upload completes */}
        {(isCompleted || showDetails) && (
          <CreateMixDetails
            mix={{ id: mixId, title: state.fileName || 'New Mix' } as MixModel}
            onMixCreated={(mix, error) => {
              if (error) {
                console.error('Error creating mix:', error)
              } else if (mix && mix.user) {
                router.navigate({ to: `/${mix.user.slug}/${mix.slug}` })
              }
            }}
          />
        )}
      </div>
    </div>
  )
}

export default MixCreateComponent
