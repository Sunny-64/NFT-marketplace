# NFT-marketplace
## How to Setup the backend
```
cd ./backend
npm install
npx hardhat compile
npx hardhat run ./scripts/deploy
```
Once the following steps are done Navigate to src/helpers under helpers directory in the contract.js change the contract address to the address that was logged 
after running ```npx hardhat run ./scripts/deploy```

## How to setup the frontend 
- Copy the ABI from the artificats/contracts/NFTMarketplace.sol/Market.json from the backend.
- Paste the copied ABI in src/static/ABI.json
- navigate to scripts/contract.js and update the contract address.
- Change the firebase credentials. 
