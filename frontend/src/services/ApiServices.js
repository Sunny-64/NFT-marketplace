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

    // saveNFT()
}


const ApiService = new APIServices(); 

export default ApiService; 