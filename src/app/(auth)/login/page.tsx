"use client";
import * as React from "react";

import LoginForm from "@/components/forms/auth/login-form";

export default function Login() {
  return (
    <div className="grid h-screen place-items-center">
      <LoginForm/>
    </div>
  );
}
