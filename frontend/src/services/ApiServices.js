import axios from "axios";
const BASE_URL = "https://fine-red-pronghorn-toga.cyclic.app";
// const BASE_URL = "http://localhost:3000";
// const TOKEN = localStorage.getItem("TOKEN") ?? sessionStorage.getItem("TOKEN");
// console.log("Token in service file : ", TOKEN);
const getAuthToken = () => {
    return `Bearer ${localStorage.getItem("TOKEN")}`; 
}

const HEADERS = {
  Accept: "application/json",
  Authorization: getAuthToken(),
};

class APIServices {
  fetchListedNfts() {
    return axios.get(`${BASE_URL}/nfts/listed`);
  }

  register(data) {
    console.log(data);
    return axios.post(`${BASE_URL}/users/register`, data);
  }

  login(data) {
    console.log(data);
    return axios.post(`${BASE_URL}/users/login`, data);
  }

  getUser(data) {
    console.log("Token in getUser API : ", getAuthToken());
    // console.log("user data in getuser  : "data);
    return axios.get(`${BASE_URL}/users/${data}`, { headers: {
        Accept: "application/json",
        Authorization: getAuthToken(),
    } });
  }

  addNFT(data) {
    return axios.post(`${BASE_URL}/nfts/add`, data, { headers: HEADERS });
  }

  getUserNFTs(publicKey) {
    return axios.get(`${BASE_URL}/nfts/user/${publicKey}`, {
      headers: {
        Accept: "application/json",
        Authorization: getAuthToken(),
      },
    });
  }

  fetchAuctions() {
    return axios.get(`${BASE_URL}/nfts/auctions`);
  }

  searchByName(name) {
    return axios.get(`${BASE_URL}/nfts/search/${name}`);
  }

  getCategories() {
    return axios.get(`${BASE_URL}/nfts/categories`);
  }

  searchByCategory(category) {
    return axios.get(`${BASE_URL}/nfts/categories/${category}`);
  }

  saveTx(data) {
    return axios.post(`${BASE_URL}/nfts/tx`, data, { headers: {
        Accept: "application/json",
        Authorization: getAuthToken(),
    } });
  }

  getAuctionWithId(id) {
    return axios.get(`${BASE_URL}/nfts/auction/${id}`);
  }

  getTxHistory() {
    // console.log("Token in getTxHistory API : ", getAuthToken());
    return axios.get(`${BASE_URL}/nfts/user/txs`, { headers: {
        Accept: "application/json",
        Authorization: getAuthToken(),
    } });
  }

  sortNFTListedForSaleByPrice(order) {
    return axios.get(`${BASE_URL}/nfts/sort/price/${order}`);
  }

  sortNFTListedForAuctionByPrice(order) {
    return axios.get(`${BASE_URL}/nfts/auctions/sort/price/${order}`);
  }
}

const ApiService = new APIServices();

export default ApiService;
