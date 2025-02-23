import { VaultData, DashboardData } from "@/types";

export const mockVaultsData: VaultData[] = [
    
]

export const mockSingleVaultData: VaultData = {
    "title": "---",
    "amount": 0,
    "start_time": "2025-02-12T07:45:58.174",
    "end_time": "2026-02-14T07:45:58.174",
    "unlock_goal_usd": 0,
    "lock_type": "goal",
    "withdrawn": false,
    "asset_address": "0x0000000000000000000000000000000000000000",
    "asset_symbol": "---",
    "unlock_schedule": 0,
    "next_unlock": "2025-02-19T09:00:00.000",
    "unlock_amount": 0,
    "decimals": 18,
    "unlock_type": "linear"
}

export const mockDashboardData: DashboardData = {
    "userAddress": "0x0000000000000000000000000000000000000000",
    "totalVaults": 0,
    "avgLockDays": 0,
    "avgLockDaysByAsset": [
      
    ],
    "uniqueAssets": [
      
    ],
    "upcomingUnlocks": [
      
    ],
    "assetTotals": [
      
    ],
    "assetValues": [
      
    ],
    "totalValueUSD": 0,
    "lockTypeCounts": {
      "fixed": 0,
      "goal": 0
    },
    "lockTypeByAsset": {
      
    },
    "durationDistribution": {
      "days": 0,
      "weeks": 0,
      "months": 0
    },
    "monthlyActivity": [
      
    ],
    "vaults": [
    ]
}
