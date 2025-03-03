import { Transaction } from "@/types"
import { useEffect, useState, useMemo } from "react"
import { getTransactionsData } from "../dashboard/fetchCombinedData"
import { useAccount } from "wagmi"
import Skeletun from "../skeletons/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTokenSymbol } from "@/blockchain-services/tokens";
import { formatEther } from "viem"

export default function TransactionDisplay() {
  const {isConnected} = useAccount()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedAsset, setSelectedAsset] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const uniqueAssets = useMemo(() => {
    const assets = Array.from(new Set(transactions.map(tx => tx.token)));
    return assets.map(address => ({
      address,
      symbol: getTokenSymbol(address)
    }));
  }, [transactions]);

  // Filter transactions by selected asset
  const filteredTransactions = useMemo(() => 
    transactions.filter(tx => {
      const assetMatch = selectedAsset === "all" || tx.token === selectedAsset;
      const searchMatch = tx.title.toLowerCase().includes(searchQuery.toLowerCase());
      return assetMatch && searchMatch;
    }),
    [transactions, selectedAsset, searchQuery]
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      if(isConnected) {
        try {
          const data = await getTransactionsData()
          setTransactions(data)

        } catch (error) {
          setError(`Cannot Fetch Data!, ${error}`)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    fetchTransactions()
  }, [isConnected]);

  if(loading) return <Skeletun />
  if(error) return <div>{error}</div>

  return (
    <Card className="w-full max-h-screen overflow-y-scroll">
      <CardHeader className="sticky top-0 z-10 dark:bg-black/90 bg-white/90">
        <div className="flex items-center justify-between flex-col md:flex-row gap-4">
          <CardTitle>Transaction History</CardTitle>
          <div className="">
            <label className="input input-bordered flex items-center gap-2">
              <input 
                type="text" 
                className="grow" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by lock name..." 
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd" />
              </svg>
            </label>
          </div>
          <div className="">
            <select 
              className="select w-full max-w-xs"
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
            >
              <option value="all" selected>All Assets</option>
              {uniqueAssets.map(({ address, symbol }) => (
                <option key={address} value={address}>
                  {symbol}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="table table-md h-1/2 overflow-y-scroll">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Asset</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            {
              filteredTransactions.length > 0 && (
                <tbody>
                  {filteredTransactions.map((tx, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td className="font-medium">{tx.title}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            tx.withdrawn
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {tx.withdrawn ? 'Withdrawal' : 'Deposit'}
                        </span>
                      </td>
                      <td>{getTokenSymbol(tx.token)}</td>
                      <td>{formatEther(tx.amount)}</td>
                      <td>
                        {new Date(tx.timestamp * 1000).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )
            }
          </table>
          {
            filteredTransactions.length === 0 && (
              <div className="flex justify-center items-center h-1/2 py-10">
                <p className="text-lg text-gray-500">No transactions found</p>
              </div>
            )
          }
        </div>
      </CardContent>
    </Card>
  );
}
