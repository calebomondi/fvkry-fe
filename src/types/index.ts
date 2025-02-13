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