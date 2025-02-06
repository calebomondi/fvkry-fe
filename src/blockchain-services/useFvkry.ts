import { createPublicClient, createWalletClient, custom, http } from "viem";
import { contractABI, contractAddress } from "./core";
import { liskSepolia } from 'viem/chains'

//set up public cient
const publicClient = createPublicClient({
    chain: liskSepolia,
    transport: http(`${import.meta.env.VITE_LISK_RPC_URL}`)
});

//get the wallet client using browser wallet
export async function getWalletClient() {
    if(!window.ethereum) {
        throw new Error('Please install MetaMask or another web3 wallet');
    }

    const walletClient = createWalletClient({
        chain: liskSepolia,
        transport: custom(window.ethereum)
    })

    const [address] = await walletClient.requestAddresses(); 
    console.log('Connected Address: ', address)

    return {walletClient, address}
}

export async function getContractEthBalance() {
    const balance = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: contractABI,
        functionName: 'getContractETHBalance'
    });

    return balance;
}