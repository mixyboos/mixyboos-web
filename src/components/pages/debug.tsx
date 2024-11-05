"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/auth/auth-context";
import logger from "@/lib/logger";
import { error, notice, success } from "@/components/toast";
import { useToast } from "@/hooks/use-toast";
import classNames from "classnames";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DebugPage = () => {
  const { toast } = useToast();
  const { profile, logout } = useAuth();
  if (process.env.NODE_ENV === "production") {
    return <div>Debug page is disabled in production</div>;
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h1>Welcome {profile?.slug}</h1>
        <Avatar>
          <AvatarImage
            src="/img/default-avatar.png"
            alt="avatar"
          ></AvatarImage>
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <div className="flex flex-row space-x-1">
          <Button
            onClick={() => {
              notice("Notice", "This is a notice");
            }}
          >
            Information
          </Button>
          <Button
            onClick={() => {
              success("Success", "Great success");
            }}
          >
            Success
          </Button>
          <Button
            onClick={() => {
              error("Error", "Great errror");
            }}
          >
            Error
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DebugPage;
