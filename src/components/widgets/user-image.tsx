import React, { ComponentProps, PropsWithChildren } from "react";
import classNames from "classnames";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export interface AvatarSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  [key: string]: string;
}
interface IUserImageProps {
  src: string;
  status?: "online" | "offline" | "donotdisturb" | "gone";
  size?: keyof AvatarSizes;
}
const sizes: AvatarSizes = {
  xs: "w-4 h-4",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-14",
  xl: "w-14 h-14",
};
const UserImage: React.FC<IUserImageProps> = ({
  src,
  status = "gone",
  size = "md",
}) => {
  return (
    <Avatar className={classNames("rounded-full", classNames(sizes[size]))}>
      <AvatarImage
        src={src || "/img/default-avatar.png"}
        alt="avatar"
        className={classNames("rounded-full", classNames(sizes[size]))}
      ></AvatarImage>
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  );
};

export default UserImage;
