import React, { ReactElement } from "react";

const ButtonStyle = {
  primary:
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 inline-flex items-center",
  secondary:
    "text-white bg-gradient-to-br from-slate-400 to-slate-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-center inline-flex items-center shadow-sm shadow-gray-200 hover:scale-[1.02] transition-transform",
  basic:
    "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-slate-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
  fancy:
    "text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3",
  delete:
    "text-white bg-gradient-to-br from-red-400 to-red-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-center inline-flex items-center shadow-sm shadow-gray-200 hover:scale-[1.02] transition-transform",
  icon: "text-pink-700 border border-pink-500 hover:bg-pink-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md text-center inline-flex items-center mr-2 dark:border-pink-500 dark:text-pink-500 dark:hover:text-white dark:focus:ring-pink-800",
};

const ButtonSize = {
  sm: "py-1 px-4 text-sm",
  md: "py-2 px-4 text-md",
  lg: "py-3 px-6 text-lg",
};

interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  title: string;
  buttonSize?: "sm" | "md" | "lg";
  buttonStyle?: "icon" | "primary" | "secondary" | "basic" | "fancy" | "delete";
  buttonType?: "submit" | "reset" | "button";
  showText?: boolean;
  icon?: ReactElement;
}

const Button = ({
  title,
  buttonSize = "md",
  buttonStyle = "primary",
  buttonType = "button",
  showText = true,
  icon,
  ...rest
}: IButtonProps) => {
  const classNames = `${ButtonStyle[buttonStyle ?? "basic"]} ${
    ButtonSize[buttonSize]
  } inline-flex items-center rounded transition-all duration-150 ease-linear shadow outline-none focus:ring-0 focus:border-1`;
  return (
    <button type={buttonType ?? "button"} className={classNames} {...rest}>
      <>
        {icon && <span className={showText ? "mr-1" : ""}>{icon}</span>}
        {showText && <span>{title}</span>}
      </>
    </button>
  );
};

export { ButtonStyle, ButtonSize };
export default Button;
