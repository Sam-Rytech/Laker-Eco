'use client'

import { useState, useEffect } from 'react'
import { useStaking } from '@/hooks/useStaking'
import { useTokenBalance } from '@/hooks/useTokenBalance'
import {
  formatTokenAmount,
  parseTokenAmount,
  formatAPY,
} from '@/utils/formatters'
import { TOKEN_SYMBOL } from '@/utils/constants'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function StakeModal({ isOpen, onClose, selectedPlan }) {
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [step, setStep] = useState('approve') // 'approve' or 'stake'

  const { balance, refetch: refetchBalance } = useTokenBalance()
  const {
    allowance,
    approveTokens,
    stakeTokens,
    isLoading,
    isSuccess,
    resetWrite,
  } = useStaking()

  const balanceFormatted = formatTokenAmount(balance.toString())
  const needsApproval = allowance < parseTokenAmount(amount || '0')

  useEffect(() => {
    if (isSuccess) {
      alert('Transaction successful! 🎉')
      setAmount('')
      setStep('approve')
      refetchBalance()
      onClose()
      resetWrite()
    }
  }, [isSuccess, onClose, refetchBalance, resetWrite])

  useEffect(() => {
    if (allowance > 0 && !needsApproval) {
      setStep('stake')
    }
  }, [allowance, needsApproval])

  const handleMaxClick = () => {
    setAmount(balanceFormatted)
    setError('')
  }

  const handleApprove = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    if (parseFloat(amount) > parseFloat(balanceFormatted)) {
      setError('Insufficient balance')
      return
    }

    setError('')
    await approveTokens(amount)
  }

  const handleStake = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    if (parseFloat(amount) > parseFloat(balanceFormatted)) {
      setError('Insufficient balance')
      return
    }

    setError('')
    await stakeTokens(amount, selectedPlan.id)
  }

  if (!selectedPlan) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Stake ${TOKEN_SYMBOL}`}>
      <div className="space-y-6">
        {/* Plan Info */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Selected Plan</span>
            <span className="font-bold text-gray-800">{selectedPlan.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">APY</span>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {formatAPY(selectedPlan.apy)}
            </span>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Amount
            </label>
            <button
              onClick={handleMaxClick}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
            >
              MAX
            </button>
          </div>
          <Input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value)
              setError('')
            }}
            placeholder="0.0"
            error={error}
          />
          <p className="text-sm text-gray-500 mt-2">
            Balance: {balanceFormatted} {TOKEN_SYMBOL}
          </p>
        </div>

        {/* Estimated Rewards */}
        {amount && parseFloat(amount) > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">
              Estimated Annual Rewards
            </p>
            <p className="text-2xl font-bold text-green-600">
              {(parseFloat(amount) * (selectedPlan.apy / 10000)).toFixed(2)}{' '}
              {TOKEN_SYMBOL}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {needsApproval ? (
            <Button
              onClick={handleApprove}
              loading={isLoading && step === 'approve'}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full"
            >
              Approve {TOKEN_SYMBOL}
            </Button>
          ) : (
            <Button
              onClick={handleStake}
              loading={isLoading && step === 'stake'}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full"
            >
              Stake {amount || '0'} {TOKEN_SYMBOL}
            </Button>
          )}

          <Button
            onClick={onClose}
            variant="outline"
            className="w-full"
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>

        {/* Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Lock period: {selectedPlan.durationText}</p>
          <p>• Rewards can be claimed anytime</p>
          <p>• Principal can be withdrawn after lock period</p>
        </div>
      </div>
    </Modal>
  )
}
