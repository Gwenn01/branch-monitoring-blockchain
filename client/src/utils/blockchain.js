import { ethers } from "ethers";

// Example smart contract (replace with your deployed one later)
const CONTRACT_ADDRESS = "0xYourContractAddress";
const CONTRACT_ABI = [
  // minimal ABI for demo
  {
    "inputs": [],
    "name": "getBranches",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "address", "name": "wallet", "type": "address" },
          { "internalType": "uint256", "name": "balance", "type": "uint256" }
        ],
        "internalType": "struct Branch[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// utils/blockchain.js
export async function connectWallet(providerType = "metamask") {
  let provider;

  if (providerType === "okx") {
    provider = window.okxwallet || (window.ethereum?.isOkxWallet ? window.ethereum : null);
  } else if (providerType === "metamask") {
    provider = window.ethereum?.isMetaMask ? window.ethereum : null;
  }

  if (!provider) {
    throw new Error(`${providerType} Wallet not found. Please install it.`);
  }

  try {
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    const chainId = await provider.request({ method: "eth_chainId" });

    return {
      provider,
      account,
      chainId,
      providerType,
    };
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
}


export async function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
}
