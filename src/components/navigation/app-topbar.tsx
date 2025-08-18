import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/theme/mode-toggle";
import Link from "next/link";

export function AppTopbar() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 z-50">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <h1 className="text-base font-medium">
          <Button variant="outline" size="sm" className="mr-2" asChild>
            <Link href="/live/create">
              <Icons.liveStream className="mr-1.5 h-4 w-4" />
              Go Live
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="mr-2" asChild>
            <Link href="/upload">
              <Icons.upload className="mr-1.5 h-4 w-4" />
              Upload Mix
            </Link>
          </Button>
        </h1>
        <div className="ml-auto flex items-center gap-0">
          <ModeToggle />
          <a href="https://github.com/mixyboos" className="p-2" target="_blank">
            <Icons.github className="h-4 w-4" />
          </a>
          <a
            href="https://reddit.com/r/mixyboos"
            className="p-2"
            target="_blank"
          >
            <Icons.reddit className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
