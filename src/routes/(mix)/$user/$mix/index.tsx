import { createFileRoute } from '@tanstack/react-router'
import { useMixByUserAndSlug } from '@/lib/queries/mix'
import { Skeleton } from '@/components/ui/skeleton'
import MixDetailsComponent from '@/pages/mix/mix-details'

export const Route = createFileRoute('/(mix)/$user/$mix/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, mix } = Route.useParams()

  const { data, isLoading, error } = useMixByUserAndSlug(user, mix)

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-36 w-36 rounded-full" />
        <div className="w-full space-y-2">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      </div>
    )
  }

  if (error) {
    return <div>Error loading mix: {error.message}</div>
  }

  if (!data) {
    return <div>Mix not found</div>
  }
  return <MixDetailsComponent mix={data} />
}
