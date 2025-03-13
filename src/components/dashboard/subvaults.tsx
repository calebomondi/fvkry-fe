import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAccount } from 'wagmi'
import ConnectedNavbar from "../navbar/connectednavbar"
import { VaultData } from "@/types"
import VaultGrid from "./vaultgrid"
import { mockVaultsData } from "./mockplatformdata"
import { mergedVaultData } from "./fetchCombinedData"
import Skeletun from "../skeletons/skeleton"

export default function SubVaultsContainer() {
  const [vaultData, setVaultData] = useState<VaultData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { id } = useParams()
  const { isConnected } = useAccount()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if(isConnected) {
        try {
          //from ls
          const cachedData = localStorage.getItem('vault_data')
          if(cachedData) {
            setVaultData(JSON.parse(cachedData))
            setLoading(false)
          }
          //from db
          const combinedData = await mergedVaultData()
          
          setVaultData(combinedData)
          localStorage.setItem('vault_data', JSON.stringify(combinedData))
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch vault data')
        } finally {
          setLoading(false)
        }
      } else {
        // If not connected, show mock or public data
        setVaultData(mockVaultsData)
        setLoading(false)
        localStorage.removeItem('vault_data')
      }
    }

    fetchData()
  }, [id, isConnected])

  const renderContent = () => {
    if (loading) {
      return <Skeletun />
    }

    if (error) {
      return <p className="text-center text-red-500">Error: {error}</p>
    }

    return (
      <>
        <p className={`text-center my-4 text-amber-600 ${isConnected ? 'hidden' : ''}`}>
          Connect your wallet to interact with your vaults
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