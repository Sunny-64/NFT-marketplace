import React, { useEffect, useState } from 'react'
import APIService from './../services/ApiServices';
import web3 from './../scripts/web3'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";

import NFT from './NFT';
import ApiService from './../services/ApiServices';

function NFTs() {
  const [nfts, setNfts] = useState([]);
  const [contract, setContract] = useState("");
  let [loading, setLoading] = useState(false);
  let [accounts, setAccounts] = useState([]);
  const [priceOrderSelection, setPriceOrderSelection] = useState("Sort By Price"); 

  // console.log(web3Utils);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let nfts = await APIService.fetchListedNfts();

        setNfts(nfts.data.data);
        setLoading(false);
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [])

  const handleSortByPrice = async (order) => {
    console.log("clicked");
      if(order === "highToLow"){
        setPriceOrderSelection("High to Low"); 
        setLoading(true); 
        const fetchNfts = await ApiService.sortNFTListedForSaleByPrice("descending"); 
        console.log("high : " ,fetchNfts);
        setNfts(fetchNfts.data.data); 
        setLoading(false);
      }
      if(order === "lowToHigh"){
        setLoading(true); 
        setPriceOrderSelection("Low To High"); 
        const fetchNfts = await ApiService.sortNFTListedForSaleByPrice("ascending"); 
        // console.log(fetchNfts);
        setNfts(fetchNfts.data.data); 
        console.log("low : ",fetchNfts);
        setLoading(false); 
      }
  } 

  const override = {
    margin: "0 auto",
    borderColor: "blue",
    position: "absolute",
    top: "40%",
    left: "45%",
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


      <div className='flex justify-between relative'>
        {nfts?.length > 0 ?
          <h3 className='text-xl font-bold mb-4'>NFTs</h3>
          :
          <p>No NFT's has been listed For sale yet..</p>
        }
        {nfts?.length > 0 && <div className="dropdown absolute right-[5%]">
          <button className="dropbtn px-3 py-1 rounded-md">{priceOrderSelection}</button>
          <div className="dropdown-content rounded-md hover:rounded-md">
              <p className='cursor-pointer' onClick={() => handleSortByPrice("highToLow")}>High to Low</p>
              <p className='cursor-pointer' onClick={() => handleSortByPrice("lowToHigh")}>Low to High</p>
          </div>
        </div>}
      </div>


      <div className='grid lg:grid-cols-4 md:grid-cols-3 md:place-content-center sm:place-content-center sm:grid-cols-2 xs:grid-cols-1 gap-3'>
        {nfts?.map((item, index) => {
          return (
            <NFT
              key={index}
              name={item.name}
              description={item.description}
              tokenURI={item.tokenURI}
              price={item.price}
              category={item.category}
              tokenId={item.tokenId}
              owner={item.owner}
            />
          )
        })}
      </div>
    </>
  )
}

export default NFTs
