import ConnectedNavbar from "../navbar/connectednavbar"
import { useParams } from "react-router-dom"
import LockAsset from "./lockAsset";

export default function SubVaultsContainer() {
    const { id } = useParams();
  return (
    <>
        <ConnectedNavbar />
        <p>ID: {id}</p>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn" onClick={() => (document.getElementById('my_modal_4') as HTMLDialogElement).showModal()}>open modal</button>
        <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-3/4 max-w-5xl">
                <LockAsset vault={id || ''}/>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    </>
  )
}
