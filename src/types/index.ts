export interface LockMyAsset {
    title: string;
    amount: string;
    symbol: string;
    duration: string;
    durationType: string;
    lockType: string;
    assetType: string;
    goal: string;
}

export interface Send2DB extends LockMyAsset {
    token: `0x${string}`;
    decimals: number;
}

export interface Lock {
    token: `0x${string}`;
    amount: bigint;
    lockEndTime: number;
    title: string;
    withdrawn: boolean;
    isNative: boolean;
}

type LockType = "goal" | "fixed";

export interface VaultData {
    title: string;
    amount: number;
    start_time: string;
    end_time: string;
    unlock_goal_usd: number;
    lock_type: LockType;
    withdrawn: boolean;
    asset_address: string;
    asset_symbol: string;
    unlock_schedule: number;
    next_unlock: string;
    unlock_amount: number;
}

export interface TokenConfig {
    address: `0x${string}`;
    abi: any;
    decimals: number;
    symbol: string;
}

export interface ApproveTokenParams {
    symbol: string;
    amount: bigint;
}

export interface TokenVaultParams {
    symbol: string;
    amountT: string;
    vault: number;
    lockPeriod: number;  // in days
    title: string;
}

export interface VaultCardProps {
    subvault: VaultData;
}

export interface VaultGridProps {
    vaultData: VaultData[];
    vaultType: string;
}