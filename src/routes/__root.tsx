import { createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { BotIdClient } from 'botid/client'
import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'
import type { QueryClient } from '@tanstack/react-query'
import { useAuth } from '@/lib/auth'
import AuthenticatedLayout from '@/components/layouts/authenticated.tsx'
import AnonymousLayout from '@/components/layouts/anonymous.tsx'
import AudioProvider from '@/lib/audio-provider.tsx'
import FooterComponent from '@/components/footer.tsx'

interface RouterContext {
  queryClient: QueryClient
  auth: ReturnType<typeof useAuth>
}
const protectedRoutes = [
  {
    path: '/api/sensitive',
    method: 'POST',
  },
  {
    path: '/checkout',
    method: 'POST',
  },
  {
    path: '/signup',
    method: 'POST',
  },
];

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    const { isAuthenticated, isLoading } = useAuth()
    if (isLoading) {
      return <div>Loading application...</div>
    }
    return (
      <>
        <BotIdClient protect={protectedRoutes} />
        <AudioProvider>
          <div className="flex flex-col h-screen w-full">
            <div className="flex w-full flex-1 overflow-hidden">
              {isAuthenticated ? <AuthenticatedLayout /> : <AnonymousLayout />}
            </div>
            <footer className="w-full">
              <FooterComponent />
            </footer>
          </div>
          <TanStackRouterDevtools />
          <TanStackQueryLayout />
        </AudioProvider>
      </>
    )
  },
})
