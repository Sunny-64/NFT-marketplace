require("dotenv").config();
const express = require("express"); 
const cors = require("cors"); 
const connectDB = require("./config/dbConfig"); 

const app = express(); 

// configs
const PORT = process.env.port || 3000; 
connectDB(); // connects to mongodb

// middlewares 
app.use(cors()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

// user routes 
const userRoutes = require("./routes/user-routes"); 
app.use("/users", userRoutes); 

// nft routes
const nftRoutes = require("./routes/nft-routes"); 
app.use("/nfts", nftRoutes); 


app.get("*", (req, res) => {
    res.status(404).json({
        success : false, 
        message : "Page not found"
    })
}); 

app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT ${PORT}`);
}); 