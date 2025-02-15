import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Lock, 
  Timer, 
  DollarSign, 
  Calendar, 
  ArrowUpDown,
  ArrowRight,
  TrendingUp,
  Settings,
  Send
} from 'lucide-react';
import ConnectedNavbar from '../navbar/connectednavbar';

interface PriceData {
  currentPrice: number;
  lockedPrice: number;
}

interface TimelineEvent {
  date: Date;
  amount: number;
  isWithdrawn: boolean;
}

const data = {
    "title": "ETH Staking Reserve",
    "amount": 0.5,
    "start_time": "2025-02-12T07:45:58.174",
    "end_time": "2025-02-14T07:45:58.174",
    "unlock_goal_usd": 1000,
    "lock_type": "goal",
    "withdrawn": false,
    "asset_address": "0x0000000000000000000000000000000000000000",
    "asset_symbol": "ETH",
    "unlock_schedule": 0,
    "next_unlock": "2025-02-14T09:00:00.000",
    "unlock_amount": 0.001
}

const VaultDetails = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [priceData, setPriceData] = useState<PriceData>({
    currentPrice: 0,
    lockedPrice: 0
  });
  const [unlockEvents, setUnlockEvents] = useState<TimelineEvent[]>([]);
  const isLockExpired = new Date() >= new Date(data.end_time);

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeLeft = () => {
      const endTime = new Date(data.end_time);
      const now = new Date();
      const difference = endTime.getTime() - now.getTime();

      if (difference <= 0) return 'Lock Expired';

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      return `${days}d ${hours}h ${minutes}m`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, [data.end_time]);

  // Calculate unlock schedule timeline
  useEffect(() => {
    
      const events: TimelineEvent[] = [];
      const startDate = new Date(data.start_time);
      const endDate = new Date(data.end_time);
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        events.push({
          date: new Date(currentDate),
          amount: data.unlock_amount,
          isWithdrawn: new Date() > currentDate
        });
        currentDate.setDate(currentDate.getDate() + data.unlock_schedule);
      }

      setUnlockEvents(events);
    
  }, [data]);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <div className=''>
    <ConnectedNavbar />
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:h-screen">
        <div className="">
            {/* Header Section */}
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span className="text-2xl text-amber-600">#{data.title}</span>
                    <p className="text-lg font-mono flex space-x-2"> <Timer /> <span>{timeLeft}</span></p>
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                {/* Asset Information */}
                <div className="flex flex-col md:flex-row items-center md:justify-evenly">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-center">Locked Amount</h3>
                        <p className="text-2xl font-bold text-center">
                            {data.amount} {data.asset_symbol}
                        </p>
                        <p className="text-gray-500 text-center">
                            ≈ {formatCurrency(data.amount * priceData.currentPrice)}
                        </p>
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-center">Value Change</h3>
                        <div className="flex items-center space-x-2 justify-center">
                            <TrendingUp className="w-5 h-5" />
                            <span className={`text-xl font-bold ${
                            priceData.currentPrice > priceData.lockedPrice 
                                ? 'text-green-500' 
                                : 'text-red-500'
                            }`}>
                            {((priceData.currentPrice - priceData.lockedPrice) / priceData.lockedPrice * 100).toFixed(2)}%
                            </span>
                        </div>
                        <p className="text-gray-500 text-center">
                            Initial: {formatCurrency(data.amount * priceData.lockedPrice)}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div className='md:w-1/3'>
                    <p className="text-center text-gray-400">Start Date</p>
                    <p className="font-semibold text-center">{formatDate(new Date(data.start_time))}</p>
                    </div>
                    <div className='md:w-1/3'>
                    <p className="text-center text-gray-400">End Date</p>
                    <p className="font-semibold text-center">{formatDate(new Date(data.end_time))}</p>
                    </div>
                    <div className='md:w-1/3'>
                    <p className="text-center text-gray-400">Lock Type</p>
                    <p className="font-semibold text-center capitalize">{data.lock_type}</p>
                    </div>
                    <div className='md:w-1/3'>
                    <p className="text-center text-gray-400">Unlock Schedule</p>
                    <p className="font-semibold text-center">Every {data.unlock_schedule} days</p>
                    </div>
                    {data.unlock_goal_usd && (
                    <div className='md:w-1/3'>
                        <p className="text-center text-gray-400">Goal Amount</p>
                        <p className="font-semibold text-center">{formatCurrency(data.unlock_goal_usd)}</p>
                    </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 items-center justify-center">
                    <Button 
                    variant="outline" 
                    className="flex bg-amber-600 border-none text-gray-900 font-semibold hover:bg-gray-900 hover:border-amber-600 hover:text-amber-600 items-center space-x-2"
                    onClick={() => {/* Implement settings logic */}}
                    >
                    <Settings className="w-4 h-4" />
                    <span>Update Schedule</span>
                    </Button>

                    <Button 
                    variant="outline"
                    className="flex bg-amber-600 border-none text-gray-900 font-semibold hover:bg-gray-900 hover:border-amber-600 hover:text-amber-600 items-center space-x-2"
                    disabled={!isLockExpired}
                    onClick={() => {/* Implement withdraw logic */}}
                    >
                    <ArrowRight className="w-4 h-4" />
                    <span>Withdraw</span>
                    </Button>

                    <Button 
                    variant="outline"
                    className="flex bg-amber-600 border-none text-gray-900 font-semibold hover:bg-gray-900 hover:border-amber-600 hover:text-amber-600 items-center space-x-2"
                    disabled={!isLockExpired}
                    onClick={() => {/* Implement transfer logic */}}
                    >
                    <Send className="w-4 h-4" />
                    <span>Transfer</span>
                    </Button>
                </div>
                </CardContent>
            </Card>
        </div>
        {/* Timeline of Unlock Events */}
        <div className="space-y-4 border border-white my-2 rounded-md p-2">
            <h3 className="text-xl font-semibold text-amber-600 m-2">Unlock Schedule</h3>
            <div className="h-auto overflow-x-auto">
                <ul className="timeline overflow-x-auto">
                    {unlockEvents.map((event, index) => (
                        <li key={index} className="space-x-4 flex flex-col items-center justify-center">                            
                            <div className="timeline-start timeline-box dark:bg-gray-900">{formatDate(event.date)}</div>
                            <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5">
                                <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd" />
                            </svg>
                            </div>
                            <hr className='bg-amber-600'/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
    </div>
  );
};

export default VaultDetails;