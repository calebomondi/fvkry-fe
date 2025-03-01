import ConnectedNavbar from "../navbar/connectednavbar"
import { useEffect, useState } from "react"
import { HealthRecord } from "../../types"
import apiService from "@/backendServices/apiservices"
import TokenPerformanceTable from "./performancetable"
import Skeletun from "../skeletons/skeleton"
import { useAccount } from "wagmi"

export default function Health() {
  const { isConnected } = useAccount()
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if(isConnected) {
      const fetchData = async () => {
        setLoading(true)
        try {
          const data = await apiService.healthCheck()
          setHealthRecords(data)
        } catch (error) {
          console.error('Error fetching health data:', error)
          setError(error instanceof Error ? error.message : String(error))
        } finally {
          setLoading(false)
        }
      } 
      fetchData()
    } 
  }, [isConnected])

  if (loading) {
    return (
      <>
        <ConnectedNavbar />
        <Skeletun />
      </>
    )
  }
  if (error) {
    return (
      <>
        <ConnectedNavbar />
        <div className="p-4 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Token Performance Dashboard</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <ConnectedNavbar />
      <p className={`text-center my-2 text-amber-600 ${isConnected ? 'hidden' : ''}`}>
          Connect your wallet to check your financial health status
      </p>
      <TokenPerformanceTable transactions={healthRecords} />
    </>
  ) 
}
