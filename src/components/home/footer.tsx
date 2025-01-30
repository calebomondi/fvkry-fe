import { useState } from 'react';
import { Shield, Github, CheckCircle, Twitter } from 'lucide-react';

export default function Footer() {
    const [showNotification, setShowNotification] = useState(false);

  return (
    <>
    {/* Notification */}
    
    {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Thank you for subscribing!</span>
          </div>
        </div>
      )}

    <footer className="bg-amber-600 text-white ">
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex md:items-center justify-between md:flex-row flex-col">
                <div>
                <h3 className="text-xl font-bold mb-4">FVKRY PRVNTA</h3>
                <p className="">Secure crypto savings platform</p>
                <div className="mt-4">
                    <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white text-gray-800 rounded px-4 py-2 w-full focus:outline-amber-800"
                    />
                    <button
                    onClick={() => {
                        setShowNotification(true);
                        setTimeout(() => setShowNotification(false), 3000);
                    }}
                    className="mt-2 px-4 py-2 rounded w-full hover:bg-opacity-90 transition-all border border-white shadow-sm"
                    >
                    Subscribe to Updates
                    </button>
                </div>
                </div>
                <div className='mt-4 '>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                    <li className="hover:scale-105 transition-colors cursor-pointer">About</li>
                    <li className="hover:text-golden transition-colors cursor-pointer">Features</li>
                    <li className="hover:text-golden transition-colors cursor-pointer">Documentation</li>
                    <li className="hover:text-golden transition-colors cursor-pointer">Support</li>
                </ul>
                </div>
                <div className='mt-4'>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 ">
                    <li className="hover:text-golden transition-colors cursor-pointer">Terms of Service</li>
                    <li className="hover:text-golden transition-colors cursor-pointer">Privacy Policy</li>
                    <li className="hover:text-golden transition-colors cursor-pointer">Risk Disclosure</li>
                    <li className="hover:text-golden transition-colors cursor-pointer">Data Protection</li>
                </ul>
                </div>
            <div className='mt-4'>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-golden transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-golden transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
              <div className="mt-4">
                <h5 className="text-sm font-semibold mb-2">Our Communities</h5>
                <ul className="space-y-2 ">
                  <li className="hover:text-golden transition-colors cursor-pointer">Telegram Group</li>
                  <li className="hover:text-golden transition-colors cursor-pointer">Discord Server</li>
                  <li className="hover:text-golden transition-colors cursor-pointer">Reddit</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t dark:border-w-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className=" text-sm">
                &copy; {new Date().getFullYear()} FVKRY PRVNTA. All rights reserved.
              </p>
              <div className="flex items-center mt-4 md:mt-0">
                <span className="flex items-center  text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Smart Contracts Audited by
                  <a href="#" className="text-golden hover:text-golden/80 ml-1">
                    CertiK
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
