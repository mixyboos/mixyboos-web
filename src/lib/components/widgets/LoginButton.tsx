import React from "react";
import { MdLogin } from "react-icons/md";
import { LinkButton } from "@/components/widgets/link-button";

const LoginButton = () => {
  return (
    <LinkButton size="lg" href="/auth/login">
      <MdLogin className="-ml-1 mr-2 h-5 w-5" />
      Login/Register
    </LinkButton>
  );
};

export default LoginButton;
