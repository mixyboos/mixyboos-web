import { type ProfileModel } from "@/lib/models";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
type UserBioComponentProps = {
  user: ProfileModel;
};

const UserBioComponent: React.FC<UserBioComponentProps> = ({ user }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="mx-auto">
        <Avatar className="mb-4 h-32 w-32 shrink-0 rounded-full">
          <AvatarImage src={user.profileImage} alt="User Avatar" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </div>
      <div className="space-y-4 px-6 pt-2">
        <Button className="w-full" variant={"default"}>
          <Icons.follow className="mr-2 h-4 w-4" /> Follow
        </Button>
        <Button className="w-full">
          <Icons.message className="mr-2 h-4 w-4" /> Message
        </Button>
      </div>
      <div className="px-6 py-6">
        <p className="text-sm text-muted-foreground">{user.biography}</p>
      </div>
    </div>
  );
};

export default UserBioComponent;
