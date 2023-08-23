import React, { useEffect, useState } from 'react'
import web3 from './../scripts/web3'
import { initContract } from "./../scripts/contract";
import ApiService from '../services/ApiServices';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";

function Search() {
  const [nfts, setNfts] = useState([]); 
  const [contract, setContract] = useState({}); 

  const [categories, setCategories] = useState([]); 
  const [name, setName] = useState(""); 
  let [loading, setLoading] = useState(false);

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

      const fetchData = async () => {
        // fetch categories
        setLoading(true); 
        const fetchCategories = await ApiService.getCategories(); 
        console.log(fetchCategories.data.data);
        setCategories(fetchCategories.data.data); 
        setLoading(false); 
      }

      fetchData(); 

  }, [])
  console.log(categories);

  const filterByCategory = async (category) =>{
      setLoading(true); 
      const data = await ApiService.searchByCategory(category); 
      console.log(data);
      setNfts(data.data.data);
      setLoading(false)
  }

  const purchaseNFT = async (index, price) => {
    if (!sessionStorage.getItem("isLoggedIn")) {
      return toast.error("You have to login to purchase the NFT");
    }
    try {
      setLoading(true); 
      const accounts = await web3.eth.getAccounts();
     
      const purchase = await contract.methods.purchaseNFT(index).send({
        from: accounts[0],
        value: price
      });
      
      console.log("tx", purchase);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleSearchNFt = async (e) => {
      e.preventDefault(); 
      if(name.trim() === ""){
        return; 
      }
      setLoading(true); 
      const data = await ApiService.searchByName(name); 
      console.log(data);
      setNfts(data.data.data); 
      setLoading(false); 
  }
  const override = {
    margin: "0 auto",
    borderColor: "blue",
    position: "absolute",
    // width : "", 
    top: "40%",
    left : "45%",
    marginLeft: "auto",
    display: "block",
  };
  return (

    <>
     {/* <div className='relative w-full flex justify-center z-100'> */}
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
    <div className='search flex justify-center gap-5'>
      <div className="">
        <form action="" onSubmit={handleSearchNFt}>
          <input className='px-2 py-1 rounded-sm w-[400px]' style={{color : "black"}} type="text" placeholder='Search for NFT' name='search' value={name} onChange={(e) => setName(e.target.value)} />
          <button type='submit' className='btn-primary px-2 py-1 rounded-sm'>Search</button>
        </form>
      </div>
      <div className="dropdown">
        <button className="dropbtn px-3 py-1">Categories</button>
        <div className="dropdown-content">
          {
              categories.map((category, index) => {
                  return (
                    <p onClick={() => filterByCategory(category)}>{category}</p>
                  )
              })
          }
        </div>
      </div>
    </div>

    <div className="nfts px-6 mt-20">
    {nfts?.map((item, index) => {
          {/* console.log(item) */}
          return (
            <>
              <div key={index} className='card bg-[#343444] w-[320px] rounded-lg px-4 py-2 shadow-sm shadow-[#79279F] mb-6'>
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

export default Search
