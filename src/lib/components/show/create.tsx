"use client";
import React from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import LiveService from "@/lib/services/api/live-service";
import ProfileService from "@/lib/services/api/profile-service";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useStreamDetails } from "@/lib/hooks/stream-details";

type CreateShowProps = {
  startShow: (
    title: string,
    description: string,
    tags: string[],
  ) => Promise<void>;
};

const CreateShow: React.FC<CreateShowProps> = ({ startShow }) => {
  const { data: session } = useSession();
  const { streamKey, streamHost } = useStreamDetails();

  const schema = z.object({
    title: z
      .string({
        required_error: "Can't have a show without a title??",
      })
      .min(5, "C'mon make an effort - 5 characters minimum.")
      .max(30, "Woah!! Slow down, Shakespeare. 50 character limit."),
    description: z
      .string({
        required_error: "Can't have a show without a description??",
      })
      .min(10, "C'mon make an effort - 5 characters minimum.")
      .max(500, "Woah!! Slow down, Shakespeare. 500 character limit."),
    tags: z.string().array(),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "This is a new live stream",
      description: "New new new new new new new live stream",
      tags: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    await startShow(values.title, values.description, values.tags);
  };
  if (!streamKey || !streamHost) return null;

  return (
    <div className="mx-auto mt-12 max-w-xl sm:p-8">
      <Card>
        <CardHeader>
          <div className="inline-flex items-center space-x-2">
            <Icons.liveStream className="h-8 w-8 text-primary" />
            <h3 className="text-lg font-medium"> {"Let's do a live stream"}</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {"We'll need a few details before we can get going"}
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={100}
                        placeholder={`${
                          session?.user.name ?? "User"
                        }'s adventures in live streaming`}
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
                        placeholder={`A few words describing your show...`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <div className="mx-4 mt-4">
            <Textarea
              id="description"
              label="Stream description"
              onChange={handleChange}
              placeholder="Description of your stream (optional)"
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Error!</span> {errors.description}
              </p>
            )}
          </div>
          <div className="mx-4 mt-4">
            <TaggedInput
              id="stream-tags"
              label="Tags"
              value={values.tags}
              placeholder="Add some tags for your show"
            />

          </div>
          <div className="mx-4 mt-4">
            <CopyInput
              id="stream-key"
              label="Stream key"
              type="text"
              readOnly={true}
              value={streamKey}
              obfuscate={true}
              placeholder="Stream key"
            />
          </div>
          <div className="mx-4 mt-4">
            <CopyInput
              id="server-url"
              label="Server url"
              type="text"
              readOnly={true}
              value={streamHost}
              placeholder="Stream key"
            />
          </div> */}
              <Separator />
              <div className="w-full">
                <Button type="submit" variant={"default"} className="w-full">
                  <div className="inline-flex items-center">
                    <Icons.submit className="mr-2 h-4 w-4" />
                    <span>{"Let's Go!"}</span>
                  </div>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateShow;
