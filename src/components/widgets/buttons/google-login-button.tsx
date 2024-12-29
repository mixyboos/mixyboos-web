import React from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

type GoogleAuthButtonProps = {
  onSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  onFailure: (error: any) => void;
};

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  onSuccess,
  onFailure,
}) => {
  return (
    <GoogleLogin
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
      onSuccess={onSuccess}
      onFailure={onFailure}
      buttonText="Login with Google"
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleAuthButton;
