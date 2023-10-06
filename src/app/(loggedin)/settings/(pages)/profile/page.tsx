"use client";

import Loading from "@/components/widgets/loading";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import ProfileEditForm from "../../components/profile-edit-form";

const ProfileSettingsPage: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }
  return session?.profile ? (
    <ProfileEditForm />
  ) : (
    <div>Nothing here bai!</div>
  );
};

export default ProfileSettingsPage;
