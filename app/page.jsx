'use client'

import { useAccount } from 'wagmi'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function Home() {
  const { isConnected } = useAccount()

  const features = [
    {
      icon: '💧',
      title: 'Free Faucet',
      description: 'Claim free LKE tokens every 24 hours from our faucet',
      link: '/faucet',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '📈',
      title: 'Staking Rewards',
      description: 'Stake your tokens and earn up to 50% APY',
      link: '/staking',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: '🔒',
      title: 'Secure & Transparent',
      description: 'Smart contracts audited and verified on blockchain',
      link: '#',
      gradient: 'from-green-500 to-emerald-500',
    },
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to Laker Eco
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            A decentralized ecosystem for Lakers. Claim, Stake, and Earn!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isConnected ? (
              <>
                <Link href="/faucet">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
                    Get Free Tokens
                  </Button>
                </Link>
                <Link href="/staking">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
                  >
                    Start Staking
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <w3m-button />
                <p className="text-sm text-blue-100">
                  Connect your wallet to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Laker Eco?
            </h2>
            <p className="text-xl text-gray-600">
              Discover the benefits of our ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link href={feature.link} key={index}>
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                  <div className="text-center">
                    <div
                      className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-4xl group-hover:scale-110 transition-transform`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                1B
              </div>
              <p className="text-gray-600 font-semibold">Max Supply</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                50%
              </div>
              <p className="text-gray-600 font-semibold">Max APY</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-2">
                24/7
              </div>
              <p className="text-gray-600 font-semibold">Faucet Active</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of Lakers earning passive income through staking
          </p>
          {!isConnected && <w3m-button />}
        </div>
      </section>
    </Layout>
  )
}
