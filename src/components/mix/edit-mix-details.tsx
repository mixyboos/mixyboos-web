'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from '@tanstack/react-router'
import * as z from 'zod'
import { toast } from 'sonner'
import type { MixModel } from '@/lib/models/mix'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import ImageUpload from '@/components/widgets/image-upload'
import { Card } from '@/components/ui/card'
import { uploadImage } from '@/lib/services/api/upload/upload-service'
import { updateMix } from '@/lib/services/api/mix-service'
import logger from '@/lib/logger'
import { useAuth } from '@/lib/auth'
import NotLoggedIn from '@/components/widgets/not-logged-in'
import TagChooser from '@/components/widgets/tag-chooser'

const MAX_IMAGE_SIZE = 5242880
const ACCEPTED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
])

type EditMixDetailsProps = {
  mix: MixModel
}

const EditMixDetails: React.FC<EditMixDetailsProps> = ({ mix }) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { profile } = useAuth()

  const formSchema = z.object({
    title: z
      .string()
      .min(5, { message: 'must be at least 5 characters' })
      .max(100, { message: "can't be more than 100 characters" }),
    description: z
      .string()
      .min(5, { message: 'must be at least 5 characters' })
      .max(2000, { message: "can't be more than 2000 characters" }),
    tags: z.array(z.string()).default([]),
    mixImage: z
      .instanceof(File)
      .refine((file: File) => {
        const ret = file.size <= MAX_IMAGE_SIZE
        return ret
      }, `Max image size is 5MB.`)
      .refine(
        (file: File) => ACCEPTED_IMAGE_TYPES.has(file.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.',
      )
      .optional(),
  })

  if (!profile) {
    return <NotLoggedIn />
  }

  // Check if user owns the mix
  if (profile.id !== mix.user.id) {
    return (
      <Card className="w-full rounded-lg shadow-sm">
        <div className="p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
          <p className="text-muted-foreground">
            You don't have permission to edit this mix.
          </p>
        </div>
      </Card>
    )
  }

  type FormValues = z.infer<typeof formSchema>

  const defaultValues: Partial<FormValues> = {
    title: mix.title,
    description: mix.description,
    tags: mix.tags.map((t) => t.name),
    mixImage: undefined,
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const result = await updateMix({
        ...mix,
        title: values.title,
        description: values.description,
        tags: values.tags.map((name) => ({ name, slug: name.toLowerCase().replace(/\s+/g, '-') })),
      })

      if (values.mixImage) {
        await uploadImage(mix.id, values.mixImage, 'mixes', '')
      }

      toast.success('Mix updated successfully!')

      // Navigate back to mix details page
      router.navigate({
        to: '/$user/$mix',
        params: { user: mix.user.slug, mix: mix.slug },
      })
    } catch (err) {
      logger.errorLog('EditMixDetails', 'Error updating mix', err)
      toast.error('Failed to update mix')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Edit mix details</h2>
        <Separator className="mb-6" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Title</FormLabel>
                      <FormControl>
                        <Input
                          className="h-10"
                          maxLength={100}
                          placeholder="Enter a catchy title for your mix"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Make it memorable and descriptive
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-32 resize-none"
                          maxLength={2000}
                          placeholder="Describe your mix, music style, inspiration, etc."
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-between">
                        <FormDescription>
                          Share the story behind your mix
                        </FormDescription>
                        <span className="text-xs text-muted-foreground">
                          {field.value.length || 0}/2000
                        </span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Tags</FormLabel>
                      <FormControl>
                        <TagChooser
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Type to search or add tags..."
                        />
                      </FormControl>
                      <FormDescription>
                        Add tags to help others discover your mix
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="text-center">
                <FormField
                  control={form.control}
                  name="mixImage"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-base">Cover Image</FormLabel>
                      <Controller
                        control={form.control}
                        name={'mixImage'}
                        render={({ field: { value, onChange, ...field } }) => {
                          return (
                            <div className="flex flex-col items-start">
                              <ImageUpload
                                {...field}
                                className="h-64 w-64 rounded-md border border-input"
                                imageUrl={value?.name || mix.image}
                                onImageChanged={(image) => {
                                  onChange(image)
                                }}
                              />
                            </div>
                          )
                        }}
                      />
                      <FormDescription className="text-left">
                        Upload a square image (JPG, PNG or WebP, max 5MB)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  router.navigate({
                    to: '/$user/$mix',
                    params: { user: mix.user.slug, mix: mix.slug },
                  })
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                size="lg"
                disabled={isSubmitting}
                className="min-w-32"
              >
                {isSubmitting ? (
                  <>
                    <Icons.loading className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Icons.save className="mr-2 h-4 w-4" />
                    Save changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  )
}

export default EditMixDetails
