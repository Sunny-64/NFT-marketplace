const web3 = require("./web3"); 
const path = require("path"); 

const contractAddress = "0x9751B3dd5c581d82655EA803c4418E0630f7F7fc"; 
const ABI = require(path.resolve(__dirname, "../", "../", "artifacts", "contracts", "NFTmarketplace.sol", "Market.json")); 


const contractInstance = new web3.eth.Contract(ABI.abi, contractAddress); 

module.exports = contractInstance; 