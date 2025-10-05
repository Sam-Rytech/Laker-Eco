'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAccount } from 'wagmi'
import { useTokenBalance } from '../../hooks/useTokenBalance'
import { formatTokenAmount } from '../../utils/formatters'
import { TOKEN_SYMBOL } from '../../utils/constants'

export default function Navbar() {
  const pathname = usePathname()
  const { isConnected } = useAccount()
  const { balance } = useTokenBalance()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/faucet', label: 'Faucet' },
    { href: '/staking', label: 'Staking' },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">LE</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Laker Eco</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  px-3 py-2 rounded-lg font-medium transition-colors
                  ${
                    pathname === link.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Wallet Section */}
          <div className="flex items-center gap-4">
            {isConnected && (
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <span className="text-sm font-semibold text-gray-700">
                  {formatTokenAmount(balance.toString(), 18, 2)} {TOKEN_SYMBOL}
                </span>
              </div>
            )}
            <w3m-button />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex gap-2 pb-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex-1 px-3 py-2 text-center rounded-lg font-medium transition-colors text-sm
                ${
                  pathname === link.href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
