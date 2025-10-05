'use client'

import { useAccount } from 'wagmi'
import { useStaking } from '@/hooks/useStaking'
import { formatTokenAmount, formatLargeNumber } from '@/utils/formatters'
import { TOKEN_SYMBOL } from '@/utils/constants'
import Card from '@/components/ui/Card'

export default function StakingStats() {
  const { isConnected } = useAccount()
  const { totalStaked, userTotalStaked, userPendingRewards, totalRewards } =
    useStaking()

  const stats = [
    {
      label: 'Total Value Locked',
      value: `${formatLargeNumber(
        formatTokenAmount(totalStaked.toString())
      )} ${TOKEN_SYMBOL}`,
      icon: '🔒',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Your Staked',
      value: isConnected
        ? `${formatTokenAmount(userTotalStaked.toString())} ${TOKEN_SYMBOL}`
        : '0 LKE',
      icon: '💎',
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Pending Rewards',
      value: isConnected
        ? `${formatTokenAmount(userPendingRewards.toString())} ${TOKEN_SYMBOL}`
        : '0 LKE',
      icon: '🎁',
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Total Rewards Distributed',
      value: `${formatLargeNumber(
        formatTokenAmount(totalRewards.toString())
      )} ${TOKEN_SYMBOL}`,
      icon: '💰',
      color: 'from-yellow-500 to-orange-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <Card key={index}>
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-lg font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
