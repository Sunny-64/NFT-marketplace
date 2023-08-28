import axios from "axios";
const BASE_URL = "https://fine-red-pronghorn-toga.cyclic.app"; 
const TOKEN = localStorage.getItem("TOKEN"); 
// console.log(TOKEN);

const HEADERS = {
    Accept:"application/json",
    Authorization : `Bearer ${TOKEN}`
}

class APIServices{

    fetchListedNfts(){
        return axios.get(`${BASE_URL}/nfts/listed`); 
    }

    register(data){
        console.log(data);
        return axios.post(`${BASE_URL}/users/register`, data); 
    }

    login(data){
        console.log(data);
        return axios.post(`${BASE_URL}/users/login`, data); 
    }

    getUser(data){
        // console.log(data);
        return axios.get(`${BASE_URL}/users/${data}`, {headers : HEADERS}); 
    }

    addNFT(data){
        return axios.post(`${BASE_URL}/nfts/add`, data, {headers : HEADERS}); 
    }

    getUserNFTs(publicKey){
        return axios.get(`${BASE_URL}/nfts/user/${publicKey}`, {headers : HEADERS}); 
    }

    fetchAuctions(){
        return axios.get(`${BASE_URL}/nfts/auctions`); 
    }

    searchByName(name){
        return axios.get(`${BASE_URL}/nfts/search/${name}`); 
    }

    getCategories(){
        return axios.get(`${BASE_URL}/nfts/categories`); 
    }

    searchByCategory(category){
        return axios.get(`${BASE_URL}/nfts/categories/${category}`); 
    }

    saveTx(data){
        return axios.post(`${BASE_URL}/nfts/tx`, data, {headers : HEADERS});
    }

    getAuctionWithId(id){
        return axios.get(`${BASE_URL}/nfts/auction/${id}`); 
    }

    getTxHistory(){
        return axios.get(`${BASE_URL}/nfts/user/txs`, {headers : HEADERS}); 
    }

    sortNFTListedForSaleByPrice(order){
        return axios.get(`${BASE_URL}/nfts/sort/price/${order}`); 
    }

    sortNFTListedForAuctionByPrice(order){
        return axios.get(`${BASE_URL}/nfts/auctions/sort/price/${order}`); 
    }
}


const ApiService = new APIServices(); 

export default ApiService; 