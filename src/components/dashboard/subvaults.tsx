import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ConnectedNavbar from "../navbar/connectednavbar"
import { getSubVaults } from "@/blockchain-services/useFvkry"
import { VaultData } from "@/types"
import apiService from "@/backendServices/apiservices"
import VaultGrid from "./vaultgrid"

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
        //const subVaults = await getSubVaults(vaultType)
        //get combined data from db and contract
        //const combinedData = await apiService.getCombinedVaultData(String(id),subVaults)
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
        <VaultGrid vaultData={vaultData} vaultType={String(id)}/>
      </div>
    </>
  )
}