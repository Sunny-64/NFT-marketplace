import React, { useEffect, useState } from 'react'
import ApiService from '../services/ApiServices';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import web3 from './../scripts/web3'; 
import { initContract } from "./../scripts/contract";

function User() {
  const navigate = useNavigate(); 
  // console.log(sessionStorage.getItem("isLoggedIn"));
  if(!sessionStorage.getItem("isLoggedIn")){
    navigate("/"); 
  }
  const [userData, setUserData] = useState(); 
  const [userNfts, setUserNfts] = useState(); 
  const [contract, setContract] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
        const fetchAccounts = await web3.eth.getAccounts(); 
        const response = await ApiService.getUser(sessionStorage.getItem("UID")); 
        if(response.status !== 200){
          return toast.error(response.data.error); 
        }
        setUserData(response.data.data); 

        if(!web3){
          return; 
        }
        
        const nfts = await ApiService.getUserNFTs(fetchAccounts[0]); 
        console.log("NFTss : ", nfts);
        setUserNfts(nfts.data.data); 
    }
    fetchData(); 
  }, []); 

  useEffect(() => {
    initContract()
    .then((contractInstance) => {
        if (contractInstance) {
        // Contract initialized successfully
        console.log("Contract initialized.");
        setContract(contractInstance)
        
        } else {
        // Handle the case when the contract could not be initialized
        console.log("Failed to initialize contract.");
        }
    })
    .catch((err) => {
        console.log(err);
    });
  }, []);

  const sellNft = async (index) => {
    let confirm = window.confirm("You really want to sell your NFT?"); 
    if(!confirm){
      return; 
    }

    try{
        const getMetaMaskAccounts = await web3.eth.getAccounts(); 
        console.log("Accounts : ", getMetaMaskAccounts);
        console.log("contract", contract);

        const listNft = await contract.methods.listNFT(index).send({
          from : getMetaMaskAccounts[0]
        }); 

        console.log("NFT Listed : ", listNft);
    }
    catch(err){
      console.log(err);
    }

  }
  return (
    <>
        <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
          />
  
      <section id='User' className='px-4 flex gap-4'>
          <p className='bg-[#000] px-3 py-2 inline-block rounded-md font-semibold text-lg'>My Information</p>
          <p className='bg-[#000] px-3 py-2 inline-block rounded-md'>{userData?.username}</p>
          <p className='bg-[#000] px-3 py-2 inline-block rounded-md'>{userData?.email}</p>
          <p className='bg-[#000] px-3 py-2 inline-block rounded-md'>{userData?.mobile}</p>
      </section>

      <div className='mt-8 grid lg:grid-cols-4 md:grid-cols-3 md:place-content-center sm:place-content-center sm:grid-cols-2 xs:grid-cols-1 px-4 '>
          {userNfts?.map((item, index) => {
              return (
                  <div key={index} className='card bg-[#343444] w-[320px] rounded-lg px-4 py-2 shadow-sm shadow-[#79279F] my-6'>
                      {/* <p className='break-words'>Owner: {item[0]}</p> */}
                      <p>name : {item.name}</p>
                      <p className='break-words'>Description : {item.description}</p>
                      <img src={item.tokenURI} className='w-full rounded-md my-3 h-[250px] object-cover' alt=''/>
                      <div className='flex justify-between'>
                        <p>Item Id : {item.tokenId}</p>
                        <p>Price : {web3.utils.fromWei(item.price, "ether")}</p>
                      </div>
                      <div className='flex justify-between items-center mt-3'>
                        <p>Sold : {item.isSold.toString()}</p>
                        <button className='py-2 rounded-md btn-primary px-3' onClick={() => sellNft(index)}>Sell</button>
                      </div>
                  </div>
              )
          })}
    </div>
    </>
  )
}

export default User
