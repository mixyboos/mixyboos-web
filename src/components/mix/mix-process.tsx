import React, { useEffect } from 'react'
import { Clock, RefreshCcw, AlertCircle } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { MixModel } from '@/lib/models/mix'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import useAudioProcessingStatus from '@/lib/hooks/audio-processing-hook'
import { useAuth } from '@/lib/auth'
import { deleteMix } from '@/lib/services/api/mix-service'

// Component for mixes that aren't processed yet
type ProcessingMixProps = {
  mix: MixModel
  onDeleteStart?: () => void
}

const ProcessingMix: React.FC<ProcessingMixProps> = ({
  mix,
  onDeleteStart,
}) => {
  const { profile } = useAuth()
  const queryClient = useQueryClient()
  const { isProcessed, processPercentage, processStatus, isFailed } =
    useAudioProcessingStatus()

  // Check if mix has been stuck for too long (likely failed)
  const uploadDate = new Date(mix.dateUploaded)
  const minutesSinceUpload = (Date.now() - uploadDate.getTime()) / 1000 / 60
  const isStuckOrFailed =
    isFailed || (processPercentage === 0 && minutesSinceUpload > 10)

  useEffect(() => {
    if (isProcessed) {
      console.log('mix-process', 'isProcessed', isProcessed)
      console.log('mix-process', 'processPercentage', processPercentage)
    }
  }, [isProcessed, processPercentage])
  // Add reprocess mutation
  const { mutate: reprocess, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/mixes/${mix.id}/reprocess`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to reprocess mix')
      }

      return response.json()
    },
    onSuccess: () => {
      toast.success('Mix reprocessing started')
    },
    onError: () => {
      toast.error('Failed to reprocess mix')
    },
  })

  const deleteAndRetryMutation = useMutation({
    mutationFn: async () => {
      onDeleteStart?.()
      await new Promise((resolve) => setTimeout(resolve, 300))
      await deleteMix(mix)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-mixes'] })
      toast.success('Mix deleted. You can upload it again.')
    },
    onError: () => {
      toast.error('Failed to delete mix')
    },
  })

  const handleReprocess = () => {
    toast.warning('Retry Feature Not Available', {
      description:
        "We haven't implemented automatic retry yet. Please delete this mix and re-upload it instead. Sorry for the inconvenience!",
    })
  }

  const handleDeleteAndRetry = () => {
    deleteAndRetryMutation.mutate()
  }

  // If processing failed and user doesn't own it, don't show
  if (isStuckOrFailed && profile?.id !== mix.user?.id) {
    return null
  }

  return (
    <Card
      className={cn('overflow-hidden', isStuckOrFailed && 'border-destructive')}
    >
      <CardHeader className="p-4 pb-2 space-y-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={mix.user.profileImage}
                alt={mix.user.displayName}
              />
              <AvatarFallback>
                {mix.user.displayName[0].toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-base">{mix.title}</h3>
          </div>
          {isStuckOrFailed ? (
            <div className="flex items-center gap-2 text-xs font-medium bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Processing Failed</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-medium bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full">
              <Clock className="h-3.5 w-3.5" />
              <span>Processing</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
            {mix.image ? (
              <img
                src={mix.image}
                alt={mix.title}
                className="transition-all hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <span className="text-xs text-muted-foreground">No image</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {mix.description || 'No description provided'}
            </p>

            {isStuckOrFailed ? (
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-2 rounded">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Processing failed</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      The audio file could not be processed. This may be due to
                      file corruption, unsupported format, or server issues.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{processStatus}</span>
                  <span
                    className={cn(
                      'font-medium',
                      processPercentage < 30
                        ? 'text-red-500'
                        : processPercentage < 70
                          ? 'text-amber-500'
                          : 'text-green-500',
                    )}
                  >
                    {processPercentage}%
                  </span>
                </div>
                <Progress
                  value={processPercentage}
                  className="h-1.5 transition-all"
                  color={
                    processPercentage < 30
                      ? 'bg-red-500'
                      : processPercentage < 70
                        ? 'bg-amber-500'
                        : 'bg-green-500'
                  }
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 py-2 text-xs border-t bg-muted/40">
        {/* Simplified footer with fewer nested containers */}
        <div className="flex w-full items-center justify-between">
          {/* Left side - upload date */}
          <span className="text-muted-foreground">
            Uploaded {new Date(mix.dateUploaded || Date()).toLocaleDateString()}
          </span>

          {/* Right side - processing message or action buttons */}
          {isStuckOrFailed ? (
            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteAndRetry}
                disabled={deleteAndRetryMutation.isPending}
                className="h-7 px-2 py-0 text-xs"
              >
                {deleteAndRetryMutation.isPending ? (
                  <>
                    <Icons.loading className="mr-1 h-3 w-3" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Icons.trash className="mr-1 h-3 w-3" />
                    Delete
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReprocess}
                disabled={isPending}
                className="h-7 px-2 py-0 text-xs"
              >
                {isPending ? (
                  <div className="flex items-center">
                    <RefreshCcw className="mr-1 h-3 w-3 animate-spin" />
                    <span>Reprocessing</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Icons.refresh className="mr-1 h-3 w-3" />
                    <span>Retry</span>
                  </div>
                )}
              </Button>
            </div>
          ) : (
            <span className="text-muted-foreground">
              Processing will take a minute or two...
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProcessingMix
