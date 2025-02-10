import { useAccount } from 'wagmi';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ConnectedNavbar from "../navbar/connectednavbar";

import { getWalletClient, getContractEthBalance, getContractTokenBalance } from "@/blockchain-services/useFvkry";

export default function Dashboard() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  const [address, setAddress] = useState<string>('')
  const [ethvalue, setethValue] = useState<string>('11')
  const [tknvalue, settknValue] = useState<string>('22')
  
  useEffect(() => {
    const fetchData = async () => {
      const {address} = await getWalletClient();
      setAddress(address);
      const balance = await getContractEthBalance();
      setethValue(String(balance))
      const tknbalance = await getContractTokenBalance('0x37D32Edc11F8Ed47fB4f4A9FBBA707D6047B7CDf');
      settknValue(String(tknbalance))
    }

    fetchData()
  })

  return (
    <div className="">
      <ConnectedNavbar />
      <p className="">Address: {address.slice(0,8)} ETH Balance: {ethvalue} TKN Balance: {tknvalue}</p>
    </div>
  )
}
