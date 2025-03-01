import logo2 from "/2.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LockAsset from "../dashboard/lockAsset";
import { useAccount } from "wagmi";
import { CustomConnectButton } from "../walletconnect/walletconnect";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CircleUserIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function ConnectedNavbar() {
  const { isConnected } = useAccount();
  const location = useLocation();
  const [path,setPath] = useState<string>('dashboard');
  
  useEffect(() => {
    const path = location.pathname.substring(1);
    const pathSegments = path.split('/');
    const firstSegment = pathSegments[0];
    console.log("FS: ",firstSegment);
    setPath(firstSegment);
  }, [])

  return (
    <div className="navbar dark:bg-black/90 bg-white sticky top-0 shadow-md z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li className={path === 'dashboard' ? 'text-amber-600' : ''}>
              <Link to="/dashboard/">Dashboard</Link>
            </li>
            <li>
              <Link to="/myvaults/">My Vaults</Link>
            </li>
            <li>
              <Link to="/rewards/">Rewards</Link>
            </li>
            <li>
              <a>More</a>
              <ul className="p-2">
                <li>
                  <Link to="/transactions/">Transactions</Link>
                </li>
                <li className={path === 'financialHealth' ? 'text-amber-600' : ''}>
                  <Link to="/financialHealth/">Financial Health</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <a href="/">
            <img
              src={logo2}
              alt=""
              className='md:w-11 w-10'
            />
          </a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold">
          <li className={path === 'dashboard' ? 'text-amber-600' : ''}>
            <Link to="/dashboard/">Dashboard</Link>
          </li>
          <li className={path === 'myvaults' ? 'text-amber-600' : ''}>
            <Link to="/myvaults/">My Vaults</Link>
          </li>
          <li className={path === 'rewards' ? 'text-amber-600' : ''}>
            <Link to="/rewards/">Rewards</Link>
          </li>
          <li>
            <details>
              <summary>More</summary>
              <ul className="p-2 dark:bg-black/90 rounded-md">
                <li className={path === 'transactions' ? 'text-amber-600' : ''}>
                  <Link to="/transactions/">Transactions</Link>
                </li>
                <li className={path === 'financialHealth' ? 'text-amber-600' : ''}>
                  <Link to="/financialHealth/">Financial Health</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end scale-75">
        <button className={`${!isConnected && 'hidden'} btn rounded-md border-none text-base bg-amber-500 text-white font-semibold hover:scale-95 hover:bg-amber-600`} onClick={() => (document.getElementById('my_modal_4') as HTMLDialogElement).showModal()}>
          Lock
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <LockAsset />             
          </div>
        </dialog>
        <div className="hidden md:block ml-4">
          {isConnected ? <ConnectButton /> :<CustomConnectButton />}
        </div>
        <button className="md:hidden btn rounded-md border-none text-base bg-transparent font-semibold hover:scale-95" onClick={() => (document.getElementById('my_modal_5') as HTMLDialogElement).showModal()}>
          <CircleUserIcon className="w-10 h-10"/>
        </button>
        <dialog id="my_modal_5" className="modal">
          <div className="modal-box">
              <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              {isConnected ? <ConnectButton /> :<CustomConnectButton />}              
          </div>
        </dialog>
      </div>
    </div>
  )
}
