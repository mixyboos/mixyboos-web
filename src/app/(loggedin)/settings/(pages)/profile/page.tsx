"use client";

import Loading from "@/lib/components/widgets/Loading";
import { type NextPage } from "next";
import React from "react";
import ProfileEditForm from "../../components/profile-edit-form";

const ProfileSettingsPage: NextPage = () => {
  return <Loading />;
  // if (status === "loading") {
  //   return <Loading />;
  // }
  // return profile ? (
  //   <ProfileEditForm profile={profile} />
  // ) : (
  //   <div>Nothing here bai!</div>
  // );
};

export default ProfileSettingsPage;
