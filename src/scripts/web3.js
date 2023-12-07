import Web3 from "web3";

const initWeb3 = async () => {
  try {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      // Metamask is installed and running in the browser.
      await window.ethereum.request({ method: "eth_requestAccounts" });
      return new Web3(window.ethereum);

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