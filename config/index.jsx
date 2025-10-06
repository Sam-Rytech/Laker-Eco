'use client'

import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, base } from '@reown/appkit/networks'

export const projectId = f579285fe2d1f128b9a30434426c3a6b

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [mainnet, base]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
})

export const config = wagmiAdapter.wagmiConfig
