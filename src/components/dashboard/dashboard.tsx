import { useAccount } from 'wagmi';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ConnectedNavbar from "../navbar/connectednavbar";

import { getWalletClient, getContractEthBalance } from "@/blockchain-services/useFvkry";

export default function Dashboard() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  const [address, setAddress] = useState<string>('')
  const [value, setValue] = useState<string>('345')
  
  useEffect(() => {
    const fetchData = async () => {
      const {address} = await getWalletClient();
      setAddress(address);
      const balance = await getContractEthBalance();
      setValue(String(balance))
    }

    fetchData()
  })

  return (
    <div className="">
      <ConnectedNavbar />
      <p className="pt-20">Address: {address} Balance: {value}</p>
    </div>
  )
}
