"use client";

import Loading from "@/lib/components/widgets/Loading";
import { api } from "@/lib/utils/api";
import { type NextPage } from "next";
import React from "react";
import ProfileEditForm from "../../components/profile-edit-form";

const ProfileSettingsPage: NextPage = () => {
  const { data: profile, status } = api.user.getProfileForSettings.useQuery();

  if (status === "loading") {
    return <Loading />;
  }
  return profile ? (
    <ProfileEditForm profile={profile} />
  ) : (
    <div>Nothing here bai!</div>
  );
};

export default ProfileSettingsPage;
