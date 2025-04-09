import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h3>
        <Button variant="secondary" className="mr-2">
          <Link to="/debug">Do a Debuggles</Link>
        </Button>
      </h3>
    </div>
  );
}
