"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(5, { message: "must be at least 5 characters" })
    .max(100),
  password: z.string().min(4),
});

import React from "react";
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
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { notice } from "@/lib/components/notifications/toast";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const LoginPage = () => {
  const [loginError, setLoginError] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setLoginError(false);
    signIn("credentials", {
      email: values.usernameOrEmail,
      password: values.password,
      callbackUrl:
        searchParams?.get("callbackUrl") ||
        searchParams?.get("returnUrl") ||
        "/",
      redirect: false,
    })
      .then((result) => {
        if (result?.ok) {
          router.push(searchParams?.get("returnUrl") || "/");
        } else {
          setLoginError(true);
        }
      })
      .catch((err) => {
        console.error("login", "handleLogin", err);
        setLoginError(true);
      });
  }
  return (
    <div className="w-full max-w-xl space-y-4 rounded-lg  border p-6  shadow sm:p-8">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
          Login with...
        </h1>
        <div className="mt-2 grid grid-cols-3 gap-3">
          <button
            title="Sign in with Facebook"
            onClick={() => {
              notice("Warning", "Facebook login is not working yet");
              // signIn('facebook')
            }}
            className="inline-flex w-full justify-center rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-[#4267B2] shadow-sm hover:bg-gray-50"
          >
            <Icons.facebook className="h-5 w-5" />
          </button>
          <button
            title="Sign in with Google"
            onClick={() => {
              notice("Warning", "Google login is not working yet");
              // signIn('google', {
              //   callbackUrl: `${window.location.origin}/`
              // })
            }}
            className="inline-flex w-full justify-center rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-[#DB4437] shadow-sm hover:bg-gray-50"
          >
            <Icons.google className="h-5 w-5" />
          </button>
          <button
            title="Sign in with Twitter"
            onClick={() => {
              notice("Warning", "Twitter login is not working yet");
              // signIn('twitter')
            }}
            className="inline-flex w-full justify-center rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-[#00acee] shadow-sm hover:bg-gray-50"
          >
            <Icons.twitter className="h-5 w-5" />
          </button>
        </div>
        <div className="border-sm mt-4 text-center shadow-lg">or</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="usernameOrEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input
                      maxLength={100}
                      placeholder="Your username or your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="mysecretpassword123"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full">
              <Button type="submit" variant={"outline"} size={"lg"}>
                <div className="inline-flex items-center">
                  <Icons.login className="mr-2 h-4 w-4" />
                  <span>Login</span>
                </div>
              </Button>
            </div>
            {loginError && (
              <div>
                <Alert variant="destructive">
                  <Icons.error className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Unable to sign you in</AlertDescription>
                </Alert>
              </div>
            )}
            <div className="text-sm font-medium text-gray-500">
              Not registered?
              <Link
                href="/auth/register"
                className="ml-2 text-fuchsia-600 hover:underline"
              >
                Create account
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
