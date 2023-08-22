const router = require("express").Router(); 
const {getAllListedNfts, addNFT, getAllNfts, getUserNFTs, getAllAuctions, getNFTByName,
getNFTCategories, getNFTByCategory, addNewNFTToDB, saveTxHistory, getNFTByTokenId, getUserTxHistory} = require("./../controller/nft-controller"); 

router.get("/", getAllNfts);
router.get("/listed", getAllListedNfts); 
router.post("/addToDb", addNewNFTToDB); 
router.get("/auctions", getAllAuctions);
router.get("/categories", getNFTCategories); 
router.get("/categories/:category", getNFTByCategory); 
router.get("/search/:name", getNFTByName); 
router.get("/auction/:id", getNFTByTokenId);  

router.use(require("./../middlewares/auth")); 

router.post("/tx", saveTxHistory); 
router.get("/user/txs", getUserTxHistory); 
router.post("/add", addNFT); 
router.get("/user/:publicKey", getUserNFTs); 


module.exports = router; 