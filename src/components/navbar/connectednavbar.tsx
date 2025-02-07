import logo2 from "/2.png";

import { Link } from "react-router-dom";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectedNavbar() {

  return (
    <div className="navbar dark:bg-black/90">
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
              <Link to="/dashboard/">General</Link>
            </li>
            <li>
              <Link to="/dashboard/days">Days</Link>
            </li>
            <li>
              <Link to="/dashboard/weeks">Weekly</Link>
            </li>
            <li>
              <Link to="/dashboard/months">Monthly</Link>
            </li>
            <li>
              <Link to="/dashboard/years">Yearly</Link>
            </li>
            <li>
              <a>Markets</a>
              <ul className="p-2">
                <li>
                  <Link to="/dashboard/ts">Token Scanner</Link>
                </li>
                <li>
                  <Link to="/dashboard/hit">How It Works</Link>
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
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/dashboard/">General</Link>
          </li>
          <li>
            <Link to="/dashboard/days">Days</Link>
          </li>
          <li>
            <Link to="/dashboard/weeks">Weekly</Link>
          </li>
          <li>
            <Link to="/dashboard/months">Monthly</Link>
          </li>
          <li>
            <Link to="/dashboard/years">Yearly</Link>
          </li>
          <li>
            <details>
              <summary>Markets</summary>
              <ul className="p-2">
                <li>
                  <Link to="/dashboard/ts">Token Scanner</Link>
                </li>
                <li>
                  <Link to="/dashboard/hit">How It Works</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end scale-75">
        <ConnectButton />
      </div>
    </div>
  )
}
