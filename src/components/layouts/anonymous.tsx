import { Outlet } from '@tanstack/react-router'

const AnonymousLayout = () => {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  )
}

export default AnonymousLayout
