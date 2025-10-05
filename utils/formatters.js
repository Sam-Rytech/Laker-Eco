import { formatUnits, parseUnits } from 'viem'

/**
 * Format token amount from wei to readable format
 */
export const formatTokenAmount = (
  amount,
  decimals = 18,
  displayDecimals = 2
) => {
  if (!amount) return '0'
  const formatted = formatUnits(BigInt(amount), decimals)
  return parseFloat(formatted).toFixed(displayDecimals)
}

/**
 * Parse token amount from readable format to wei
 */
export const parseTokenAmount = (amount, decimals = 18) => {
  if (!amount) return '0'
  return parseUnits(amount.toString(), decimals).toString()
}

/**
 * Format wallet address (0x1234...5678)
 */
export const formatAddress = (address) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

/**
 * Format time duration (e.g., "2 days 5 hours")
 */
export const formatDuration = (seconds) => {
  if (!seconds || seconds <= 0) return 'Available now'

  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

/**
 * Format timestamp to readable date
 */
export const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(Number(timestamp) * 1000)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format APY percentage
 */
export const formatAPY = (apy) => {
  if (!apy) return '0%'
  return `${(Number(apy) / 100).toFixed(1)}%`
}

/**
 * Format large numbers with K, M, B suffixes
 */
export const formatLargeNumber = (num) => {
  if (!num) return '0'
  const n = Number(num)

  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(2)}K`
  return n.toFixed(2)
}
