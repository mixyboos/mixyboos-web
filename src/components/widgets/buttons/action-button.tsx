"use client";
import React, { PropsWithChildren } from "react";
import clsx from "clsx";

const sizes = {
  xl: "w-12",
  lg: "w-10",
  md: "w-8",
  sm: "w-6",
};
const colors = {
  default: "text-gray-600 hover:text-gray-900",
  danger: "text-red-600 hover:text-red-900",
};
interface IActionButtonProps extends PropsWithChildren {
  count?: number;
  onClick?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "default" | "danger";
}

const ActionButton: React.FC<IActionButtonProps> = ({
  children,
  count,
  size = "sm",
  color = "default",
  onClick,
}) => {
  return (
    <button
      className={clsx(
        "py-0.2 inline-flex items-center rounded-md border border-gray-500 px-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-200 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800",
        colors[color]
      )}
      onClick={onClick}
    >
      {children}
      <div className="mx-1 text-sm">{count}</div>
    </button>
  );
};
export default ActionButton;
