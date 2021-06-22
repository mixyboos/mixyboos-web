import React from 'react'
interface IActionButtonProps {
  count: number
}
const ActionButton: React.FC<IActionButtonProps> = (props) => {
  return (
    <div className="flex text-gray-600 transition duration-200 cursor-pointer hover:text-gray-900 ">
      <svg
        className="w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {props.children}
      </svg>
      <div className="-mt-0.5 text-sm">{props.count}</div>
    </div>
  )
}
export default ActionButton
