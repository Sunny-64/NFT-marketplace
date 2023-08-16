const router = require("express").Router(); 
const {getAllListedNfts, addNFT, getAllNfts, getUserNFTs} = require("./../controller/nft-controller"); 

router.get("/", getAllNfts);
router.get("/listed", getAllListedNfts); 

router.use(require("./../middlewares/auth")); 

router.post("/add", addNFT); 
router.get("/user/:publicKey", getUserNFTs); 


module.exports = router; 