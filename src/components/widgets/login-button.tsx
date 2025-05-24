import { Icons } from "@/components/icons";
import React from "react";
import { LinkButton } from "@/components/widgets/link-button";

const LoginButton = () => {
  return (
    <LinkButton size="lg" href="/login">
      <Icons.login className="-ml-1 mr-2 h-5 w-5" />
      Login/Register
    </LinkButton>
  );
};

export default LoginButton;
