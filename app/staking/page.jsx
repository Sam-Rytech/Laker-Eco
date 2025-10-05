'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import StakingStats from '@/components/staking/StakingStats'
import StakingPlans from '@/components/staking/StakingPlans'
import UserStakes from '@/components/staking/UserStakes'
import StakeModal from '@/components/staking/StakeModal'

export default function StakingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPlan(null)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
              <div className="text-5xl">📈</div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              LKE Staking
            </h1>
            <p className="text-xl text-gray-600">
              Stake your tokens and earn passive rewards
            </p>
          </div>

          {/* Stats */}
          <StakingStats />

          {/* Staking Plans */}
          <div className="mb-16">
            <StakingPlans onSelectPlan={handleSelectPlan} />
          </div>

          {/* User Stakes */}
          <UserStakes />

          {/* Info Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Staking Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-gray-800 mb-4">
                  How Staking Works
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Choose a staking plan based on your preference</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Approve and stake your LKE tokens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Earn rewards automatically based on APY</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Claim rewards anytime without unstaking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Withdraw after lock period ends</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-4">Key Features</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>APY ranges from 5% to 50%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Minimum stake: 1 LKE token</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>No maximum stake limit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Rewards calculated in real-time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Multiple stakes allowed per wallet</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stake Modal */}
      <StakeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedPlan={selectedPlan}
      />
    </Layout>
  )
}
