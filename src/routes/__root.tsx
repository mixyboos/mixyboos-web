import { createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'

import type { QueryClient } from '@tanstack/react-query'
import { AuthProvider, useAuth } from '@/lib/auth'
import AuthenticatedLayout from '@/components/layouts/authenticated.tsx'
import AnonymousLayout from '@/components/layouts/anonymous.tsx'
import AudioProvider from '@/lib/audio-provider.tsx'

interface RouterContext {
  queryClient: QueryClient
  auth: ReturnType<typeof useAuth>
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    const { isAuthenticated, isLoading } = useAuth()
    if (isLoading) {
      return <div>Loading application...</div>
    }
    return (
      <AudioProvider>
        {isAuthenticated ? <AuthenticatedLayout /> : <AnonymousLayout />}
        <TanStackRouterDevtools />
        <TanStackQueryLayout />
      </AudioProvider>
    )
  },
})
