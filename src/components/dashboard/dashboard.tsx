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
  const [loading, setLoading] = useState<boolean>(false)
  const [dashData, setDashData] = useState<DashboardData | null>(null)
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (isConnected) {
        try {
          //from ls
          const cachedData = localStorage.getItem('dashboard_data')
          if(cachedData) {
            setDashData(JSON.parse(cachedData))
            setLoading(false)
          }
          //from db
          const response: DashboardData | ErrorResponse = await apiService.analysis()
          if (response && !isErrorResponse(response) && Object.keys(response).length > 0) {
            setDashData(response)
            localStorage.setItem('dashboard_data', JSON.stringify(response))
          } else {
            setDashData(mockDashboardData)
          }
        } catch (error) {
          console.error("Error fetching wallet data:", error);
        } finally {
          setLoading(false)
        }
      } else {
        setDashData(mockDashboardData)
        setLoading(false)
        localStorage.removeItem('dashboard_data')
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