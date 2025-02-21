import { VaultData, DashboardData } from "@/types";

export const mockVaultsData: VaultData[] = [
    {
        "title": "ETH Staking Reserve",
        "amount": 0.5,
        "start_time": "2025-02-12T07:45:58.174",
        "end_time": "2026-02-12T07:45:58.174",
        "unlock_goal_usd": 1000,
        "lock_type": "goal",
        "withdrawn": false,
        "asset_address": "0x0000000000000000000000000000000000000000",
        "asset_symbol": "ETH",
        "unlock_schedule": 0,
        "next_unlock": "2026-05-01T09:00:00.000",
        "unlock_amount": 0,
        "decimals": 18,
        "unlock_type": "linear"
    },
    {
        "title": "USDC Savings",
        "amount": 500,
        "start_time": "2025-01-15T10:30:00.000",
        "end_time": "2025-07-15T10:30:00.000",
        "unlock_goal_usd": 0,
        "lock_type": "fixed",
        "withdrawn": false,
        "asset_address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "asset_symbol": "USDC",
        "unlock_schedule": 30,
        "next_unlock": "2025-02-15T10:30:00.000",
        "unlock_amount": 83.33,
        "decimals": 18,
        "unlock_type": "linear"
    },
    {
        "title": "WBTC Long Term Hold",
        "amount": 0.025,
        "start_time": "2025-02-01T00:00:00.000",
        "end_time": "2027-02-01T00:00:00.000",
        "unlock_goal_usd": 5000,
        "lock_type": "goal",
        "withdrawn": false,
        "asset_address": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        "asset_symbol": "WBTC",
        "unlock_schedule": 0,
        "next_unlock": "2026-05-01T09:00:00.000",
        "unlock_amount": 0,
        "decimals": 18,
        "unlock_type": "linear"
    },
    {
        "title": "UNI DCA Strategy",
        "amount": 100,
        "start_time": "2025-02-10T15:20:00.000",
        "end_time": "2025-08-10T15:20:00.000",
        "unlock_goal_usd": 0,
        "lock_type": "fixed",
        "withdrawn": false,
        "asset_address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        "asset_symbol": "UNI",
        "unlock_schedule": 30,
        "next_unlock": "2025-03-10T15:20:00.000",
        "unlock_amount": 16.67,
        "decimals": 18,
        "unlock_type": "linear"
    }
]

export const mockSingleVaultData: VaultData = {
    "title": "ETH Staking Reserve",
    "amount": 0.5,
    "start_time": "2025-02-12T07:45:58.174",
    "end_time": "2026-02-14T07:45:58.174",
    "unlock_goal_usd": 1000,
    "lock_type": "goal",
    "withdrawn": false,
    "asset_address": "0x0000000000000000000000000000000000000000",
    "asset_symbol": "ETH",
    "unlock_schedule": 0,
    "next_unlock": "2025-02-19T09:00:00.000",
    "unlock_amount": 0,
    "decimals": 18,
    "unlock_type": "linear"
}

