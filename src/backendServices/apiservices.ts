import axios, {AxiosResponse} from 'axios';
import { API_URL } from './apiurl';
import { Send2DB, Lock, VaultData } from '@/types';
import { getWalletClient } from '@/blockchain-services/useFvkry';

const apiService = {
    lockAsset: async (formData:Send2DB): Promise<any> => {
        const { address } = await getWalletClient();
        
        try {
          const response: AxiosResponse<any> = await axios.post(
            `${API_URL}/api/write/lockAsset`,
            {
              address,
              lockData: formData
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
    
          return response.data;
          
        } catch (error) {
          console.error('Asset Locking Failed:', error);
          throw error;
        }
    },
    getCombinedVaultData: async (vaultData:Lock[]): Promise<VaultData[]> => {
      const { address } = await getWalletClient();

      // Convert the vaultData to make it JSON-serializable
      const serializedVaultData = vaultData.map(vault => ({
        ...vault,
        // Convert BigInt to string
        amount: vault.amount.toString(),
        // Convert other BigInt fields if they exist
        lockEndTime: vault.lockEndTime.toString()
      }));
      
      try {
          const response: AxiosResponse<VaultData[]> = await axios.post(
            `${API_URL}/api/utils/combine`,
            {
              address,
              bcData: serializedVaultData
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
    
          return response.data;
          
        } catch (error) {
          console.error('Asset Locking Failed:', error);
          throw error;
        }
  },
}

export default apiService;