'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiAdapter, projectId } from '@/config'
import { createAppKit } from '@reown/appkit/react'
import { mainnet, base } from '@reown/appkit/networks'

const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

const metadata = {
  name: 'Laker Eco',
  description: 'An ecosystem for Lakers',
  url: 'https://laker-eco.vercel.app',
  icons: ['https://laker-eco.vercel.app/favicon.ico'],
}

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, base],
  defaultNetwork: mainnet,
  metadata,
  features: {
    analytics: true,
  },
  themeMode: 'light',
})

export function Providers({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
