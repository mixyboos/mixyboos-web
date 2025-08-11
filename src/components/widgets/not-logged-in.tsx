import { Button } from '@/components/ui/button'

export default function NotLoggedIn() {
  return (
    <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
      <div className="text-center">
        <figure className="m-auto w-40 lg:w-60">
          <img
            width={300}
            height={200}
            src={`/403.svg`}
            className="w-full"
            alt="..."
          />
        </figure>
        <div className="mt-6 space-y-4 lg:mt-8">
          <h1 className="text-3xl font-bold tracking-tight lg:text-5xl">
            No Authorization
          </h1>
          <p className="text-muted-foreground">
            You do not appear to have permission to access this page
          </p>
        </div>
        <div className="mt-6 lg:mt-8">
          <Button size="lg">Go to home</Button>
        </div>
      </div>
    </div>
  )
}
