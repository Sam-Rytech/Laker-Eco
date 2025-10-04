"use client";
import { useAccount } from "wagmi";
export default function Home() {
  const { isConnected } = useAccount();
  
  return (
    <>
      <div>
        <w3m-button />
      </div>
      {isConnected && (
        <div>
          <w3m-network-button />
        </div>
      )}
    </>
  )
}