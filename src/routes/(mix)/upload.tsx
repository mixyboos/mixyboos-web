import { createFileRoute } from '@tanstack/react-router'
import MixCreateComponent from '@/components/mix/create-mix'

export const Route = createFileRoute('/(mix)/upload')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MixCreateComponent />
}
