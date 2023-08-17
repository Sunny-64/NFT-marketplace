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
  const [toggleAuctionForm, setToggleAuctionForm] = useState(""); 
  const [auctionStartingPrice, setAuctionStartingPrice] = useState(""); 
  const [auctionDuration, setAuctionDuration] = useState(""); 
  const [auctionIndex, setAuctionIndex] = useState(""); 

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

    const price = prompt("Enter the Price for the NFT"); 
    try{
        const getMetaMaskAccounts = await web3.eth.getAccounts(); 
        // console.log("Accounts : ", getMetaMaskAccounts);
        // console.log("contract", contract);

        console.log("price : ",price, typeof price, );
        console.log("Index : ",index, typeof index, );

        const listNft = await contract.methods.sellNFT(index, web3.utils.toWei(Number(price), "ether")).send({
          from : getMetaMaskAccounts[0]
        }); 

        console.log("NFT is Now Listed For Sale : ", listNft);
    }
    catch(err){
      console.log(err);
    }
  }

  const handleAuction = async(index) => {
    setToggleAuctionForm(!toggleAuctionForm); 
    setAuctionIndex(index); 
  }

  const handleInitiateAuction = async (e) => {
      e.preventDefault(); 
      // make auction request to blockchain now.... 
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

     {toggleAuctionForm && 
 
     <div className="modal top-[30%] absolute w-[100%] flex justify-center ">
          <form action="" className='px-6 w-[300px] py-3 rounded-md' onSubmit={handleInitiateAuction}>
              <h3 className='text-center mb-4'>Auction</h3>
              <div className='mb- flex flex-col w-full'>
                  <label htmlFor="startingPrice">Starting Price in ETH</label>
                  <input type="Number" className='px-3 py-1 rounded-md text-dark-900' style={{color : "black"}} id='startingPrice' name='startingPrice' value={auctionStartingPrice} onChange={(e) => setAuctionStartingPrice(e.target.value)}/>
              </div>

              <div className='mb-3 flex flex-col w-full'>
                  <label htmlFor="duration">Duration In Hours</label>
                  <input type="Number" className='px-3 py-1 rounded-md text-dark-900' style={{color : "black"}} id='duration' name='duration' value={auctionDuration} onChange={(e) => setAuctionDuration(e.target.value)} />
              </div>

              <div className='mb-3 flex justify-between w-full'>
                  <button className='btn-primary py-2 px-3 rounded-md' onClick={() => setToggleAuctionForm(!toggleAuctionForm)}>Close</button>
                  <button className='btn-primary py-2 px-3 rounded-md' type='submit'>Submit</button>
              </div>
          </form>
    </div>

     }

      <div className='mt-8 grid lg:grid-cols-4 md:grid-cols-3 md:place-content-center sm:place-content-center sm:grid-cols-2 xs:grid-cols-1 px-4 '>
          {userNfts?.map((item, index) => {
              return (
                  <div key={index} className='card bg-[#343444] w-[320px] rounded-lg px-4 py-2 shadow-sm shadow-[#79279F] my-6'>
                      {/* <p className='break-words'>Owner: {item[0]}</p> */}
                      <p>name : {item.name}</p>
                      <p className='break-words'>Description : {item.description}</p>
                      <img src={item.tokenURI} className='w-full rounded-md my-3 h-[250px] object-cover' alt=''/>
                      <div className='flex justify-between'>
                        {/* <p>Item Id : {item.tokenId}</p> */}
                        <p>Price : {Number(web3.utils.fromWei(item.price, "ether"))}</p>
                      </div>
                      <div className='flex justify-between items-center mt-3'>
                        {/* <p>Sold : {item.isSold.toString()}</p> */}
                        <button className='py-2 rounded-md btn-primary px-3' onClick={() => handleAuction(index)}>Auction</button>
                        <button className='py-2 rounded-md btn-primary px-5' onClick={() => sellNft(index)}>Sell</button>
                      </div>
                  </div>
              )
          })}
    </div>
    </>
  )
}

export default User
