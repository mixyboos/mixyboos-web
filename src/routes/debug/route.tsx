import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/debug")({
  component: RouteComponent,
});
function RouteComponent() {
  return (
    <div className="m-4">
      <h1>Debug</h1>
      <p>Debugging information goes here.</p>
      <Outlet />
    </div>
  );
}
