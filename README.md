# FVKRY PRVNTA Frontend Documentation

![Image](https://github.com/user-attachments/assets/3c2c4103-4b09-42d8-ba34-564477195e25)

## Overview
FVKRY PRVNTA is a financial discipline tool designed to help virtual asset owners manage impulsive spending and trading by locking assets (ETH and ERC-20 tokens) for set durations. Users can create multiple sub-vaults within the defined main vaults to manage their locked assets securely. By implementing strategic asset locking mechanisms, the protocol provides structure in volatile markets, countering cognitive biases and promoting long-term financial stability.

## Features
- Lock ETH and ERC-20 tokens for a specified duration or goal.
- Extend lock periods after expiration (up to 5 years).
- Add more assets to an existing locked vault.
- Withdraw assets upon lock period expiration.
- Partial and full withdrawal options
- Transfer assets between vaults and sub-vaults.
- Blacklist certain tokens (admin-only feature).
- Pause and unpause the contract (admin-only feature).

## Technical Stack
- Frontend: React.js + Vite
- UI Components: DaisyUI, Lucide React, Shadcn
- Web3 Integration: Wagmi and Viem
- WalletConnect: Rainbowkit

## Development and Testing

### Prerequisites
- Node.js v14+ and npm
- Ethereum Wallet (e.g., MetaMask)
- Lisk Sepolia RPC

### Setup

1. Clone this repository
```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install dependencies:
```bash
npm install
```

3. Run:
```bash
npm run dev
```

## Environment Variables
Create a `.env` file with:
```
VITE_LISK_RPC_URL=lisk_sepolia_url
```

## Usage Guide

### Locking an Asset
1. Connect wallet by launching the applications.
2. Click the Lock button on the dashboard.
3. Fill in lock details on the modal form that appears:
   - Type of asset
   - Lock period
   - Title
   - Lock type e.t.c
4. Lock the asset by clicking the lock button.
5. Approve and confirm the transanction.
6. Your asset is locked.

![Image](https://github.com/user-attachments/assets/78522a49-a2bb-45f3-884f-b8ac2a67e823)


### View My Vaults
1. Navigate to the 'My Vault' tab on the dashboard.
2. All active locks will be displayed.
3. Filter locks by asset type of lock type.
4. View locks that are about to expire within the next 7 days by clicking the 'Expiring Soon' button.
5. View locks that have expired by clicking the 'Expired Locks' button.

![Image](https://github.com/user-attachments/assets/59a7cea4-7000-42a9-b50f-49985a118150)

### Adding To Locked Assets
1. Navigate to the 'My Vault' tab on the dashboard.
2. Select the vault you want to add to.
3. Click the 'Add to Lock' button.
4. Enter the amount you want to add yuor vault on the modal form.
5. Click the 'ADD' button.
6. Confirm the transaction.
7. You have added to your locked assets.

![Image](https://github.com/user-attachments/assets/2596c5cc-1730-425e-9ba0-f99fa1a193be)

### Withdrawing From an Expired Lock
1. Navigate to the 'My Vault' tab on the dashboard.
2. Clicking the 'Expired Locks' button.
3. Select the lock you want to withdraw from.
4. Click the 'Withdraw' button
5. Enter the amount you want to withdraw from the lock.
6. Confirm the transaction.
7. The amount is deposited to your wallet.

![Image](https://github.com/user-attachments/assets/e8cefdea-d7b3-436e-8a09-88fd4915fc47)

### Add unlock Schedule
1. Navigate to the 'My Vault' tab on the dashboard.
2. Select the lock you want to add the unlock schedule, the lock type must be fixed.
3. Click the 'Set Unlock Schedule' button.
4. Enter the 

![u-disburse](https://github.com/user-attachments/assets/b6abd685-aef8-4826-aab3-0fa032b9df19)

### Refund/Cancel Fundraiser
1. Connect with admin wallet
2. Access failed campaigns
3. Refund donors
4. Cancel fundraiser
5. Confirm cancellation

![u-refund1](https://github.com/user-attachments/assets/bafd3c0a-0317-4cd0-be75-ec993e8becba)

![u-refund2](https://github.com/user-attachments/assets/c0000e03-3613-45aa-b5d8-35770054a0bd)

### Campaign Status Tracking
- **Active**: Ongoing campaigns accepting donations
- **Completed**: Campaigns that reached their goals
- **Cancelled**: Failed campaigns eligible for refunds

![u-status](https://github.com/user-attachments/assets/78fc51ea-4f01-4de3-a1ff-33bbbda7f6d3)

## Security Features
- Multi-admin verification system
- Automated fund locking until campaign completion
- Transparent transaction history
- Refund mechanism for cancelled campaigns

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Submit pull request

## License
MIT License

## Appendices
1. Smartcontract Repo: [Link](https://github.com/calebomondi/charity-donation-hardhat)
2. Sepolia deployment: [Link](https://sepolia.etherscan.io/address/0x133818926101eEE247B1188fcE4a13f993d9c6E8#code)
3. Undugu Live : [Link](https://undugu-beta.vercel.app/)