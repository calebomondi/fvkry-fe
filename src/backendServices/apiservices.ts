import axios, {AxiosResponse} from 'axios'
import { API_URL } from './apiurl'

const apiService = {
    lockETH: async (parsedData:any): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.post(
              `${API_URL}/api/admin/upload/teachers`,
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
            console.error('Error in uploadTeachers:', error);
            throw error;
          }
    },
}

export default apiService;