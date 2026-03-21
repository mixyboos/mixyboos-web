import React from 'react'
import { Link } from '@tanstack/react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

type TagBarProps = {
  visibleTags: Array<{ name: string; slug: string }>
  overflowTags: Array<{ name: string; slug: string }>
}

const TagBar: React.FC<TagBarProps> = ({ visibleTags, overflowTags }) => {
  return (
    <>
      {visibleTags.map((tag) => (
        <Link to={'/tag/' + encodeURIComponent(tag.slug)} key={tag.slug}>
          <Badge variant="secondary" className="shrink-0">
            {tag.name}
          </Badge>
        </Link>
      ))}
      {overflowTags.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80 shrink-0"
            >
              +{overflowTags.length} more
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {overflowTags.map((tag) => (
              <DropdownMenuItem key={tag.slug} className="cursor-default">
                {tag.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}

export default TagBar
