"use client";
import RegisterForm from "@/components/forms/auth/register-form";
import * as React from "react";

export default function Register() {
  return (
    <div className="grid h-screen place-items-center">
      <RegisterForm />
    </div>
  );
}
