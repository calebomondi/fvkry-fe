import { useState } from 'react';
import { Search, Info, ExternalLink, TrendingUp, AlertCircle } from 'lucide-react';
import { tokens } from './data';

const TokensSection = () => {
  const [searchQuery, setSearchQuery] = useState('ETH');

  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const firstToken = filteredTokens.length > 0 ? filteredTokens[0] : null;

  return (
    <section id="tokens" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-navy mb-4">
            Tokens Scanner
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Get Information On The Tokens Locked and How Popular They Are Among Users In The FVKRY Ecosystem 
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search token by name or symbol"
              className="w-full pl-10 pr-4 py-2 border border-amber-500 rounded-lg focus:ring-amber-500 outline-amber-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tokens Grid */}
        <div className="grid grid-cols-1 place-items-center">
            {firstToken ? (
            <div className="rounded-xl p-6 border border-amber-700 hover:shadow-lg transition-all md:w-1/2">
                <div>
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center rounded-lg text-2xl">
                            {firstToken.icon}
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">{firstToken.name}</h3>
                            <span className="text-sm text-gray-500">{`${firstToken.symbol} (${firstToken.category[1]})`}</span>
                        </div>
                        </div>
                        <button className="text-amber-500 hover:text-amber-700">
                        <ExternalLink className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Total Locked</span>
                            <span className="font-medium">{firstToken.totalLocked}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Lock Period</span>
                            <span className="font-medium">{firstToken.minLockPeriod} - {firstToken.maxLockPeriod}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Network Fee</span>
                            <span className="font-medium">{firstToken.networkFee}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Risk Level</span>
                            <span className="font-medium flex items-center gap-1">
                                {firstToken.riskLevel}
                                <AlertCircle className="w-4 h-4 text-gray-400" />
                            </span>
                        </div>
                    </div>

                    {firstToken.category.includes('popular') && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 py-1 px-3 rounded-full">
                        <TrendingUp className="w-4 h-4" />
                        Popular Token
                        </div>
                    )}

                    <div className='py-2 grid place-items-center'>
                      <button className='btn btn-sm text-white bg-amber-500 hover:bg-amber-600 hover:scale-105 w-1/5 p-2'>Lock</button>
                    </div>
                </div>
            </div>
            ) : (
              <div className='rounded-xl p-6 border border-amber-700 w-full md:w-1/2 text-center'>Token <span className="font-semibold text-lg">{searchQuery}</span> Not Found</div>
            )
          }
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
                <p>• Once Locked, crypto assets cannot be accessed until the locked period expires.</p>
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