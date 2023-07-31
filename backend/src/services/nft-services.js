// const web3 = require("../helpers/web3"); 
const contractInstance = require("../helpers/contract"); 
const NFT = require("./../models/nft-model"); 

const viewAllTokens = async () => {
    try{
        // console.log(contractInstance);
        let tokens = await contractInstance.methods.getAllListings().call();
        let result = tokens.map(token => token.toString()); 
        console.log(result);
        // console.log(result);
        if(!tokens){
            throw new Error("Error while fetching NFTS"); 
        }
        return result; 
    }
    catch(err){
        throw new Error(err.message); 
    }
}

const saveMintedNFT = async(data) => {
    const {tokenName, tokenId, tokenURI, userId, tokenDescription, price, isListed, isSold} = data; 
    try{
        const newNft = new NFT({
            userId, 
            tokenId, 
            tokenName, 
            tokenURI, 
            tokenDescription, 
            price, 
            isSold, 
            isListed
        }); 
    
        const saveNft = await newNft.save(); 
        return saveNft; 
    }
    catch(err){
        throw new Error(err); 
    }

}

module.exports = {
    viewAllTokens, 
    saveMintedNFT
}