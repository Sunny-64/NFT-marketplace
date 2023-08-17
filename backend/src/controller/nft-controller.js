const {
  findListedNfts,
  saveMintedNFT,
  findAllNfts,
  findUserNFTs,
  findAllAuctions,
} = require("./../services/nft-services");

const getAllListedNfts = async (req, res) => {
  try {
    const nfts = await findListedNfts();
    return res.status(200).json({
      success: true,
      message: "NFTs fetched",
      totalResults: nfts.length,
      data: nfts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const getAllNfts = async (req, res) => {
  try {
    const nfts = await findAllNfts();
    return res.status(200).json({
      success: true,
      message: "NFTs fetched",
      totalResults: nfts.length,
      data: nfts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const addNFT = async (req, res) => {
  const {
    tokenName,
    tokenId,
    tokenURI,
    tokenDescription,

    ownerAddress,
    category
    // blockHash,
    // blockNumber,
    // transactionHash,
    // transactionIndex,
    // gasUsed,

  } = req.body;
//   console.log("token name : ", tokenName);
//   console.log("token tokenId : ", tokenId);
//   console.log("token tokenURI : ", tokenURI);
//   console.log("token tokenDescription : ", tokenDescription);
//   console.log("token price : ", price);
//   console.log("token isListed : ", isListed);
//   console.log("token isSold : ", isSold);
//   console.log("token isSold : ", ownerAddress);
//   console.log("token isSold : ", blockHash);
//   console.log("token isSold : ", blockNumber);
//   console.log("token isSold : ", transactionHash);
//   console.log("token isSold : ", transactionIndex);
//   console.log("token isSold : ", gasUsed);
  const userId = req.user._id;
  if (
    !(
      tokenName &&
      tokenId &&
      tokenURI &&
      tokenDescription &&
      category
    )
  ) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }
  try {
    const data = {
      userId,
      tokenName,
      tokenDescription,
      tokenId,
      tokenURI,
      ownerAddress,
      category
      // blockHash,
      // blockNumber,
      // transactionHash,
      // transactionIndex,
      // gasUsed,
    };
    const saveNft = await saveMintedNFT(data);
    return res.status(200).json({ success: true, message: "NFT SAVED" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "error", error: err.message });
  }
};

const getUserNFTs = async (req, res) => {
    try{
        // console.log(req.user._id);
        const data = await findUserNFTs(req.params.publicKey); 
        // console.log(data);
        res.status(200).json({success : true, data : data, message : "success"}); 
    }
    catch(err){
        res.status(500).json({success : false, error : err}); 
    }
}

const getAllAuctions = async (req, res) => {
    try{
        const auctions = await findAllAuctions(); 
        if(!auctions){
          return res.status(400).json({message : "Couldn't fetch the data"}); 
        }
        return res.status(200).json({message : "fetched auctions", data : auctions}); 
    }
    catch(err){
      return res.status(500).json({success : false, message : err.message}); 
    }
}

module.exports = {
  getAllListedNfts,
  addNFT,
  getAllNfts,
  getUserNFTs,
  getAllAuctions, 
};
