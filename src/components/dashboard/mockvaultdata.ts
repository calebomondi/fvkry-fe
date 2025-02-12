import { VaultData } from "@/types";

const mockVaultData: VaultData[] = [
    {
        title: "ETH Staking Reserve",
        amount: 0.5,
        start_time: "2025-02-12T07:45:58.174",
        end_time: "2026-02-12T07:45:58.174",
        unlock_goal_usd: 1000,
        lock_type: "goal",
        withdrawn: false,
        asset_address: "0x0000000000000000000000000000000000000000",
        asset_symbol: "ETH"
    },
    {
        title: "USDC Savings",
        amount: 500,
        start_time: "2025-01-15T10:30:00.000",
        end_time: "2025-07-15T10:30:00.000",
        unlock_goal_usd: 0,
        lock_type: "fixed",
        withdrawn: false,
        asset_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        asset_symbol: "USDC"
    },
    {
        title: "WBTC Long Term Hold",
        amount: 0.025,
        start_time: "2025-02-01T00:00:00.000",
        end_time: "2027-02-01T00:00:00.000",
        unlock_goal_usd: 5000,
        lock_type: "goal",
        withdrawn: false,
        asset_address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        asset_symbol: "WBTC"
    },
    {
        title: "UNI DCA Strategy",
        amount: 100,
        start_time: "2025-02-10T15:20:00.000",
        end_time: "2025-08-10T15:20:00.000",
        unlock_goal_usd: 0,
        lock_type: "fixed",
        withdrawn: false,
        asset_address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        asset_symbol: "UNI"
    },
    {
        title: "LINK Trading Fund",
        amount: 75,
        start_time: "2025-03-01T12:00:00.000",
        end_time: "2025-09-01T12:00:00.000",
        unlock_goal_usd: 200,
        lock_type: "goal",
        withdrawn: false,
        asset_address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        asset_symbol: "LINK"
    },
    {
        title: "ETH DeFi Yield",
        amount: 0.75,
        start_time: "2025-02-15T08:30:00.000",
        end_time: "2026-02-15T08:30:00.000",
        unlock_goal_usd: 2000,
        lock_type: "goal",
        withdrawn: false,
        asset_address: "0x0000000000000000000000000000000000000000",
        asset_symbol: "ETH"
    },
    {
        title: "DAI Stablecoin Reserve",
        amount: 1000,
        start_time: "2025-02-20T14:15:00.000",
        end_time: "2025-08-20T14:15:00.000",
        unlock_goal_usd: 1050,
        lock_type: "goal",
        withdrawn: false,
        asset_address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        asset_symbol: "DAI"
    },
    {
        title: "AAVE Lending Pool",
        amount: 50,
        start_time: "2025-04-01T00:00:00.000",
        end_time: "2026-04-01T00:00:00.000",
        unlock_goal_usd: 300,
        lock_type: "goal",
        withdrawn: false,
        asset_address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
        asset_symbol: "AAVE"
    },
    {
        title: "MKR Governance Fund",
        amount: 0.5,
        start_time: "2025-03-15T16:45:00.000",
        end_time: "2026-03-15T16:45:00.000",
        unlock_goal_usd: 0,
        lock_type: "fixed",
        withdrawn: false,
        asset_address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
        asset_symbol: "MKR"
    },
    {
        title: "COMP Yield Strategy",
        amount: 10,
        start_time: "2025-05-01T09:00:00.000",
        end_time: "2026-05-01T09:00:00.000",
        unlock_goal_usd: 800,
        lock_type: "goal",
        withdrawn: false,
        asset_address: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
        asset_symbol: "COMP"
    }
];

export default mockVaultData;