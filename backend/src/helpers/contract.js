const web3 = require("./web3"); 
const path = require("path"); 

const contractAddress = "0xdD963C4A020eC173D4896D77725C37ae5329b539"; 
const ABI = require(path.resolve(__dirname, "../", "../", "artifacts", "contracts", "NFTmarketplace.sol", "Market.json")); 


const contractInstance = new web3.eth.Contract(ABI.abi, contractAddress); 

module.exports = contractInstance; 