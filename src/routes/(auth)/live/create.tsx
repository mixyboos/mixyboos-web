import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/live/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/live/create"!</div>
}
