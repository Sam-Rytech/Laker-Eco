'use client'

import { useAccount } from 'wagmi'
import { useFaucet } from '../hooks/useFaucet'
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
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
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
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Connect Your Wallet
          </h3>
          <p className="text-gray-600 mb-6">
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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Claim Free Tokens
        </h2>
        <p className="text-gray-600 mb-8">
          Get {formatTokenAmount(claimAmount.toString())} {TOKEN_SYMBOL} every
          24 hours
        </p>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
          <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            {formatTokenAmount(claimAmount.toString())}
          </div>
          <div className="text-xl text-gray-700 font-semibold">
            {TOKEN_SYMBOL}
          </div>
        </div>

        {!canClaim && timeUntilNextClaim > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 font-semibold">
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

        <p className="text-sm text-gray-500 mt-4">
          * You can claim once every 24 hours
        </p>
      </div>
    </Card>
  )
}
