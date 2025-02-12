import logo2 from "/2.png";

import { Link } from "react-router-dom";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import LockAsset from "../dashboard/lockAsset";

export default function ConnectedNavbar() {

  return (
    <div className="navbar dark:bg-black/90 sticky top-0">
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
            <li>
              <Link to="/dashboard/">Dashboard</Link>
            </li>
            <li>
              <a>My Vaults</a>
              <ul className="p-2">
                <li>
                  <Link to="/dashboard/days">Days</Link>
                </li>
                <li>
                  <Link to="/dashboard/weeks">Weeks</Link>
                </li>
                <li>
                  <Link to="/dashboard/months">Months</Link>
                </li>
                <li>
                  <Link to="/dashboard/years">Years</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/dashboard/ts">Token Scanner</Link>
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
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/dashboard/">Dashboard</Link>
          </li>
          <li>
            <details>
              <summary>My Vaults</summary>
              <ul className="p-2">
                <li>
                  <Link to="/dashboard/days">Days</Link>
                </li>
                <li>
                  <Link to="/dashboard/weeks">Weeks</Link>
                </li>
                <li>
                  <Link to="/dashboard/months">Months</Link>
                </li>
                <li>
                  <Link to="/dashboard/years">Years</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link to="/dashboard/ts">Token Scanner</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end scale-75">
        <button className="btn rounded-md border-none text-base bg-amber-500 text-white font-semibold hover:scale-95 hover:bg-amber-600" onClick={() => (document.getElementById('my_modal_4') as HTMLDialogElement).showModal()}>
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
          <ConnectButton />
        </div>
        <button className="md:hidden btn rounded-md border-none text-base bg-transparent text-white font-semibold hover:scale-95" onClick={() => (document.getElementById('my_modal_5') as HTMLDialogElement).showModal()}>
          account
        </button>
        <dialog id="my_modal_5" className="modal">
          <div className="modal-box">
              <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <ConnectButton />              
          </div>
        </dialog>
      </div>
    </div>
  )
}
