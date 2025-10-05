import { useAccount, useReadContract, useChainId } from 'wagmi'
import { getContractAddress } from '../contracts/addresses'
import LakerEcoABI from '../contracts/abis/LakerEco.json'

export const useTokenBalance = () => {
  const { address } = useAccount()
  const chainId = useChainId()
  const tokenAddress = getContractAddress(chainId, 'TOKEN')

  const {
    data: balance,
    isLoading,
    refetch,
  } = useReadContract({
    address: tokenAddress,
    abi: LakerEcoABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address && !!tokenAddress,
  })

  return {
    balance: balance || 0n,
    isLoading,
    refetch,
  }
}
