// SPDX-License-Identifier: MIT
//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Market is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Token {
        address payable owner; 
        uint tokenId; 
        string tokenURI; 
        uint price; 
        string name; 
        string description; 
        string category;
        bool isListedForSale; 
        bool isListedForAuction; 
    }

    struct Auction{
        uint tokenIndex; 
        uint startingPrice; 
        address payable creator; 
        uint endTime; 
        uint highestBid; 
        address highestBidder; 
    }

    Token [] public tokens; 
    Auction [] auctions; 

    modifier onlyTokenOwner(uint i){
        require(msg.sender == tokens[i].owner); 
        _; 
    }

    modifier onlyAuctionOwner(uint i){
        require(msg.sender == auctions[i].creator);
        _; 
    }

    modifier notListedForSale(uint index){
        require(!tokens[index].isListedForSale, "Already listed for sale"); 
        _;
    }
    
    modifier notListedForAuction(uint index){
        require(!tokens[index].isListedForAuction, "Already Listed for Auction");
        _; 
    }

    constructor() ERC721("Market_Place", "MKP") {}
    
    // function mintNFT(string memory tokenURI, uint price, string memory name, string memory description) public  returns (uint256){
    function mintNFT(string memory tokenURI, string memory name, string memory description, string memory category) public  returns (uint256){
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        Token memory newToken = Token(
            payable(msg.sender), 
            newItemId, 
            tokenURI, 
            0,
            name, 
            description, 
            category,
            false, 
            false
        );

        tokens.push(newToken);
        _tokenIds.increment();
        return tokens.length - 1;
    }

    function purchaseNFT (uint index) public payable notListedForSale(index) notListedForAuction(index){
        // require(msg.sender != tokens[index].owner, "Owner can't purchase their own NFT");
        require(index >= 0 || index < tokens.length, "invalid index"); 
        require(msg.value >= tokens[index].price, "Insufficient amount"); 

        address prevOwner = tokens[index].owner; 
        payable(prevOwner).transfer(msg.value);

        tokens[index].owner = payable(msg.sender); 

        _transfer(prevOwner, msg.sender, tokens[index].tokenId);

        tokens[index].isListedForAuction = false; 
        tokens[index].isListedForSale = false; 
        tokens[index].price = msg.value;
    }

    function sellNFT(uint index, uint price) public onlyTokenOwner(index) notListedForSale(index) notListedForAuction(index){ // turn it into sell NFT function 
        require(price > 0, "Price should be greater than zero"); 

        tokens[index].price = price; 
        tokens[index].isListedForSale = true; 
    }

    function removeFromSale(uint index) public onlyTokenOwner(index) notListedForSale(index){
        // require(!tokens[index].isListedForSale, "Already Not Listed For sale..");
        tokens[index].isListedForSale = false; 
    }

    function viewAllTokens() public view returns(Token [] memory){ // shouldn't be avaialbe to users.
        return tokens; 
    }

    function NFTsForSale() public view returns (Token[] memory) {
        Token[] memory listedNFTs = new Token[](tokens.length); // Maximum possible size

        uint numListedNFTs = 0;
        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i].isListedForSale) {
                listedNFTs[numListedNFTs] = tokens[i];
                numListedNFTs++;
            }
        }

        // Resize the array to the actual number of listed NFTs
        assembly {
            mstore(listedNFTs, numListedNFTs)
        }

        return listedNFTs;
    }

    // auction initiation...
    function startAuction(uint startingPrice, uint durationInSeconds, uint index) public onlyTokenOwner(index) notListedForSale(index) notListedForAuction(index){ // duration will be in hours..
        // require(tokens[index].owner == msg.sender, "Only the owner can auction the NFT");
      
        Auction memory startNewAuction; 
        startNewAuction.creator = payable(msg.sender); 
        startNewAuction.endTime = block.timestamp + durationInSeconds; 
        startNewAuction.highestBid = 0;
        startNewAuction.highestBidder = address(0); 
        startNewAuction.startingPrice = startingPrice; 
        startNewAuction.tokenIndex = index;  
        tokens[index].isListedForAuction = true; 
        // adds the auction to auctions array..
        auctions.push(startNewAuction);

    }

    function getAllAuctions() public view returns(Auction [] memory){
        return auctions;
    }

    function removeAuction(uint i) public {
        tokens[auctions[i].tokenIndex].isListedForAuction = false; 
        auctions[i] = auctions[auctions.length - 1]; 
        auctions.pop(); 
    }

    function bidOnAuction(uint auctionIndex) public payable {
        require(auctions[auctionIndex].creator != msg.sender, "Owners cannot bid on their own NFT");
        require(msg.value > auctions[auctionIndex].highestBid, "Bid must be higher than the previous bid"); 
        require(block.timestamp < auctions[auctionIndex].endTime, "Auction has ended"); 

        if (auctions[auctionIndex].highestBid > 0) {
            address payable previousBidder = payable(auctions[auctionIndex].highestBidder);
            previousBidder.transfer(auctions[auctionIndex].highestBid);
        }

        auctions[auctionIndex].highestBid = msg.value; 
        auctions[auctionIndex].highestBidder = msg.sender; 
    }

    function finalizeAuction(uint auctionIndex) public payable onlyAuctionOwner(auctionIndex){

        require(auctions[auctionIndex].highestBid > 0, "No one has bid on the auction");

        address prevOwner = auctions[auctionIndex].creator; 

        // transfer the ownership
        transferFrom(prevOwner, auctions[auctionIndex].highestBidder, tokens[auctions[auctionIndex].tokenIndex].tokenId);

        // change the owner details 
        tokens[auctions[auctionIndex].tokenIndex].owner = payable(auctions[auctionIndex].highestBidder); 
        tokens[auctions[auctionIndex].tokenIndex].price = auctions[auctionIndex].highestBid; 
        tokens[auctions[auctionIndex].tokenIndex].isListedForAuction = false; 

        payable(auctions[auctionIndex].creator).transfer(auctions[auctionIndex].highestBid);

        // Remove the NFT from the auction
        auctions[auctionIndex] = auctions[auctions.length - 1]; 
        auctions.pop(); 
    }
}
