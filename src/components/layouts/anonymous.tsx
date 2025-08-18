interface AnonymousLayoutProps {
  children: React.ReactNode
}

const AnonymousLayout = ({ children }: AnonymousLayoutProps) => {
  return (
    <div className="w-full h-full">
      {children}
    </div>
  )
}

export default AnonymousLayout
