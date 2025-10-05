'use client'

import { useAccount } from 'wagmi'
import { useStaking } from '@/hooks/useStaking'
import { formatTokenAmount, formatDate, formatAPY } from '@/utils/formatters'
import { TOKEN_SYMBOL, PLAN_DETAILS } from '@/utils/constants'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useEffect } from 'react'

export default function UserStakes() {
  const { isConnected } = useAccount()
  const { userStakes, claimRewards, withdrawStake, isLoading, isSuccess } =
    useStaking()

  useEffect(() => {
    if (isSuccess) {
      alert('Transaction successful! 🎉')
    }
  }, [isSuccess])

  if (!isConnected) return null

  if (!userStakes || userStakes.length === 0) {
    return (
      <Card className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          No Active Stakes
        </h3>
        <p className="text-gray-600">Start staking to earn rewards!</p>
      </Card>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Stakes</h2>
      <div className="space-y-6">
        {userStakes.map((stake, index) => {
          if (stake.withdrawn) return null

          const plan = PLAN_DETAILS[Number(stake.planId)]
          const now = Math.floor(Date.now() / 1000)
          const unlockTime = Number(stake.startTime) + plan.duration
          const isUnlocked = now >= unlockTime || plan.duration === 0

          return (
            <Card key={index}>
              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* Stake Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        APY: {formatAPY(plan.apy)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Staked Amount</p>
                      <p className="text-lg font-bold text-gray-800">
                        {formatTokenAmount(stake.amount.toString())}{' '}
                        {TOKEN_SYMBOL}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Staked On</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {formatDate(stake.startTime.toString())}
                      </p>
                    </div>
                  </div>

                  {!isUnlocked && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">
                        🔒 Unlocks on: {formatDate(unlockTime.toString())}
                      </p>
                    </div>
                  )}

                  {isUnlocked && plan.duration > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800">
                        ✅ Unlocked! You can withdraw anytime
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 md:w-48">
                  <Button
                    onClick={() => claimRewards(index)}
                    loading={isLoading}
                    variant="success"
                    className="w-full"
                  >
                    Claim Rewards
                  </Button>
                  <Button
                    onClick={() => withdrawStake(index)}
                    loading={isLoading}
                    disabled={!isUnlocked}
                    variant="outline"
                    className="w-full"
                  >
                    {isUnlocked ? 'Withdraw' : 'Locked'}
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
