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
          const combinedData = await mergedVaultData(String(id))
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
        <h2 className="text-2xl font-bold mb-4">Vault Type: {id}</h2>
        <VaultGrid vaultData={vaultData} vaultType={String(id)} />
        {!isConnected && (
          <p className="text-center mt-4 text-gray-600">
            Connect your wallet to interact with vaults
          </p>
        )}
      </>
    )
  }

  return (
    <>
      <ConnectedNavbar />
      <div className="container mx-auto p-4">
        {renderContent()}
      </div>
    </>
  )
}