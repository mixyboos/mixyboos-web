import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

export function AppHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <h1 className="text-base font-medium">
          <Button variant="outline" size="sm" className="mr-2" asChild>
            <Link to="/live/create">
              <Icons.liveStream className="mr-1.5 h-4 w-4" />
              Go Live
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="mr-2" asChild>
            <Link to="/upload">
              <Icons.upload className="mr-1.5 h-4 w-4" />
              Upload Mix
            </Link>
          </Button>
        </h1>
        <div className="ml-auto flex items-center gap-0">
          <a href="https://github.com/mixyboos" className="p-2">
            <Icons.github className="h-4 w-4" />
          </a>
          <a href="https://reddit.com/r/mixyboos" className="p-2">
            <Icons.reddit className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
