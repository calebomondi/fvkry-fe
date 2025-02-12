import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ConnectedNavbar from "../navbar/connectednavbar"
import { getSubVaults } from "@/blockchain-services/useFvkry"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "@/types"

export default function SubVaultsContainer() {
  const [vaultData, setVaultData] = useState<Lock[]>([])
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
        const subVaults = await getSubVaults(vaultType)
        setVaultData(subVaults)
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vaultData.length > 0 ? (
            vaultData.map((subvault, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{subvault.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Amount: {subvault.amount.toString()}</p>
                    <p>End Time: {new Date(subvault.lockEndTime * 1000).toLocaleDateString()}</p>
                    <p>Status: {subvault.withdrawn ? 'Withdrawn' : 'Locked'}</p>
                    <p>Type: {subvault.isNative ? 'Native Token' : 'ERC20'}</p>
                  </div>
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