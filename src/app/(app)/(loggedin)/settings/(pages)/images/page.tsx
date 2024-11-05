"use client";

import React from "react";
import Loading from "@/components/widgets/loading";
import ProfileImageEditForm from "../../components/profile-images-form";
import { useAuth } from "@/lib/contexts/auth/auth-context";

const ProfileImagesPage = () => {
  const { profile } = useAuth();

  return profile ? <ProfileImageEditForm profile={profile} /> : <Loading />;
};

export default ProfileImagesPage;
