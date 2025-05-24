import { test, expect } from '@playwright/test';

// Define a test fixture for authenticated state
const authenticatedTest = test.extend({
  page: async ({ page }, use) => {
    // Log in
    await page.goto('/login');
    await page.getByLabel('Email').fill('fergal.moran+mixyboos@gmail.com');
    await page.getByLabel('Password').fill('SVqVKJWZh5dIaM7JsNY1h0E/xbzPCD7y7Veedxa1Q/k=');
    await page.locator('button[type="submit"][name="login"]').click();

    // Verify login was successful
    // Verify login was successful by checking URL pattern
    await expect(page).toHaveURL(/.*\/(home|dashboard|profile)/);

    // Use the authenticated page
    await use(page);
  },
});

// Mock data for file upload
const testAudioFile = 'tests/test-assets/test-audio.mp3';
const testImageFile = 'tests/test-assets/test-image.jpg';

// Test for unauthenticated redirect
test('redirects to login page when user is not authenticated', async ({ page }) => {
  // Navigate directly to upload page without authentication
  await page.goto('/upload');

  // Verify redirect to login page
  await expect(page).toHaveURL(/.*login/);
});

// Tests that require authentication
authenticatedTest('authenticated user can access upload page', async ({ page }) => {
  // Navigate to upload page
  await page.goto('/upload');

  // Verify we're on the upload page (not redirected)
  await expect(page).toHaveURL(/.*upload/);

  // Check for the mix create component
  await expect(page.getByText("Let's create a mix")).toBeVisible();
});

authenticatedTest('allows authenticated user to create a mix', async ({ page }) => {
  // Navigate to upload page
  await page.goto('/upload');

  // Upload an audio file
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(testAudioFile);

  // Wait for upload to complete and processing to start
  await expect(page.getByText('Uploading..')).toBeVisible();
  await expect(page.getByRole('progressbar')).toBeVisible();

  // Wait for form to appear after upload completes
  await expect(page.getByText('Mix info')).toBeVisible({ timeout: 30000 });

  // Fill out mix details
  await page.getByLabel('Title').fill('Test Mix Title');
  await page.getByLabel('Description').fill('This is a test mix description');

  // Select tags (if applicable)
  const tagsDropdown = page.getByRole('combobox', { name: 'Tags' });
  if (await tagsDropdown.isVisible()) {
    await tagsDropdown.click();
    await page.getByRole('option', { name: 'House' }).click();
    // Close dropdown by clicking elsewhere
    await page.getByLabel('Title').click();
  }

  // Upload mix image
  const uploadArea = page.getByText("Mix Image").locator('..').locator('..');

  // Check if it exists first
  await expect(uploadArea).toBeVisible();

  // Then find the hidden input within that area and set files
  const hiddenInput = uploadArea.locator('input[type="file"]');
  await hiddenInput.setInputFiles(testImageFile);

  // Submit the form
  await page.getByRole('button', { name: 'Save mix' }).click();

  // Verify navigation to the new mix page
  await expect(page).toHaveURL(/.*\/mix\/.*/, { timeout: 30000 });
  await expect(page.getByText('Test Mix Title')).toBeVisible();
});

authenticatedTest('shows validation errors when submitting without required fields', async ({ page }) => {
  // Navigate to upload page
  await page.goto('/upload');

  // Upload an audio file
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(testAudioFile);

  // Wait for form to appear after upload completes
  await expect(page.getByText('Mix info')).toBeVisible({ timeout: 30000 });

  // Leave fields empty and try to submit
  await page.getByRole('button', { name: 'Save mix' }).click();

  // Check for validation errors
  await expect(page.getByText('must be at least 5 characters')).toBeVisible();
});
