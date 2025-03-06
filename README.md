# FVKRY PRVNTA Frontend Documentation

![Image](https://github.com/user-attachments/assets/401154ff-2157-48b1-ba00-b31717a689e6)

## Overview
FVKRY PRVNTA is a blockchain-based virtual assets and crypto locking platform that aims to enhance financial discipline and promote long-term saving among cryptocurrency and virtual asset owners. It allows users to check their impulsive spending and trading habits by allowing them to lock their ETH and ERC-20 tokens in secure vaults that can only be accessed after a predefined lock period ranging from days, weeks, months and upto years.

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
git clone https://github.com/calebomondi/fvkry-fe
cd fvkry-fe
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
4. Enter the unlock amount, recurrence and the duration in the modal form the click the 'SET' button.
5. Confirm the transanction
6. The unlock schedule is set

![Image](https://github.com/user-attachments/assets/64a50aaa-e477-462a-beef-a06823326c55)

![Image](https://github.com/user-attachments/assets/8cea91db-3778-47bd-9756-ad97d5f93996)

### Delete Lock
1. Navigate to the 'My Vault' tab on the dashboard.
2. Clicking the 'Expired Locks' button.
3. Select the lock you want to delete.
4. Make sure the lock has no assets inside
5. Confirm if you want to proceed with deleting.
6. Confirm the transanction
7. Your lock has been deleted

![Image](https://github.com/user-attachments/assets/0faa31d2-5938-4912-b064-b36f4960702a)

### View Transanctions
1. Navigate to the More tab and click it to expand it.
2. Click the Transanctions tab.
3. Filter the transanctions by asset type.
4. Search for a lock by name to view it's transanctions.

![Image](https://github.com/user-attachments/assets/fda31f83-7f6d-4fc6-83b2-5368788c8e91)

## Security Features
- The smart contract has been audited
- Transanction signage
- Transparent transactions history

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Submit pull request

## License
MIT License

## Appendices
3. Fvkry Live Link : [Link](https://fvkry.vercel.app/)