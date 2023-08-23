import React, { useEffect, useState } from 'react'
import APIService from './../services/ApiServices';
import web3 from './../scripts/web3'
import { initContract } from "./../scripts/contract";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";

import { useNavigate } from "react-router-dom";

function NFTs() {
  const [nfts, setNfts] = useState();
  const [contract, setContract] = useState("");
  let [loading, setLoading] = useState(false);
  let [accounts, setAccounts] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let nfts = await APIService.fetchListedNfts();
        console.log(nfts);

        setNfts(nfts.data.data);
        setLoading(false);
        // console.log(nftArray);
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchData();

    initContract()
      .then(async (contractInstance) => {
        if (contractInstance) {
          // Contract initialized successfully
          setContract(contractInstance); 
          setAccounts(await web3.eth.getAccounts()); 
          console.log("Contract initialized and accounts fetched");

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
      // console.log(contract);
      // console.log("Index", index);
      // console.log("price : ", price);
      // console.log(accounts);
      setLoading(true);

      const saveTx = await APIService.saveTx({tokenId : index, transactionAmount : price, transactionType : "purchase"}); 
      console.log(saveTx);

      const purchase = await contract.methods.purchaseNFT(index).send({
        from: accounts[0],
        value: price
      });
      setLoading(false);

      console.log("tx", purchase);
    }
    catch (err) {
      console.log(err);
    }
  }

  const override = {
    margin: "0 auto",
    borderColor: "blue",
    position: "absolute",
    top: "40%",
    left : "45%",
    marginLeft: "auto",
    display: "block",
  };
  return (
    <>
      {/* <div className='relative w-full flex justify-center'> */}
        <MoonLoader
          color={"#ffffff"}
          loading={loading}
          cssOverride={override}
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      {/* </div> */}

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


      {nfts?.length < 0 && <p>No NFT's has been listed For sale yet..</p>}
      <div className='grid lg:grid-cols-4 md:grid-cols-3 md:place-content-center sm:place-content-center sm:grid-cols-2 xs:grid-cols-1 gap-3'>
        {nfts?.map((item, index) => {
          return (
        
              <div key={index}  className='card bg-[#343444] w-[320px] rounded-lg px-4 py-2 shadow-sm shadow-[#79279F] mb-6'>
                {/* <p className='break-words'>Owner: {item.owner}</p> */}
                {/* <p className='break-words'>Owner : {item[0]}</p> */}
                <p>name : {item.name}</p>
                <p className='break-words'>Description : {item.description}</p>
                <img src={item.tokenURI} className='w-full rounded-md my-3 h-[250px] object-cover' alt='' />
                <div className='flex justify-between'>
                  <p>Item Id : {item.tokenId}</p>
                  <p>Price : {Number(web3?.utils?.fromWei(item.price ?? 0, "ether"))}</p>
                </div>
                <div className='flex justify-between items-center mt-3'>
                  <p>Category : {item.category}</p>
                  <button className='py-2 rounded-md btn-primary px-3' onClick={() => purchaseNFT(item.tokenId, item.price)}>Purchase</button>
                </div>
              </div>
         
          )
        })}
      </div>
    </>
  )
}

export default NFTs
