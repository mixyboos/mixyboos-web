"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/auth/auth-context";

const LoginForm: React.FC = () => {
  const { user, login } = useAuth();

  const formSchema = z.object({
    email: z.string().email({
      message: "Invalid email.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "fergal.moran+mixyboos@gmail.com",
      password: "SVqVKJWZh5dIaM7JsNY1h0E/xbzPCD7y7Veedxa1Q/k=",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    const response = await login(data.email, data.password);
    console.log("login-form", "response", response);

    if (response) {
      console.log("login-form", "login successful");
      alert("You are logged in sir!!");
    }
  });
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email address" {...field} />
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
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
