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
import ImageUpload from "@/lib/components/widgets/ImageUpload";
import { type UserModel } from "@/lib/models";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

type ProfileImageEditFormProps = {
  profile: UserModel;
};
const formSchema = z.object({
  profileImage: z
    .any()
    .refine(
      (file: File) => file?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  headerImage: z
    .any()
    .refine(
      (file: File) => file?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});
type FormValues = z.infer<typeof formSchema>;
const ProfileImageEditForm: React.FC<ProfileImageEditFormProps> = ({
  profile,
}) => {
  const defaultValues: Partial<FormValues> = {
    profileImage: profile.image,
    headerImage: profile.headerImage,
  };
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });
  const onSubmit = (data: FormValues) => {
    console.log("profile-images-form", "onSubmit", data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <div className="w-1/2">
                  <ImageUpload
                    onImageChanged={(image) => {
                      console.log(
                        "profile-images-form",
                        "onImageChanged",
                        image
                      );
                    }}
                  />
                </div>
              </FormControl>
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
              <FormControl>
                <ImageUpload
                  onImageChanged={(image) => {
                    console.log("profile-images-form", "onImageChanged", image);
                  }}
                />
              </FormControl>
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
    //   <ImageUpload
    //     onImageChanged={(image) => {
    //       console.log("profile-images-form", "onImageChanged", image);
    //     }}
    //   />
    // </div>
  );
};

export default ProfileImageEditForm;
