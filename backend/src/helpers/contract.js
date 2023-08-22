const web3 = require("./web3"); 
const path = require("path"); 

const contractAddress = "0xe26cb9acb83240fC7CC58ecDd75d821F2a390951"; 
const ABI = require(path.resolve(__dirname, "../", "../", "artifacts", "contracts", "NFTmarketplace.sol", "Market.json")); 


const contractInstance = new web3.eth.Contract(ABI.abi, contractAddress); 

module.exports = contractInstance; 