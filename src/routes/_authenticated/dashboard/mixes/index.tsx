import { createFileRoute } from '@tanstack/react-router'
import { useGetMyMixesQuery } from '@/lib/queries/mix'
import MixListPage from '@/pages/mix/mix-list-page'
import { Spinner } from '@/components/widgets/spinner'

export const Route = createFileRoute('/_authenticated/dashboard/mixes/')({
  component: RouteComponent,
})

function RouteComponent() {
  const mixQuery = useGetMyMixesQuery()
  const { data: mixes, isLoading, error } = mixQuery

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Spinner size="large">
            <p className="mt-4 text-muted-foreground">Loading mixes...</p>
          </Spinner>
        </div>
      </div>
    )
  }

  if (error) {
    return <div>Error loading mixes: {error.message}</div>
  }

  return <MixListPage mixes={mixes} />
}
