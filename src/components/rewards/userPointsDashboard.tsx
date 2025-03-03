import React from 'react';
import { Circle, Info } from 'lucide-react';
import { PointsData } from '@/types';

interface UserPointsDashboardProps {
  data: PointsData;
}

const UserPointsDashboard: React.FC<UserPointsDashboardProps> = ({ data }) => {
  // Calculate available points
  const availablePoints = data.fvkry_points - data.redeemed;
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, Math.round((data.redeemed / data.fvkry_points) * 100));
  
  // Format next check date
  const nextCheckDate = new Date(data.next_check);
  const formattedDate = nextCheckDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const formattedTime = nextCheckDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Calculate days remaining
  const today = new Date();
  const daysRemaining = Math.max(0, Math.ceil((nextCheckDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  
  return (
    <div className="rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-lg text-amber-600 font-semibold">Earn Fvkry points, redeem, get rewards</p>
      </div>
      
      {/* Points Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-lg p-4 text-center shadow">
          <p className=" text-sm mb-1">Total Points</p>
          <p className="text-3xl font-bold text-indigo-600">{data.fvkry_points}</p>
        </div>
        <div className="rounded-lg p-4 text-center shadow">
          <p className=" text-sm mb-1">Redeemed</p>
          <p className="text-3xl font-bold text-red-500">{data.redeemed}</p>
        </div>
        <div className="rounded-lg p-4 text-center shadow">
          <p className=" text-sm mb-1">Available</p>
          <p className="text-3xl font-bold text-green-500">{availablePoints}</p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Redeemed Points</span>
          <span className="text-sm font-medium text-indigo-600">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      {/* Next Check */}
      <div className="rounded-lg p-4 mb-6 shadow-md">
        <div className="flex items-center">
          <Circle className="text-amber-600 animate-pulse mr-2" size={16} />
          <h3 className="font-medium">Next Finacial Health Check</h3>
        </div>
        <div className="mt-3 ml-6">
          <p className="text-lg font-bold text-amber-500">{formattedDate} at {formattedTime}</p>
          <p className=" mt-1">
            {daysRemaining === 0 ? (
              <span className="text-green-500 font-medium">Available today!</span>
            ) : (
              `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining`
            )}
          </p>
        </div>
        <div 
          className="mt-12 p-6 bg-amber-200 rounded-lg"
        >
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-amber-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                FVKRY Points Information
              </h4>
              <div className="text-gray-600 space-y-2">
                <p>• Claim points by checking your financial health status.</p>
                <p>• Financial checks are performed every 100 days.</p>
                <p>• Redeem Points by locking assets for upto 100 days.</p>
                <p>• Redeemed points can be used to earn rewards on the platform,</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default UserPointsDashboard;