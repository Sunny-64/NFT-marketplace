import Web3 from "web3";

let web3;

const initWeb3 = async () => {
  try {
    // console.log();

    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      // Metamask is installed and running in the browser.
      window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
    } else {
      if (typeof process !== "undefined") {
        console.log("Metamask not installed. Please install Metamask to use this website's Ethereum features.");
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