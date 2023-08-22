// const web3 = require("../helpers/web3");
const contractInstance = require("../helpers/contract");
const NFT = require("./../models/nft-model");
const User = require("./../models/user-model");
const Tx = require("./../models/transaction-history"); 


async function getAuctionByTokenId(tokenId){
    const tokens = await contractInstance.methods.getAllAuctions().call(); 
    const auction = tokens.filter(item => parseInt(item.tokenIndex) == tokenId);  
    return auction
}

const findAllNfts = async () => {
  try {
    // console.log(contractInstance);
    let tokens = await contractInstance.methods.viewAllTokens().call();
    // console.log(tokens);
    // let result = tokens.map((token) => token.toString());
    let result = [];
    tokens.forEach((token) => {
        let tokenObj = {
            owner : token.owner.toString(), 
            tokenId : parseInt(token.tokenId), 
            tokenURI : token.tokenURI.toString(), 
            price : parseInt(token.price),
            name : token.name.toString(), 
            description : token.description.toString(), 
            category : token.category.toString(), 
            isListedForSale : token.isListedForSale, 
            isListedForAuction : token.isListedForAuction, 
        }
        result.push(tokenObj); 
    })
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
    // console.log(tokens);
    let saleTokens = await tokens.filter(token => Boolean(token.isListedForSale)); 
    if (!tokens) {
      throw new Error("Error while fetching NFTS");
    }
    // console.log(tokens[0]);
    let listedTokens = []; 
    saleTokens.forEach(token => {
        let tokenObj = {
          owner : token.owner.toString(), 
          tokenId : Number(token.tokenId),
          tokenURI : token.tokenURI.toString(), 
          price : Number(token.price), 
          name : token.name.toString(), 
          description : token.description.toString(), 
          category : token.category.toString(), 
          isListedForSale : token.isListedForSale.toString(),
          isListedForAuction : token.isListedForAuction.toString()
        }
         listedTokens.push(tokenObj); 
    });
    return listedTokens;
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
    // isListed,
    // isSold,

    ownerAddress,
    category, 
    // blockHash,
    // blockNumber,
    // transactionHash,
    // transactionIndex,
    // gasUsed,
  } = data;
  try {
    const newNft = new NFT({
      userId,
      tokenId,
      tokenName,
      tokenURI,
      tokenDescription,
      category, 
      // price,
      // isSold,
      // isListed,

      ownerAddress,
      // blockHash,
      // blockNumber,
      // transactionHash,
      // transactionIndex,
      // gasUsed,
    });

    const saveNft = await newNft.save();
    return saveNft;
  } catch (err) {
    throw new Error(err);
  }
};

