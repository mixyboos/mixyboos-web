import React from 'react';

interface IProgressProps {
  title: string;
  percentage: number;
}
export const Progress = ({ title, percentage }: IProgressProps) => {
  return (
    <div className="flex flex-col w-1/2 p-4">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-fuchsia-700 dark:text-white">
          {title}
        </span>
        <span className="text-sm font-medium text-fuchsia-700 dark:text-white">
          {percentage}%
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
