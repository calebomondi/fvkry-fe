import { useAccount } from 'wagmi';
import { useEffect, useState } from "react";
import ConnectedNavbar from "../navbar/connectednavbar";
import { DashboardData } from '@/types';
import apiService from '@/backendServices/apiservices';
import UserVaultDashboard from './userdashboard';

export default function Dashboard() {
  const { isConnected } = useAccount();

  const [loading, setLoading] = useState<boolean>(true);
  const [dashData, setDashData] = useState<DashboardData | null>(null)
  
  useEffect(() => {
    const fetchData = async () => {
      if (isConnected) {
        try {
          const response = await apiService.analysis()
          setDashData(response.data)
        } catch (error) {
          console.error("Error fetching wallet data:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchData()
  }, [isConnected])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="">
      <ConnectedNavbar />
      <div className="p-4">
        <UserVaultDashboard data={dashData} />
      </div>
    </div>
  )
}