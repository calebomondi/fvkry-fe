import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Book, Wallet, LockKeyhole } from 'lucide-react';
import logo2 from "/2.png";
import banner from "/fp_banner.png"
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Define the structure for documentation sections
interface DocSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const Documentation: React.FC = () => {
  // Predefined documentation sections
  const docSections: DocSection[] = [
    {
      id: 'overview',
      title: 'Overview',
      icon: <Book className="mr-2" />,
      content: (
        <div>
            <div className='my-2'>
                <img
                    src={banner}
                    alt=""
                    className='w-full rounded-md max-h-[250px]'
                />
            </div>
            <h2 className="text-3xl font-bold mb-4">What Is Fvkry Prvnta?</h2>
            <p className='mb-4'>
                FVKRY PRVNTA is a blockchain-based virtual assets and crypto locking platform that aims to enhance financial discipline and promote long-term saving among 
                cryptocurrency and virtual asset owners. It allows users to check their impulsive spending and trading habits by allowing them to lock their ETH and ERC-20 tokens 
                in secure vaults that can only be accessed after a predefined lock period ranging from days, weeks, months and upto years.
            </p>
            <hr className='mb-4'/>
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <div className='space-y-2 mb-4'>
                <p>• A dashboard that show a summary of yout locked assets in details</p>
                <p>• Lock ETH and ERC-20 tokens for a specified duration or goal.</p>
                <p>• Add unlock schedule to a vault to unlock portions of the locked asset over a given period of time.</p>
                <p>• Add more assets to an existing locked vault.</p>
                <p>• Withdraw assets upon lock period expiration.</p>
                <p>• Partial and full withdrawal options</p>
            </div>
            <hr className='mb-4'/>
            <h2 className="text-3xl font-bold mb-4">Use Cases</h2>
            <div className='space-y-2 mb-4'>
                <p><span className='font-semibold'>Short and Long Term Savings:</span> You can lock your assets for days, weeks, months and upto years</p>
                <p><span className='font-semibold'>Check Impulsive Spanding or Trading:</span> You can set up and unlock schedule that will allow you to access a portion of your locked assets for defined intervals during the lock period.</p>
            </div>
        </div>
      )
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Wallet className="mr-2" />,
      content: (
        <div>
          <h2 className="text-3xl font-bold mb-4">Connecting Your Wallet</h2>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Install a Web3 wallet (MetaMask, WalletConnect).</li>
            <li>Ensure you're on the correct network (Lisk Sepolia | Ethereum Sepolia).</li>
            <li>Click "Connect Wallet" in the main interface.</li>
            <li>Approve the connection in your wallet.</li>
          </ol>
          <hr className='mb-4'/>
          <h2 className="text-3xl font-bold mb-4">Locking Your Asset</h2>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Click the 'Lock' button on the dashboard to open the modal form.</li>
            <li>Enter the details of the asset ( ETH or ERC20 token ) you want to lock on the form fields.</li>
            <li>Click the Lock button the form to initiate the asset transfer.</li>
            <li>Confirm the transaction on your wallet.</li>
            <li>Check 'My Vaults' for the vault you have created.</li>
            <li>Check 'Transaction' for the transaction of the new vault.</li>
          </ol>
          <hr className='mb-4'/>
          <h2 className="text-3xl font-bold mb-4">Adding More Asset</h2>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Navigate to the 'My Vaults' section.</li>
            <li>Search and select the vault you want to add to and click the 'View Details' button.</li>
            <li>Click the 'Add To Lock' button to open the form modal.</li>
            <li>Enter the amount of the asset you want to add and click the 'ADD' button</li>
            <li>Confirm the transfer transaction on your wallet.</li>
            <li>View your vault for the added asset</li>
            <li>Check 'Transaction' for the transaction of the added asset.</li>
          </ol>
          <hr className='mb-4'/>
          <h2 className="text-3xl font-bold mb-4">Adding Unlock Schedule</h2>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Navigate to the 'My Vaults' section <span className='italic'>(The Vault should be fixed-based)</span>.</li>
            <li>Search and select the vault you want to add an unlock schedule to and click the 'View Details' button.</li>
            <li>Click the 'Add Unlock Schedule' button to open the form modal.</li>
            <li>Enter the amount of the asset you want to unlock, the unlock frequency and the number of days</li>
            <li>Confirm the the schedule and click the 'ADD SCHEDULE' button.</li>
            <li>View the unlock schedule on the vaults details page.</li>
          </ol>
          <hr className='mb-4'/>
          <h2 className="text-3xl font-bold mb-4">Withdrawing Your Asset</h2>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Navigate to the 'My Vaults' section.</li>
            <li>Search and select the vault you want to withdraw from and click the 'View Details' button.</li>
            <li>Click the 'Withdraw' button to open the form modal.</li>
            <li>Enter the amount of the asset you want to withdraw and click the 'Withdraw' button.</li>
            <li>Confirm the withdrawal transaction on your wallet.</li>
            <li>View your vault for the new balance.</li>
            <li>Check your wallet balance.</li>
            <li>Check 'Transaction' for the transaction of the withdrawal.</li>
          </ol>
          <hr className='mb-4'/>
          <h2 className="text-3xl font-bold mb-4">Delete A Vault</h2>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Navigate to the 'My Vaults' section.</li>
            <li>Search and select the vault you want to delete and click the 'View Details' button.</li>
            <li>Make sure the vault has no asset, if so, withdraw all the assets.</li>
            <li>Click the 'Delete' button </li>
            <li>Confirm the deletion transaction on your wallet.</li>
          </ol>
          <hr className='mb-4'/>
          <h2 className="text-3xl font-bold mb-4">Claim Fvkry Points</h2>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Navigate to the 'Financial Health' section.</li>
            <li>Click the 'Claim Points' button (Points are claimed once every 100 days)</li>
            <li>You'll be navigated to the 'Rewards' section where you can view your total points.</li>
            <li>Points can be redeemed to tokens if lock any asset for upto 100 days</li>
            <li>The Points to redeem we'll be dependanct on the total amount of points</li>
          </ol>
        </div>
      )
    }
  ];
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState<string>(docSections[0].id);

  const handleDash = () => {
    navigate("/dashboard");
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 p-4 border-r border-gray-600">
        <div className="flex items-center justify-evenly mb-6">
            <a href="/">
                <img
                    src={logo2}
                    alt=""
                    className='md:w-10 w-10'
                />
            </a>
            <h1 className="text-xl font-bold">Documentation</h1>
        </div>
        <nav>
          {docSections.map((section) => (
            <button
              key={section.id}
              className={`flex items-center w-full p-2 text-left rounded-md mb-2 ${
                activeSection === section.id 
                  ? 'bg-amber-600 text-white' 
                  : 'hover:bg-amber-500'
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.icon}
              {section.title}
            </button>
          ))}
        </nav>
        <div className='grid place-items-center my-10'>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:px-5 px-3 py-2 bg-amber-500 rounded-lg text-base font-semibold hover:bg-amber-500 hover:scale-105 transition-all flex items-center"
                onClick={handleDash}
            >
                Start Locking
                <LockKeyhole className="ml-2 w-5 h-5 animate-pulse" />
            </motion.button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <Card className="w-full max-w-7xl mx-auto border-none">
          <CardContent>
            {docSections.find(section => section.id === activeSection)?.content}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documentation;