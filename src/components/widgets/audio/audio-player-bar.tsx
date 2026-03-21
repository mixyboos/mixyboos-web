'use client'
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { useToggleMixLike } from '@/lib/queries/mix'
import { useAuth } from '@/lib/auth'
import TagBar from '@/components/widgets/tags/tag-bar'

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
      <div className="flex items-center gap-4">
        <div className="flex gap-1.5 shrink-0">
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
        <TagList tags={mix.tags} />
      </div>
    </div>
  )
}

type TagListProps = {
  tags: Array<{ name: string; slug: string }>
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(tags.length)

  const calculateVisibleTags = useCallback(() => {
    const container = containerRef.current
    const measureContainer = measureRef.current
    if (!container || !measureContainer || tags.length === 0) return

    const containerWidth = container.offsetWidth
    if (containerWidth === 0) return

    const gap = 8 // gap-2
    const badges = measureContainer.querySelectorAll('[data-measure-tag]')
    const moreBtn = measureContainer.querySelector('[data-measure-more]')
    const moreBtnWidth =
      moreBtn instanceof HTMLElement ? moreBtn.offsetWidth : 70

    // Calculate tag widths
    const tagWidths: Array<number> = []
    badges.forEach((badge) => {
      tagWidths.push((badge as HTMLElement).offsetWidth)
    })

    // Find how many tags fit
    let usedWidth = 0
    let count = 0

    for (let i = 0; i < tagWidths.length; i++) {
      const tagWidth = tagWidths[i]
      const isLast = i === tagWidths.length - 1
      const needsMoreBtn = !isLast
      const spaceNeeded = tagWidth + (needsMoreBtn ? gap + moreBtnWidth : 0)

      if (usedWidth + tagWidth <= containerWidth) {
        // This tag fits, but do we have room for more button if needed?
        if (isLast || usedWidth + spaceNeeded <= containerWidth) {
          usedWidth += tagWidth + gap
          count++
        } else {
          // Tag fits but not with more button - stop here
          break
        }
      } else {
        break
      }
    }

    setVisibleCount(Math.max(1, count))
  }, [tags])

  useLayoutEffect(() => {
    calculateVisibleTags()

    const resizeObserver = new ResizeObserver(() => {
      calculateVisibleTags()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [calculateVisibleTags])

  if (tags.length === 0) return null

  const visibleTags = tags.slice(0, visibleCount)
  const overflowTags = tags.slice(visibleCount)

  return (
    <>
      {/* Hidden measurement container - positioned off-screen */}
      <div
        ref={measureRef}
        className="fixed -left-[9999px] flex gap-2"
        aria-hidden="true"
      >
        {tags.map((tag) => (
          <Badge key={tag.slug} variant="secondary" data-measure-tag>
            {tag.name}
          </Badge>
        ))}
        <Badge variant="secondary" data-measure-more>
          +{Math.max(1, tags.length - 1)} more
        </Badge>
      </div>

      {/* Visible tags container */}
      <div
        ref={containerRef}
        className="flex-1 min-w-0 flex gap-2 items-center justify-end overflow-hidden"
      >
        <TagBar visibleTags={visibleTags} overflowTags={overflowTags} />
      </div>
    </>
  )
}

export default AudioPlayerBar
