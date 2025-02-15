import { useAccount } from 'wagmi';
import { useEffect, useState } from "react";
import ConnectedNavbar from "../navbar/connectednavbar";
import { getWalletClient, getContractEthBalance, getContractTokenBalance } from "@/blockchain-services/useFvkry";

export default function Dashboard() {
  const { isConnected } = useAccount();

  const [address, setAddress] = useState<string>('')
  const [ethvalue, setethValue] = useState<string>('0')
  const [tknvalue, settknValue] = useState<string>('0')
  
  useEffect(() => {
    const fetchData = async () => {
      if (isConnected) {  // Only fetch wallet data if connected
        try {
          const {address} = await getWalletClient();
          setAddress(address);
          const balance = await getContractEthBalance();
          setethValue(String(balance))
          const tknbalance = await getContractTokenBalance('0x37D32Edc11F8Ed47fB4f4A9FBBA707D6047B7CDf');
          settknValue(String(tknbalance))
        } catch (error) {
          console.error("Error fetching wallet data:", error);
        }
      }
    }

    fetchData()
  }, [isConnected])

  return (
    <div className="">
      <ConnectedNavbar />
      <div className="p-4">
        {isConnected ? (
          <p className="">
            Address: {address.slice(0,8)} ETH Balance: {ethvalue} TKN Balance: {tknvalue}
          </p>
        ) : (
          <p className="text-center">
            Connect your wallet to view your balances and interact with the dashboard
          </p>
        )}
      </div>
    </div>
  )
}