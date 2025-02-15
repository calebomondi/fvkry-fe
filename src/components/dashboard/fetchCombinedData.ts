import apiService from "@/backendServices/apiservices"
import { getSubVaults } from "@/blockchain-services/useFvkry"
import { VaultData } from "@/types"

const durationTypeToNumber = (period: string): number => {
    const periodMap: { [key: string]: number } = {
      'days': 1,
      'weeks': 2,
      'months': 3,
      'years': 4
    }

    const normalizedPeriod = period?.toLowerCase() || ''
    return periodMap[normalizedPeriod] || 0
}

export const mergedVaultData = async (vault:string): Promise<VaultData[]> => {
    const vaultType = durationTypeToNumber(vault)
    //get data from contract
    const subVaults = await getSubVaults(vaultType)
    //get combined data from db and contract
    const combinedData = await apiService.getCombinedVaultData(vault,subVaults)

    return combinedData
}

export const getSpecificVaultData = async (vault:string, address:string, title:string, amount:number): Promise<VaultData> => {
    //get all data
    const data = await mergedVaultData(vault);
    //get specific data
    const specificVault = data.find((vaultItem) => vaultItem.asset_address === address && vaultItem.title === title && vaultItem.amount === amount);
    //return only necessary data
    if (!specificVault) {
        throw new Error('Specific vault data not found');
    }

    return specificVault;
}