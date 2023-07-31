const {viewAllTokens, saveMintedNFT} = require("./../services/nft-services"); 

const getAllNFTs = async (req, res) => {
    try{
        const nfts = await viewAllTokens(); 
        return res.status(200).json({success : true, message : "NFTs fetched", totalResults : nfts.length, data : nfts});  
    }
    catch(err){
        return res.status(500).json({success : false, message : "Internal server error", error : err.message}); 
    }
}

const addNFT = async (req, res) => {
    const {tokenName, tokenId, tokenURI, tokenDescription, price, isListed, isSold} = req.body; 
    const userId = req.user._id; 
    if(!(tokenName && tokenId && tokenURI && tokenDescription && price && isListed && isSold)){
        return res.status(400).json({success : false, message : "Invalid data"}); 
    }
    try{
        const data = {
            userId,
            tokenName, 
            tokenDescription, 
            tokenId, 
            tokenURI, 
            price, 
            isSold, 
            isListed
        }
        const saveNft = await saveMintedNFT(data); 
        return res.status(200).json({success : true, message : "NFT SAVED"}); 
    }   
    catch(err){
        console.log(err);
        return res.status(500).json({success : false, message : "error", error : err.message}); 
    }
}

module.exports = {
    getAllNFTs, 
    addNFT,
}