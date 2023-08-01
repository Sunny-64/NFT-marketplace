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

    // event NFTValueUpdated(uint); 

    struct Token {
        address owner; 
        uint tokenId; 
        // address tokenAddress; 
        string tokenURI; 
        uint price; 
        bool isSold; 
        string name; 
        string description; 
        bool isListedForSale; 
    }

    Token [] public tokens; 

    constructor() ERC721("Market_Place", "MKP") {}
    
    function mintNFT(string memory tokenURI, uint price, string memory name, string memory description) public  returns (uint256){
        require(price > 0, "Initial price should be greater than 0"); // sets the minimum price for the NFT

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        Token memory newToken = Token(
            msg.sender, 
            newItemId, 
            tokenURI, 
            price, 
            false, 
            name, 
            description, 
            false
        );

        tokens.push(newToken);
        _tokenIds.increment();
        return tokens.length - 1;
    }

    function purchaseNFT (uint index) public payable {
        require(index >= 0 || index < tokens.length, "invalid index"); 
        require(msg.value == tokens[index].price, "Insufficient amount"); 
        require(!tokens[index].isSold, "Token already sold"); 
        require(msg.sender != tokens[index].owner, "Owner can't purchase their own NFT");

        address prevOwner = tokens[index].owner; 
        tokens[index].owner = msg.sender; 

        _transfer(prevOwner, msg.sender, tokens[index].tokenId);
        tokens[index].isSold = true; 
        tokens[index].isListedForSale = false; 
    }

    function listNFT(uint index) public {
        tokens[index].isListedForSale = true; 
    }

    function viewAllTokens() public view returns(Token [] memory){
        return tokens; 
    }
}
