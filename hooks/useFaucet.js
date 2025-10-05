import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from 'wagmi'
import { getContractAddress } from '../contracts/addresses'
import FaucetABI from '../contracts/abis/LakerEcoFaucet.json'
import { useState, useEffect } from 'react'

export const useFaucet = () => {
  const { address } = useAccount()
  const chainId = useChainId()
  const faucetAddress = getContractAddress(chainId, 'FAUCET')
  const [countdown, setCountdown] = useState(0)

  // Read faucet data
  const { data: claimAmount } = useReadContract({
    address: faucetAddress,
    abi: FaucetABI,
    functionName: 'claimAmount',
    enabled: !!faucetAddress,
  })

  const { data: cooldownPeriod } = useReadContract({
    address: faucetAddress,
    abi: FaucetABI,
    functionName: 'cooldownPeriod',
    enabled: !!faucetAddress,
  })

  const { data: lastClaimTime, refetch: refetchLastClaim } = useReadContract({
    address: faucetAddress,
    abi: FaucetABI,
    functionName: 'lastClaimTime',
    args: [address],
    enabled: !!address && !!faucetAddress,
  })

  const { data: totalClaimed } = useReadContract({
    address: faucetAddress,
    abi: FaucetABI,
    functionName: 'totalClaimed',
    args: [address],
    enabled: !!address && !!faucetAddress,
  })

  const { data: canClaim, refetch: refetchCanClaim } = useReadContract({
    address: faucetAddress,
    abi: FaucetABI,
    functionName: 'canClaim',
    args: [address],
    enabled: !!address && !!faucetAddress,
  })

  const { data: timeUntilNextClaim } = useReadContract({
    address: faucetAddress,
    abi: FaucetABI,
    functionName: 'getTimeUntilNextClaim',
    args: [address],
    enabled: !!address && !!faucetAddress,
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

  const claimTokens = async () => {
    if (!faucetAddress) return

    try {
      writeContract({
        address: faucetAddress,
        abi: FaucetABI,
        functionName: 'claimTokens',
      })
    } catch (error) {
      console.error('Claim error:', error)
    }
  }

  // Refetch after successful claim
  useEffect(() => {
    if (isConfirmed) {
      refetchLastClaim()
      refetchCanClaim()
    }
  }, [isConfirmed, refetchLastClaim, refetchCanClaim])

  return {
    claimAmount: claimAmount || 0n,
    cooldownPeriod: cooldownPeriod || 0n,
    lastClaimTime: lastClaimTime || 0n,
    totalClaimed: totalClaimed || 0n,
    canClaim: canClaim || false,
    timeUntilNextClaim: countdown,
    claimTokens,
    isLoading: isWritePending || isConfirming,
    isSuccess: isConfirmed,
    error: writeError,
    hash,
  }
}
