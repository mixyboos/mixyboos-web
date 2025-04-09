import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/live/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/live/create"!</div>;
}
