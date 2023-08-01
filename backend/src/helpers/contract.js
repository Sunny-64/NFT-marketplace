const web3 = require("./web3"); 
const path = require("path"); 

const contractAddress = "0xeF2551A919854073373463926c1e1cfBdfF02BB1"; 
const ABI = require(path.resolve(__dirname, "../", "../", "artifacts", "contracts", "NFTmarketplace.sol", "Market.json")); 


const contractInstance = new web3.eth.Contract(ABI.abi, contractAddress); 

module.exports = contractInstance; 