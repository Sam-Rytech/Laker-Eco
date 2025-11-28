import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from 'wagmi'
import { getContractAddress } from '../contracts/addresses'
import FaucetABI from '../contracts/abis/LakerEcoFaucet.json'
import { useState, useEffect, useMemo, useCallback } from 'react'

interface UseFaucetReturn {
  claimAmount: bigint
  cooldownPeriod: bigint
  lastClaimTime: bigint
  totalClaimed: bigint
  canClaim: boolean
  timeUntilNextClaim: number
  formattedCountdown: string
  claimTokens: () => Promise<void>
  isLoading: boolean
  isLoadingData: boolean
  isSuccess: boolean
  error: Error | null
  hash: `0x${string}` | undefined
}

export const useFaucet = (): UseFaucetReturn => {
  const { address } = useAccount()
  const chainId = useChainId()
  const faucetAddress = getContractAddress(chainId, 'FAUCET')
  const [countdown, setCountdown] = useState(0)

  // Memoized contract config
  const contractConfig = useMemo(
    () => ({
      address: faucetAddress,
      abi: FaucetABI,
    }),
    [faucetAddress]
  )

  // Read faucet data
  const { data: claimAmount, error: claimAmountError } = useReadContract({
    ...contractConfig,
    functionName: 'claimAmount',
    enabled: !!faucetAddress,
  })

  const { data: cooldownPeriod } = useReadContract({
    ...contractConfig,
    functionName: 'cooldownPeriod',
    enabled: !!faucetAddress,
  })

  const { data: lastClaimTime, refetch: refetchLastClaim } = useReadContract({
    ...contractConfig,
    functionName: 'lastClaimTime',
    args: [address],
    enabled: !!address && !!faucetAddress,
  })

  const { data: totalClaimed } = useReadContract({
    ...contractConfig,
    functionName: 'totalClaimed',
    args: [address],
    enabled: !!address && !!faucetAddress,
  })

  const { data: canClaim, refetch: refetchCanClaim } = useReadContract({
    ...contractConfig,
    functionName: 'canClaim',
    args: [address],
    enabled: !!address && !!faucetAddress,
    query: {
      refetchInterval: canClaim === false ? 30000 : false, // Auto-refetch every 30s when waiting
    },
  })

  const { data: timeUntilNextClaim } = useReadContract({
    ...contractConfig,
    functionName: 'getTimeUntilNextClaim',
    args: [address],
    enabled: !!address && !!faucetAddress,
    query: {
      refetchInterval: 10000, // Refetch every 10s to keep countdown accurate
    },
  })

  // Write function
  const {
    writeContract,
    data: hash,
    isPending: isWritePending,
    error: writeError,
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  // Format countdown helper
  const formatCountdown = useCallback((seconds: number): string => {
    if (seconds <= 0) return '0s'
    
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    if (timeUntilNextClaim) {
      setCountdown(Number(timeUntilNextClaim))
    }
  }, [timeUntilNextClaim])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [countdown])

  // Memoized claim function
  const claimTokens = useCallback(async () => {
    if (!faucetAddress) {
      console.error('Faucet address not available')
      return
    }

    if (!canClaim) {
      console.warn('Cannot claim yet, cooldown period not expired')
      return
    }

    try {
      writeContract({
        address: faucetAddress,
        abi: FaucetABI,
        functionName: 'claimTokens',
      })
    } catch (error) {
      console.error('Claim error:', error)
    }
  }, [faucetAddress, canClaim, writeContract])

  // Refetch after successful claim
  useEffect(() => {
    if (isConfirmed) {
      refetchLastClaim()
      refetchCanClaim()
    }
  }, [isConfirmed, refetchLastClaim, refetchCanClaim])

  // Loading state for initial data
  const isLoadingData = !claimAmount && !cooldownPeriod && !claimAmountError

  return {
    claimAmount: claimAmount || 0n,
    cooldownPeriod: cooldownPeriod || 0n,
    lastClaimTime: lastClaimTime || 0n,
    totalClaimed: totalClaimed || 0n,
    canClaim: canClaim || false,
    timeUntilNextClaim: countdown,
    formattedCountdown: formatCountdown(countdown),
    claimTokens,
    isLoading: isWritePending || isConfirming,
    isLoadingData,
    isSuccess: isConfirmed,
    error: writeError,
    hash,
  }
}
