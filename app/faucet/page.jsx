'use client'

import Layout from '@/components/layout/Layout'
import FaucetClaim from '@/components/faucet/FaucetClaim'
import FaucetStats from '@/components/faucet/FaucetStats'

export default function FaucetPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
              <div className="text-5xl">💧</div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              LKE Faucet
            </h1>
            <p className="text-xl text-gray-600">
              Claim free Laker Eco tokens every 24 hours
            </p>
          </div>

          {/* Stats */}
          <div className="mb-8">
            <FaucetStats />
          </div>

          {/* Claim Section */}
          <FaucetClaim />

          {/* Info Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              How It Works
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">
                    Connect Your Wallet
                  </h4>
                  <p className="text-gray-600">
                    Use the connect button to link your Web3 wallet
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">
                    Claim Your Tokens
                  </h4>
                  <p className="text-gray-600">
                    Click the claim button to receive free LKE tokens
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-600 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">
                    Wait 24 Hours
                  </h4>
                  <p className="text-gray-600">
                    Come back after the cooldown period to claim again
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  How often can I claim?
                </h4>
                <p className="text-gray-600">
                  You can claim free tokens once every 24 hours.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  How many tokens do I get per claim?
                </h4>
                <p className="text-gray-600">
                  Each claim gives you 10 LKE tokens.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  Is there a daily limit?
                </h4>
                <p className="text-gray-600">
                  Yes, the faucet has a daily distribution limit of 1,000 LKE
                  tokens total across all users.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  What can I do with my tokens?
                </h4>
                <p className="text-gray-600">
                  You can stake your tokens to earn rewards or hold them for
                  future use in the ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
