import apiService from "@/backendServices/apiservices"
import { getSubVaults, getTransanctions } from "@/blockchain-services/useFvkry"
import { VaultData, Transaction } from "@/types"

export const mergedVaultData = async (): Promise<VaultData[]> => {
    const vaultTypes = [1, 2, 3, 4]
    //fetch all subvaults concurrently
    const subVaults = await Promise.all(
        vaultTypes.map(type => getSubVaults(type))
    )
    //get combined data from db and contract
    const combinedData = await apiService.getCombinedVaultData(subVaults.flat())

    return combinedData
}

export const getSpecificVaultData = async (address:string, title:string, amount:number): Promise<VaultData> => {
    const data = await mergedVaultData()
    //get specific data
    const specificVault = data.find((vaultItem) => vaultItem.asset_address === address && vaultItem.title === title && vaultItem.amount === amount);
    //return only necessary data
    if (!specificVault) {
        throw new Error('Specific vault data not found');
    }

    return specificVault;
}

export const getTransactionsData = async (): Promise<Transaction[]> => {
    const vaultTypes = [1, 2, 3, 4]
    //fetch all subvaults concurrently
    const subVaults = await Promise.all(
        vaultTypes.map(type => getTransanctions(type))
    )

    return subVaults.flat()
}