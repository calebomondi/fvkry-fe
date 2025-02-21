import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAccount } from 'wagmi'
import ConnectedNavbar from "../navbar/connectednavbar"
import { VaultData } from "@/types"
import VaultGrid from "./vaultgrid"
import { mockVaultsData } from "./mockplatformdata"
import { mergedVaultData } from "./fetchCombinedData"

export default function SubVaultsContainer() {
  const [vaultData, setVaultData] = useState<VaultData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { id } = useParams()
  const { isConnected } = useAccount()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        if (isConnected) {
          //get combined data from db and contract
          const combinedData = await mergedVaultData()
          setVaultData(combinedData)
        } else {
          // If not connected, show mock or public data
          setVaultData(mockVaultsData)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch vault data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, isConnected])

  const renderContent = () => {
    if (loading) {
      return <p className="text-center">Loading vault data...</p>
    }

    if (error) {
      return <p className="text-center text-red-500">Error: {error}</p>
    }

    return (
      <>
        <p className={`text-center my-4 text-gray-600 ${isConnected ? 'hidden' : ''}`}>
          Connect your wallet to interact with vaults
        </p>
        <VaultGrid vaultData={vaultData} vaultType={String(id)} />
      </>
    )
  }

  return (
    <>
      <ConnectedNavbar />
      <div className="container mx-auto">
        {renderContent()}
      </div>
    </>
  )
}