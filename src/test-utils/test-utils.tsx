import React from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ProfileModel } from '@/lib/models/profile'
import type { MixModel } from '@/lib/models/mix'

// Test data factories
export const mockProfile: ProfileModel = {
  id: 'test-user-id',
  username: 'testuser',
  displayName: 'Test User',
  email: 'test@example.com',
  slug: 'test-user',
  title: 'DJ Test',
  biography: 'Test biography',
  profileImage: 'test-profile.jpg',
  headerImage: 'test-header.jpg',
  urls: ['https://example.com'],
}

export const mockMix: MixModel = {
  id: 'test-mix-id',
  title: 'Test Mix',
  description: 'Test mix description',
  slug: 'test-mix',
  duration: 3600,
  dateUploaded: '2024-01-01T00:00:00Z',
  image: 'test-mix-image.jpg',
  likeCount: 0,
  playCount: 0,
  shareCount: 0,
  downloadCount: 0,
  audioUrl: 'test-audio.mp3',
  pcmUrl: 'test-pcm.json',
  isLiked: false,
  isProcessed: true,
  user: mockProfile,
}

// Test file helpers
export const createTestFile = (
  name: string = 'test-audio.mp3',
  size: number = 1024 * 1024,
  type: string = 'audio/mp3'
): File => {
  const content = new Array(size).fill('a').join('')
  return new File([content], name, { type })
}

export const createTestImageFile = (
  name: string = 'test-image.jpg',
  size: number = 1024 * 512,
  type: string = 'image/jpeg'
): File => {
  const content = new Array(size).fill('x').join('')
  return new File([content], name, { type })
}

// FileList mock helper
export const createFileList = (files: File[]): FileList => {
  const fileList = {
    length: files.length,
    item: (index: number) => files[index] || null,
    [Symbol.iterator]: function* () {
      for (const file of files) {
        yield file
      }
    },
  }
  
  // Add numeric properties
  files.forEach((file, index) => {
    ;(fileList as any)[index] = file
  })
  
  return fileList as FileList
}

// Progress simulation helper
export const simulateUploadProgress = (
  callback: (total: number, loaded: number) => void,
  totalSize: number = 1024 * 1024,
  steps: number = 10
) => {
  const stepSize = totalSize / steps
  for (let i = 1; i <= steps; i++) {
    setTimeout(() => {
      callback(totalSize, stepSize * i)
    }, i * 10)
  }
}

// Simple providers wrapper
interface AllProvidersProps {
  children: React.ReactNode
}

const AllProviders: React.FC<AllProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

// Custom render function
const customRender = (
  ui: React.ReactElement,
  options: RenderOptions = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AllProviders>{children}</AllProviders>
  )

  return render(ui, { wrapper: Wrapper, ...options })
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export * from '@testing-library/user-event'

// Override render method
export { customRender as render }