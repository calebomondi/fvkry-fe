import { createPublicClient, createWalletClient, custom, http, parseEther, getContract, parseUnits } from "viem";
import { contractABI, contractAddress } from "./core";
import { liskSepolia } from 'viem/chains'
import { Lock } from "@/types";

import { ApproveTokenParams, TokenVaultParams } from "@/types";

import { getTokenConfig } from "./tokens";

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
        const daysToSeconds = BigInt(_lockperiod * 24 * 60 * 60);

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

async function approveToken({symbol, amount}: ApproveTokenParams) {
    try {
        const { walletClient, address } = await getWalletClient();

        //get token
        const token = getTokenConfig(symbol);

        //get contract instance
        const contract = getContract({
            address: token.address,
            abi: token.abi,
            client : {
                public: publicClient,
                wallet: walletClient
            }
        });

        //convert to proper decimals
        const amountInWei = parseUnits(amount.toString(), token.decimals);

        //send approve transaction
        const hash = await contract.write.approve([contractAddress, amountInWei], { account: address });

        // Wait for transaction confirmation
        const receipt = await publicClient.waitForTransactionReceipt({ hash });

        console.log(`receipt => ${receipt}`)

        return {
            receipt,
            tokenAddress: token.address,
            amount: amountInWei,
            walletClient,
            address
        };
    } catch(error: any) {
        throw new Error(`Error approving ${symbol} tokens`)
    }

}   

export async function createTokenVault({ symbol, amountT, vault, lockPeriod, title }: TokenVaultParams) {
    try {
        //aprove token
        const { tokenAddress, amount: approvedAmount, walletClient, address} = await approveToken({symbol: symbol, amount: BigInt(amountT)});

        //convert days to seconds
        const daysToSeconds = BigInt(lockPeriod * 24 * 60 * 60);

        //call function
        const { request } = await publicClient.simulateContract({
            address: contractAddress as `0x${string}`,
            abi: contractABI,
            functionName: "lockToken",
            args: [ tokenAddress, approvedAmount, vault, daysToSeconds, title],
            account: address
        });

        const hash = await walletClient.writeContract(request)

        return hash
    } catch (error) {
        if (error instanceof Error) {
            // Check for common contract errors
            if (error.message.includes('VaultIsFull')) {
              throw new Error('Vault has reached maximum capacity');
            }
            if (error.message.includes('TokenIsBlackListed')) {
              throw new Error(`Token ${symbol} is blacklisted`);
            }
            if (error.message.includes('InadequateTokenBalance')) {
              throw new Error('Insufficient token balance');
            }
            if (error.message.includes('InvalidTokenAddress')) {
              throw new Error('Invalid token address provided');
            }
        }

        // Re-throw other errors
        throw error;
    }
}

export async function addToEthVault(_vault:number, _index:number, _amount:string) {
    try {
        const { walletClient, address } = await getWalletClient();

        //convert amount to wei
        const ethToWei = parseEther(_amount);

        //call function
        const { request } = await publicClient.simulateContract({
            address: contractAddress as `0x${string}`,
            abi: contractABI,
            functionName: "addToLockedETH",
            args: [ _vault, _index],
            account: address,
            value: ethToWei
        });

        const hash = await walletClient.writeContract(request)

        return hash

    } catch (error: any) {
        // Check for custom contract errors
        if (error.message.includes('InvalidAssetID')) {
            throw new Error('This assetID entered is Invalid!');
        }
        
        if (error.message.includes('LockPeriodExpired')) {
            throw new Error('Lock Period Has Expired!');
        }

        // Handle other common wallet/network errors
        if (error.message.includes('user rejected')) {
            throw new Error('Transaction rejected by user');
        }

        if (error.message.includes('insufficient funds')) {
            throw new Error('Insufficient balance for transaction');
        }
    }
}

export async function addToTokenVault(_vault:number, _index:number, _symbol:string, _amount:string) {
    try {
        //aprove token
        const { tokenAddress, amount: approvedAmount, walletClient, address} = await approveToken({symbol: _symbol, amount: BigInt(_amount)});

        //call function
        const { request } = await publicClient.simulateContract({
            address: contractAddress as `0x${string}`,
            abi: contractABI,
            functionName: "addToLockedTokens",
            args: [ tokenAddress, _index, approvedAmount, _vault],
            account: address
        });

        const hash = await walletClient.writeContract(request)

        return hash
    } catch (error) {
        if (error instanceof Error) {
            // Check for common contract errors
            if (error.message.includes('TokenIsBlackListed')) {
              throw new Error(`Token ${_symbol} is blacklisted`);
            }
            if (error.message.includes('InadequateTokenBalance')) {
              throw new Error('Insufficient token balance');
            }
            if (error.message.includes('InvalidTokenAddress')) {
              throw new Error('Invalid token address provided');
            }
        }

        // Re-throw other errors
        throw error;
    }
}

export async function withdrawAsset(_index:number, _vault:number, _amount:string, _goal:boolean, _decimals:number, _symbol:string) {
    try {
        const { walletClient, address } = await getWalletClient();

        //parse amount
        let parsedAmount;
        if(_symbol === 'ETH') {
            parsedAmount = parseEther(_amount)
        } else {
            parsedAmount = parseUnits(_amount, _decimals)
        }

        //call function
        const { request } = await publicClient.simulateContract({
            address: contractAddress as `0x${string}`,
            abi: contractABI,
            functionName: "withdrawAsset",
            args: [ _index, _vault, parsedAmount, _goal],
            account: address
        });

        const hash = await walletClient.writeContract(request)

        return hash

    } catch (error: any) {
        console.log('Error in Withdrawing', error);

        // Check for custom contract errors
        if (error.message.includes('InvalidAssetID')) {
            throw new Error('Invalid Asset ID');
        }
        
        if (error.message.includes('VaultHasBeenFullyWithdrawn')) {
            throw new Error('Vault has been fully withdrawn');
        }

        if (error.message.includes('NotEnoughToWithdraw')) {
            throw new Error('Insufficient balance to withdraw');
        }
        
        if (error.message.includes('LockPeriodNotExpiredAndGoalNotReached')) {
            throw new Error('Lock period not expired and goal not reached');
        }

        if (error.message.includes('ETHTransferFailed')) {
            throw new Error('ETH transfer failed');
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

export async function getSubVaults(vault: number): Promise<Lock[]> {
    const { address } = await getWalletClient();
    try {
      const data = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: contractABI,
        functionName: 'getUserLocks',
        args: [vault],
        account: address
      }) as Lock[]

      // Ensure the data is properly typed
      return data.map((lock, index) => ({
        token: lock.token,
        amount: BigInt(lock.amount.toString()),
        lockEndTime: Number(lock.lockEndTime),
        title: lock.title,
        withdrawn: lock.withdrawn,
        isNative: lock.isNative,
        vaultType: vault,
        lockIndex: index
      }))
    } catch (error) {
      console.error('Error fetching vault data:', error)
      throw new Error("Cannot Get Vault Data!")
    }
}

//dummy token address 0x37D32Edc11F8Ed47fB4f4A9FBBA707D6047B7CDf - humanade(MAN)
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
