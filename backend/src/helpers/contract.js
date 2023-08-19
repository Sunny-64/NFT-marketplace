const web3 = require("./web3"); 
const path = require("path"); 

const contractAddress = "0xCD156c99fa8284319Fe8921598924b087442fCc8"; 
const ABI = require(path.resolve(__dirname, "../", "../", "artifacts", "contracts", "NFTmarketplace.sol", "Market.json")); 


const contractInstance = new web3.eth.Contract(ABI.abi, contractAddress); 

module.exports = contractInstance; 