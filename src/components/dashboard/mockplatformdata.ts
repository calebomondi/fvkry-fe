import { VaultData } from "@/types";

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