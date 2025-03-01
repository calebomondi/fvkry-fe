import { useAccount } from 'wagmi';
import { useEffect, useState } from "react";
import ConnectedNavbar from "../navbar/connectednavbar";
import { DashboardData } from '@/types';
import apiService from '@/backendServices/apiservices';
import UserVaultDashboard from './userdashboard';
import { mockDashboardData } from './mockplatformdata';
import Skeletun from '../skeletons/skeleton';

interface ErrorResponse {
  error: string;
}

// Type guard to check if response is an error
function isErrorResponse(response: DashboardData | ErrorResponse): response is ErrorResponse {
  return 'error' in response;
}

export default function Dashboard() {
  const { isConnected } = useAccount();
  const [loading, setLoading] = useState<boolean>(true)
  const [dashData, setDashData] = useState<DashboardData | null>(null)
  
  useEffect(() => {
    const fetchData = async () => {
      if (isConnected) {
        try {
          const response: DashboardData | ErrorResponse = await apiService.analysis()
          if (response && !isErrorResponse(response) && Object.keys(response).length > 0) {
            setDashData(response)
          } else {
            setDashData(mockDashboardData)
          }
            
          console.log('data--->:', JSON.stringify(response))
        } catch (error) {
          console.error("Error fetching wallet data:", error);
        } finally {
          setLoading(false)
        }
      } else {
        setDashData(mockDashboardData)
        setLoading(false)
      }
    }

    fetchData()
  }, [isConnected])

  if (loading) {
    return (
      <>
        <ConnectedNavbar />
        <Skeletun />
      </>
    )
  }

  return (
    <div className="">
      <ConnectedNavbar />
      <p className={`text-center my-2 text-amber-600 ${isConnected ? 'hidden' : ''}`}>
        Connect your wallet to view your asset lock analytics
      </p>
      <UserVaultDashboard data={dashData} />
    </div>
  )
}