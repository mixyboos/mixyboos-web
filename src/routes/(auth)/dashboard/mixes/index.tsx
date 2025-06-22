import { createFileRoute } from '@tanstack/react-router'
import { useGetMyMixesQuery } from '@/lib/queries/mix'
import MixListPage from '@/pages/mix/mix-list-page'

export const Route = createFileRoute('/(auth)/dashboard/mixes/')({
  component: RouteComponent,
})

function RouteComponent() {
  const mixQuery = useGetMyMixesQuery()
  const mixes = mixQuery.data
  return <MixListPage mixes={mixes} />
}
