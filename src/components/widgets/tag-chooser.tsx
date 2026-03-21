'use client'

import React, { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import logger from '@/lib/logger'
import TagService from '@/lib/services/api/tag-service'

type TagChooserProps = {
  value: Array<string>
  onChange: (tags: Array<string>) => void
  placeholder?: string
  className?: string
}

const TagChooser: React.FC<TagChooserProps> = ({
  value = [],
  onChange,
  placeholder = 'Type to search tags...',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<Array<string>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Debounced search
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    if (inputValue.trim().length === 0) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    debounceTimerRef.current = setTimeout(async () => {
      setIsLoading(true)
      try {
        const results = await TagService.searchTags(inputValue.trim())
        // Filter out tags that are already selected
        const filteredResults = results.filter((tag) => !value.includes(tag))
        setSuggestions(filteredResults)
        setShowSuggestions(true)
      } catch (err) {
        logger.errorLog('TagChooser', 'Error searching tags', err)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [inputValue, value])

  const addTag = (tagName?: string) => {
    if (!tagName) return
    const trimmedTag = tagName.trim().slice(0, 50)
    if (trimmedTag && !value.includes(trimmedTag)) {
      onChange([...value, trimmedTag])
      setInputValue('')
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      if (inputValue.trim()) {
        // Add the typed value as a new tag
        addTag(inputValue)
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (tagName: string) => {
    addTag(tagName)
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* Selected tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {value.map((tag) => (
            <Badge key={tag} variant="secondary" className="pl-2 pr-1">
              {tag}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto p-1 ml-1 hover:bg-transparent"
                onClick={() => removeTag(tag)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input field */}
      <div className="relative">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true)
            }
          }}
          placeholder={placeholder}
          className="w-full"
          autoComplete="off"
          maxLength={50}
        />

        {/* Suggestions dropdown */}
        {showSuggestions && (suggestions.length > 0 || isLoading) && (
          <div className="absolute z-50 w-full mt-1 bg-popover border border-input rounded-md shadow-lg max-h-60 overflow-auto">
            {isLoading ? (
              <div className="px-4 py-2 text-sm text-muted-foreground">
                Searching...
              </div>
            ) : (
              <ul className="py-1">
                {suggestions.map((tag, index) => (
                  <li key={`${tag}-${index}`} className="list-none">
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      onClick={() => handleSuggestionClick(tag)}
                    >
                      {tag}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TagChooser
