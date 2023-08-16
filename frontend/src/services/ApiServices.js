import axios from "axios";
const BASE_URL = "http://localhost:3000"; 
const TOKEN = localStorage.getItem("TOKEN"); 
// console.log(TOKEN);

const HEADERS = {
    Accept:"application/json",
    Authorization : `Bearer ${TOKEN}`
}

class APIServices{

    fetchNFTs(){
        return axios.get(`${BASE_URL}/nfts`); 
    }

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
}


const ApiService = new APIServices(); 

export default ApiService; 