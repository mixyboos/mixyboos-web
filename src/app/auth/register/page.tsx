"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { api } from "@/lib/utils/api";

const LoginPage = () => {
  const schema = z
    .object({
      username: z
        .string()
        .min(5, { message: "must be at least 5 characters" })
        .max(100),
      email: z
        .string()
        .min(1, { message: "Need an email I'm afraid." })
        .email("This is not a valid email."),
      password: z.string().min(4),
      confirmPassword: z.string().min(4),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords don't match",
    });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const register = api.auth.signUp.useMutation({
    onSuccess: (result) => {
      console.log("page", "register_success", result);
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      const result = await register.mutateAsync({
        email: values.email,
        username: values.username,
        password: values.password,
      });
      console.log("page", "handleRegister", result);
      if (result?.status === 201) {
        await signIn();
      }
    } catch (err) {
      console.error("RegisterPage", "handleLogin", err);
    }
  }
  return (
    <div className="w-full max-w-xl space-y-4 rounded-lg  border p-6  shadow sm:p-8">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
          Register with...
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
        <div className="border-sm mt-4 text-center shadow-lg">
          or create a new account
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="superawesomedjperson@gmail.com"
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
              <Button type="submit" variant={"outline"} size={"fullWidth"}>
                <div className="inline-flex items-center">
                  <Icons.register className="mr-2 h-4 w-4" />
                  <span>Register</span>
                </div>
              </Button>
            </div>
            <div className="text-sm font-medium text-gray-500">
              Already registered?
              <Link
                href="/auth/login"
                className="ml-2 text-fuchsia-600 hover:underline"
              >
                Login to your account
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
