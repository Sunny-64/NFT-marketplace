const router = require("express").Router(); 
const {getAllListedNfts, addNFT, getAllNfts, getUserNFTs, getAllAuctions, getNFTByName,
getNFTCategories, getNFTByCategory} = require("./../controller/nft-controller"); 

router.get("/", getAllNfts);
router.get("/listed", getAllListedNfts); 
router.get("/auctions", getAllAuctions);
router.get("/categories", getNFTCategories); 
router.get("/categories/:category", getNFTByCategory); 
router.get("/search/:name", getNFTByName); 

router.use(require("./../middlewares/auth")); 

router.post("/add", addNFT); 
router.get("/user/:publicKey", getUserNFTs); 


module.exports = router; 