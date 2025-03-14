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
    "unlock_type": "linear",
    "chainId": ""
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

export const dummyTokenTransactions = [
  {
    "timestamp": 1738438379,
    "formattedDate": "2025-02-01T19:32:59.000Z",
    "token": {
      "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "name": "Tether USD",
      "symbol": "USDT",
      "decimals": 6
    },
    "priceInfo": {
      "priceAtTransaction": 1.00,
      "currency": "USD",
      "priceNow": 1.00
    },
    "transfer": {
      "rawValue": "6651073963",
      "tokenAmount": 6651.07,
      "value_now": 6648.58,
      "value_then": 6650.76,
      "value_diff": -2.18
    }
  },
  {
    "timestamp": 1723403015,
    "formattedDate": "2024-08-11T19:03:35.000Z",
    "token": {
      "address": "0x6fc13eace26590b80cccab1ba5d51890577d83b2",
      "name": "Umbrella Network",
      "symbol": "UMB",
      "decimals": 18
    },
    "priceInfo": {
      "priceAtTransaction": 0.01,
      "currency": "USD",
      "priceNow": 0.00
    },
    "transfer": {
      "rawValue": "4714899845864328174075",
      "tokenAmount": 4714.90,
      "value_now": 21.51,
      "value_then": 34.73,
      "value_diff": -13.22
    }
  },
  {
    "timestamp": 1735582411,
    "formattedDate": "2025-01-30T08:40:11.000Z",
    "token": {
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "name": "Wrapped Ether",
      "symbol": "WETH",
      "decimals": 18
    },
    "priceInfo": {
      "priceAtTransaction": 2950.48,
      "currency": "USD",
      "priceNow": 3212.75
    },
    "transfer": {
      "rawValue": "420000000000000000",
      "tokenAmount": 0.42,
      "value_now": 1349.36,
      "value_then": 1239.20,
      "value_diff": 110.16
    }
  },
  {
    "timestamp": 1730842652,
    "formattedDate": "2024-12-06T12:30:52.000Z",
    "token": {
      "address": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      "name": "Wrapped Bitcoin",
      "symbol": "WBTC",
      "decimals": 8
    },
    "priceInfo": {
      "priceAtTransaction": 84250.32,
      "currency": "USD",
      "priceNow": 91845.18
    },
    "transfer": {
      "rawValue": "5614286",
      "tokenAmount": 0.06,
      "value_now": 5142.33,
      "value_then": 4718.02,
      "value_diff": 424.31
    }
  },
  {
    "timestamp": 1733779625,
    "formattedDate": "2025-01-09T13:20:25.000Z",
    "token": {
      "address": "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
      "name": "Polygon",
      "symbol": "MATIC",
      "decimals": 18
    },
    "priceInfo": {
      "priceAtTransaction": 1.82,
      "currency": "USD",
      "priceNow": 1.45
    },
    "transfer": {
      "rawValue": "1547000000000000000000",
      "tokenAmount": 1547.00,
      "value_now": 2243.15,
      "value_then": 2815.54,
      "value_diff": -572.39
    }
  },
  {
    "timestamp": 1728395742,
    "formattedDate": "2024-11-08T02:49:02.000Z",
    "token": {
      "address": "0x6b175474e89094c44da98b954eedeac495271d0f",
      "name": "Dai Stablecoin",
      "symbol": "DAI",
      "decimals": 18
    },
    "priceInfo": {
      "priceAtTransaction": 0.99,
      "currency": "USD",
      "priceNow": 1.00
    },
    "transfer": {
      "rawValue": "4250000000000000000000",
      "tokenAmount": 4250.00,
      "value_now": 4250.00,
      "value_then": 4207.50,
      "value_diff": 42.50
    }
  },
  {
    "timestamp": 1736821563,
    "formattedDate": "2025-01-14T09:32:43.000Z",
    "token": {
      "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      "name": "Uniswap",
      "symbol": "UNI",
      "decimals": 18
    },
    "priceInfo": {
      "priceAtTransaction": 8.45,
      "currency": "USD",
      "priceNow": 7.28
    },
    "transfer": {
      "rawValue": "682500000000000000000",
      "tokenAmount": 682.50,
      "value_now": 4968.60,
      "value_then": 5767.13,
      "value_diff": -798.53
    }
  },
  {
    "timestamp": 1724968430,
    "formattedDate": "2024-08-29T14:33:50.000Z",
    "token": {
      "address": "0x514910771af9ca656af840dff83e8264ecf986ca",
      "name": "ChainLink Token",
      "symbol": "LINK",
      "decimals": 18
    },
    "priceInfo": {
      "priceAtTransaction": 14.28,
      "currency": "USD",
      "priceNow": 18.75
    },
    "transfer": {
      "rawValue": "345800000000000000000",
      "tokenAmount": 345.80,
      "value_now": 6483.75,
      "value_then": 4938.02,
      "value_diff": 1545.73
    }
  },
  {
    "timestamp": 1737685291,
    "formattedDate": "2025-01-24T10:14:51.000Z",
    "token": {
      "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "name": "USD Coin",
      "symbol": "USDC",
      "decimals": 6
    },
    "priceInfo": {
      "priceAtTransaction": 1.00,
      "currency": "USD",
      "priceNow": 1.00
    },
    "transfer": {
      "rawValue": "9825000000",
      "tokenAmount": 9825.00,
      "value_now": 9825.00,
      "value_then": 9825.00,
      "value_diff": 0.00
    }
  },
  {
    "timestamp": 1726583941,
    "formattedDate": "2024-09-17T07:32:21.000Z",
    "token": {
      "address": "0x4fabb145d64652a948d72533023f6e7a623c7c53",
      "name": "Binance USD",
      "symbol": "BUSD",
      "decimals": 18
    },
    "priceInfo": {
      "priceAtTransaction": 1.00,
      "currency": "USD",
      "priceNow": 0.00
    },
    "transfer": {
      "rawValue": "7340000000000000000000",
      "tokenAmount": 7340.00,
      "value_now": 0.00,
      "value_then": 7340.00,
      "value_diff": -7340.00
    }
  }
];
