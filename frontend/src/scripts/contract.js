import initWeb3 from "./web3";
import ABI from "./../static/ABI.json";

const CONTRACT_ADDRESS = "0x4f9B11dd38176bdd369aA99538D292FC1f2c1f17";
let contract;

// Function to initialize the contract
export const initContract = async () => {
  const web3 = await initWeb3(); 
  try {
    if (!web3) {
      console.log(web3);
      throw new Error("Metamask not installed");
    }
    contract = await new web3.eth.Contract(ABI.abi, CONTRACT_ADDRESS);
    // console.log("Contract initialized... ", contract)
    return contract;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default contract;
