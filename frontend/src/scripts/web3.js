import Web3 from "web3";

<<<<<<< HEAD
=======
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

>>>>>>> bd9e2207d1eae362fea9f20c7c0582048614a208
const initWeb3 = async () => {
  try {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      // Metamask is installed and running in the browser.
<<<<<<< HEAD
      await window.ethereum.request({ method: "eth_requestAccounts" });
      return new Web3(window.ethereum);

=======
      window.ethereum.request({ method: "eth_requestAccounts" })
      .then(handleAccount => {
        console.log(handleAccount);
        web3 = new Web3(window.ethereum);
      })
      .catch(err => {
        console.log(err);
      });
>>>>>>> bd9e2207d1eae362fea9f20c7c0582048614a208
    } else {
      if (typeof process !== "undefined") {
        console.log("Metamask not installedD. Please install Metamask to use this website's Ethereum features.");
      }
      return null // Set web3 to null if Metamask is not available.
    }

  }
  catch (err) {
    console.log(err);
    return null; 
  }
}

export default initWeb3; 