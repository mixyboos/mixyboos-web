'use client'
import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import type { MixModel } from '@/lib/models/mix'
import { Icons } from '@/components/icons'
import ActionButton from '@/components/widgets/buttons/action-button'
import logger from '@/lib/logger'
import { Button } from '@/components/ui/button'
import { deleteMix } from '@/lib/services/api/mix-service'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { useToggleMixLike } from '@/lib/queries/mix'
import { useAuth } from '@/lib/auth'

type AudioPlayerBarProps = {
  mix: MixModel
  onDeleteStart?: () => void
}

const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  mix,
  onDeleteStart,
}) => {
  const toggleLike = useToggleMixLike(mix)
  const queryClient = useQueryClient()
  const { profile } = useAuth()
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDeleteConfirmed = async () => {
    setIsDeleteDialogOpen(false)

    // Trigger animation before deletion
    onDeleteStart?.()

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 300))

    const result = await deleteMix(mix)
    if (result) {
      await queryClient.invalidateQueries({ queryKey: ['user-mixes'] })

      // Only navigate if we're on the detail page
      if (window.location.pathname.includes(`/${mix.user.slug}/${mix.slug}`)) {
        router.navigate({ to: '/dashboard/mixes' })
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          <ActionButton
            count={mix.likeCount}
            title="Like"
            onClick={async () => {
              const result = await toggleLike.mutateAsync()
              if (result) {
                await queryClient.invalidateQueries({
                  queryKey: ['user-mixes'],
                })
              }
            }}
            icon={Icons.heart}
            isActioned={mix.isLiked}
          ></ActionButton>
          <ActionButton
            count={mix.shareCount}
            title="Share"
            onClick={async () => {
              return Promise.resolve({
                newCount: mix.shareCount,
                newIsActioned: false,
              })
            }}
            isActioned={false}
            icon={Icons.retweet}
          ></ActionButton>
          <ActionButton
            count={mix.downloadCount}
            title="Download"
            onClick={async () => {
              logger.debug('audio-player-bar', 'download-mix', mix)
              return Promise.resolve({
                newCount: mix.downloadCount,
                newIsActioned: false,
              })
            }}
            isActioned={false}
            icon={Icons.download}
          ></ActionButton>

          {profile?.id === mix.user.id && (
            <>
              <div className="w-4" />
              <ActionButton
                title="Edit"
                onClick={async () => {
                  router.navigate({
                    to: '/$user/$mix/edit',
                    params: { user: mix.user.slug, mix: mix.slug },
                  })
                  return Promise.resolve({
                    newCount: 0,
                    newIsActioned: false,
                  })
                }}
                isActioned={false}
                icon={Icons.pencil}
                variant="accent"
              />
              <ActionButton
                title="Delete"
                onClick={async () => {
                  setIsDeleteDialogOpen(true)
                  return Promise.resolve({
                    newCount: 0,
                    newIsActioned: false,
                  })
                }}
                isActioned={false}
                icon={Icons.delete}
                variant="destructive"
              />

              <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Mix</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete &quot;{mix.title}&quot;?
                      This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDeleteDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteConfirmed}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
        <div className="ml-auto flex gap-2">
          {mix.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AudioPlayerBar
