import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/mix/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/mix/$id"!</div>
}
