import React, { useEffect, useState } from 'react'
import APIService from './../services/ApiServices';
import web3 from './../scripts/web3'
import { initContract } from "./../scripts/contract";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";

import { useNavigate } from "react-router-dom";
import web3Utils from '../scripts/web3Utils';
import NFT from './NFT';

function NFTs() {
  const [nfts, setNfts] = useState();
  const [contract, setContract] = useState("");
  let [loading, setLoading] = useState(false);
  let [accounts, setAccounts] = useState([]); 

  // console.log(web3Utils);

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
  }, [])

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
        <MoonLoader
          color={"#ffffff"}
          loading={loading}
          cssOverride={override}
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />

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
              <NFT 
                key={index}
                name={item.name}
                description={item.description}
                tokenURI = {item.tokenURI}
                price = {item.price}
                category = {item.category}
                tokenId = {item.tokenId}
              />
          )
        })}
      </div>
    </>
  )
}

export default NFTs


//  {/* <div key={index}  className='card bg-[#343444] w-[320px] rounded-lg px-4 py-2 shadow-sm shadow-[#79279F] mb-6'>
//                 <p className='break-words'>Owner: {item.owner}</p> 
//                  <p className='break-words'>Owner : {item[0]}</p>
//                 <p>name : {item.name}</p>
//                 <p className='break-words'>Description : {item.description}</p>
//                 <img src={item.tokenURI} className='w-full rounded-md my-3 h-[250px] object-cover' alt='' />
//                 <div className='flex justify-between'>
//                   <p>Item Id : {item.tokenId}</p>
//                   <p>Price : {web3Utils.fromWei(item.price, "ether")} ETH</p>
//                 </div>
//                 <div className='flex justify-between items-center mt-3'>
//                   <p>Category : {item.category}</p>
//                   <button className='py-2 rounded-md btn-primary px-3' onClick={() => purchaseNFT(item.tokenId, item.price)}>Purchase</button>
//                 </div>
//               </div> */}