const findUserNFTs = async (publicKey) => {
  try {
    let tokens = await contractInstance.methods.viewAllTokens().call();
    // console.log(tokens);
   

    let result = tokens.map(async (item) => {
      let obj = {};
      
      if (item.isListedForAuction) {
        const auctionTokens = await contractInstance.methods.getAllAuctions().call();
        // console.log(auctionTokens);
        // const auction = auctionTokens.find(auctionItem => parseInt(auctionItem.tokenIndex) === parseInt(item.tokenId));
        let auction = []; 
        auctionTokens.forEach((auctionItem, index) => {
          // console.log(auctionItem);
          // console.log(auctionItem.tokenIndex == item.tokenId);
            if(auctionItem.tokenIndex == item.tokenId){
                // console.log("inside the if");
                let aucObj =  {
                  highestBid : parseInt(auctionItem?.highestBid), 
                  startingPrice : parseInt(auctionItem?.startingPrice), 
                  index : index
                 }
                //  console.log(aucObj);

                 auction.push(aucObj); 
            }
        }); 

        // console.log(auction);
        obj = {
          owner: item.owner.toString(),
          tokenId: parseInt(item.tokenId),
          tokenURI: item.tokenURI.toString(),
          highestBid: parseInt(auction[0].highestBid),
          startingPrice: parseInt(auction[0].startingPrice),
          auctionIndex: parseInt(auction[0].index),
          name: item.name.toString(),
          description: item.description.toString(),
          category: item.category.toString(),
          isListedForSale: Boolean(item.isListedForSale),
          isListedForAuction: Boolean(item.isListedForAuction)
        };
      } else {
        obj = {
          owner: item.owner.toString(),
          tokenId: parseInt(item.tokenId),
          tokenURI: item.tokenURI.toString(),
          price: parseInt(item.price),
          name: item.name.toString(),
          description: item.description.toString(),
          category: item.category.toString(),
          isListedForSale: item.isListedForSale,
          isListedForAuction: item.isListedForAuction
        };
        // console.log(obj);
      }
      // console.log(obj);
      // result.push(obj);
      return obj; 
      // console.log(result);
    });
    // console.log(result);
    const resolvedData = await Promise.all(result); 
    // console.log(resolvedData);
    let userNfts = resolvedData.filter((userNft) => userNft.owner === publicKey);
    // console.log(userNfts);

    return userNfts;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};


const findAllAuctions = async () => {
    try{
        const nfts = await findAllNfts(); 
        // console.log(nfts);
        const nftsListedForAuction = nfts.filter(item => item.isListedForAuction); 
        // console.log(nftsListedForAuction);
        const auctionedNFTs = await contractInstance.methods.getAllAuctions().call(); 
        const serializedAuctionedNFTs = []; 

        auctionedNFTs.forEach((item, index) => {
            const auctionedTokenDetails = nftsListedForAuction.filter(t => t.tokenId == item.tokenIndex); 
            // console.log(auctionedTokenDetails[0]);
            let obj = {
              auctionIndex : index, 
              tokenName : auctionedTokenDetails[0].name, 
              tokenDescription : auctionedTokenDetails[0].description, 
              category : auctionedTokenDetails[0].category, 
              tokenURI : auctionedTokenDetails[0].tokenURI, 
              
              tokenIndex : parseInt(item.tokenIndex), 
              startingPrice : parseInt(item.startingPrice),
              creator : item.creator.toString(), 
              endTime : parseInt(item.endTime), 
              highestBid : parseInt(item.highestBid), 
              highestBidder : item.highestBidder.toString()
            }
            serializedAuctionedNFTs.push(obj); 
            // console.log(obj);
        }); 
        // console.log(serializedAuctionedNFTs);
        return serializedAuctionedNFTs; 
    }
    catch(err){
        console.log(err);
        throw new Error(err); 
    }
}

const searchNFTByName = async(name) => {
    try{
      const nfts = await findAllNfts(); 
      
      const result = nfts.filter(item => item.name.toString().toLowerCase() == name.toLowerCase()); 

      console.log(result);
      return result; 
    }
    catch(err){
      throw new Error(err)
    }
}

const getAllCategories = async () => {
    try{
      const nfts = await findAllNfts(); 
      console.log(nfts);
      const onlyListed = nfts.filter(item => (Boolean(item.isListedForAuction) || Boolean(item.isListedForSale))); 
      const result = onlyListed.map(item => item.category); 

      // console.log(result);
      return result; 
    }
    catch(err){
      throw new Error(err)
    }
}

const searchByCategory = async (category) => {
    try{
      const nfts = await findAllNfts(); 
      
      const result = nfts.filter(item => item.category.toString().toLowerCase() == category.toLowerCase() && (Boolean(item.isListedForSale || Boolean(item.isListedForAuction)))); 

      // console.log(result);
      return result; 
    }
    catch(err){
      throw new Error(err)
    }
}

const nftLikeDislike = async (userId, token) => {
  const nfts = await findAllNfts(); 
  const result = nfts.filter(item => item.tokenId == token.tokenId); 
  console.log(result);

  const doesNFTexists = await NFT.findOne({tokenId : result[0].tokenId}); 
  if(!doesNFTexists){
    throw new Error("there was an error"); 
  }
  // if(doesNFTexists.length <= 0){
  //     const newNft = new NFT({

  //     })
  // }
}



const txHistory = async (data) => {
    const {tokenId, transactionAmount, transactionType, userId} = data; 
    try{

      const newTx = new Tx(); 
      newTx.tokenId = tokenId; 
      newTx.transactionAmount = transactionAmount; 
      newTx.transactionType = transactionType; 
      newTx.userId = userId; 
      await newTx.save(); 
    } 
    catch(err){
      throw new Error(err)
    }
}

const findByTokenId = async (id) => {
  try{
    const auctionedNFTs = await contractInstance.methods.getAllAuctions().call(); 
    // console.log(auctionedNFTs[0]);
    const auctionWithId = auctionedNFTs.filter((item, index) => {
      // console.log(item.tokenIndex, id, parseInt(item.tokenIndex) == parseInt(id));
      return index === parseInt(id)
    }); 
    // console.log(auctionWithId);
    let obj = {
      tokenIndex : Number(auctionWithId[0].tokenIndex), 
      startingPrice : Number(auctionWithId[0].startingPrice),
      creator : auctionWithId[0].creator.toString(), 
      endTime : Number(auctionWithId[0].endTime), 
      highestBid : Number(auctionWithId[0].highestBid), 
      highestBidder : auctionWithId[0].highestBidder.toString()
    }
    // console.log(obj);
    return obj; 
  }
  catch(err){
    throw new Error(err); 
  }
}

const viewUserTxHistory = async (id) => {
  try{
    const txs = await Tx.find({userId : id}); 
    return txs; 
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
  findAllAuctions,
  searchNFTByName,
  getAllCategories, 
  searchByCategory,
  nftLikeDislike, 
  txHistory,
  findByTokenId, 
  viewUserTxHistory,
};
