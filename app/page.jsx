'use client'

import { useAccount } from 'wagmi'

export default function Home() {
  const { isConnected } = useAccount()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6">
      {/* Wallet connect button */}
      <w3m-button />

      {/* Show network switch button only when connected */}
      {isConnected && <w3m-network-button />}
    </main>
  )
}
