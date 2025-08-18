import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import UserService from "@/lib/services/api/user-service";

type UserPageProps = {
  slug: string;
};

const UserPage: React.FC<UserPageProps> = async ({ slug }) => {
  const user = await UserService.getUserBySlug(slug);
  return (
    <div className="p-2">
      <h2>Hello: {user?.displayName}</h2>
    </div>
  );
};

export default UserPage;
