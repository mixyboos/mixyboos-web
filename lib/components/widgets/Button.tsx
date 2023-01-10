import React, { ReactElement } from 'react';

const ButtonStyle = {
  primary:
    'text-white bg-gradient-to-br from-pink-500 to-voilet-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-center inline-flex items-center shadow-sm shadow-gray-200 hover:scale-[1.02] transition-transform',
  secondary:
    'text-white bg-gradient-to-br from-slate-400 to-slate-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-center inline-flex items-center shadow-sm shadow-gray-200 hover:scale-[1.02] transition-transform',
  basic:
    'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700',
  fancy:
    'sm:inline-flex ml-5 text-white bg-gradient-to-br from-pink-500 to-voilet-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3 shadow-sm shadow-gray-200 hover:scale-[1.02] transition-transform',
  delete:
    'text-white bg-gradient-to-br from-red-400 to-red-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-center inline-flex items-center shadow-sm shadow-gray-200 hover:scale-[1.02] transition-transform',
};

const ButtonSize = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-4 text-md',
  lg: 'py-3 px-6 text-lg',
};

interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  title: string;
  buttonSize?: 'sm' | 'md' | 'lg';
  buttonStyle?: 'primary' | 'secondary' | 'basic' | 'fancy' | 'delete';
  buttonType?: 'submit' | 'reset' | 'button';
  icon?: ReactElement;
}

const Button = ({
  title,
  buttonSize = 'md',
  buttonStyle = 'primary',
  buttonType = 'button',
  icon,
  ...rest
}: IButtonProps) => {
  const classNames = `${ButtonStyle[buttonStyle ?? 'basic']} ${
    ButtonSize[buttonSize]
  } inline-flex items-center py-2 px-4 rounded transition-all duration-150 ease-linear shadow outline-none`;
  return (
    <button
      type={buttonType ?? 'button'}
      className={classNames}
      {...rest}
    >
      <>
        {icon && <span className="mr-1">{icon}</span>}
        <span>{title}</span>
      </>
    </button>
  );
};

export { ButtonStyle as ButtonType, ButtonSize };
export default Button;
