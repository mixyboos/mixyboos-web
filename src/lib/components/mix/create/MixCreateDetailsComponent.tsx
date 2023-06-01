"use client";

import React from "react";
import ImageUpload from "@/lib/components/widgets/ImageUpload";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/ui/input";

const MixCreateDetailsComponent = () => {
  const formSchema = z.object({
    title: z
      .string()
      .min(5, { message: "must be at least 5 characters" })
      .max(100, { message: "can't be more than 100 characters" }),
    description: z
      .string()
      .min(5, { message: "must be at least 5 characters" })
      .max(2000, { message: "can't be more than 2000 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("MixCreateDetailsComponent", "onSubmit", values);
  };
  const [image, setImage] = React.useState<File | undefined>();
  return (
    <div className="flex space-x-4">
      <div className="w-1/2">
        <h2 className="mb-2 text-xl font-bold dark:text-white">Mix info</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Show title</FormLabel>
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
          </form>
        </Form>
      </div>
      <div className="w-1/2 content-center">
        <h2 className="mb-2 text-xl font-bold dark:text-white">Mix image</h2>
        <ImageUpload
          onImageChanged={(image) => {
            console.log("MixDetailsForm", "onImageChanged", image);
            setImage(image);
          }}
        />
      </div>
    </div>
  );
};
export default MixCreateDetailsComponent;
