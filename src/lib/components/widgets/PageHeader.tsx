import React from "react";

type PageHeaderProps = {
  title: string;
  buttons?: React.ReactNode[];
};
const PageHeader = ({ title, buttons = [] }: PageHeaderProps) => {
  return (
    <div className="flex flex-row border-b-2 pb-2 text-gray-800 dark:text-white ">
      <h2 className="flex-grow text-2xl font-bold">{title}</h2>
      <div id="button-bar">{buttons}</div>
    </div>
  );
};

export default PageHeader;
