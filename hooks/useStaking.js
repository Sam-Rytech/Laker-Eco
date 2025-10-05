import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from 'wagmi'
import { getContractAddress } from '../contracts/addresses'
import StakingABI from '../contracts/abis/LakerEcoStaking.json'
import TokenABI from '../contracts/abis/LakerEco.json'
import { parseUnits } from 'viem'
import { useEffect } from 'react'

export const useStaking = () => {
  const { address } = useAccount()
  const chainId = useChainId()
  const stakingAddress = getContractAddress(chainId, 'STAKING')
  const tokenAddress = getContractAddress(chainId, 'TOKEN')

  // Read staking data
  const { data: totalStaked } = useReadContract({
    address: stakingAddress,
    abi: StakingABI,
    functionName: 'totalStaked',
    enabled: !!stakingAddress,
  })

  const { data: totalRewards } = useReadContract({
    address: stakingAddress,
    abi: StakingABI,
    functionName: 'totalRewardsDistributed',
    enabled: !!stakingAddress,
  })

  const { data: userStakes, refetch: refetchUserStakes } = useReadContract({
    address: stakingAddress,
    abi: StakingABI,
    functionName: 'getUserStakes',
    args: [address],
    enabled: !!address && !!stakingAddress,
  })

  const { data: userTotalStaked } = useReadContract({
    address: stakingAddress,
    abi: StakingABI,
    functionName: 'getUserTotalStaked',
    args: [address],
    enabled: !!address && !!stakingAddress,
  })

  const { data: userPendingRewards } = useReadContract({
    address: stakingAddress,
    abi: StakingABI,
    functionName: 'getTotalPendingRewards',
    args: [address],
    enabled: !!address && !!stakingAddress,
  })

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: tokenAddress,
    abi: TokenABI,
    functionName: 'allowance',
    args: [address, stakingAddress],
    enabled: !!address && !!tokenAddress && !!stakingAddress,
  })

  // Write functions
  const {
    writeContract,
    data: hash,
    isPending: isWritePending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  // Approve tokens
  const approveTokens = async (amount) => {
    if (!tokenAddress || !stakingAddress) return

    try {
      writeContract({
        address: tokenAddress,
        abi: TokenABI,
        functionName: 'approve',
        args: [stakingAddress, parseUnits(amount, 18)],
      })
    } catch (error) {
      console.error('Approve error:', error)
    }
  }

  // Stake tokens
  const stakeTokens = async (amount, planId) => {
    if (!stakingAddress) return

    try {
      writeContract({
        address: stakingAddress,
        abi: StakingABI,
        functionName: 'stake',
        args: [parseUnits(amount, 18), planId],
      })
    } catch (error) {
      console.error('Stake error:', error)
    }
  }

  // Claim rewards
  const claimRewards = async (stakeIndex) => {
    if (!stakingAddress) return

    try {
      writeContract({
        address: stakingAddress,
        abi: StakingABI,
        functionName: 'claimRewards',
        args: [stakeIndex],
      })
    } catch (error) {
      console.error('Claim error:', error)
    }
  }

  // Withdraw stake
  const withdrawStake = async (stakeIndex) => {
    if (!stakingAddress) return

    try {
      writeContract({
        address: stakingAddress,
        abi: StakingABI,
        functionName: 'withdraw',
        args: [stakeIndex],
      })
    } catch (error) {
      console.error('Withdraw error:', error)
    }
  }

  // Refetch data after successful transaction
  useEffect(() => {
    if (isConfirmed) {
      refetchUserStakes()
      refetchAllowance()
    }
  }, [isConfirmed, refetchUserStakes, refetchAllowance])

  return {
    totalStaked: totalStaked || 0n,
    totalRewards: totalRewards || 0n,
    userStakes: userStakes || [],
    userTotalStaked: userTotalStaked || 0n,
    userPendingRewards: userPendingRewards || 0n,
    allowance: allowance || 0n,
    approveTokens,
    stakeTokens,
    claimRewards,
    withdrawStake,
    isLoading: isWritePending || isConfirming,
    isSuccess: isConfirmed,
    error: writeError,
    hash,
    resetWrite,
  }
}
