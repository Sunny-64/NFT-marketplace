import Web3 from "web3";

let web3;

// function connect() {
//   ethereum
//     .request({ method: 'eth_requestAccounts' })
//     .then(handleAccountsChanged)
//     .catch((err) => {
//       if (err.code === 4001) {
//         // EIP-1193 userRejectedRequest error
//         // If this happens, the user rejected the connection request.
//         console.log('Please connect to MetaMask.');
//       } else {
//         console.error(err);
//       }
//     }

const initWeb3 = async () => {
  try {
    // console.log();

    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      // Metamask is installed and running in the browser.
      window.ethereum.request({ method: "eth_requestAccounts" })
      .then(handleAccount => {
        console.log(handleAccount);
        web3 = new Web3(window.ethereum);
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      if (typeof process !== "undefined") {
        console.log("Metamask not installedD. Please install Metamask to use this website's Ethereum features.");
      }
      web3 = null; // Set web3 to null if Metamask is not available.
    }

  }
  catch (err) {
    console.log(err);
  }
}

initWeb3()
.then(() => console.log("Initialized Web3"))
.catch(err => console.log(err)); 
export default web3;