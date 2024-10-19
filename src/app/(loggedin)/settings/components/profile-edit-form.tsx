"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {error, notice, success} from '@/lib/components/notifications/toast';
import ProfileService from "@/lib/services/api/profile-service";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  slug: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  displayName: z.string().max(40),
  biography: z.string().max(160).min(0),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional(),
});
type FormValues = z.infer<typeof formSchema>;

const ProfileEditForm = () => {
  const { data: session } = useSession();
  useEffect(() => {
    console.log("profile-edit-form", "session", session);
  }, [session]);

  const defaultValues: Partial<FormValues> = {
    slug: session?.profile.slug,
    displayName: session?.profile.displayName || "",
    biography: session?.profile.biography || "",
    urls: [],
  };
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const onSubmit = async (data: FormValues) => {
    console.log("profile-edit-form", "onSubmit", data);
    const profileService = new ProfileService();
    const result = await profileService.updateProfile({
      ...session?.profile,
      slug: data.slug,
      displayName: data.displayName,
      biography: data.biography,
    });
    if (result) {
      success("Success", "Profile updated");
    } else {
      error("Error", "Error updating profile");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your unique profile name, it will be used to generate
                URLs to your shows & mixes
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="displayName" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="biography"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="link"
            size="sm"
            className="mt-1"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button>
        </div>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
};

export default ProfileEditForm;
