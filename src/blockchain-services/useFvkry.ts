import { createPublicClient, createWalletClient, custom, http } from "viem";
import { contractABI, contractAddress } from "./core";
import { liskSepolia } from 'viem/chains'
import { parseEther } from "viem";

//set up public cient
export const publicClient = createPublicClient({
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

//Write Functions
export async function createETHVault(_amount:string, _vault:number, _lockperiod:number, _title: string) {
    try {
        const { walletClient, address } = await getWalletClient();

        //convert days to seconds
        const daysToSeconds = _lockperiod * 24 * 60 * 60;

        //convert amount to wei
        const ethToWei = parseEther(_amount);

        //call function
        const { request } = await publicClient.simulateContract({
            address: contractAddress as `0x${string}`,
            abi: contractABI,
            functionName: "lockETH",
            args: [ _vault, daysToSeconds, _title],
            account: address,
            value: ethToWei
        });

        const hash = await walletClient.writeContract(request)

        return hash

    } catch (error: any) {
        console.log('Error in creating ETH sub-vault', error);

        // Check for custom contract errors
        if (error.message.includes('VaultIsFull')) {
            throw new Error('This vault has reached maximum capacity');
        }
        
        if (error.message.includes('AmountBeGreaterThan0')) {
            throw new Error('Amount must be greater than 0');
        }

        // Handle other common wallet/network errors
        if (error.message.includes('user rejected')) {
            throw new Error('Transaction rejected by user');
        }

        if (error.message.includes('insufficient funds')) {
            throw new Error('Insufficient balance for transaction');
        }

        // For any other error, throw the original message
        throw new Error(error.message || 'Transaction failed');
    }

}

//Read Functions
export async function getContractEthBalance() {
    try {
        const balance = await publicClient.readContract({
            address: contractAddress as `0x${string}`,
            abi: contractABI,
            functionName: 'getContractETHBalance'
        });
    
        return balance;
    } catch (error) {
        throw new Error("Cannot Get Contract ETH Balance!");
    }
}

//dummy token address 0x37D32Edc11F8Ed47fB4f4A9FBBA707D6047B7CDf
export async function getContractTokenBalance(address: string) {
    try {
        const balance = await publicClient.readContract({
            address: contractAddress as `0x${string}`,
            abi: contractABI,
            functionName: 'getContractTokenBalance',
            args:[address]
        });
    
        return balance;
    } catch (error) {
        throw new Error("Cannot Get Contract Token Balance!");
    }
}
