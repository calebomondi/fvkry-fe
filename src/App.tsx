import MyRoutes from "./components/Routes/routes"

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  lisk,
  base,
  liskSepolia,
  baseSepolia,
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'FVKRY PRVNTA',
  projectId: 'd197c1d5cc4f7d7adc34f24682989fca',
  chains: [mainnet, lisk, base, liskSepolia, baseSepolia, sepolia],
});

const queryClient = new QueryClient();

function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <MyRoutes />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
