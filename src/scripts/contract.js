import initWeb3 from "./web3";
import ABI from "./../static/ABI.json";

const CONTRACT_ADDRESS = "0x528022AA4AD560eE8236372d30F908B9C64Fc138";
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
