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
    // console.log("Result : ", typeof result[0]);
    let itemArr = result.map((item) => item.toString().split(","));
    let listedNft = itemArr.filter((item) => item[item.length - 1] === "true");
    // console.log("Listed : ", listedNft);
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

const findUserNFTs = async (publicKey) => {
  try {
    // const nfts = await NFT.find();
    // console.log(nfts);

    let tokens = await contractInstance.methods.viewAllTokens().call();
    let result = tokens.map((token) => token.toString());
    // console.log("Result : ", typeof result[0]);
    let itemArr = result.map((item) => item.toString().split(","));
    let userNfts = itemArr.filter((item) => item[0] === publicKey);
    //  console.log(userNfts);
    let formattedResultArr = [];
    userNfts.map((item) => {

        let formattedResult = {
          ownerAddress : item[0].toString(),
          tokenId : Number(item[1]), 
          tokenURI : item[2].toString(), 
          price : Number(item[3]), 
          isSold : item[4].toString(), 
          name : item[5].toString(), 
          description : item[6].toString(), 
          isListed : item[7].toString(), 
        } 
        formattedResultArr.push(formattedResult); 
    }); 

    return formattedResultArr;

  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports = {
  findListedNfts,
  saveMintedNFT,
  findAllNfts,
  findUserNFTs,
};
