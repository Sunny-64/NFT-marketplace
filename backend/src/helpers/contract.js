const web3 = require("./web3"); 
const path = require("path"); 

const contractAddress = "0x292010477d74e652A600bBbf381Ca9629c319244"; 
const ABI = require(path.resolve(__dirname, "../", "../", "artifacts", "contracts", "NFTmarketplace.sol", "Market.json")); 


const contractInstance = new web3.eth.Contract(ABI.abi, contractAddress); 

module.exports = contractInstance; 