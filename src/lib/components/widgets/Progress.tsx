import React from "react";

type ProgressProps = {
  title: string;
  percentage: number;
};
export const Progress = ({ title, percentage }: ProgressProps) => {
  return (
    <div className="flex w-full flex-col p-4">
      <div className="mb-1 flex justify-between">
        <span className="text-base font-medium text-fuchsia-700 dark:text-white">
          {title}
        </span>
        <span className="text-sm font-medium text-fuchsia-700 dark:text-white">
          {percentage}%
        </span>
      </div>

      <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-slate-700">
        <div
          className="h-2.5 rounded-full bg-blue-600"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
