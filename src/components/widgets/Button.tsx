import React from 'react'

const ButtonStyle = {
  primary: 'bg-indigo-400 hover:bg-indigo-700 text-white font-bold rounded',
  secondary: 'bg-blue-500 hover:bg-blue-700 text-white font-bold rounded',
  basic: 'bg-white hover:bg-gray-700 text-gray-700 font-bold rounded',
  delete: 'bg-red-300 hover:bg-red-500 text-white font-bold rounded',
}

const ButtonSize = {
  sm: 'py-2 px-4 text-xs',
  md: 'py-2 px-4 text-md',
  lg: 'py-3 px-6 text-lg',
}

interface IButtonProps {
  size: 'sm' | 'md' | 'lg'
  style?: 'primary' | 'secondary' | 'basic' | 'delete'
  type?: 'submit' | 'reset' | 'button'
  children: any
  onClick?: () => void
}
const Button = ({ size, style, type, children, onClick }: IButtonProps) => {
  const classNames = `${ButtonStyle[style ?? 'basic']} ${
    ButtonSize[size]
  } inline-flex items-center py-2 px-4 rounded transition-all duration-150 ease-linear shadow outline-none`
  return (
    <button type={type ?? 'button'} className={classNames} onClick={onClick}>
      {children}
    </button>
  )
}

export { ButtonStyle as ButtonType, ButtonSize }
export default Button
