export const CONTRACTS = {
  // Mainnet addresses
  1: {
    TOKEN: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
    FAUCET: process.env.NEXT_PUBLIC_FAUCET_ADDRESS,
    STAKING: process.env.NEXT_PUBLIC_STAKING_ADDRESS,
  },
  // Base addresses
  8453: {
    TOKEN: '0xfdca163d978b896426501094a97a7740de9191e4',
    FAUCET: '0x57edb20e9a8d42a018d11476f1984b7b543c31ab',
    STAKING: '0x60443aafda76c5be5789d6c91dd9d28cb95b8714',
  },
}

export const getContractAddress = (chainId, contractName) => {
  return CONTRACTS[chainId]?.[contractName] || null
}
