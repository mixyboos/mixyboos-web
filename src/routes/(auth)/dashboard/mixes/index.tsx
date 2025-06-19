import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/dashboard/mixes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/dashboard/mixes/"!</div>
}
