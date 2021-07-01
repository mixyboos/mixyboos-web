import React from 'react'
interface IActionButtonProps {
  title: string
}
const TagLabel: React.FC<IActionButtonProps> = ({
  title,
}: IActionButtonProps) => {
  return (
    <span className="inline-block px-2 py-1 mr-1 text-xs font-semibold text-pink-600 uppercase bg-pink-200 rounded-full last:mr-0">
      {title}
    </span>
  )
}
export default TagLabel
