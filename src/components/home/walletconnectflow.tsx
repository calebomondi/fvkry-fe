// src/components/WalletConnectFlow.tsx
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';

export const CustomConnectButton = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  return (
    <ConnectButton.Custom>
      {({ openConnectModal, mounted }) => {
        if (!mounted) return null;
        
        return (
          <button
            onClick={openConnectModal}
            className="md:px-6 px-4 py-3 bg-amber-500 rounded-lg text-base font-semibold hover:bg-amber-500 hover:scale-105 transition-all flex items-center"
          >
            Start Locking Now
            <LockKeyhole className="ml-2 w-5 h-5 animate-pulse" />
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
};

export const DashboardPage = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Your Dashboard</h1>
        <div className="flex flex-col gap-2">
          <ConnectButton 
            showBalance={true}
            chainStatus="full"
            accountStatus="full"
          />
        </div>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
};