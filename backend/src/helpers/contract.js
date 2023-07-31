const web3 = require("./web3"); 
const path = require("path"); 

const contractAddress = "0x9D1F7A09130dA315bdcECFC6e5452e3ECE69BD2d"; 
const ABI = require(path.resolve(__dirname, "../", "../", "artifacts", "contracts", "NFTmarketplace.sol", "Market.json")); 


const contractInstance = new web3.eth.Contract(ABI.abi, contractAddress); 

module.exports = contractInstance; 