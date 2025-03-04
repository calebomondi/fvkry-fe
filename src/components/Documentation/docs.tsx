import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Book, Lock, Wallet, Code, LockKeyhole } from 'lucide-react';
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
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <div className='space-y-2 mb-4'>
                <p>• A dashboard that show a summary of yout locked assets in details</p>
                <p>• Lock ETH and ERC-20 tokens for a specified duration or goal.</p>
                <p>• Add unlock schedule to a vault to unlock portions of the locked asset over a given period of time.</p>
                <p>• Add more assets to an existing locked vault.</p>
                <p>• Withdraw assets upon lock period expiration.</p>
                <p>• Partial and full withdrawal options</p>
            </div>
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
          <h2 className="text-2xl font-bold mb-4">Connecting Your Wallet</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Install a Web3 wallet (MetaMask, WalletConnect)</li>
            <li>Ensure you're on the correct network</li>
            <li>Click "Connect Wallet" in the main interface</li>
            <li>Approve the connection in your wallet</li>
          </ol>
        </div>
      )
    },
    {
      id: 'locking-assets',
      title: 'Locking Assets',
      icon: <Lock className="mr-2" />,
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">How to Lock Your Assets</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Step 1: Select Asset</h3>
              <p>Choose the cryptocurrency or token you wish to lock</p>
            </div>
            <div>
              <h3 className="font-semibold">Step 2: Define Lock Parameters</h3>
              <ul className="list-disc pl-6">
                <li>Amount to lock</li>
                <li>Lock duration</li>
                <li>Withdrawal conditions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Step 3: Confirm Transaction</h3>
              <p>Review and confirm the lock transaction in your wallet</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'smart-contract',
      title: 'Smart Contract',
      icon: <Code className="mr-2" />,
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">Smart Contract Details</h2>
          <div className="space-y-4">
            <p>Our asset locking smart contract is designed with security and transparency in mind.</p>
            <div>
              <h3 className="font-semibold">Key Features:</h3>
              <ul className="list-disc pl-6">
                <li>Time-based asset locking</li>
                <li>Configurable lock periods</li>
                <li>Transparent unlock conditions</li>
                <li>No intermediate custody</li>
              </ul>
            </div>
          </div>
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