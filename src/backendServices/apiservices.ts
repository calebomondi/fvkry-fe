import axios, {AxiosResponse} from 'axios'
import { API_URL } from './apiurl'
import { LockMyAsset } from '@/types';
import { getWalletClient } from '@/blockchain-services/useFvkry';

const apiService = {
    lockAsset: async (data:LockMyAsset): Promise<any> => {
        const { address } = await getWalletClient();

        try {
            const response: AxiosResponse<any> = await axios.post(
              `${API_URL}/api/write/lockAsset`,
              {
                address,
                data
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