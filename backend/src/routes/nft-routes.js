const router = require("express").Router(); 
const {getAllNFTs, addNFT} = require("./../controller/nft-controller"); 

router.get("/", getAllNFTs); 

router.use(require("./../middlewares/auth")); 
router.get("/add", addNFT); 


module.exports = router; 