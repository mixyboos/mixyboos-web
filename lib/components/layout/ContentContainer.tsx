import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface IContentContainerProps extends PropsWithChildren {
  className?: string;
}
export function ContentContainer({
  className = '',
  children,
  ...rest
}: IContentContainerProps) {
  return (
    <div
      className={clsx('lg:px-8', className)}
      {...rest}
    >
      <div className="lg:max-w-4xl">
        <div className="max-w-full px-4 py-4 mx-auto sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
          {children}
        </div>
      </div>
    </div>
  );
}
