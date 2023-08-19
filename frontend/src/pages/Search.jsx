import React, { useEffect, useState } from 'react'
import web3 from './../scripts/web3'
import { initContract } from "./../scripts/contract";

function Search() {
  const [nfts, setNfts] = useState([]); 
  const [contract, setContract] = useState({}); 

  const [Categories, setCategories] = useState([]); 

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

      // fetch categories
  }, [])
  return (

    <>
    <div className='search flex justify-center gap-5'>
      <div className="">
        <form action="">
          <input className='px-2 py-1 rounded-sm w-[400px]' type="text" placeholder='Search for NFT' />
          <button className='btn-primary px-2 py-1 rounded-sm'>Search</button>
        </form>
      </div>
      <div className="dropdown">
        <button className="dropbtn px-3 py-1">Categories</button>
        <div className="dropdown-content">
          {/* <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a> */}
        </div>
      </div>
    </div>

    <div className="nfts">

    </div>

    
    </>
  )
}

export default Search
