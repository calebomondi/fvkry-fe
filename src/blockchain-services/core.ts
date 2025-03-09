//contract address
export const contractAddress = '0x16e05EA02BBB69D50c858DCeCC707CA81657D8fa';

//contract ABI
export const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AmountBeGreaterThan0",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ContractNotpaused",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ContractPausedAlready",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ETHTransferFailed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "InadequateTokenBalance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidAssetID",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidLockPeriod",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "InvalidTokenAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidVaultNumber",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LockPeriodExpired",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LockPeriodNotExpired",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LockPeriodNotExpiredAndGoalNotReached",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      }
    ],
    "name": "NotEnoughToWithdraw",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "SafeERC20FailedOperation",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ToSubVaultLockPeriodExpired",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "TokenAddressesDontMatch",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "TokenIsBlackListed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "TokenIsNotBlackListed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "VaultHasBeenFullyWithdrawn",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "VaultHasNotBeenFullyWithdrawn",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "VaultIsFull",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "vault",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "timestamp",
        "type": "uint32"
      }
    ],
    "name": "AssetAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "vault",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "lockEndTime",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "timestamp",
        "type": "uint32"
      }
    ],
    "name": "AssetLocked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "vault",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "timestamp",
        "type": "uint32"
      }
    ],
    "name": "AssetWithdrawn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "BlackListed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "timestamp",
        "type": "uint32"
      }
    ],
    "name": "ContractPaused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "timestamp",
        "type": "uint32"
      }
    ],
    "name": "ContractUnpaused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "vault",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "lockperiod",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "timestamp",
        "type": "uint32"
      }
    ],
    "name": "LockPeriodExtended",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "newtitle",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "assetID",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "vault",
        "type": "uint8"
      }
    ],
    "name": "RenameVault",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "fromVault",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "fromAssetID",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "toVault",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "toAssetID",
        "type": "uint8"
      }
    ],
    "name": "TransferAsset",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "UnBlackListed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "vault",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "assetID",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "timestamp",
        "type": "uint32"
      }
    ],
    "name": "VaultDeleted",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MAX_LOCKDURATION",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_SUB_VAULTS",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_VAULTS",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_vault",
        "type": "uint8"
      },
      {
        "internalType": "uint32",
        "name": "_assetID",
        "type": "uint32"
      }
    ],
    "name": "addToLockedETH",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "_assetID",
        "type": "uint32"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "_vault",
        "type": "uint8"
      }
    ],
    "name": "addToLockedTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_token",
        "type": "address"
      }
    ],
    "name": "blackListToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "blackListedToken",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_vault",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "_assetID",
        "type": "uint8"
      }
    ],
    "name": "deleteSubVault",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_assetID",
        "type": "uint32"
      },
      {
        "internalType": "uint8",
        "name": "_vault",
        "type": "uint8"
      },
      {
        "internalType": "uint32",
        "name": "_lockperiod",
        "type": "uint32"
      }
    ],
    "name": "extendLockPeriod",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getContractETHBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "getContractTokenBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_vault",
        "type": "uint8"
      }
    ],
    "name": "getUserLocks",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint32",
            "name": "lockEndTime",
            "type": "uint32"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "withdrawn",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isNative",
            "type": "bool"
          }
        ],
        "internalType": "struct Fvkry.Lock[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_vault",
        "type": "uint8"
      }
    ],
    "name": "getUserTransactions",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "withdrawn",
            "type": "bool"
          },
          {
            "internalType": "uint32",
            "name": "timestamp",
            "type": "uint32"
          }
        ],
        "internalType": "struct Fvkry.TransacHist[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_vault",
        "type": "uint8"
      },
      {
        "internalType": "uint32",
        "name": "_lockperiod",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      }
    ],
    "name": "lockETH",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "_vault",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_lockperiod",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      }
    ],
    "name": "lockToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pauseContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_vault",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "_assetID",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "_newTitle",
        "type": "string"
      }
    ],
    "name": "renameSubVault",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "_fromVault",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "_fromAssetID",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "_toVault",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "_toAssetID",
        "type": "uint8"
      }
    ],
    "name": "transferAsset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_token",
        "type": "address"
      }
    ],
    "name": "unBlackListToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unPauseContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "userLockedAssets",
    "outputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "lockEndTime",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "withdrawn",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isNative",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "userTransactions",
    "outputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "withdrawn",
        "type": "bool"
      },
      {
        "internalType": "uint32",
        "name": "timestamp",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_assetID",
        "type": "uint32"
      },
      {
        "internalType": "uint8",
        "name": "_vault",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_goalReachedByValue",
        "type": "bool"
      }
    ],
    "name": "withdrawAsset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export const CONTRACT_ADDRESSES = {
  // Lisk Sepolia Testnet Chain ID
  '0x106a': {
    address: '0x16e05EA02BBB69D50c858DCeCC707CA81657D8fa',
    abi: contractABI
  },
  // Ethereum Sepolia Testnet Chain ID
  '0xaa36a7': {
    address: '0x760d07bB72599C692097EC81EB2D16b9Bb76431E',
    abi: contractABI
  }
}