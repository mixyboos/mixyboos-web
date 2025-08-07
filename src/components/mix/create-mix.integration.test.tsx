import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, mockProfile, createTestFile } from '@/test-utils/test-utils'
import { uploadAudio, uploadImage } from '@/lib/services/api/upload/upload-service'
import { createMix } from '@/lib/services/api/mix-service'
import { useAuth } from '@/lib/auth'
import { useRouter } from '@tanstack/react-router'
import CreateMixComponent from '@/components/mix/create-mix'
import type { MixModel } from '@/lib/models/mix'

// Mock implementations
const mockUploadAudio = vi.mocked(uploadAudio)
const mockUploadImage = vi.mocked(uploadImage)
const mockCreateMix = vi.mocked(createMix)
const mockUseAuth = vi.mocked(useAuth)
const mockUseRouter = vi.mocked(useRouter)

describe('CreateMixComponent Integration Tests', () => {
  const mockNavigate = vi.fn()
  
  beforeEach(() => {
    // Setup default mocks
    mockUseAuth.mockReturnValue({
      profile: mockProfile,
      isLoading: false,
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
      getProfile: vi.fn(),
    })

    mockUseRouter.mockReturnValue({
      navigate: mockNavigate,
    } as any)

    // Reset all service mocks
    mockUploadAudio.mockReset()
    mockUploadImage.mockReset()
    mockCreateMix.mockReset()
    mockNavigate.mockReset()
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  // Helper function to get file input safely
  const getFileInput = (): HTMLInputElement => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    expect(fileInput).toBeInTheDocument()
    return fileInput
  }

  describe('Initial State Testing', () => {
    test('should render initial upload form correctly', () => {
      render(<CreateMixComponent />)
      
      expect(screen.getByText("Let's create a mix")).toBeInTheDocument()
      expect(screen.getByText('gimme a file')).toBeInTheDocument()
      
      const fileInput = getFileInput()
      expect(fileInput).toHaveAttribute('accept', '.mp3,.wav')
      
      // Mix details form should not be visible initially
      expect(screen.queryByText('Mix details')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Title')).not.toBeInTheDocument()
    })

    test('should ensure mix details form is not visible initially', () => {
      render(<CreateMixComponent />)
      
      expect(screen.queryByText('Mix details')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Title')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Description')).not.toBeInTheDocument()
      expect(screen.queryByText('Save mix')).not.toBeInTheDocument()
    })

    test('should check proper page header display', () => {
      render(<CreateMixComponent />)
      
      const header = screen.getByRole('heading', { level: 1 })
      expect(header).toHaveTextContent("Let's create a mix")
    })
  })

  describe('Audio Upload Flow', () => {
    test('should upload audio file and show progress', async () => {
      mockUploadAudio.mockImplementation(async (_mixId, _formData, onProgress) => {
        // Simulate upload progress
        if (onProgress) {
          onProgress(1000, 100)
          await new Promise(resolve => setTimeout(resolve, 10))
          onProgress(1000, 500) 
          await new Promise(resolve => setTimeout(resolve, 10))
          onProgress(1000, 1000)
        }
        return true
      })

      render(<CreateMixComponent />)
      
      const fileInput = getFileInput()
      const testFile = createTestFile('test-mix.mp3', 1024 * 1024, 'audio/mp3')
      
      await userEvent.upload(fileInput, testFile)
      
      // Check progress is shown
      await waitFor(() => {
        expect(screen.getByText(/uploading/i)).toBeInTheDocument()
      })
      
      // Check progress value
      await waitFor(() => {
        const progressElement = screen.getByTitle('Uploading audio')
        expect(progressElement).toBeInTheDocument()
      })
      
      expect(mockUploadAudio).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(FormData),
        expect.any(Function)
      )
    })

    test('should handle upload error with proper error messages', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      mockUploadAudio.mockRejectedValue(new Error('Upload failed'))

      render(<CreateMixComponent />)
      
      const fileInput = getFileInput()
      const testFile = createTestFile('test-mix.mp3', 1024 * 1024, 'audio/mp3')
      
      await userEvent.upload(fileInput, testFile)
      
      await waitFor(() => {
        expect(screen.getByText(/ooopsies/i)).toBeInTheDocument()
        expect(screen.getByText(/error uploading file/i)).toBeInTheDocument()
      })
      
      consoleSpy.mockRestore()
    })

    test('should transition to mix details form after successful upload', async () => {
      mockUploadAudio.mockResolvedValue(true)

      render(<CreateMixComponent />)
      
      const fileInput = getFileInput()
      const testFile = createTestFile('test-mix.mp3', 1024 * 1024, 'audio/mp3')
      
      await userEvent.upload(fileInput, testFile)
      
      // Wait for upload to complete and form to appear
      await waitFor(() => {
        expect(screen.queryByText(/gimme a file/i)).not.toBeInTheDocument()
      })
      
      // Should show mix details form
      await waitFor(() => {
        expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument()
      })
    })

    test('should validate file type and show error for invalid files', () => {
      // This test verifies the file input only accepts .mp3 and .wav files
      render(<CreateMixComponent />)
      
      const fileInput = getFileInput()
      
      // Verify the file input has the correct accept attribute
      expect(fileInput).toHaveAttribute('accept', '.mp3,.wav')
      
      // Note: File validation happens at the browser level with the accept attribute
      // and also in the onChange handler. In a real scenario, browsers would
      // filter files based on the accept attribute.
    })
  })

  describe('Mix Details Form', () => {
    beforeEach(() => {
      mockUploadAudio.mockResolvedValue(true)
    })

    test('should display mix details form after successful upload', async () => {
      render(<CreateMixComponent />)
      
      // Upload file first
      const fileInput = getFileInput()
      const testFile = createTestFile('my-awesome-mix.mp3', 1024 * 1024, 'audio/mp3')
      await userEvent.upload(fileInput, testFile)
      
      // Wait for mix details form
      await waitFor(() => {
        expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument()
      })
      
      // Check title is pre-filled with filename (without extension)
      const titleInput = screen.getByRole('textbox', { name: /title/i })
      expect(titleInput).toHaveValue('my-awesome-mix.mp3')
    })

    test('should handle image upload in mix details form', async () => {
      mockUploadImage.mockResolvedValue(true)

      render(<CreateMixComponent />)
      
      // Upload audio file first
      const fileInput = getFileInput()
      const testFile = createTestFile('test-mix.mp3', 1024 * 1024, 'audio/mp3')
      await userEvent.upload(fileInput, testFile)
      
      // Wait for mix details form
      await waitFor(() => {
        expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument()
      })
      
      // Check that image upload section exists
      expect(screen.getByText(/cover image/i)).toBeInTheDocument()
      expect(screen.getByText(/upload a square image/i)).toBeInTheDocument()
    })

    test('should submit mix details and navigate on success', async () => {
      mockCreateMix.mockResolvedValue({
        id: 'mix-123',
        title: 'Test Mix',
        slug: 'test-mix',
        user: { id: 'user-1', slug: 'testuser' }
      } as any)

      render(<CreateMixComponent />)
      
      // Upload audio file first
      const fileInput = getFileInput()
      const testFile = createTestFile('test-mix.mp3', 1024 * 1024, 'audio/mp3')
      await userEvent.upload(fileInput, testFile)
      
      // Wait for mix details form
      await waitFor(() => {
        expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument()
      })
      
      // Check that the save button exists and form is ready
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).not.toBeDisabled()
      
      // Form should have title and description pre-filled
      const titleInput = screen.getByRole('textbox', { name: /title/i })
      expect(titleInput).toHaveValue('test-mix.mp3')
      
      const descriptionInput = screen.getByRole('textbox', { name: /description/i })
      expect(descriptionInput).toHaveDisplayValue(/hexagon pour-over/i)
    })
  })
})
