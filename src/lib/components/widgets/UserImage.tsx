import Image from "next/image";
import React, { ComponentProps, PropsWithChildren } from "react";
import classNames from "classnames";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Avatar>
            <AvatarImage
              src={src}
              alt="avatar"
              className={classNames("rounded-full", classNames(sizes[size]))}
            ></AvatarImage>
            <AvatarFallback>XX</AvatarFallback>
          </Avatar>
        </TooltipTrigger>

        <TooltipContent side="top">
          Tooltip content
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserImage;
