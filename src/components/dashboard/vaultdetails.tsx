import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, TrendingUp, Send, CircleFadingPlus, Rotate3d, CircleArrowOutDownRight } from 'lucide-react';
import ConnectedNavbar from '../navbar/connectednavbar';
import { VaultData } from '@/types';
import { useAccount } from 'wagmi';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSpecificVaultData } from './fetchCombinedData';
import { mockSingleVaultData } from './mockplatformdata';
import AddSchedule from './addSchedule';
import AddToLock from './addToLock';

interface PriceData {
  currentPrice: number;
  lockedPrice: number;
}

interface TimelineEvent {
  date: Date;
  amount: number;
  isWithdrawn: boolean;
}

const VaultDetails = () => {
  const [vaultData, setVaultData] = useState<VaultData>(mockSingleVaultData)
  const [timeLeft, setTimeLeft] = useState<string>('')
  const [priceData, setPriceData] = useState<PriceData>({
    currentPrice: 0,
    lockedPrice: 0
  });
  const [unlockEvents, setUnlockEvents] = useState<TimelineEvent[]>([]);
  const [isLockExpired, setIsLockExpired] = useState<boolean>(false)

  //get params and query values
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const vault = location.pathname.split('/')[2];
  const address = searchParams.get('address');
  const title = searchParams.get('title');
  const amount = searchParams.get('amount');

  //check if connected
  const { isConnected } = useAccount();

  //get actual spefic VaultData
  useEffect(() => {
    const fetchData = async () => {
        if (isConnected) {
          try {
            if (address && title && amount) {
              const resp = await getSpecificVaultData(address, title, Number(amount));
              if(resp) {
                setVaultData(resp)
                setIsLockExpired(new Date() >= new Date(resp.end_time))
              }
            }
          } catch (error) {
            console.error("Error fetching specific vault data:", error);
            throw new Error(`Error ${error} occured!`)
          }
        } else {
          setVaultData(mockSingleVaultData)
        }
    }
    fetchData();
  }, [vault, isConnected]);

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeLeft = (): string => {
      // Get current time in UTC
      const now = new Date();
      const utcNow = new Date(
        now.getTime() + (now.getTimezoneOffset() * 60000)
      );
  
      // Parse the end time directly (assuming subvault.end_time is in UTC)
      const endTime = new Date(vaultData.end_time);
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
  }, [vaultData.end_time]);

  // Calculate unlock schedule timeline
  useEffect(() => {
    if (vaultData.start_time && vaultData.end_time && vaultData.unlock_schedule) {
      const events: TimelineEvent[] = [];
      const startDate = new Date(vaultData.next_unlock).toISOString();
      const endDate = new Date(vaultData.end_time);
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        events.push({
          date: new Date(currentDate),
          amount: vaultData.unlock_amount,
          isWithdrawn: new Date() > currentDate
        });
        currentDate.setDate(currentDate.getDate() + vaultData.unlock_schedule);
      }

      setUnlockEvents(events);
    }
  }, [vaultData.start_time, vaultData.end_time, vaultData.unlock_schedule, vaultData.unlock_amount]);

  //price data
  useEffect(() => {
    setPriceData({currentPrice: 1200, lockedPrice: 800})
  }, []);

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
                    <span className="text-2xl text-amber-600">#{vaultData.title}</span>
                    <p className="text-lg font-mono flex space-x-2"> <Timer /> <span>{timeLeft}</span></p>
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                {/* Asset Information */}
                <div className="flex flex-col md:flex-row items-center md:justify-evenly">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-center">Locked Amount</h3>
                        <p className="text-2xl font-bold text-center">
                            {vaultData.amount} {vaultData.asset_symbol}
                        </p>
                        <p className="text-gray-500 text-center">
                            ≈ {formatCurrency(vaultData.amount * priceData.currentPrice)}
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
                            Initial: {formatCurrency(vaultData.amount * priceData.lockedPrice)}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div className='md:w-1/3'>
                    <p className="text-center text-gray-400">Start Date</p>
                    <p className="font-semibold text-center">{formatDate(new Date(vaultData.start_time))}</p>
                    </div>
                    <div className='md:w-1/3'>
                    <p className="text-center text-gray-400">End Date</p>
                    <p className="font-semibold text-center">{formatDate(new Date(vaultData.end_time))}</p>
                    </div>
                    <div className='md:w-1/3'>
                    <p className="text-center text-gray-400">Lock Type</p>
                    <p className="font-semibold text-center capitalize">{vaultData.lock_type}</p>
                    </div>
                    <div className='md:w-1/3'>
                    <p className="text-center text-gray-400">Unlock Schedule</p>
                    <p className="font-semibold text-center">{vaultData.unlock_schedule === 0 ? 'None' : `${vaultData.unlock_type} ${vaultData.unlock_schedule} days`}</p>
                    </div>
                    {vaultData.unlock_goal_usd && (
                    <div className='md:w-1/3'>
                        <p className="text-center text-gray-400">Goal Amount</p>
                        <p className="font-semibold text-center">{formatCurrency(vaultData.unlock_goal_usd)}</p>
                    </div>
                    )}
                    {vaultData.unlock_schedule > 0 && (
                    <div className='md:w-1/3'>
                        <p className="text-center text-gray-400">Unlock Amount</p>
                        <p className="font-semibold text-center">{vaultData.unlock_amount} {vaultData.asset_symbol}</p>
                    </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 items-center justify-center">
                    <Button 
                      variant="outline"
                      className={`flex bg-amber-600 border-none text-gray-900 font-semibold hover:bg-gray-900 hover:border-amber-600 hover:text-amber-600 items-center space-x-2 ${isLockExpired ? 'hidden' : ''}`}
                      onClick={() => (document.getElementById('my_modal_14') as HTMLDialogElement).showModal()}
                    >
                    <CircleArrowOutDownRight className="w-4 h-4" />
                      <span>Add To Lock</span>
                    </Button>
                    <dialog id="my_modal_14" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <AddToLock vaultData={vaultData}/>            
                      </div>
                    </dialog>

                    <Button 
                      variant="outline" 
                      className={`flex bg-amber-600 border-none text-gray-900 font-semibold hover:bg-gray-900 hover:border-amber-600 hover:text-amber-600 items-center space-x-2 ${vaultData.lock_type === "goal" || isLockExpired ? 'hidden' : ''}`}
                      disabled={vaultData.unlock_schedule > 0}
                      onClick={() => (document.getElementById('my_modal_13') as HTMLDialogElement).showModal()}
                    >
                    <CircleFadingPlus className="w-4 h-4" />
                      <span>Set Unlock Schedule</span>
                    </Button>
                    <dialog id="my_modal_13" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <AddSchedule vaultData={vaultData}/>            
                      </div>
                    </dialog>

                    <Button 
                    variant="outline"
                    className={`flex bg-amber-600 border-none text-gray-900 font-semibold hover:bg-gray-900 hover:border-amber-600 hover:text-amber-600 items-center space-x-2 ${isLockExpired ? '' : 'hidden'}`}
                    onClick={() => {/* Implement withdraw logic */}}
                    >
                    <CircleArrowOutDownRight className="w-4 h-4" />
                    <span>Withdraw</span>
                    </Button>

                    <Button 
                    variant="outline"
                    className={`flex bg-amber-600 border-none text-gray-900 font-semibold hover:bg-gray-900 hover:border-amber-600 hover:text-amber-600 items-center space-x-2 ${isLockExpired ? '' : 'hidden'}`}
                    onClick={() => {/* Implement transfer logic */}}
                    >
                    <Send className="w-4 h-4" />
                    <span>Transfer</span>
                    </Button>

                    <Button 
                    variant="outline"
                    className={`flex bg-amber-600 border-none text-gray-900 font-semibold hover:bg-gray-900 hover:border-amber-600 hover:text-amber-600 items-center space-x-2 ${isLockExpired ? '' : 'hidden'}`}
                    onClick={() => {/* Implement transfer logic */}}
                    >
                    <Rotate3d className="w-4 h-4" />
                    <span>Extend</span>
                    </Button>
                </div>
                </CardContent>
            </Card>
        </div>
        {/* Timeline of Unlock Events */}
        <div className="space-y-4 border border-white my-2 rounded-md p-2">
            <h3 className="text-xl font-semibold text-amber-600 m-2">Unlock Schedule</h3>
            <div className="h-auto overflow-x-auto">
              {
                vaultData.unlock_schedule !== 0 ?
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
                  </ul> :
                  <div className='grid place-items-center '>
                    No Unlock Schedule Have Been Set, SetUp One.
                  </div>
              }
            </div>
        </div>
    </div>
    </div>
  );
};

export default VaultDetails;