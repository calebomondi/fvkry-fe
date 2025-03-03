import ConnectedNavbar from "../navbar/connectednavbar"
import { useState, useEffect } from "react"
import { useAccount } from "wagmi";
import { PointsData } from "@/types";
import apiService from "@/backendServices/apiservices";
import UserPointsDashboard from "./userPointsDashboard";

export default function Rewards() {
  const {isConnected} = useAccount();
  const [pointsData, setPointsData] = useState<PointsData>(
  {
    "fvkry_points": 0,
    "redeemed": 0,
    "next_check": ""
  });

  useEffect(() => {
    const fetchData = async () => {
      if(isConnected) {
        const response = await apiService.getPoints();
        if(response.length > 0 && response[0]) {
          setPointsData(response[0]);
        } 
      }
    }
    fetchData();
  }, [isConnected])

  return (
    <>
      <ConnectedNavbar />
      <p className={`text-center my-2 text-amber-600 ${isConnected ? 'hidden' : ''}`}>
          Connect your wallet to view your claimed points.
      </p>
      <UserPointsDashboard data={pointsData}/>
    </>
  )
}
