const router = require("express").Router(); 
const {register, getUsers, login} = require("./../controller/userController"); 

router.get("/", getUsers); 
router.post("/register", register); 
router.post("/login", login); 

router.use(require("./../middlewares/auth")); 
module.exports = router; 