import { describe, test, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, mockProfile, createTestFile, createTestImageFile } from '@/test-utils/test-utils'
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

describe('CreateMixComponent Core Integration Tests', () => {
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

  describe('✅ Core Functionality Tests', () => {
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

    test('should transition to mix details form after successful audio upload', async () => {
      const user = userEvent.setup()
      
      mockUploadAudio.mockResolvedValue(true)

      render(<CreateMixComponent />)
      
      const fileInput = document.querySelector('input[type="file"]')!
      const testFile = createTestFile('test-track.mp3', 1000, 'audio/mp3')
      
      await user.upload(fileInput, testFile)
      
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
        expect(screen.getByLabelText('Title')).toBeInTheDocument()
        expect(screen.getByLabelText('Description')).toBeInTheDocument()
      })
      
      // Verify upload was called correctly
      expect(mockUploadAudio).toHaveBeenCalledWith(
        'test-uuid-1234',
        expect.any(FormData),
        expect.any(Function)
      )
    })

    test('should handle audio upload errors gracefully', async () => {
      const user = userEvent.setup()
      
      mockUploadAudio.mockRejectedValue(new Error('Upload failed'))

      render(<CreateMixComponent />)
      
      const fileInput = document.querySelector('input[type="file"]')!
      const testFile = createTestFile('test-track.mp3', 1000, 'audio/mp3')
      
      await user.upload(fileInput, testFile)
      
      await waitFor(() => {
        expect(screen.getByText('Ooopsies...')).toBeInTheDocument()
        expect(screen.getByText('Error uploading file, please refresh your browser and try again!')).toBeInTheDocument()
      })
    })

    test('should complete full mix creation flow', async () => {
      const user = userEvent.setup()
      const mockCreatedMix: MixModel = {
        id: 'test-uuid-1234',
        title: 'Integration Test Mix',
        description: 'This is a comprehensive integration test',
        slug: 'integration-test-mix',
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
      
      // Step 1: Upload audio file
      const audioFileInput = document.querySelector('input[type="file"]')!
      const audioFile = createTestFile('integration-test.mp3', 1000, 'audio/mp3')
      
      await user.upload(audioFileInput, audioFile)
      
      // Step 2: Wait for form to appear
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
      })
      
      // Step 3: Fill out form
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      
      await user.clear(titleInput)
      await user.type(titleInput, 'Integration Test Mix')
      await user.clear(descriptionInput)
      await user.type(descriptionInput, 'This is a comprehensive integration test')
      
      // Step 4: Upload image (optional)
      const imageUploadArea = screen.getByText('Click to upload')
      const imageFileInput = imageUploadArea.closest('label')?.querySelector('input[type="file"]')
      const imageFile = createTestImageFile('test-cover.jpg', 1024 * 512, 'image/jpeg')
      
      if (imageFileInput) {
        await user.upload(imageFileInput, imageFile)
        
        // Check that image preview appears
        await waitFor(() => {
          expect(screen.getByAltText('image preview')).toBeInTheDocument()
        })
      }
      
      // Step 5: Submit form
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      await user.click(submitButton)
      
      // Step 6: Verify all API calls were made correctly
      await waitFor(() => {
        expect(mockUploadAudio).toHaveBeenCalledWith(
          'test-uuid-1234',
          expect.any(FormData),
          expect.any(Function)
        )
        expect(mockCreateMix).toHaveBeenCalledWith({
          id: 'test-uuid-1234',
          title: 'Integration Test Mix',
          description: 'This is a comprehensive integration test',
          isProcessed: false,
          user: mockProfile,
        })
        expect(mockUploadImage).toHaveBeenCalledWith(
          'test-uuid-1234',
          imageFile,
          'mixes',
          ''
        )
        expect(mockNavigate).toHaveBeenCalledWith({ 
          to: `/${mockProfile.slug}/${mockCreatedMix.slug}` 
        })
      })
    })

    test('should validate form fields correctly', async () => {
      const user = userEvent.setup()
      
      mockUploadAudio.mockResolvedValue(true)

      render(<CreateMixComponent />)
      
      // Upload audio first to get to form
      const audioFileInput = document.querySelector('input[type="file"]')!
      const audioFile = createTestFile('validation-test.mp3', 1000, 'audio/mp3')
      
      await user.upload(audioFileInput, audioFile)
      
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
      })
      
      // Test validation by submitting with invalid data
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      // Enter invalid data (too short)
      await user.clear(titleInput)
      await user.type(titleInput, 'abc') // Too short
      await user.clear(descriptionInput)
      await user.type(descriptionInput, 'xyz') // Too short
      
      await user.click(submitButton)
      
      // Check validation errors appear
      await waitFor(() => {
        expect(screen.getAllByText('must be at least 5 characters')).toHaveLength(2)
      })
    })

    test('should work without image upload (optional flow)', async () => {
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
      
      mockUploadAudio.mockResolvedValue(true)
      mockCreateMix.mockResolvedValue(mockCreatedMix)

      render(<CreateMixComponent />)
      
      // Upload audio
      const audioFileInput = document.querySelector('input[type="file"]')!
      const audioFile = createTestFile('no-image.mp3', 1000, 'audio/mp3')
      
      await user.upload(audioFileInput, audioFile)
      
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
      })
      
      // Fill form without image
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      await user.clear(titleInput)
      await user.type(titleInput, 'Mix Without Image')
      await user.clear(descriptionInput)
      await user.type(descriptionInput, 'This mix does not have an image')
      
      // Submit without uploading image
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockCreateMix).toHaveBeenCalled()
        expect(mockUploadImage).not.toHaveBeenCalled() // Should not upload image
      })
    })
  })

  describe('✅ Error Handling Tests', () => {
    test('should handle mix creation API failures', async () => {
      const user = userEvent.setup()
      
      mockUploadAudio.mockResolvedValue(true)
      mockCreateMix.mockRejectedValue(new Error('Mix creation failed'))

      render(<CreateMixComponent />)
      
      // Upload audio and fill form
      const audioFileInput = document.querySelector('input[type="file"]')!
      const audioFile = createTestFile('error-test.mp3', 1000, 'audio/mp3')
      
      await user.upload(audioFileInput, audioFile)
      
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
      })
      
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      await user.clear(titleInput)
      await user.type(titleInput, 'Error Test Mix')
      await user.clear(descriptionInput)
      await user.type(descriptionInput, 'This should fail during creation')
      await user.click(submitButton)
      
      // Verify the API was called (error is handled gracefully)
      await waitFor(() => {
        expect(mockCreateMix).toHaveBeenCalled()
      })
    })
  })

  describe('✅ UI State Management Tests', () => {
    test('should show loading state during form submission', async () => {
      const user = userEvent.setup()
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
      
      mockUploadAudio.mockResolvedValue(true)
      // Mock slow creation to see loading state
      mockCreateMix.mockImplementation(async () => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(mockCreatedMix), 100)
        })
      })

      render(<CreateMixComponent />)
      
      // Upload audio and fill form
      const audioFileInput = document.querySelector('input[type="file"]')!
      const audioFile = createTestFile('loading.mp3', 1000, 'audio/mp3')
      
      await user.upload(audioFileInput, audioFile)
      
      await waitFor(() => {
        expect(screen.getByText('Mix details')).toBeInTheDocument()
      })
      
      const titleInput = screen.getByLabelText('Title')
      const descriptionInput = screen.getByLabelText('Description')
      const submitButton = screen.getByRole('button', { name: /save mix/i })
      
      await user.clear(titleInput)
      await user.type(titleInput, 'Loading Test')
      await user.clear(descriptionInput)
      await user.type(descriptionInput, 'Testing loading states')
      
      await user.click(submitButton)
      
      // Check loading state
      expect(screen.getByText('Saving...')).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
      
      // Wait for completion
      await waitFor(() => {
        expect(mockCreateMix).toHaveBeenCalled()
      })
    })
  })

  describe('✅ Configurable Test Features', () => {
    test('should work with different audio file types and sizes', async () => {
      const user = userEvent.setup()
      const testFiles = [
        createTestFile('house-music.mp3', 5 * 1024 * 1024, 'audio/mpeg'),
        createTestFile('techno-session.mp3', 8 * 1024 * 1024, 'audio/mp3'),
      ]
      
      for (const testFile of testFiles) {
        mockUploadAudio.mockResolvedValue(true)
        
        render(<CreateMixComponent />)
        
        const fileInput = document.querySelector('input[type="file"]')!
        await user.upload(fileInput, testFile)
        
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

    test('should handle different failure scenarios', async () => {
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
      ]
      
      for (const scenario of failureScenarios) {
        scenario.setup()
        
        render(<CreateMixComponent />)
        
        const fileInput = document.querySelector('input[type="file"]')!
        const testFile = createTestFile('failure.mp3', 1000, 'audio/mp3')
        
        await user.upload(fileInput, testFile)
        
        await waitFor(() => {
          expect(screen.getByText('Ooopsies...')).toBeInTheDocument()
          expect(screen.getByText(scenario.expectedError)).toBeInTheDocument()
        })
        
        mockUploadAudio.mockReset()
      }
    })
  })
})