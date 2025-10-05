'use client'

import { PLAN_DETAILS } from '@/utils/constants'
import { formatAPY } from '@/utils/formatters'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function StakingPlans({ onSelectPlan }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Staking Plans
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLAN_DETAILS.map((plan) => (
          <Card key={plan.id} className="hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                  {formatAPY(plan.apy)}
                </div>
                <div className="text-sm text-gray-600 font-semibold">APY</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Lock Period:</span>
                  <span className="font-semibold text-gray-800">
                    {plan.durationText}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Min Stake:</span>
                  <span className="font-semibold text-gray-800">1 LKE</span>
                </div>
              </div>

              <Button onClick={() => onSelectPlan(plan)} className="w-full">
                Stake Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
