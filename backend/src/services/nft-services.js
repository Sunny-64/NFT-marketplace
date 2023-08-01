// const web3 = require("../helpers/web3");
const contractInstance = require("../helpers/contract");
const NFT = require("./../models/nft-model");
const User = require("./../models/user-model"); 

const findAllNfts = async () => {
  try {
    // console.log(contractInstance);
    let tokens = await contractInstance.methods.viewAllTokens().call();
    let result = tokens.map((token) => token.toString());
    // console.log(result);
    // console.log(result);
    if (!tokens) {
      throw new Error("Error while fetching NFTS");
    }
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findListedNfts = async () => {
  try {

    let tokens = await contractInstance.methods.viewAllTokens().call();
    let result = tokens.map((token) => token.toString());
    console.log("Result : ", typeof result[0]);
    let itemArr = result.map((item) => item.toString().split(',')); 
    let listedNft = itemArr.filter((item) => item[item.length -1] === 'true'); 
    console.log("Listed : ",listedNft);
    if (!tokens) {
      throw new Error("Error while fetching NFTS");
    }
    return listedNft;
  } catch (err) {
    throw new Error(err.message);
  }
};

const saveMintedNFT = async (data) => {
  const {
    tokenName,
    tokenId,
    tokenURI,
    userId,
    tokenDescription,
    price,
    isListed,
    isSold,

    ownerAddress,
    blockHash,
    blockNumber,
    transactionHash,
    transactionIndex,
    gasUsed,

  } = data;
  try {
    const newNft = new NFT({
      userId,
      tokenId,
      tokenName,
      tokenURI,
      tokenDescription,
      price,
      isSold,
      isListed,

      ownerAddress,
      blockHash,
      blockNumber,
      transactionHash,
      transactionIndex,
      gasUsed,
    });

    const saveNft = await newNft.save();
    return saveNft;
  } catch (err) {
    throw new Error(err);
  }
};

const findUserNFTs = async (userId) => {
    try{
        // const nfts = await NFT.find(); 
        // console.log(nfts);
        const userNFTs = await NFT.find({userId : userId}); 
        if(!userNFTs){
            throw new Error("NO NFT Found"); 
        }

        return userNFTs; 
    }
    catch(err){
        console.log(err);
        throw new Error(err); 
    }
}

module.exports = {
  findListedNfts,
  saveMintedNFT,
  findAllNfts,
  findUserNFTs,
};
