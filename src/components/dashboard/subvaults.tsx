import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ConnectedNavbar from "../navbar/connectednavbar"
import { getSubVaults } from "@/blockchain-services/useFvkry"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VaultData } from "@/types"
import apiService from "@/backendServices/apiservices"
import { LockKeyholeOpen } from 'lucide-react';

import mockVaultData from "./mockvaultdata"

export default function SubVaultsContainer() {
  const [vaultData, setVaultData] = useState<VaultData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { id } = useParams()

  const durationTypeToNumber = (period: string): number => {
    const periodMap: { [key: string]: number } = {
      'days': 1,
      'weeks': 2,
      'months': 3,
      'years': 4
    }

    const normalizedPeriod = period?.toLowerCase() || ''
    return periodMap[normalizedPeriod] || 0
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const vaultType = durationTypeToNumber(String(id))
        //get data from contract
        //1. const subVaults = await getSubVaults(vaultType)
        //get combined data from db and contract
        //2. const combinedData = await apiService.getCombinedVaultData(String(id),subVaults)
        setVaultData(mockVaultData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch vault data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return (
      <>
        <ConnectedNavbar />
        <div className="container mx-auto p-4">
          <p className="text-center">Loading vault data...</p>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <ConnectedNavbar />
        <div className="container mx-auto p-4">
          <p className="text-center text-red-500">Error: {error}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <ConnectedNavbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Vault Type: {id}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vaultData.length > 0 ? (
            vaultData.map((subvault, index) => (
              <Card key={index} className="hover:cursor-pointer dark:bg-base-200 border-none shadow-md hover:shadow-sm hover:shadow-amber-400">
                <CardHeader>
                  <CardTitle className="text-center truncate py-1 text-amber-600">#{subvault.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 flex flex-col items-center justify-center">
                    <p className="text-center font-semibold">{subvault.amount.toString()} {subvault.asset_symbol}</p>
                    <p className="text-center font-semibold">{subvault.lock_type}</p>
                    <p className="font-semibold flex items-center justify-center space-x-2"><LockKeyholeOpen /> <span>{subvault.end_time.slice(0,10)}</span></p>
                  
                  </div>
                  <button className="btn btn-sm text-amber-600 btn-outline hover:bg-amber-600 hover:text-gray-800 hover:border-amber-600 mt-5 w-full">View Lock</button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center">No vaults found</p>
          )}
        </div>
      </div>
    </>
  )
}