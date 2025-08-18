import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import type { MixModel } from '@/lib/models/mix'
import { Progress } from '@/components/ui/progress'
import { Icons } from '@/components/icons'
import CreateMixDetails from '@/components/mix/create-mix-details'
import FileUpload from '@/components/widgets/file-upload'
import PageHeader from '@/components/widgets/page-header'

enum CreateState {
  new,
  editing,
  done,
  error,
}
enum UploadState {
  new,
  uploading,
  processing,
  done,
  error,
}
const MixCreateComponent = () => {
  const router = useRouter()
  const [errors, setErrors] = React.useState<Array<string>>([])
  const [createState, setCreateState] = React.useState(CreateState.new)
  const [uploadState, setUploadState] = React.useState(UploadState.new)
  const [percentageUploaded, setPercentageUploaded] = React.useState(0)
  const [mixId] = React.useState(uuidv4())
  const [fileName, setFilename] = React.useState('')
  return (
    <div className="flex flex-col justify-center space-y-4">
      <PageHeader title="Let's create a mix" />
      <div className="flex flex-col items-center justify-center">
        {errors.length !== 0 && (
          <div className="mx-auto flex w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-md dark:bg-slate-800">
            <div className="flex w-12 items-center justify-center bg-red-500">
              <Icons.error className="h-6 w-6 fill-current text-white" />
            </div>
            <div className="-mx-3 px-4 py-2">
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
        {uploadState === UploadState.uploading && (
          <div className="mx-auto my-8 w-3/5">
            <h3 className="text-muted-foreground mb-2 text-sm">Uploading..</h3>
            <Progress value={percentageUploaded} title="Uploading audio" />
          </div>
        )}
        {uploadState === UploadState.new && (
          <div className="mx-auto my-8 w-3/5">
            <FileUpload
              mixId={mixId}
              onError={(e) => {
                setCreateState(CreateState.error)
                setErrors([...errors, e])
              }}
              onUploadComplete={() => {
                setUploadState(UploadState.done)
              }}
              onUploadStart={(file: string) => {
                setCreateState(CreateState.new)
                setFilename(file)
                setUploadState(UploadState.uploading)
              }}
              onUploadProgress={(total, loaded) => {
                setPercentageUploaded(Math.round((loaded * 100) / total))
              }}
            />
          </div>
        )}
        {createState === CreateState.new && uploadState !== UploadState.new && (
          <CreateMixDetails
            mix={{ id: mixId, title: fileName } as MixModel}
            onMixCreated={(mix, error) => {
              setCreateState(error ? CreateState.error : CreateState.done)
              if (mix && mix.user) {
                router.push(`/${mix.user.slug}/${mix.slug}`)
              }
            }}
          />
        )}
      </div>
    </div>
  )
}

export default MixCreateComponent
