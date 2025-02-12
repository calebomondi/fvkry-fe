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