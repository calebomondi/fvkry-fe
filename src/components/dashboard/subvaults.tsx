import ConnectedNavbar from "../navbar/connectednavbar"
import { useParams } from "react-router-dom"

export default function SubVaultsContainer() {
    const { id } = useParams();
  return (
    <>
        <ConnectedNavbar />
        <p>ID: {id}</p>
    </>
  )
}
