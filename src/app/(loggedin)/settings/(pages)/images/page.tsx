"use client";

import Loading from "@/lib/components/widgets/Loading";
import { api } from "@/lib/utils/api";
import React from "react";
import ProfileImageEditForm from "../../components/profile-images-form";

const ProfileImagesPage = () => {
  const { data: profile, status } = api.user.getProfileForSettings.useQuery();

  if (status === "loading") {
    return <Loading />;
  }

  if (!profile) {
    return <h1>{"Can't find your profile"}</h1>;
  }

  return <ProfileImageEditForm profile={profile} />;
};

export default ProfileImagesPage;
