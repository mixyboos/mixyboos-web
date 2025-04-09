import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import * as React from "react";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary.js";
import { NotFound } from "@/components/NotFound.js";
import appCss from "@/styles/app.css?url";
import { seo } from "@/utils/seo.js";
import { AppHeader } from "@/components/layout/app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
  // We need to auth on the server so we have access to secure cookies
  // const session = await useAppSession();

  // if (!session.data.userEmail) {
  //   return null;
  // }

  // return {
  //   email: session.data.userEmail,
  // };
  return {
    email: "fergal.moran@gmail.com",
  };
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title:
          "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  beforeLoad: async () => {
    const user = await fetchUser();

    return {
      user,
    };
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { user } = Route.useRouteContext();
  const [defaultOpen, setDefaultOpen] = React.useState(false);
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <SidebarProvider
          defaultOpen={defaultOpen}
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
            } as React.CSSProperties
          }
        >
          <div className="flex flex-col h-screen w-full">
            <div className="flex w-full flex-1 overflow-hidden">
              {/* <AppSidebar variant="inset" /> */}
              <SidebarInset className="flex flex-col flex-grow max-w-full m-0 p-0 rounded-none shadow-none">
                <AppHeader />
                <main className="w-full overflow-auto p-4">{children}</main>
              </SidebarInset>
            </div>
            <footer className="w-full">
              <div>I am footer</div>
            </footer>
            <TanStackRouterDevtools position="bottom-right" />
          </div>
        </SidebarProvider>

        {/* <SidebarProvider>
          <AppHeader />
          <hr />
          {children}
          <TanStackRouterDevtools position="bottom-right" />
        </SidebarProvider> */}
        <Scripts />
      </body>
    </html>
  );
}
