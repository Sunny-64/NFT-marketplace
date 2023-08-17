const web3 = require("./web3"); 
const path = require("path"); 

const contractAddress = "0x6A9B640D98955657ED4D14e82008ef78f0035063"; 
const ABI = require(path.resolve(__dirname, "../", "../", "artifacts", "contracts", "NFTmarketplace.sol", "Market.json")); 


const contractInstance = new web3.eth.Contract(ABI.abi, contractAddress); 

module.exports = contractInstance; 