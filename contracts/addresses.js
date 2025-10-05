export const CONTRACTS = {
  // Mainnet addresses
  1: {
    TOKEN: process.env.NEXT_PUBLIC_TOKEN_ADDRESS || '0x...',
    FAUCET: process.env.NEXT_PUBLIC_FAUCET_ADDRESS || '0x...',
    STAKING: process.env.NEXT_PUBLIC_STAKING_ADDRESS || '0x...',
  },
  // Base addresses
  8453: {
    TOKEN: process.env.NEXT_PUBLIC_TOKEN_ADDRESS_BASE || '0x...',
    FAUCET: process.env.NEXT_PUBLIC_FAUCET_ADDRESS_BASE || '0x...',
    STAKING: process.env.NEXT_PUBLIC_STAKING_ADDRESS_BASE || '0x...',
  },
}

export const getContractAddress = (chainId, contractName) => {
  return CONTRACTS[chainId]?.[contractName] || null
}
