import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LockKeyholeOpen, Timer, Target, Wallet, ArrowUpRight, Anchor, Search, Lock } from 'lucide-react';
import { VaultCardProps, VaultGridProps } from '@/types';
import { useNavigate } from 'react-router-dom';
  
const VaultCard: React.FC<VaultCardProps> = ({ subvault }) => {
    const [timeLeft, setTimeLeft] = useState<string>('');
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate(`/vault?address=${subvault.asset_address}&title=${subvault.title}&amount=${subvault.amount}`)
    }
    
    useEffect(() => {
      const calculateTimeLeft = (): string => {
        // Get current time in UTC
        const now = new Date();
        const utcNow = new Date(
          now.getTime() + (now.getTimezoneOffset() * 60000)
        );
    
        // Parse the end time directly (assuming subvault.end_time is in UTC)
        const endTime = new Date(subvault.end_time);
        const difference = endTime.getTime() - utcNow.getTime();
    
        if (difference <= 0) {
          return 'Expired';
        }
    
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    
        return `${days}d ${hours}h ${minutes}m`;
      };
    
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 60000);
    
      setTimeLeft(calculateTimeLeft()); // Initial calculation
    
      return () => clearInterval(timer);
    }, [subvault.end_time]);
  
    const formatDate = (dateString: string): string => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };
  
    return (
      <Card className="hover:cursor-pointer dark:bg-base-200 border-none shadow-md hover:shadow-sm hover:shadow-amber-400 transition-all duration-300 mx-4 md:mx-0">
        <CardHeader>
          <CardTitle className="text-center truncate py-1 text-amber-600">
            #{subvault.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 flex flex-col items-center justify-center">
            {/* Amount and Asset */}
            <div className="flex items-center space-x-2">
              <Wallet className="w-4 h-4" />
              <p className="text-center font-semibold">
                {subvault.amount.toString()} {subvault.asset_symbol}
              </p>
            </div>
  
            {/* Lock Type */}
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <p className="text-center font-semibold capitalize">
                {subvault.lock_type} Lock
              </p>
            </div>
  
            {/* Countdown Timer */}
            <div className="flex items-center space-x-2 text-emerald-500">
              <Timer className="w-4 h-4" />
              <p className="font-mono">{timeLeft}</p>
            </div>
  
            {/* Goal Amount (if applicable) */}
            {subvault.unlock_goal_usd ? (
              <div className="flex items-center space-x-2 text-blue-500">
                <Target className="w-4 h-4" />
                <p className="font-semibold">
                  ${subvault.unlock_goal_usd.toLocaleString()}
                </p>
              </div>
            ) : (
                <div className="flex items-center space-x-2 text-blue-500">
                <Anchor className="w-4 h-4" />
                <p className="font-semibold">
                  {subvault.amount.toString()}
                </p>
              </div>
            )}
  
            {/* Next Unlock Date (if applicable) */}
            {subvault.next_unlock && (
              <div className="flex items-center space-x-2 text-purple-500">
                <LockKeyholeOpen className="w-4 h-4" />
                <p className="font-semibold">{formatDate(subvault.next_unlock)}</p>
              </div>
            )}
          </div>
  
          <button className="btn btn-sm text-amber-600 btn-outline hover:bg-amber-600 hover:text-gray-800 hover:border-amber-600 mt-5 w-full flex items-center justify-center gap-2" onClick={handleNavigate}>
            View Lock
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </CardContent>
      </Card>
    );
};
  
 // Main component that renders the grid of vault cards
 const VaultGrid: React.FC<VaultGridProps> = ({ vaultData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedLockType, setSelectedLockType] = useState('');
  const [showNearExpiry, setShowNearExpiry] = useState(false);
  const [showExpired, setShowExpired] = useState(false);
  const [filteredVaults, setFilteredVaults] = useState(vaultData);

  // Get unique asset symbols and lock types for filter options
  const assetSymbols = [...new Set(vaultData.map(vault => vault.asset_symbol))];
  const lockTypes = [...new Set(vaultData.map(vault => vault.lock_type))];

  // Check if a vault is expiring within 7 days
  const isExpiringSoon = (endTime: string) => {
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    return end - now <= sevenDays && end - now > 0;
  };

  // Check if a vault has expired
  const isExpired = (endTime: string) => {
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    return end - now <= 0 && now > end;
  };

  //search by name or address
  const matchesSearchTerm = (vault: any, term: string) => {
    const searchLower = term.toLowerCase();
    return (
      vault.title.toLowerCase().includes(searchLower) ||
      vault.asset_symbol.toLowerCase().includes(searchLower)
    );
  };

  useEffect(() => {
    // Apply filters and search
    let filtered = vaultData.filter(vault => {
      const matchesSearch = searchTerm ? matchesSearchTerm(vault, searchTerm) : true;
      const matchesAsset = selectedAsset ? vault.asset_symbol === selectedAsset : true;
      const matchesLockType = selectedLockType ? vault.lock_type === selectedLockType : true;
      const matchesExpiry = showNearExpiry ? isExpiringSoon(vault.end_time) : true;
      const matchesExpired = showExpired ? isExpired(vault.end_time) : !isExpired(vault.end_time);

      return matchesSearch && matchesAsset && matchesLockType && matchesExpiry && matchesExpired;
    });

    setFilteredVaults(filtered);
  }, [searchTerm, selectedAsset, selectedLockType, showNearExpiry, showExpired, vaultData]);

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sticky top-20 dark:bg-black/90 p-2 rounded-md">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Title or Asset Symbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
          />
        </div>

        {/* Asset Symbol Filter */}
        <select
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
          className="h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
        >
          <option className='bg-base-300' value="">All Assets</option>
          {assetSymbols.map(symbol => (
            <option className='bg-base-300' key={symbol} value={symbol}>{symbol}</option>
          ))}
        </select>

        {/* Lock Type Filter */}
        <select
          value={selectedLockType}
          onChange={(e) => setSelectedLockType(e.target.value)}
          className="h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
        >
          <option className='bg-base-300' value="">All Lock Types</option>
          {lockTypes.map(type => (
            <option className='bg-base-300' key={type} value={type}>{type}</option>
          ))}
        </select>

        {/* Expiring Soon Toggle */}
        <button
          onClick={() => {
            setShowNearExpiry(!showNearExpiry);
            if (showExpired && !showNearExpiry) setShowExpired(false); // Disable expired when enabling near expiry
          }}
          className={`h-10 px-4 rounded-md border flex items-center justify-center gap-2 transition-colors
            ${showNearExpiry 
              ? 'border-amber-600 text-amber-600 bg-amber-600/10' 
              : 'border-gray-300 dark:border-gray-600'}`}
        >
          <Timer className="w-4 h-4" />
          Expiring Soon
        </button>

        {/* Expired Toggle */}
        <button
          onClick={() => {
            setShowExpired(!showExpired);
            if (showNearExpiry && !showExpired) setShowNearExpiry(false); // Disable near expiry when enabling expired
          }}
          className={`h-10 px-4 rounded-md border flex items-center justify-center gap-2 transition-colors
            ${showExpired 
              ? 'border-red-600 text-red-600 bg-red-600/10' 
              : 'border-gray-300 dark:border-gray-600'}`}
        >
          <Lock className="w-4 h-4" />
          Expired Locks
        </button>

        {/* Results Count */}
        <div className="text-sm text-gray-500">
          Showing {filteredVaults.length} of {vaultData.length} vaults
        </div>
      </div>

      {/* Vaults Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredVaults.length > 0 ? (
          filteredVaults.map((subvault, index) => (
            <VaultCard key={index} subvault={subvault} />
          ))
        ) : (
          <p className="text-center col-span-full">No vaults match your criteria</p>
        )}
      </div>
    </div>
  );
};
  
 export default VaultGrid;