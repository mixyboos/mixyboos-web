import { createFileRoute } from '@tanstack/react-router'
import { useMixByUserAndSlug } from '@/lib/queries/mix'
import { Skeleton } from '@/components/ui/skeleton'
import EditMixDetails from '@/components/mix/edit-mix-details'
import PageHeader from '@/components/widgets/page-header'

export const Route = createFileRoute('/(mix)/$user/$mix/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, mix } = Route.useParams()

  const { data, isLoading, error } = useMixByUserAndSlug(user, mix)

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center space-y-4">
        <PageHeader title="Edit mix" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-36 w-36 rounded-full" />
          <div className="w-full space-y-2">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center space-y-4">
        <PageHeader title="Edit mix" />
        <div>Error loading mix: {error.message}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center space-y-4">
      <PageHeader title="Edit mix" />
      <div className="flex flex-col items-center justify-center">
        <EditMixDetails mix={data} />
      </div>
    </div>
  )
}
