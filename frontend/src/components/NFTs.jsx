import React, { useEffect, useState } from 'react'
import APIService from './../services/ApiServices';
import web3 from './../scripts/web3'
import { initContract } from "./../scripts/contract";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";


function NFTs() {
  const [nfts, setNfts] = useState();
  const [contract, setContract] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let nfts = await APIService.fetchListedNfts();
        console.log(nfts);
      
        setNfts(nfts.data.data);
        // console.log(nftArray);
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchData();

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
  }, [])

  const purchaseNFT = async (index, price) => {
    if (!sessionStorage.getItem("isLoggedIn")) {
      return toast.error("You have to login to purchase the NFT");
    }
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(contract);
      console.log("Index",index);
      console.log("price : ",price);
      console.log(accounts);
      const purchase = await contract.methods.purchaseNFT(index).send({
        from: accounts[0],
        value: price
      });
      
      console.log("tx", purchase);
    }
    catch (err) {
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
      NFTs
      <div className='grid lg:grid-cols-4 md:grid-cols-3 md:place-content-center sm:place-content-center sm:grid-cols-2 xs:grid-cols-1'>
        {nfts?.map((item, index) => {
          {/* console.log(item) */}
          return (
            <>
              <div key={index} className='card bg-[#343444] w-[320px] rounded-lg px-4 py-2 shadow-sm shadow-[#79279F] mb-6'>
                {/* <p className='break-words'>Owner: {item[0]}</p> */}
                {/* <p className='break-words'>Owner : {item[0]}</p> */}
                <p>name : {item.name}</p>
                <p className='break-words'>Description : {item.description}</p>
                <img src={item.tokenURI} className='w-full rounded-md my-3 h-[250px] object-cover' alt='' />
                <div className='flex justify-between'>
                  <p>Item Id : {item.tokenId}</p>
                  <p>Price : {web3.utils.fromWei(item.price, "ether")}</p>
                </div>
                <div className='flex justify-between items-center mt-3'>
                  <p>Category : {item.category}</p>
                  <button className='py-2 rounded-md btn-primary px-3' onClick={() => purchaseNFT(index, item.price)}>Purchase</button>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default NFTs
