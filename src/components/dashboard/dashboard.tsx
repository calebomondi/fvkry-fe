import { useAccount } from 'wagmi';
import { useEffect, useState } from "react";
import ConnectedNavbar from "../navbar/connectednavbar";
import { DashboardData } from '@/types';
import apiService from '@/backendServices/apiservices';
import UserVaultDashboard from './userdashboard';
import { mockDashboardData } from './mockplatformdata';

export default function Dashboard() {
  const { isConnected } = useAccount();

  const [dashData, setDashData] = useState<DashboardData | null>(null)
  
  useEffect(() => {
    const fetchData = async () => {
      if (isConnected) {
        try {
          const response = await apiService.analysis()
          setDashData(response)
          console.log('data:', JSON.stringify(response))
        } catch (error) {
          console.error("Error fetching wallet data:", error);
        }
      } else {
        setDashData(mockDashboardData)
      }
    }

    fetchData()
  }, [isConnected])

  return (
    <div className="">
      <ConnectedNavbar />
      <UserVaultDashboard data={dashData} />
      {!isConnected && (
        <p className="text-center my-4 text-gray-600">
          Connect your wallet to view your asset lock analytics
        </p>
      )}
    </div>
  )
}