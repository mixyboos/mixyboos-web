"use client";
import * as React from "react";

import MixCreateComponent from "@/components/mix/create-mix";
import { useAuth } from "@/lib/contexts/auth/auth-context";
import { useRouter } from "next/navigation";

const Upload = () => {
  const { profile } = useAuth();
  const router = useRouter();
  React.useEffect(() => {
    if (!profile) {
      router.push("/login");
    }
  }, [profile, router]);
  if (!profile) {
    return null;
  }
  return <MixCreateComponent />;
};
export default Upload;
