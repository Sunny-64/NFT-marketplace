import React, { useEffect, useState } from 'react'
import initWeb3 from './../scripts/web3'
import { initContract } from "./../scripts/contract";
import ApiService from '../services/ApiServices';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";

import web3Utils from '../scripts/web3Utils';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [nfts, setNfts] = useState([]);
  const [contract, setContract] = useState({});

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  let [loading, setLoading] = useState(false);
  const [web3, setWeb3] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    initWeb3()
      .then(web3Instance => {
        setWeb3(web3Instance);
      })
      .catch(err => {
        console.log(err);
      });

    initContract()
      .then((contractInstance) => {
        if (contractInstance) {
          // Contract initialized successfully
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
      try {
        // fetch categories
        setLoading(true);
        const fetchCategories = await ApiService.getCategories();
        // console.log(fetchCategories.data.data);
        setCategories(fetchCategories.data.data);
        setLoading(false);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [])
  // console.log(categories);

  const filterByCategory = async (category) => {
    try {
      setLoading(true);
      const data = await ApiService.searchByCategory(category);
      console.log(data);
      setNfts(data.data.data);
      setLoading(false)
    }
    catch (err) {
      console.log(err);
    }
  }

  const purchaseNFT = async (index, price) => {

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
      setLoading(false);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleSearchNFt = async (e) => {
    e.preventDefault();
    try {
      if (name.trim() === "") {
        return;
      }
      setLoading(true);
      const data = await ApiService.searchByName(name);
      // console.log(data);
      setNfts(data.data.data);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
    }
  }
  const override = {
    margin: "0 auto",
    borderColor: "blue",
    position: "absolute",
    // width : "", 
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
      <form action="" onSubmit={handleSearchNFt} className='sm:flex sm:gap-4 sm:justify-center px-4'>
        <input className='px-2 py-1 rounded-sm w-full sm:w-[60%]  mb-3' style={{ color: "black" }} type="text" placeholder='Search for NFT' name='search' value={name} onChange={(e) => setName(e.target.value)} />
        <div className="flex justify-between sm:block ">
          <button type='submit' className='btn-primary px-2 py-1 rounded-sm sm:mx-4'>Search</button>
          <div className="dropdown">
            <button className="dropbtn px-3 py-1">Categories</button>
            <div className="dropdown-content">
              {
                categories.map((category, index) => {
                  return (
                    <p className=' cursor-pointer' onClick={() => filterByCategory(category)}>{category}</p>
                  )
                })
              }
            </div>
          </div>
        </div>
      </form>


      <div className="nfts px-6 mt-20 flex flex-wrap sm:gap-8">
        {nfts?.map((item, index) => {
          return (
            <>
              {!item?.isListedForAuction ?
                <div key={index} className='card bg-[#343444] w-[320px] rounded-lg px-4 py-2 shadow-sm shadow-[#79279F] mb-6'>
                  <p>name : {item.name}</p>
                  <p className='break-words'>Description : {item.description}</p>
                  <img src={item.tokenURI} className='w-full rounded-md my-3 h-[250px] object-cover' alt='' />
                  <div className='flex justify-between'>
                    <p>Item Id : {item.tokenId}</p>
                    <p>Price : {Number(web3Utils.fromWei(item.price, "ether"))}</p>
                  </div>
                  <div className='flex justify-between items-center mt-3'>
                    <p>Category : {item.category}</p>
                    {item.price > 0 && <button className='py-2 rounded-md btn-primary px-3' onClick={() => purchaseNFT(index, item.price)}>Purchase</button>}
                  </div>
                </div>
                :
                <div key={index} className='card bg-[#343444] w-[320px] rounded-lg px-4 py-2 shadow-sm shadow-[#79279F] mb-6'>
                  <p>name : {item.name}</p>
                  <p className='break-words'>Description : {item.description}</p>
                  <img src={item.tokenURI} className='w-full rounded-md my-3 h-[250px] object-cover' alt='' />
                  <div className='flex justify-between'>
                    <p>Item Id : {item.tokenId}</p>
                    <p>Price : {Number(web3Utils.fromWei(item.price, "ether"))}</p>
                  </div>
                  <div className='flex justify-between items-center mt-3'>
                    <p>Category : {item.category}</p>
                    {item.price > 0 && <button className='py-2 rounded-md btn-primary px-3' onClick={() => navigate("/")}>Bid</button>}
                  </div>
                </div>
              }
            </>
          )
        })}
      </div>


    </>
  )
}

export default Search
