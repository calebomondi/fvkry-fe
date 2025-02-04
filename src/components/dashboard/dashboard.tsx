import { Button } from "../ui/button"
import { useAccount } from 'wagmi';

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ConnectedNavbar from "../navbar/connectednavbar";

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
      <ConnectedNavbar />
      <Button variant="secondary">Click Me</Button>
    </>
  )
}
