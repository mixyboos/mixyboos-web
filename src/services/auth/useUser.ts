import React from "react";
import { UserModel } from "../../data/models";
import { AuthContext } from "../auth";

//shortcut around AuthContext for when you just want to grab the user
export function useUser() {
  const { user } = React.useContext(AuthContext);
  const ref = React.useRef<UserModel>();

  // Store current value in ref
  React.useEffect(() => {
    ref.current = user;
  }, [user]);
  return ref.current;
}
