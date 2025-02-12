import axios, {AxiosResponse} from 'axios';
import { API_URL } from './apiurl';
import { LockMyAsset, Lock } from '@/types';
import { getWalletClient } from '@/blockchain-services/useFvkry';

const apiService = {
    lockAsset: async (formData:LockMyAsset): Promise<any> => {
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
    getCombinedVaultdata: async (vaultType: string ,vaultData:Lock): Promise<any> => {
      const { address } = await getWalletClient();
      
      try {
          const response: AxiosResponse<any> = await axios.post(
            `${API_URL}/api/utils/combine`,
            {
              address,
              vaultType,
              bcData: vaultData
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