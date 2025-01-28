import { useState } from 'react';
import { Search, Info, ExternalLink, TrendingUp, Lock, AlertCircle } from 'lucide-react';
import { tokens, categories } from './data';

const TokensSection = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="tokens" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-300 mb-4">
            Supported Tokens
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lock any of these tokens with customizable time periods and protection levels
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tokens..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  activeTab === category.id
                    ? 'bg-amber-700 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.name}
                <span className="text-sm px-2 py-0.5 rounded-full bg-yellow-500">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tokens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {filteredTokens.map((token, index) => (
            <>
                {
                    token.category.includes(activeTab) && (
                        <div key={index} className="rounded-xl p-6 border hover:shadow-lg transition-all">
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 flex items-center justify-center bg-amber-100 rounded-lg text-2xl">
                                        {token.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{token.name}</h3>
                                        <span className="text-sm text-gray-500">{token.symbol}</span>
                                    </div>
                                    </div>
                                    <button className="text-amber-600 hover:text-amber-700">
                                    <ExternalLink className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Total Locked</span>
                                        <span className="font-medium">{token.totalLocked}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Lock Period</span>
                                        <span className="font-medium">{token.minLockPeriod} - {token.maxLockPeriod}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Network Fee</span>
                                        <span className="font-medium">{token.networkFee}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Risk Level</span>
                                        <span className="font-medium flex items-center gap-1">
                                            {token.riskLevel}
                                            <AlertCircle className="w-4 h-4 text-gray-400" />
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button 
                                    className="w-full py-2 px-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                                    disabled={!token.supported}
                                    >
                                        <Lock className="w-4 h-4" />
                                        Lock {token.symbol}
                                    </button>
                                </div>

                                {token.category.includes('popular') && (
                                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 py-1 px-3 rounded-full">
                                    <TrendingUp className="w-4 h-4" />
                                    Popular Token
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
            </>
            
          ))}
        </div>

        {/* Information Section */}
        <div className="mt-12 p-6 bg-amber-200 rounded-lg">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-amber-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Token Locking Information
              </h4>
              <div className="text-gray-600 space-y-2">
                <p>• All tokens are secured using audited smart contracts</p>
                <p>• Lock periods and amounts are fully customizable within specified ranges</p>
                <p>• Emergency unlocking requires a mandatory cooling period</p>
                <p>• Network fees vary based on blockchain congestion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokensSection;