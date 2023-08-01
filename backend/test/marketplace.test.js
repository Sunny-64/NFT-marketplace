const ganache = require("ganache"); 
const {Web3} = require("web3"); 
const mocha = require("mocha"); 
const path = require("path"); 
const assert = require("assert"); 

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545")); 
const marketJson = require(path.resolve(__dirname, "../", "artifacts", "contracts", "NFTmarketplace.sol", "Market.json"))

let abi = marketJson.abi; 
let bytecode = marketJson.bytecode; 
let accounts; 
let contract; 

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    contract = await new web3.eth.Contract(abi)
    .deploy({
        data : bytecode
        // arguments : ["Market"]
    })
    .send({
        from : accounts[0], 
        gas : "5500000"
    });  
})

describe("Test Market place", () => {
    it("Should deploy the contract", async () =>{
        assert.ok(contract.options.address); 
    })

    it("should mint the NFT", async () => {
        // console.log(accounts);

        const mintNFT = await contract.methods.mintNFT("token uri", 100, "name", "desc").send({
            from : accounts[0],
            gas : "1000000"
        }); 
        // console.log(Number(mintNFT.logs[1].data));
        const tokens = await contract.methods.viewAllTokens().call(); 

        assert.equal(tokens.length -1, Number(mintNFT.logs[1].data))
    }); 

    it("Should List the NFT", async () => {
        const mintNFT = await contract.methods.mintNFT("token uri", 100, "name", "desc").send({
            from : accounts[0],
            gas : "1000000"
        }); 
        
        const listNft = await contract.methods.listNFT(0).send({
            from : accounts[0]
        }); 

        // console.log(listNft);
        const tokens = await contract.methods.tokens(0).call(); 
        // console.log(tokens[7]);
        assert.equal(tokens[7], true); 
    })

    it("should transfer the nft to other user with required amount", async () => {
        const mintNFT = await contract.methods.mintNFT("token uri", 100, "name", "desc").send({
            from : accounts[0],
            gas : "1000000"
        }); 
        
        const listNft = await contract.methods.listNFT(0).send({
            from : accounts[0]
        }); 

        // console.log(listNft);
        const tokens = await contract.methods.viewAllTokens().call(); 
        const index = tokens.length - 1; 

        await contract.methods.purchaseNFT(index).send({
            from : accounts[1], 
            value : tokens[index].price, 
            gas : "1000000"
        })

        assert.ok(tokens[index].owner, accounts[1]); 
    })
});

// passes all the test cases for basic marketplace...