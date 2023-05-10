import Image from "next/image";
import React, { ComponentProps, PropsWithChildren } from "react";
import classNames from "classnames";
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
  const imgClassName = classNames(sizes[size]);
  return (
    <div
      className={classNames(
        "flex items-center justify-center space-x-4 rounded-full"
      )}
    >
      <div className="relative">
        <Image
          width={40}
          height={40}
          src={src}
          alt="Profile Image"
          className={classNames("rounded-full", imgClassName)}
        />
      </div>
    </div>
  );
};

export default UserImage;
