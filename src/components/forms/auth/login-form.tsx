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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import logger from "@/lib/logger";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useAuth } from "@/lib/contexts/auth/auth-context";

const LoginForm: React.FC = () => {
  const { profile, login } = useAuth();

  const [loginError, setLoginError] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usernameOrEmail:
        process.env.NODE_ENV === "development"
          ? "fergal.moran+mixyboos@gmail.com"
          : "",
      password:
        process.env.NODE_ENV === "development"
          ? "SVqVKJWZh5dIaM7JsNY1h0E/xbzPCD7y7Veedxa1Q/k="
          : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    logger.debug(values);
    setIsSending(true);
    setLoginError(false);

    console.log(values);
    const response = await login(values.usernameOrEmail, values.password);
    console.log("login-form", "response", response);
    setIsSending(false);
    //TODO: have to check result?.error rather than result.ok
    //TODO: https://github.com/nextauthjs/next-auth/issues/7725#issuecomment-1649310412

    if (response) {
      router.push(searchParams?.get("returnUrl") || "/");
    } else {
      setLoginError(true);
    }
  }

  return (
    <div className="w-full max-w-xl space-y-4">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            <div className="flex flex-row">
              <Icons.play />
              {"Let's play..."}
            </div>
          </CardTitle>
          <CardDescription>Login to mixyboos</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-3 gap-6">
                <Button variant="outline">
                  <Icons.twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
                <Button variant="outline">
                  <Icons.facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
                <Button variant="outline">
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t text-muted-foreground" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className=" px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              {loginError && (
                <Alert variant="destructive">
                  <Icons.error className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Unable to sign you in</AlertDescription>
                </Alert>
              )}
              <div className="grid gap-2">
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
              </div>
              <div className="grid gap-2">
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
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full flex-col space-y-4">
                <Button
                  type="submit"
                  variant={"default"}
                  size={"lg"}
                  className="w-full"
                  disabled={isSending}
                >
                  {isSending && (
                    <Icons.loading className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <div className="inline-flex items-center">
                    <Icons.login className="mr-2 h-4 w-4" />
                    <span>Login</span>
                  </div>
                </Button>
                <div className="text-sm font-medium">
                  <span className="text-muted-foreground">Not registered?</span>
                  <Link
                    href="/auth/register"
                    className="ml-2 text-primary hover:underline"
                  >
                    Create account
                  </Link>
                </div>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
