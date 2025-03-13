import axios, {AxiosResponse} from 'axios';
import { API_URL } from './apiurl';
import { Send2DB, Lock, VaultData, ScheduledData, UpdateToLock, DeleteLock, DashboardData, HealthRecord, PointsData } from '@/types';
import { getWalletClient, currentChainId } from '@/blockchain-services/useFvkry';

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
      const chainId = currentChainId()

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
            bcData: serializedVaultData,
            chainId: chainId.toString()
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        return response.data;
        
      } catch (error) {
        console.error('FETCHING COMBINED DATA FAILED:', error);
        throw error;
      }
    },
    addSchedule: async (scheduledData:ScheduledData): Promise<{status: boolean}> => {
      try {
        const response: AxiosResponse<{status: boolean}> = await axios.post(
          `${API_URL}/api/write/lockSchedule`,
          {
            scheduleData: scheduledData
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
  
        return response.data;
        
      } catch (error) {
        console.error('Setting Unlock Schedule Failed:', error);
        throw error;
      }
    },
    updateLock: async (update:UpdateToLock): Promise<{status: boolean}> => {
      const { address } = await getWalletClient();

      try {
        const response: AxiosResponse<{status: boolean}> = await axios.post(
          `${API_URL}/api/write/updateLock`,
          {
            address,
            newData: update
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
  
        return response.data;
        
      } catch (error) {
        console.error('Setting Unlock Schedule Failed:', error);
        throw error;
      }
    },
    deleteLock: async (lock:DeleteLock): Promise<{status: boolean}> => {
      const { address } = await getWalletClient();

      try {
        const response: AxiosResponse<{status: boolean}> = await axios.post(
          `${API_URL}/api/write/deleteLock`,
          {
            address,
            vault: lock
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
  
        return response.data;
        
      } catch (error) {
        console.error('Setting Unlock Schedule Failed:', error);
        throw error;
      }
    },
    analysis: async (): Promise<DashboardData> => {
      const { address } = await getWalletClient();
      const chainId = currentChainId()

      try {
        const response: AxiosResponse<DashboardData> = await axios.get(
          `${API_URL}/api/read/dashboard/analysis`,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            params: {
              userAddress: address,
              chainId: chainId.toString()
            }
          }
        );
  
        return response.data;
        
      } catch (error) {
        console.error('Getting Data Failed:', error);
        throw error;
      }
    },
    healthCheck: async (): Promise<HealthRecord[]> => {
      const { address } = await getWalletClient();

      try {
        const response: AxiosResponse<HealthRecord[]> = await axios.get(
          `${API_URL}/api/health/check`,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            params: {
              address: address
            }
          }
        );
  
        return response.data;
        
      } catch (error) {
        console.error('Getting Data Failed:', error);
        throw error;
      }
    },
    awardPoints: async (points: number): Promise<{status: boolean}> => {
      const { address } = await getWalletClient();

      try {
        const response: AxiosResponse<{status: boolean}> = await axios.post(
          `${API_URL}/api/write/awardPoints`,
          {
            address,
            points
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
  
        return response.data;
        
      } catch (error) {
        console.error('Awarding Points Failed:', error);
        throw error;
      }
    },
    getPoints: async (): Promise<PointsData[] | []> => {
      const { address } = await getWalletClient();

      try {
        const response: AxiosResponse<PointsData[] | []> = await axios.get(
          `${API_URL}/api/read/getpoints`,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            params: {
              address: address
            }
          }
        );
  
        return response.data;
        
      } catch (error) {
        console.error('Getting User Lock Data Failed:', error);
        throw error;
      }
    },
    updatePoints: async (points: number): Promise<{status: boolean}> => {
      const { address } = await getWalletClient();

      try {
        const response: AxiosResponse<{status: boolean}> = await axios.post(
          `${API_URL}/api/write/updatePoints`,
          {
            address,
            points
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
  
        return response.data;
        
      } catch (error) {
        console.error('Setting Updating Points', error);
        throw error;
      }
    }
}

export default apiService;