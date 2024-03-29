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
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/widgets/image-upload";
import { type MixModel } from "@/lib/models";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import * as Sentry from "@sentry/nextjs";

import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import MixService from "@/lib/services/api/mix-service";
import UploadService from "@/lib/services/api/upload-service";

const MAX_IMAGE_SIZE = 5242880;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
type MixCreateDetailsComponentProps = {
  mix: MixModel;
  onMixCreated: (mix: MixModel) => void;
};

const MixCreateDetailsComponent: React.FC<MixCreateDetailsComponentProps> = ({
  mix,
  onMixCreated,
}) => {
  const mixService = new MixService();
  const uploadService = new UploadService();
  const formSchema = z.object({
    title: z
      .string()
      .min(5, { message: "must be at least 5 characters" })
      .max(100, { message: "can't be more than 100 characters" }),
    description: z
      .string()
      .min(5, { message: "must be at least 5 characters" })
      .max(2000, { message: "can't be more than 2000 characters" }),
    mixImage: z
      .any()
      .refine((file: File) => {
        const ret = file?.size <= MAX_IMAGE_SIZE;
        return ret;
      }, `Max image size is 5MB.`)
      .refine(
        (file: File) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
      ),
  });
  type FormValues = z.infer<typeof formSchema>;
  const defaultValues: Partial<FormValues> = {
    title: mix.title,
    description: "",
    mixImage: null,
  };
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("MixCreateDetailsComponent", "onSubmit", values);
    try {
      const result = await mixService.createMix({
        id: mix.id,
        title: values.title,
        description: values.description,
        isProcessed: false,
      });
      if (result && values.mixImage) {
        const data = new FormData();
        data.append("file", values.mixImage);
        uploadService.uploadImage(mix.id, data, "MixImage", undefined);
      }

      // const result = await createMix.mutateAsync({
      //   id: mix.id,
      //   title: values.title,
      //   description: values.description,
      //   tags: [],
      // });
      onMixCreated(result);
    } catch (err) {
      Sentry.captureException(err);
    }
  };
  return (
    <div className="container w-full">
      <h2 className="mb-2 text-xl font-bold">Mix info</h2>
      <Separator className="bg-muted-foreground my-2" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 ">
            <div className="max-w-xl p-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={100}
                        placeholder="superawesomedjperson"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        maxLength={2000}
                        placeholder="Be as descriptive as you like"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="max-w-xl p-6 ">
              <FormField
                control={form.control}
                name="mixImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mix Image</FormLabel>
                    <Controller
                      control={form.control}
                      name={"mixImage"}
                      render={({ field: { value, onChange, ...field } }) => {
                        return (
                          <ImageUpload
                            {...field}
                            className="h-64 w-64"
                            imageUrl={value as string}
                            onImageChanged={(image) => {
                              onChange(image);
                            }}
                          />
                        );
                      }}
                    />
                    <FormDescription>No naughty stuff!!</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Separator className="bg-muted-foreground my-0" />
          <Button type="submit" variant={"default"}>
            <Icons.save className="mr-2 h-4 w-4" />
            Save mix
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default MixCreateDetailsComponent;
