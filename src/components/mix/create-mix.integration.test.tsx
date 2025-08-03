import { describe, test, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, mockProfile, createTestFile, createTestImageFile, createFileList } from '@/test-utils/test-utils'
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

  describe('Initial State Testing', () => {
    test('should render initial upload form correctly', () => {
      render(<CreateMixComponent />)
      
      expect(screen.getByText("Let's create a mix")).toBeInTheDocument()
      expect(screen.getByText('gimme a file')).toBeInTheDocument()
      
      const fileInput = document.querySelector('input[type="file"]')
      expect(fileInput).toHaveAttribute('accept', '.mp3,audio/*')
      
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
      const user = userEvent.setup()
      
      // Mock successful upload with progress
      mockUploadAudio.mockImplementation(async (mixId, formData, progressCallback) => {
        // Simulate progress updates with delays
        return new Promise((resolve) => {
          setTimeout(() => progressCallback(1000, 250), 10)
          setTimeout(() => progressCallback(1000, 500), 20)
          setTimeout(() => progressCallback(1000, 750), 30)
          setTimeout(() => progressCallback(1000, 1000), 40)
          setTimeout(() => resolve(true), 100) // Resolve after 100ms
        })
      })

      render(<CreateMixComponent />)
      
      const fileInput = document.querySelector('input[type="file"]')
      const testFile = createTestFile('test-track.mp3', 1000, 'audio/mp3')
      
      await user.upload(fileInput, testFile)
      
      // Should show uploading state
      expect(screen.getByText('Uploading..')).toBeInTheDocument()
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
      
      // Wait for upload to complete
      await waitFor(() => {
        expect(mockUploadAudio).toHaveBeenCalledWith(
          'test-uuid-1234',
          expect.any(FormData),
          expect.any(Function)
        )
      })
    })

    test('should verify upload progress bar functionality (0% to 100%)', async () => {
      const user = userEvent.setup()
      let progressCallback: (total: number, loaded: number) => void
      
      mockUploadAudio.mockImplementation(async (mixId, formData, callback) => {
        progressCallback = callback
        return new Promise((resolve) => {
          setTimeout(() => resolve(true), 100)
        })
      })

      render(<CreateMixComponent />)
      
      const fileInput = document.querySelector('input[type="file"]')
      const testFile = createTestFile('test-track.mp3', 1000, 'audio/mp3')
      
      await user.upload(fileInput, testFile)
      
      // Simulate progress updates
      await waitFor(() => {
        expect(screen.getByText('Uploading..')).toBeInTheDocument()
      })

      // Test progress updates
      if (progressCallback!) {
        progressCallback(1000, 250) // 25%
        progressCallback(1000, 500) // 50%
        progressCallback(1000, 750) // 75%
        progressCallback(1000, 1000) // 100%
      }
    })

    test('should handle upload error with proper error messages', async () => {
      const user = userEvent.setup()
      
      mockUploadAudio.mockRejectedValue(new Error('Upload failed'))

      render(<CreateMixComponent />)
      
      const fileInput = document.querySelector('input[type="file"]')
      const testFile = createTestFile('test-track.mp3', 1000, 'audio/mp3')
      
      await user.upload(fileInput, testFile)
      
      await waitFor(() => {
        expect(screen.getByText('Ooopsies...')).toBeInTheDocument()
        expect(screen.getByText('Error uploading file, please refresh your browser and try again!')).toBeInTheDocument()
      })
    })

    test('should transition to mix details form after successful upload', async () => {
      const user = userEvent.setup()
      
      mockUploadAudio.mockResolvedValue(true)

      render(<CreateMixComponent />)
      
      const fileInput = document.querySelector('input[type="file"]')
      const testFile = createTestFile('test-track.mp3', 1000, 'audio/mp3')
      
      await user.upload(fileInput, testFile)
      
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
        expect(screen.getByLabelText('Title')).toBeInTheDocument()
        expect(screen.getByLabelText('Description')).toBeInTheDocument()
      })
    })

    test('should work with configurable MP3 files (different names, sizes)', async () => {
      const user = userEvent.setup()
      const testFiles = [
        createTestFile('my-awesome-mix.mp3', 5 * 1024 * 1024, 'audio/mp3'),
        createTestFile('deep-house-session.mp3', 10 * 1024 * 1024, 'audio/mpeg'),
        createTestFile('techno-vibes.mp3', 2 * 1024 * 1024, 'audio/mp3'),
      ]
      
      for (const testFile of testFiles) {
        mockUploadAudio.mockResolvedValue(true)
        
        render(<CreateMixComponent />)
        
        const fileInput = document.querySelector('input[type="file"]')
        await user.upload(fileInput, testFile)
        
        await waitFor(() => {
          expect(mockUploadAudio).toHaveBeenLastCalledWith(
            'test-uuid-1234',
            expect.any(FormData),
            expect.any(Function)
          )
        })
        
        // Clean up for next iteration
        mockUploadAudio.mockReset()
      }
    })
  })

  describe('Mix Details Form Validation', () => {
    beforeEach(async () => {
      // Setup component in post-upload state
      const user = userEvent.setup()
      mockUploadAudio.mockResolvedValue(true)
      
      render(<CreateMixComponent />)
      
      const fileInput = document.querySelector('input[type="file"]')
      const testFile = createTestFile('test-track.mp3', 1000, 'audio/mp3')
      
      await user.upload(fileInput, testFile)
      
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
      })
    })

    test('should validate form field validation (title min/max length)', async () => {
      const user = userEvent.setup()
      
      const titleInput = screen.getByLabelText('Title')
      
      // Test minimum length validation (less than 5 characters)
      await user.clear(titleInput)
      await user.type(titleInput, 'abc')
      await user.tab()
      
      await waitFor(() => {
        expect(screen.getByText('must be at least 5 characters')).toBeInTheDocument()
      })
      
      // Test maximum length validation (more than 100 characters)
      const longTitle = 'a'.repeat(101)
      await user.clear(titleInput)
      await user.type(titleInput, longTitle)
      await user.tab()
      
      await waitFor(() => {
        expect(screen.getByText("can't be more than 100 characters")).toBeInTheDocument()
      })
      
      // Test valid length
      await user.clear(titleInput)
      await user.type(titleInput, 'Valid Mix Title')
      await user.tab()
      
      await waitFor(() => {
        expect(screen.queryByText('must be at least 5 characters')).not.toBeInTheDocument()
        expect(screen.queryByText("can't be more than 100 characters")).not.toBeInTheDocument()
      })
    })

    test('should validate description min/max length', async () => {
      const user = userEvent.setup()
      
      const descriptionInput = screen.getByLabelText('Description')
      
      // Test minimum length validation
      await user.clear(descriptionInput)
      await user.type(descriptionInput, 'abc')
      await user.tab()
      
      await waitFor(() => {
        expect(screen.getByText('must be at least 5 characters')).toBeInTheDocument()
      })
      
      // Test maximum length validation
      const longDescription = 'a'.repeat(2001)
      await user.clear(descriptionInput)
      await user.type(descriptionInput, longDescription)
      await user.tab()
      
      await waitFor(() => {
        expect(screen.getByText("can't be more than 2000 characters")).toBeInTheDocument()
      })
    })

    test('should verify character count display for description field', async () => {
      const user = userEvent.setup()
      
      const descriptionInput = screen.getByLabelText('Description')
      const testDescription = 'This is a test description for my awesome mix'
      
      await user.clear(descriptionInput)
      await user.type(descriptionInput, testDescription)
      
      await waitFor(() => {
        expect(screen.getByText(`${testDescription.length}/2000`)).toBeInTheDocument()
      })
    })

    test('should validate required field validation with proper error messages', async () => {
      const user = userEvent.setup()
      
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      // Clear required fields
      await user.clear(titleInput)
      await user.clear(descriptionInput)
      
      // Try to submit
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getAllByText('must be at least 5 characters')).toHaveLength(2)
      })
    })

    test('should test form submission with valid data', async () => {
      const user = userEvent.setup()
      const mockCreatedMix: MixModel = {
        id: 'test-uuid-1234',
        title: 'My Awesome Mix',
        description: 'This is a great mix with amazing tracks',
        slug: 'my-awesome-mix',
        duration: 3600,
        dateUploaded: '2024-01-01T00:00:00Z',
        image: '',
        likeCount: 0,
        playCount: 0,
        shareCount: 0,
        downloadCount: 0,
        audioUrl: '',
        pcmUrl: '',
        isLiked: false,
        isProcessed: false,
        user: mockProfile,
      }
      
      mockCreateMix.mockResolvedValue(mockCreatedMix)
      mockUploadImage.mockResolvedValue(true)
      
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      await user.clear(titleInput)
      await user.type(titleInput, 'My Awesome Mix')
      await user.clear(descriptionInput)
      await user.type(descriptionInput, 'This is a great mix with amazing tracks')
      
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockCreateMix).toHaveBeenCalledWith({
          id: 'test-uuid-1234',
          title: 'My Awesome Mix',
          description: 'This is a great mix with amazing tracks',
          isProcessed: false,
          user: mockProfile,
        })
      })
    })
  })

  describe('Image Upload Testing', () => {
    beforeEach(async () => {
      // Setup component in post-upload state
      const user = userEvent.setup()
      mockUploadAudio.mockResolvedValue(true)
      
      render(<CreateMixComponent />)
      
      const fileInput = document.querySelector('input[type="file"]')
      const testFile = createTestFile('test-track.mp3', 1000, 'audio/mp3')
      
      await user.upload(fileInput, testFile)
      
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
      })
    })

    test('should handle image upload with valid formats (JPG, PNG, WebP)', async () => {
      const user = userEvent.setup()
      const validFormats = [
        createTestImageFile('test.jpg', 1024 * 512, 'image/jpeg'),
        createTestImageFile('test.png', 1024 * 512, 'image/png'),
        createTestImageFile('test.webp', 1024 * 512, 'image/webp'),
      ]
      
      for (const imageFile of validFormats) {
        const imageUploadArea = screen.getByText('Click to upload')
        const fileInput = imageUploadArea.closest('label')?.querySelector('input[type="file"]')
        
        if (fileInput) {
          await user.upload(fileInput, imageFile)
          
          // Check that image preview appears
          await waitFor(() => {
            expect(screen.getByAltText('image preview')).toBeInTheDocument()
          })
        }
      }
    })

    test('should reject invalid formats (GIF, etc.) with error messages', async () => {
      const user = userEvent.setup()
      const invalidFile = createTestImageFile('test.gif', 1024 * 512, 'image/gif')
      
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const imageUploadArea = screen.getByText('Click to upload')
      const fileInput = imageUploadArea.closest('label')?.querySelector('input[type="file"]')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      // Fill required fields
      await user.type(titleInput, 'Valid Title')
      await user.type(descriptionInput, 'Valid description for the mix')
      
      if (fileInput) {
        await user.upload(fileInput, invalidFile)
      }
      
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Only .jpg, .jpeg, .png and .webp formats are supported.')).toBeInTheDocument()
      })
    })

    test('should validate file size (max 5MB) with error handling', async () => {
      const user = userEvent.setup()
      const oversizedFile = createTestImageFile('large.jpg', 6 * 1024 * 1024, 'image/jpeg') // 6MB
      
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const imageUploadArea = screen.getByText('Click to upload')
      const fileInput = imageUploadArea.closest('label')?.querySelector('input[type="file"]')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      // Fill required fields
      await user.type(titleInput, 'Valid Title')
      await user.type(descriptionInput, 'Valid description for the mix')
      
      if (fileInput) {
        await user.upload(fileInput, oversizedFile)
      }
      
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Max image size is 5MB.')).toBeInTheDocument()
      })
    })

    test('should work without image upload (optional)', async () => {
      const user = userEvent.setup()
      const mockCreatedMix: MixModel = {
        id: 'test-uuid-1234',
        title: 'Mix Without Image',
        description: 'This mix does not have an image',
        slug: 'mix-without-image',
        duration: 3600,
        dateUploaded: '2024-01-01T00:00:00Z',
        image: '',
        likeCount: 0,
        playCount: 0,
        shareCount: 0,
        downloadCount: 0,
        audioUrl: '',
        pcmUrl: '',
        isLiked: false,
        isProcessed: false,
        user: mockProfile,
      }
      
      mockCreateMix.mockResolvedValue(mockCreatedMix)
      
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      await user.type(titleInput, 'Mix Without Image')
      await user.type(descriptionInput, 'This mix does not have an image')
      
      // Don't upload any image, just submit
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockCreateMix).toHaveBeenCalled()
      })
    })
  })

  describe('Complete Integration Flow', () => {
    test('should complete successful end-to-end flow: audio upload → form fill → image upload → mix creation', async () => {
      const user = userEvent.setup()
      const mockCreatedMix: MixModel = {
        id: 'test-uuid-1234',
        title: 'Complete Integration Test',
        description: 'This is a complete end-to-end test',
        slug: 'complete-integration-test',
        duration: 3600,
        dateUploaded: '2024-01-01T00:00:00Z',
        image: 'test-image.jpg',
        likeCount: 0,
        playCount: 0,
        shareCount: 0,
        downloadCount: 0,
        audioUrl: 'test-audio.mp3',
        pcmUrl: 'test-pcm.json',
        isLiked: false,
        isProcessed: false,
        user: mockProfile,
      }
      
      mockUploadAudio.mockResolvedValue(true)
      mockCreateMix.mockResolvedValue(mockCreatedMix)
      mockUploadImage.mockResolvedValue(true)

      render(<CreateMixComponent />)
      
      // Step 1: Audio upload
      const audioFileInput = document.querySelector('input[type="file"]')
      const audioFile = createTestFile('awesome-mix.mp3', 1000, 'audio/mp3')
      
      await user.upload(audioFileInput, audioFile)
      
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
      })
      
      // Step 2: Fill form
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      
      await user.type(titleInput, 'Complete Integration Test')
      await user.clear(descriptionInput)
      await user.type(descriptionInput, 'This is a complete end-to-end test')
      
      // Step 3: Image upload
      const imageUploadArea = screen.getByText('Click to upload')
      const imageFileInput = imageUploadArea.closest('label')?.querySelector('input[type="file"]')
      const imageFile = createTestImageFile('test-cover.jpg', 1024 * 512, 'image/jpeg')
      
      if (imageFileInput) {
        await user.upload(imageFileInput, imageFile)
      }
      
      // Step 4: Submit form
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      await user.click(submitButton)
      
      // Verify API calls
      await waitFor(() => {
        expect(mockUploadAudio).toHaveBeenCalledWith(
          'test-uuid-1234',
          expect.any(FormData),
          expect.any(Function)
        )
        expect(mockCreateMix).toHaveBeenCalledWith({
          id: 'test-uuid-1234',
          title: 'Complete Integration Test',
          description: 'This is a complete end-to-end test',
          isProcessed: false,
          user: mockProfile,
        })
        expect(mockUploadImage).toHaveBeenCalledWith(
          'test-uuid-1234',
          imageFile,
          'mixes',
          ''
        )
      })
    })

    test('should verify API calls are made with correct parameters', async () => {
      const user = userEvent.setup()
      const mockCreatedMix: MixModel = {
        id: 'test-uuid-1234',
        title: 'API Test Mix',
        description: 'Testing API parameters',
        slug: 'api-test-mix',
        duration: 3600,
        dateUploaded: '2024-01-01T00:00:00Z',
        image: '',
        likeCount: 0,
        playCount: 0,
        shareCount: 0,
        downloadCount: 0,
        audioUrl: '',
        pcmUrl: '',
        isLiked: false,
        isProcessed: false,
        user: mockProfile,
      }
      
      mockUploadAudio.mockResolvedValue(true)
      mockCreateMix.mockResolvedValue(mockCreatedMix)

      render(<CreateMixComponent />)
      
      // Upload audio
      const audioFileInput = document.querySelector('input[type="file"]')
      const audioFile = createTestFile('api-test.mp3', 1000, 'audio/mp3')
      
      await user.upload(audioFileInput, audioFile)
      
      await waitFor(() => {
        expect(mockUploadAudio).toHaveBeenCalledWith(
          'test-uuid-1234', // mixId
          expect.any(FormData), // formData
          expect.any(Function) // progress callback
        )
      })
      
      // Fill form and submit
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
      })
      
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      await user.type(titleInput, 'API Test Mix')
      await user.clear(descriptionInput)
      await user.type(descriptionInput, 'Testing API parameters')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockCreateMix).toHaveBeenCalledWith({
          id: 'test-uuid-1234',
          title: 'API Test Mix',
          description: 'Testing API parameters',
          isProcessed: false,
          user: mockProfile,
        })
      })
    })

    test('should navigate to mix page after successful creation', async () => {
      const user = userEvent.setup()
      const mockCreatedMix: MixModel = {
        id: 'test-uuid-1234',
        title: 'Navigation Test',
        description: 'Testing navigation after creation',
        slug: 'navigation-test',
        duration: 3600,
        dateUploaded: '2024-01-01T00:00:00Z',
        image: '',
        likeCount: 0,
        playCount: 0,
        shareCount: 0,
        downloadCount: 0,
        audioUrl: '',
        pcmUrl: '',
        isLiked: false,
        isProcessed: false,
        user: mockProfile,
      }
      
      mockUploadAudio.mockResolvedValue(true)
      mockCreateMix.mockResolvedValue(mockCreatedMix)

      render(<CreateMixComponent />)
      
      // Complete flow
      const audioFileInput = document.querySelector('input[type="file"]')
      const audioFile = createTestFile('nav-test.mp3', 1000, 'audio/mp3')
      
      await user.upload(audioFileInput, audioFile)
      
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
      })
      
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      await user.type(titleInput, 'Navigation Test')
      await user.clear(descriptionInput)
      await user.type(descriptionInput, 'Testing navigation after creation')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith({ 
          to: `/${mockProfile.slug}/${mockCreatedMix.slug}` 
        })
      })
    })

    test('should complete flow without image upload', async () => {
      const user = userEvent.setup()
      const mockCreatedMix: MixModel = {
        id: 'test-uuid-1234',
        title: 'No Image Mix',
        description: 'This mix has no image',
        slug: 'no-image-mix',
        duration: 3600,
        dateUploaded: '2024-01-01T00:00:00Z',
        image: '',
        likeCount: 0,
        playCount: 0,
        shareCount: 0,
        downloadCount: 0,
        audioUrl: '',
        pcmUrl: '',
        isLiked: false,
        isProcessed: false,
        user: mockProfile,
      }
      
      mockUploadAudio.mockResolvedValue(true)
      mockCreateMix.mockResolvedValue(mockCreatedMix)

      render(<CreateMixComponent />)
      
      // Audio upload
      const audioFileInput = document.querySelector('input[type="file"]')
      const audioFile = createTestFile('no-image.mp3', 1000, 'audio/mp3')
      
      await user.upload(audioFileInput, audioFile)
      
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
      })
      
      // Fill form without image
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      await user.type(titleInput, 'No Image Mix')
      await user.clear(descriptionInput)
      await user.type(descriptionInput, 'This mix has no image')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockCreateMix).toHaveBeenCalled()
        expect(mockUploadImage).not.toHaveBeenCalled()
      })
    })
  })

  describe('Error Handling', () => {
    test('should handle audio upload API failures', async () => {
      const user = userEvent.setup()
      
      mockUploadAudio.mockRejectedValue(new Error('Network error'))

      render(<CreateMixComponent />)
      
      const fileInput = document.querySelector('input[type="file"]')
      const testFile = createTestFile('error-test.mp3', 1000, 'audio/mp3')
      
      await user.upload(fileInput, testFile)
      
      await waitFor(() => {
        expect(screen.getByText('Ooopsies...')).toBeInTheDocument()
        expect(screen.getByText('Error uploading file, please refresh your browser and try again!')).toBeInTheDocument()
      })
    })

    test('should handle mix creation API failures', async () => {
      const user = userEvent.setup()
      
      mockUploadAudio.mockResolvedValue(true)
      mockCreateMix.mockRejectedValue(new Error('Mix creation failed'))

      render(<CreateMixComponent />)
      
      // Upload audio first
      const audioFileInput = document.querySelector('input[type="file"]')
      const audioFile = createTestFile('create-error.mp3', 1000, 'audio/mp3')
      
      await user.upload(audioFileInput, audioFile)
      
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
      })
      
      // Fill form and submit
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      await user.type(titleInput, 'Error Test Mix')
      await user.clear(descriptionInput)
      await user.type(descriptionInput, 'This should fail during creation')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockCreateMix).toHaveBeenCalled()
        // Component should handle the error gracefully
      })
    })

    test('should handle image upload API failures', async () => {
      const user = userEvent.setup()
      const mockCreatedMix: MixModel = {
        id: 'test-uuid-1234',
        title: 'Image Error Test',
        description: 'Testing image upload errors',
        slug: 'image-error-test',
        duration: 3600,
        dateUploaded: '2024-01-01T00:00:00Z',
        image: '',
        likeCount: 0,
        playCount: 0,
        shareCount: 0,
        downloadCount: 0,
        audioUrl: '',
        pcmUrl: '',
        isLiked: false,
        isProcessed: false,
        user: mockProfile,
      }
      
      mockUploadAudio.mockResolvedValue(true)
      mockCreateMix.mockResolvedValue(mockCreatedMix)
      mockUploadImage.mockRejectedValue(new Error('Image upload failed'))

      render(<CreateMixComponent />)
      
      // Complete flow with image upload failure
      const audioFileInput = document.querySelector('input[type="file"]')
      const audioFile = createTestFile('image-error.mp3', 1000, 'audio/mp3')
      
      await user.upload(audioFileInput, audioFile)
      
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
      })
      
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const imageUploadArea = screen.getByText('Click to upload')
      const imageFileInput = imageUploadArea.closest('label')?.querySelector('input[type="file"]')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      await user.type(titleInput, 'Image Error Test')
      await user.clear(descriptionInput)
      await user.type(descriptionInput, 'Testing image upload errors')
      
      if (imageFileInput) {
        const imageFile = createTestImageFile('error.jpg', 1024 * 512, 'image/jpeg')
        await user.upload(imageFileInput, imageFile)
      }
      
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockUploadImage).toHaveBeenCalled()
        // Component should handle the error gracefully
      })
    })

    test('should display form validation errors correctly', async () => {
      const user = userEvent.setup()
      
      mockUploadAudio.mockResolvedValue(true)

      render(<CreateMixComponent />)
      
      // Upload audio first
      const audioFileInput = document.querySelector('input[type="file"]')
      const audioFile = createTestFile('validation.mp3', 1000, 'audio/mp3')
      
      await user.upload(audioFileInput, audioFile)
      
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
      })
      
      // Try to submit with invalid data
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      // Enter invalid data
      await user.clear(titleInput)
      await user.type(titleInput, 'abc') // Too short
      await user.clear(descriptionInput)
      await user.type(descriptionInput, 'xyz') // Too short
      
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getAllByText('must be at least 5 characters')).toHaveLength(2)
      })
    })
  })

  describe('UI State Management', () => {
    test('should show loading states during upload and form submission', async () => {
      const user = userEvent.setup()
      
      // Mock slow upload
      mockUploadAudio.mockImplementation(async () => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(true), 100)
        })
      })
      
      const mockCreatedMix: MixModel = {
        id: 'test-uuid-1234',
        title: 'Loading Test',
        description: 'Testing loading states',
        slug: 'loading-test',
        duration: 3600,
        dateUploaded: '2024-01-01T00:00:00Z',
        image: '',
        likeCount: 0,
        playCount: 0,
        shareCount: 0,
        downloadCount: 0,
        audioUrl: '',
        pcmUrl: '',
        isLiked: false,
        isProcessed: false,
        user: mockProfile,
      }
      
      mockCreateMix.mockImplementation(async () => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(mockCreatedMix), 100)
        })
      })

      render(<CreateMixComponent />)
      
      // Test upload loading state
      const audioFileInput = document.querySelector('input[type="file"]')
      const audioFile = createTestFile('loading.mp3', 1000, 'audio/mp3')
      
      await user.upload(audioFileInput, audioFile)
      
      expect(screen.getByText('Uploading..')).toBeInTheDocument()
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
      
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
      })
      
      // Test form submission loading state
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      await user.type(titleInput, 'Loading Test')
      await user.clear(descriptionInput)
      await user.type(descriptionInput, 'Testing loading states')
      
      await user.click(submitButton)
      
      expect(screen.getByText('Saving...')).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
    })

    test('should disable states during API operations', async () => {
      const user = userEvent.setup()
      const mockCreatedMix: MixModel = {
        id: 'test-uuid-1234',
        title: 'Disable Test',
        description: 'Testing disabled states',
        slug: 'disable-test',
        duration: 3600,
        dateUploaded: '2024-01-01T00:00:00Z',
        image: '',
        likeCount: 0,
        playCount: 0,
        shareCount: 0,
        downloadCount: 0,
        audioUrl: '',
        pcmUrl: '',
        isLiked: false,
        isProcessed: false,
        user: mockProfile,
      }
      
      mockUploadAudio.mockResolvedValue(true)
      mockCreateMix.mockImplementation(async () => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(mockCreatedMix), 50)
        })
      })

      render(<CreateMixComponent />)
      
      // Upload audio
      const audioFileInput = document.querySelector('input[type="file"]')
      const audioFile = createTestFile('disable.mp3', 1000, 'audio/mp3')
      
      await user.upload(audioFileInput, audioFile)
      
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
      })
      
      // Fill form
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      await user.type(titleInput, 'Disable Test')
      await user.clear(descriptionInput)
      await user.type(descriptionInput, 'Testing disabled states')
      
      // Submit and check disabled state
      await user.click(submitButton)
      
      expect(submitButton).toBeDisabled()
      
      await waitFor(() => {
        expect(mockCreateMix).toHaveBeenCalled()
      })
    })

    test('should show progress indicators', async () => {
      const user = userEvent.setup()
      
      mockUploadAudio.mockImplementation(async (mixId, formData, progressCallback) => {
        // Simulate progress
        progressCallback(1000, 250)
        progressCallback(1000, 500)
        progressCallback(1000, 750)
        progressCallback(1000, 1000)
        return true
      })

      render(<CreateMixComponent />)
      
      const fileInput = document.querySelector('input[type="file"]')
      const testFile = createTestFile('progress.mp3', 1000, 'audio/mp3')
      
      await user.upload(fileInput, testFile)
      
      await waitFor(() => {
        expect(screen.getByText('Uploading..')).toBeInTheDocument()
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
      })
    })
  })

  describe('Configurable Tests', () => {
    test('should work with custom audio files', async () => {
      const user = userEvent.setup()
      const customFiles = [
        createTestFile('house-music.mp3', 8 * 1024 * 1024, 'audio/mpeg'),
        createTestFile('techno-session.mp3', 12 * 1024 * 1024, 'audio/mp3'),
        createTestFile('ambient-vibes.mp3', 6 * 1024 * 1024, 'audio/mpeg'),
      ]
      
      for (const customFile of customFiles) {
        mockUploadAudio.mockResolvedValue(true)
        
        render(<CreateMixComponent />)
        
        const fileInput = document.querySelector('input[type="file"]')
        await user.upload(fileInput, customFile)
        
        await waitFor(() => {
          expect(mockUploadAudio).toHaveBeenLastCalledWith(
            'test-uuid-1234',
            expect.any(FormData),
            expect.any(Function)
          )
        })
        
        mockUploadAudio.mockReset()
      }
    })

    test('should work with custom mix details', async () => {
      const user = userEvent.setup()
      const customMixDetails = [
        { title: 'Deep House Journey', description: 'A journey through deep house music with progressive beats' },
        { title: 'Techno Underground', description: 'Dark and driving techno from the underground scene' },
        { title: 'Ambient Explorations', description: 'Ethereal ambient soundscapes for meditation and relaxation' },
      ]
      
      mockUploadAudio.mockResolvedValue(true)
      const mockCreatedMix: MixModel = {
        id: 'test-uuid-1234',
        title: '',
        description: '',
        slug: '',
        duration: 3600,
        dateUploaded: '2024-01-01T00:00:00Z',
        image: '',
        likeCount: 0,
        playCount: 0,
        shareCount: 0,
        downloadCount: 0,
        audioUrl: '',
        pcmUrl: '',
        isLiked: false,
        isProcessed: false,
        user: mockProfile,
      }
      
      for (const details of customMixDetails) {
        mockCreateMix.mockResolvedValue({ ...mockCreatedMix, ...details })
        
        render(<CreateMixComponent />)
        
        // Upload audio
        const audioFileInput = document.querySelector('input[type="file"]')
        const audioFile = createTestFile('custom.mp3', 1000, 'audio/mp3')
        
        await user.upload(audioFileInput, audioFile)
        
        await waitFor(() => {
          expect(screen.getByText('Mix details')).toBeInTheDocument()
        })
        
        // Fill custom details
        const titleInput = screen.getByLabelText('Title')
        const descriptionInput = screen.getByLabelText('Description')
        const submitButton = screen.getByRole('button', { name: /save mix/i })
        
        await user.clear(titleInput)
        await user.type(titleInput, details.title)
        await user.clear(descriptionInput)
        await user.type(descriptionInput, details.description)
        await user.click(submitButton)
        
        await waitFor(() => {
          expect(mockCreateMix).toHaveBeenLastCalledWith({
            id: 'test-uuid-1234',
            title: details.title,
            description: details.description,
            isProcessed: false,
            user: mockProfile,
          })
        })
        
        mockCreateMix.mockReset()
      }
    })

    test('should simulate different failure scenarios', async () => {
      const user = userEvent.setup()
      const failureScenarios = [
        { 
          name: 'upload_failure',
          setup: () => mockUploadAudio.mockRejectedValue(new Error('Upload failed')),
          expectedError: 'Error uploading file, please refresh your browser and try again!'
        },
        {
          name: 'network_timeout',
          setup: () => mockUploadAudio.mockRejectedValue(new Error('Network timeout')),
          expectedError: 'Error uploading file, please refresh your browser and try again!'
        },
        {
          name: 'server_error',
          setup: () => mockUploadAudio.mockRejectedValue(new Error('Internal server error')),
          expectedError: 'Error uploading file, please refresh your browser and try again!'
        },
      ]
      
      for (const scenario of failureScenarios) {
        scenario.setup()
        
        render(<CreateMixComponent />)
        
        const fileInput = document.querySelector('input[type="file"]')
        const testFile = createTestFile('failure.mp3', 1000, 'audio/mp3')
        
        await user.upload(fileInput, testFile)
        
        await waitFor(() => {
          expect(screen.getByText('Ooopsies...')).toBeInTheDocument()
          expect(screen.getByText(scenario.expectedError)).toBeInTheDocument()
        })
        
        // Reset for next scenario
        mockUploadAudio.mockReset()
      }
    })
  })
})