export const mockDashboardData: DashboardData = {
    "userAddress": "0x0000000000000000000000000000000000000000",
    "totalVaults": 12,
    "avgLockDays": 45.25,
    "avgLockDaysByAsset": [
      {
        "symbol": "ETH",
        "avgDays": 21.5
      },
      {
        "symbol": "USDC",
        "avgDays": 60.75
      },
      {
        "symbol": "LINK",
        "avgDays": 30.25
      },
      {
        "symbol": "UNI",
        "avgDays": 90.5
      },
      {
        "symbol": "AAVE",
        "avgDays": 45.75
      }
    ],
    "uniqueAssets": [
      {
        "address": "0x0000000000000000000000000000000000000000",
        "symbol": "ETH",
        "name": "Ethereum"
      },
      {
        "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "symbol": "USDC",
        "name": "USD Coin"
      },
      {
        "address": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        "symbol": "LINK",
        "name": "Chainlink"
      },
      {
        "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        "symbol": "UNI",
        "name": "Uniswap"
      },
      {
        "address": "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
        "symbol": "AAVE",
        "name": "Aave"
      }
    ],
    "upcomingUnlocks": [
      {
        "id": 24,
        "title": "Emergency Fund",
        "asset": "USDC",
        "unlockDate": "2025-02-25T14:30:12.548",
        "daysRemaining": 4,
        "amount": 500
      },
      {
        "id": 31,
        "title": "DeFi Investment",
        "asset": "ETH",
        "unlockDate": "2025-03-01T09:15:27.112",
        "daysRemaining": 8,
        "amount": 0.15
      },
      {
        "id": 27,
        "title": "Protocol Staking",
        "asset": "LINK",
        "unlockDate": "2025-03-05T18:22:45.331",
        "daysRemaining": 12,
        "amount": 10
      }
    ],
    "assetTotals": [
      {
        "symbol": "ETH",
        "totalAmount": 1.25,
        "decimals": 18,
        "address": "0x0000000000000000000000000000000000000000"
      },
      {
        "symbol": "USDC",
        "totalAmount": 2500,
        "decimals": 6,
        "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
      },
      {
        "symbol": "LINK",
        "totalAmount": 75,
        "decimals": 18,
        "address": "0x514910771AF9Ca656af840dff83E8264EcF986CA"
      },
      {
        "symbol": "UNI",
        "totalAmount": 120,
        "decimals": 18,
        "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
      },
      {
        "symbol": "AAVE",
        "totalAmount": 8.5,
        "decimals": 18,
        "address": "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"
      }
    ],
    "assetValues": [
      {
        "symbol": "ETH",
        "totalAmount": 1.25,
        "decimals": 18,
        "address": "0x0000000000000000000000000000000000000000",
        "valueUSD": 3750,
        "price": 3000
      },
      {
        "symbol": "USDC",
        "totalAmount": 2500,
        "decimals": 6,
        "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "valueUSD": 2500,
        "price": 1
      },
      {
        "symbol": "LINK",
        "totalAmount": 75,
        "decimals": 18,
        "address": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        "valueUSD": 1125,
        "price": 15
      },
      {
        "symbol": "UNI",
        "totalAmount": 120,
        "decimals": 18,
        "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        "valueUSD": 720,
        "price": 6
      },
      {
        "symbol": "AAVE",
        "totalAmount": 8.5,
        "decimals": 18,
        "address": "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
        "valueUSD": 680,
        "price": 80
      }
    ],
    "totalValueUSD": 8775,
    "lockTypeCounts": {
      "fixed": 7,
      "goal": 5
    },
    "lockTypeByAsset": {
      "ETH": {
        "fixed": 2,
        "goal": 1
      },
      "USDC": {
        "fixed": 2,
        "goal": 1
      },
      "LINK": {
        "fixed": 1,
        "goal": 1
      },
      "UNI": {
        "fixed": 1,
        "goal": 1
      },
      "AAVE": {
        "fixed": 1,
        "goal": 1
      }
    },
    "durationDistribution": {
      "days": 5,
      "weeks": 4,
      "months": 3
    },
    "monthlyActivity": [
      {
        "month": "2025-01",
        "count": 3
      },
      {
        "month": "2025-02",
        "count": 9
      }
    ],
    "vaults": [
      {
        "vault_id": 21,
        "user_address": "0x0000000000000000000000000000000000000000",
        "vault_type": "days",
        "asset_address": "0x0000000000000000000000000000000000000000",
        "amount": 0.25,
        "start_time": "2025-02-10T09:25:12.345",
        "end_time": "2025-02-24T09:25:12.345",
        "unlock_goal_usd": 0,
        "updated_at": "2025-02-10T09:25:12.345",
        "unlock_schedule": 0,
        "lock_type": "fixed",
        "title": "ETH Short-term Hold",
        "asset_symbol": "ETH",
        "next_unlock": "2025-02-24T09:25:12.345",
        "unlock_amount": 0,
        "decimals": 18,
        "unlock_type": "after"
      },
      {
        "vault_id": 22,
        "user_address": "0x0000000000000000000000000000000000000000",
        "vault_type": "months",
        "asset_address": "0x0000000000000000000000000000000000000000",
        "amount": 1,
        "start_time": "2025-01-15T11:42:38.721",
        "end_time": "2025-04-15T11:42:38.721",
        "unlock_goal_usd": 4000,
        "updated_at": "2025-01-15T11:42:38.721",
        "unlock_schedule": 0,
        "lock_type": "goal",
        "title": "Long-term ETH Savings",
        "asset_symbol": "ETH",
        "next_unlock": "2025-04-15T11:42:38.721",
        "unlock_amount": 0,
        "decimals": 18,
        "unlock_type": "after"
      },
      {
        "vault_id": 23,
        "user_address": "0x0000000000000000000000000000000000000000",
        "vault_type": "weeks",
        "asset_address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "amount": 1000,
        "start_time": "2025-02-11T14:30:12.548",
        "end_time": "2025-02-25T14:30:12.548",
        "unlock_goal_usd": 0,
        "updated_at": "2025-02-11T14:30:12.548",
        "unlock_schedule": 0,
        "lock_type": "fixed",
        "title": "USDC Stability Fund",
        "asset_symbol": "USDC",
        "next_unlock": "2025-02-25T14:30:12.548",
        "unlock_amount": 0,
        "decimals": 6,
        "unlock_type": "after"
      },
      {
        "vault_id": 24,
        "user_address": "0x0000000000000000000000000000000000000000",
        "vault_type": "days",
        "asset_address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "amount": 500,
        "start_time": "2025-02-18T14:30:12.548",
        "end_time": "2025-02-25T14:30:12.548",
        "unlock_goal_usd": 0,
        "updated_at": "2025-02-18T14:30:12.548",
        "unlock_schedule": 0,
        "lock_type": "fixed",
        "title": "Emergency Fund",
        "asset_symbol": "USDC",
        "next_unlock": "2025-02-25T14:30:12.548",
        "unlock_amount": 500,
        "decimals": 6,
        "unlock_type": "after"
      },
      {
        "vault_id": 25,
        "user_address": "0x0000000000000000000000000000000000000000",
        "vault_type": "months",
        "asset_address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "amount": 1000,
        "start_time": "2025-01-25T16:05:41.922",
        "end_time": "2025-04-25T16:05:41.922",
        "unlock_goal_usd": 1100,
        "updated_at": "2025-01-25T16:05:41.922",
        "unlock_schedule": 0,
        "lock_type": "goal",
        "title": "Interest-bearing USDC",
        "asset_symbol": "USDC",
        "next_unlock": "2025-04-25T16:05:41.922",
        "unlock_amount": 0,
        "decimals": 6,
        "unlock_type": "after"
      },
      {
        "vault_id": 26,
        "user_address": "0x0000000000000000000000000000000000000000",
        "vault_type": "days",
        "asset_address": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        "amount": 25,
        "start_time": "2025-02-14T18:22:45.331",
        "end_time": "2025-03-01T18:22:45.331",
        "unlock_goal_usd": 0,
        "updated_at": "2025-02-14T18:22:45.331",
        "unlock_schedule": 0,
        "lock_type": "fixed",
        "title": "LINK Hodl Fund",
        "asset_symbol": "LINK",
        "next_unlock": "2025-03-01T18:22:45.331",
        "unlock_amount": 0,
        "decimals": 18,
        "unlock_type": "after"
      },
      {
        "vault_id": 27,
        "user_address": "0x0000000000000000000000000000000000000000",
        "vault_type": "weeks",
        "asset_address": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        "amount": 50,
        "start_time": "2025-02-12T18:22:45.331",
        "end_time": "2025-03-05T18:22:45.331",
        "unlock_goal_usd": 1000,
        "updated_at": "2025-02-12T18:22:45.331",
        "unlock_schedule": 10,
        "lock_type": "goal",
        "title": "Protocol Staking",
        "asset_symbol": "LINK",
        "next_unlock": "2025-03-05T18:22:45.331",
        "unlock_amount": 10,
        "decimals": 18,
        "unlock_type": "every"
      },
      {
        "vault_id": 28,
        "user_address": "0x0000000000000000000000000000000000000000",
        "vault_type": "months",
        "asset_address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        "amount": 50,
        "start_time": "2025-01-05T10:11:32.712",
        "end_time": "2025-04-05T10:11:32.712",
        "unlock_goal_usd": 0,
        "updated_at": "2025-01-05T10:11:32.712",
        "unlock_schedule": 0,
        "lock_type": "fixed",
        "title": "Governance Participation",
        "asset_symbol": "UNI",
        "next_unlock": "2025-04-05T10:11:32.712",
        "unlock_amount": 0,
        "decimals": 18,
        "unlock_type": "after"
      },
      {
        "vault_id": 29,
        "user_address": "0x0000000000000000000000000000000000000000",
        "vault_type": "weeks",
        "asset_address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        "amount": 70,
        "start_time": "2025-02-01T12:45:33.891",
        "end_time": "2025-04-12T12:45:33.891",
        "unlock_goal_usd": 750,
        "updated_at": "2025-02-01T12:45:33.891",
        "unlock_schedule": 0,
        "lock_type": "goal",
        "title": "AMM Liquidity Reserve",
        "asset_symbol": "UNI",
        "next_unlock": "2025-04-12T12:45:33.891",
        "unlock_amount": 0,
        "decimals": 18,
        "unlock_type": "after"
      },
      {
        "vault_id": 30,
        "user_address": "0x0000000000000000000000000000000000000000",
        "vault_type": "days",
        "asset_address": "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
        "amount": 3.5,
        "start_time": "2025-02-05T16:19:54.442",
        "end_time": "2025-03-07T16:19:54.442",
        "unlock_goal_usd": 0,
        "updated_at": "2025-02-05T16:19:54.442",
        "unlock_schedule": 0,
        "lock_type": "fixed",
        "title": "DeFi Treasury",
        "asset_symbol": "AAVE",
        "next_unlock": "2025-03-07T16:19:54.442",
        "unlock_amount": 0,
        "decimals": 18,
        "unlock_type": "after"
      },
      {
        "vault_id": 31,
        "user_address": "0x0000000000000000000000000000000000000000",
        "vault_type": "weeks",
        "asset_address": "0x0000000000000000000000000000000000000000",
        "amount": 0.15,
        "start_time": "2025-02-08T09:15:27.112",
        "end_time": "2025-03-01T09:15:27.112",
        "unlock_goal_usd": 0,
        "updated_at": "2025-02-08T09:15:27.112",
        "unlock_schedule": 0,
        "lock_type": "fixed",
        "title": "DeFi Investment",
        "asset_symbol": "ETH",
        "next_unlock": "2025-03-01T09:15:27.112",
        "unlock_amount": 0.15,
        "decimals": 18,
        "unlock_type": "after"
      },
      {
        "vault_id": 32,
        "user_address": "0x0000000000000000000000000000000000000000",
        "vault_type": "months",
        "asset_address": "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
        "amount": 5,
        "start_time": "2025-02-02T14:38:22.174",
        "end_time": "2025-05-02T14:38:22.174",
        "unlock_goal_usd": 500,
        "updated_at": "2025-02-02T14:38:22.174",
        "unlock_schedule": 0,
        "lock_type": "goal",
        "title": "Lending Protocol Reserve",
        "asset_symbol": "AAVE",
        "next_unlock": "2025-05-02T14:38:22.174",
        "unlock_amount": 0,
        "decimals": 18,
        "unlock_type": "after"
      }
    ]
}