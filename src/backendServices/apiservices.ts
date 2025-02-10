import axios, {AxiosResponse} from 'axios'
import { API_URL } from './apiurl'

const apiService = {
    lockAsset: async (parsedData:any): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.post(
              `${API_URL}/api/write/lockAsset`,
              {
                data: parsedData
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