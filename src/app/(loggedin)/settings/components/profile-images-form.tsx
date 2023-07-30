"use client";

import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/widgets/image-upload";
import { notice } from "@/lib/components/notifications/toast";
import { type UserModel } from "@/lib/models";
import { uploadFile } from "@/lib/services/azure/clientUploader";
import { api } from "@/lib/utils/api";
import { getFileExtension } from "@/lib/utils/fileUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const MAX_PROFILE_IMAGE_SIZE = 5242880;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

type ProfileImageEditFormProps = {
  profile: UserModel;
};

const ProfileImageEditForm: React.FC<ProfileImageEditFormProps> = ({
  profile,
}) => {
  const { update } = useSession();

  const [profileImageChanged, setProfileImageChanged] = React.useState(false);
  const [headerImageChanged, setHeaderImageChanged] = React.useState(false);

  const uploader = api.upload.getSASToken.useQuery({ containerName: "images" });
  const updateUser = api.user.updateUser.useMutation({
    onSuccess: (result) => {
      console.log("profile-edit-form", "onSuccess", result);
      notice("Success", "Profile updated successfully");
    },
  });
  const formSchema = z.object({
    profileImage: z
      .any()
      .refine((file: File) => {
        const ret =
          !profileImageChanged || file?.size <= MAX_PROFILE_IMAGE_SIZE;
        console.log("profile-images-form", "profileImage_refine", ret);
        return ret;
      }, `Max image size is 5MB.`)
      .refine(
        (file: File) =>
          !profileImageChanged || ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
      )
      .optional(),
    headerImage: z
      .any()
      .refine((file: File) => {
        const ret =
          !headerImageChanged || file?.size <= MAX_PROFILE_IMAGE_SIZE * 3;
        return ret;
      }, `Max image size is 15MB.`)
      .refine(
        (file: File) =>
          !headerImageChanged || ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
      )
      .optional(),
  });
  type FormValues = z.infer<typeof formSchema>;

  const defaultValues: Partial<FormValues> = {
    profileImage: profile.profileImage,
    headerImage: profile.headerImage,
  };
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });
  const onSubmit = async (data: FormValues) => {
    console.log("profile-images-form", "onSubmit", data);
    if (profileImageChanged || headerImageChanged) {
      const token = uploader.data;
      if (!token) {
        notice("Error", "Unable to upload at this time");
        return;
      }

      if (
        profileImageChanged &&
        data.profileImage &&
        data.profileImage instanceof File
      ) {
        const image = await uploadFile(
          data.profileImage,
          "images",
          `profile/avatars/${profile.id}.${getFileExtension(
            data.profileImage.name,
          )}`,
          token,
        );
        if (image) {
          await updateUser.mutateAsync({
            ...profile,
            profileImage: image,
            urls: [],
          });
        }
      }
      if (
        headerImageChanged &&
        data.headerImage &&
        data.headerImage instanceof File
      ) {
        const image = await uploadFile(
          data.headerImage,
          "images",
          `profile/headers/${profile.id}.${getFileExtension(
            data.headerImage.name,
          )}`,
          token,
        );
        if (image) {
          await updateUser.mutateAsync({
            ...profile,
            headerImage: image,
          });
        }
      }
      await update();
    }
  };
  return (
    <Form {...form}>
      {/* <p>{JSON.stringify(form.formState.errors, null, 2)}</p> */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <div className="w-1/2">
                <Controller
                  control={form.control}
                  name={"profileImage"}
                  rules={{ required: "Gonna need a profile image" }}
                  render={({ field: { value, onChange, ...field } }) => {
                    return (
                      <ImageUpload
                        {...field}
                        imageUrl={value as string}
                        onImageChanged={(image) => {
                          setProfileImageChanged(true);
                          onChange(image);
                        }}
                      />
                    );
                  }}
                />
              </div>
              <FormDescription>
                {
                  "This is your avatar, it's how you will be recognised on the site"
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="headerImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Header Image</FormLabel>
              <Controller
                control={form.control}
                name={"headerImage"}
                render={({ field: { value, onChange, ...field } }) => {
                  return (
                    <ImageUpload
                      {...field}
                      className="w-full"
                      imageUrl={value as string}
                      onImageChanged={(image) => {
                        setHeaderImageChanged(true);
                        onChange(image);
                      }}
                    />
                  );
                }}
              />
              <FormDescription>
                This is the image that will show at the top of your profile
                page.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile images</Button>
      </form>
    </Form>
  );
};

export default ProfileImageEditForm;
