const router = require("express").Router(); 
const {getAllListedNfts, addNFT, getAllNfts, getUserNFTs, getAllAuctions} = require("./../controller/nft-controller"); 

router.get("/", getAllNfts);
router.get("/listed", getAllListedNfts); 
router.get("/auctions", getAllAuctions)

router.use(require("./../middlewares/auth")); 

router.post("/add", addNFT); 
router.get("/user/:publicKey", getUserNFTs); 


module.exports = router; 