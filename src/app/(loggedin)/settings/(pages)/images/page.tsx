"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/widgets/loading";
import ProfileImageEditForm from "../../components/profile-images-form";

const ProfileImagesPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }
  return session && session.profile ? (
    <ProfileImageEditForm profile={session.profile} />
  ) : (
    <div>Images Form</div>
  );
};

export default ProfileImagesPage;
