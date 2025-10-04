'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cookieToInitialState } from 'wagmi'
import { wagmiAdapter, projectId } from '@/config'
import { createAppKit } from '@reown/appkit'
import { mainnet, base } from '@reown/appkit/networks'

const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Initialize AppKit modal once
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, base],
  defaultNetwork: mainnet,
  features: {
    analytics: true,
    email: true,
    socials: ['google', 'github', 'discord'],
    emailShowWallet: true,
  },
  themeMode: 'light',
})

export function Providers({ children, cookies }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies)

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
