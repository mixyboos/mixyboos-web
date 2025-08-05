import { beforeEach, vi } from 'vitest'
import '@testing-library/jest-dom'
import React from 'react'

// Setup environment variables for tests
process.env.VITE_API_URL = 'http://localhost:3000/api'
process.env.VITE_REALTIME_HOST = 'localhost:3001'

// Mock URL.createObjectURL globally
global.URL.createObjectURL = vi.fn(() => 'mocked-object-url')
global.URL.revokeObjectURL = vi.fn()

// Mock File and FileList
global.File = class File {
  name: string
  size: number
  type: string
  lastModified: number

  constructor(fileBits: BlobPart[], name: string, options?: FilePropertyBag) {
    this.name = name
    this.size = fileBits.reduce((acc, bit) => {
      if (typeof bit === 'string') return acc + bit.length
      if (bit instanceof ArrayBuffer) return acc + bit.byteLength
      return acc + bit.size
    }, 0)
    this.type = options?.type || ''
    this.lastModified = options?.lastModified || Date.now()
  }

  arrayBuffer(): Promise<ArrayBuffer> {
    return Promise.resolve(new ArrayBuffer(this.size))
  }

  slice(): Blob {
    return new Blob()
  }

  stream(): ReadableStream {
    return new ReadableStream()
  }

  text(): Promise<string> {
    return Promise.resolve('')
  }
} as any

// Mock DataTransfer
global.DataTransfer = class DataTransfer {
  dropEffect: string = 'none'
  effectAllowed: string = 'uninitialized'
  files: FileList = [] as any
  items: DataTransferItemList = [] as any
  types: string[] = []

  clearData(): void {}
  getData(): string {
    return ''
  }
  setData(): void {}
  setDragImage(): void {}
} as any

// Mock services
vi.mock('@/lib/services/api/upload/upload-service', () => ({
  uploadAudio: vi.fn(),
  uploadImage: vi.fn(),
}))

vi.mock('@/lib/services/api/mix-service', () => ({
  createMix: vi.fn(),
}))

vi.mock('@/lib/auth', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useAuth: vi.fn(),
    AuthProvider: ({ children }: { children: React.ReactNode }) => React.createElement('div', {}, children),
  }
})

vi.mock('uuid', () => ({
  v4: vi.fn(() => 'test-uuid-1234'),
}))

// Mock react-router
vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      navigate: vi.fn(),
    })),
    createRouter: vi.fn(),
    RouterProvider: ({ children }: { children: React.ReactNode }) => React.createElement('div', {}, children),
  }
})

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks()
})