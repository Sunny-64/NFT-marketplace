import web3 from "./web3";
import ABI from "./../static/ABI.json";

const CONTRACT_ADDRESS = "0xCD156c99fa8284319Fe8921598924b087442fCc8";
let contract;

// Function to initialize the contract
export const initContract = async () => {
  try {
    if (!web3) {
      throw new Error("Metamask not installed");
    }
    contract = await new web3.eth.Contract(ABI.abi, CONTRACT_ADDRESS);
    return contract;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default contract;
