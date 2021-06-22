import React from 'react';

interface IProgressProps {
    mixId: string;
    percentage: number;
}
const Progress = ({ percentage }: IProgressProps) => {
    return (
        <React.Fragment>
            {percentage > 0 && percentage < 100 && (
                <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-2">
                        {/* <div>
                            <span className="inline-block px-2 py-1 text-xs font-semibold uppercase bg-pink-200 rounded-full text-mixyboos">
                                Uploading
                            </span>
                        </div> */}
                        <div className="text-right">
                            <span className="inline-block text-xs font-semibold text-mixyboos">
                                {percentage}%
                            </span>
                        </div>
                    </div>
                    <div className="flex h-2 mb-4 overflow-hidden text-xs bg-pink-200 rounded">
                        <div
                            style={{ width: `${percentage}%` }}
                            className="flex flex-col justify-center text-center text-white shadow-none bg-mixyboos whitespace-nowrap"
                        >
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default Progress;
