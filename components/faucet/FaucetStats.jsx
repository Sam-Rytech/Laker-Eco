'use client'

import { useFaucet } from '@/hooks/useFaucet'
import { useAccount } from 'wagmi'
import { formatTokenAmount } from '@/utils/formatters'
import { TOKEN_SYMBOL } from '@/utils/constants'
import Card from '@/components/ui/Card'

export default function FaucetStats() {
  const { isConnected } = useAccount()
  const { totalClaimed, cooldownPeriod, claimAmount } = useFaucet()

  if (!isConnected) return null

  const stats = [
    {
      label: 'Your Total Claims',
      value: `${formatTokenAmount(totalClaimed.toString())} ${TOKEN_SYMBOL}`,
      icon: '💰',
    },
    {
      label: 'Claim Amount',
      value: `${formatTokenAmount(claimAmount.toString())} ${TOKEN_SYMBOL}`,
      icon: '🎁',
    },
    {
      label: 'Cooldown Period',
      value: `${Number(cooldownPeriod) / 3600} hours`,
      icon: '⏱️',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <div className="flex items-center gap-4">
            <div className="text-4xl">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
