export const TOKEN_DECIMALS = 18
export const TOKEN_SYMBOL = 'LKE'
export const TOKEN_NAME = 'Laker Eco'

// Staking plan IDs
export const STAKING_PLANS = {
  FLEXIBLE: 0,
  THIRTY_DAYS: 1,
  NINETY_DAYS: 2,
  ONE_EIGHTY_DAYS: 3,
  THREE_SIXTY_FIVE_DAYS: 4,
}

// Staking plan details
export const PLAN_DETAILS = [
  {
    id: 0,
    name: 'Flexible',
    duration: 0,
    apy: 500, // 5%
    durationText: 'No Lock',
    description: 'Withdraw anytime with 5% APY',
  },
  {
    id: 1,
    name: '30 Days',
    duration: 30 * 24 * 60 * 60,
    apy: 1000, // 10%
    durationText: '30 Days',
    description: 'Lock for 30 days, earn 10% APY',
  },
  {
    id: 2,
    name: '90 Days',
    duration: 90 * 24 * 60 * 60,
    apy: 2000, // 20%
    durationText: '90 Days',
    description: 'Lock for 90 days, earn 20% APY',
  },
  {
    id: 3,
    name: '180 Days',
    duration: 180 * 24 * 60 * 60,
    apy: 3500, // 35%
    durationText: '180 Days',
    description: 'Lock for 180 days, earn 35% APY',
  },
  {
    id: 4,
    name: '365 Days',
    duration: 365 * 24 * 60 * 60,
    apy: 5000, // 50%
    durationText: '365 Days',
    description: 'Lock for 1 year, earn 50% APY',
  },
]

// Transaction status
export const TX_STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
}
