import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import React from "react";
type GoogleAuthButtonProps = {
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
};
export const initiateGoogleLogin = ($event: React.MouseEvent) => {
  $event.preventDefault();
  window.location.href = `${env.NEXT_PUBLIC_API_URL}/auth/google-login`;
};

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  onSuccess,
  onFailure,
}) => {
  return (
    <Button
      onClick={($e) => {
        initiateGoogleLogin($e);
      }}
    >
      <Icons.google />
      Login with Google
    </Button>
  );
};

export default GoogleAuthButton;
