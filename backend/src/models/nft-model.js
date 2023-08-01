const mongoose = require("mongoose"); 

const NFTSchema = new mongoose.Schema({
    userId : {type : String}, 
    tokenId : {type : Number}, 
    tokenName : {type : String}, 
    tokenURI : {type : String}, 
    tokenDescription : {type : String}, 
    price : {type : Number}, 
    isSold : {type : Boolean},
    // prevPricing : [], later
    // prevOwners : [], 
    isListed : {type : Boolean, default : false}, 
    ownerAddress : {type : String},
    blockHash : {type : String}, 
    blockNumber : {type : Number},
    transactionHash : {type : String},
    transactionIndex : {type : Number},
    gasUsed : {type : String},
    createdAt : {type : Date, default : Date.now()}, 
}); 

module.exports = new mongoose.model("NFT", NFTSchema); 