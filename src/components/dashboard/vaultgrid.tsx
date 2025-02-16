import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LockKeyholeOpen, Timer, Target, Calendar, Wallet, ArrowUpRight, Anchor } from 'lucide-react';
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
        const endTime = new Date(subvault.end_time);
        const now = new Date();
        const difference = endTime.getTime() - now.getTime();
  
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
      }, 60000); // Update every minute
  
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
      <Card className="hover:cursor-pointer dark:bg-base-200 border-none shadow-md hover:shadow-sm hover:shadow-amber-400 transition-all duration-300">
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
              <LockKeyholeOpen className="w-4 h-4" />
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
                <Calendar className="w-4 h-4" />
                <p className="font-semibold">Next: {formatDate(subvault.next_unlock)}</p>
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

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {vaultData.length > 0 ? (
          vaultData.map((subvault, index) => (
            <VaultCard key={index} subvault={subvault} />
          ))
        ) : (
          <p className="text-center col-span-full">No vaults found</p>
        )}
      </div>
    );
  };
  
  export default VaultGrid;