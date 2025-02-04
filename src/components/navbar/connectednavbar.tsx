import { useState } from "react";
import { X, Menu } from "lucide-react";
import logo2 from "/2.png";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectedNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 'top-0 dark:bg-black/90 bg-white/90  backdrop-blur-md  shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between md:h-20 h-16">
            <div className="flex items-center">
              <a href="/">
                <img
                  src={logo2}
                  alt=""
                  className='md:w-14 w-10'
                />
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <ConnectButton />
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-white dark:bg-black dark: text-gray-800 backdrop-blur-md rounded-xl my-1">
            <ConnectButton />
          </div>
        )}
      </nav>
  )
}
