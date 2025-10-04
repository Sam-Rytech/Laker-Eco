'use client'
import { useAccount } from 'wagmi'

export default function Home() {
  const { isConnected } = useAccount()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6">
      <w3m-button />
      {isConnected && <w3m-network-button />}
    </main>
  )
}
