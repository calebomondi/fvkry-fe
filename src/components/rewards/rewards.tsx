import ConnectedNavbar from "../navbar/connectednavbar"
import { useState, useEffect } from "react"
import { useAccount } from "wagmi";
import { PointsData } from "@/types";
import apiService from "@/backendServices/apiservices";
import UserPointsDashboard from "./userPointsDashboard";
import { useCookies } from "react-cookie";

export default function Rewards() {
  const {isConnected} = useAccount();
  const [pointsData, setPointsData] = useState<PointsData>(
  {
    "fvkry_points": 0,
    "redeemed": 0,
    "next_check": ""
  });
  //cookies
  const [cookies, setCookies] = useCookies(['rewards_data'])

  useEffect(() => {
    const fetchData = async () => {
      if(isConnected) {
        //fetch cookie data
        const cookieData = cookies['rewards_data']
        if(cookieData) {
          setPointsData(cookieData)
        } else {
          setPointsData({
            "fvkry_points": 0,
            "redeemed": 0,
            "next_check": ""
          })
        }

        const response = await apiService.getPoints();
        if(response.length > 0 && response[0]) {
          setPointsData(response[0]);
        } 

        //set cookies data
        setCookies(`rewards_data`, response, {
          path: '/rewards',
          maxAge: 3600, // Cookie expires in 1 hour
          secure: true,
          sameSite: 'strict'
        });
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
