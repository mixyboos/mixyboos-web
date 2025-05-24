"use client";

import Loading from "@/components/widgets/loading";
import { type NextPage } from "next";
import React from "react";
import ProfileEditForm from "../../components/profile-edit-form";
import { useAuth } from "@/lib/contexts/auth/auth-context";

const ProfileSettingsPage: NextPage = () => {
  const { profile } = useAuth();

  return profile ? <ProfileEditForm /> : <Loading />;
};

export default ProfileSettingsPage;
