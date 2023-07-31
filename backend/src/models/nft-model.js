const mongoose = require("mongoose"); 

const NFTSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId}, 
    tokenId : {type : Number}, 
    tokenName : {type : String}, 
    tokenURI : {type : String}, 
    tokenDescription : {type : String}, 
    price : {type : Number}, 
    isSold : {type : Boolean},
    // prevPricing : [], later
    // prevOwners : [], 
    isListed : {type : Boolean, default : false}, 
    createdAt : {type : Date, default : Date.now()}, 
}); 

module.exports = new mongoose.model("NFT", NFTSchema); 