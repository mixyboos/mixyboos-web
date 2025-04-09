import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/debug/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="m-4">
      <Button variant="destructive" className="mr-2">
        <Link to="/">{"<--"} I do not consent to debug</Link>
      </Button>
    </div>
  );
}
