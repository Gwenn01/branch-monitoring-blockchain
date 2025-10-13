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

export async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not detected. Please install it first.");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();

  return { provider, signer, account: accounts[0] };
}

export async function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
}
