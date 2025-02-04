import { Button } from "../ui/button"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from 'wagmi';

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);
  return (
    <>
      <Button variant="secondary">Click Me</Button>
      <ConnectButton />
    </>
  )
}
