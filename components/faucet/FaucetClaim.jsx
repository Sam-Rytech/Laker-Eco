'use client'

import { useAccount } from 'wagmi'
import { useFaucet } from '@/hooks/useFaucet'
import { formatTokenAmount, formatDuration } from '../../utils/formatters'
import { TOKEN_SYMBOL } from '../../utils/constants'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { useEffect } from 'react'

export default function FaucetClaim() {
  const { isConnected } = useAccount()
  const {
    claimAmount,
    canClaim,
    timeUntilNextClaim,
    claimTokens,
    isLoading,
    isSuccess,
    error,
  } = useFaucet()

  useEffect(() => {
    if (isSuccess) {
      alert('Tokens claimed successfully! 🎉')
    }
  }, [isSuccess])

  useEffect(() => {
    if (error) {
      alert(`Error: ${error.message}`)
    }
  }, [error])

  if (!isConnected) {
    return (
      <Card className="text-center">
        <div className="py-12">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full">
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-800">
            Connect Your Wallet
          </h3>
          <p className="mb-6 text-gray-600">
            Please connect your wallet to claim free {TOKEN_SYMBOL} tokens
          </p>
          <w3m-button />
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold text-gray-800">
          Claim Free Tokens
        </h2>
        <p className="mb-8 text-gray-600">
          Get {formatTokenAmount(claimAmount.toString())} {TOKEN_SYMBOL} every
          24 hours
        </p>

        <div className="p-8 mb-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
          <div className="mb-2 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {formatTokenAmount(claimAmount.toString())}
          </div>
          <div className="text-xl font-semibold text-gray-700">
            {TOKEN_SYMBOL}
          </div>
        </div>

        {!canClaim && timeUntilNextClaim > 0 && (
          <div className="p-4 mb-6 border border-yellow-200 rounded-lg bg-yellow-50">
            <p className="font-semibold text-yellow-800">
              ⏰ Next claim available in: {formatDuration(timeUntilNextClaim)}
            </p>
          </div>
        )}

        <Button
          onClick={claimTokens}
          disabled={!canClaim}
          loading={isLoading}
          className="w-full py-4 text-lg"
        >
          {canClaim ? 'Claim Tokens' : 'Cooldown Active'}
        </Button>

        <p className="mt-4 text-sm text-gray-500">
          * You can claim once every 24 hours
        </p>
      </div>
    </Card>
  )
}
