import React, { useEffect, useState } from 'react'
import ApiService from '../services/ApiServices';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import web3 from './../scripts/web3';
import { initContract } from "./../scripts/contract";

import { CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import Countdown from '../components/Countdown';

function User() {
  const navigate = useNavigate();
  // console.log(sessionStorage.getItem("isLoggedIn"));
  if (!localStorage.getItem("TOKEN") || !web3) {
    navigate("/");
  }
  const [userData, setUserData] = useState();
  const [userNfts, setUserNfts] = useState();
  const [contract, setContract] = useState("");
  const [toggleAuctionForm, setToggleAuctionForm] = useState("");
  const [auctionStartingPrice, setAuctionStartingPrice] = useState(0);
  const [auctionDuration, setAuctionDuration] = useState(0);
  const [auctionIndex, setAuctionIndex] = useState("");
  const [txs, setTxs] = useState([]);
  let [loading, setLoading] = useState(false);
  const [txAmount, setTxAmount] = useState(); 

  useEffect(() => {
    const fetchData = async () => {
      const fetchAccounts = await web3.eth.getAccounts();
      const response = await ApiService.getUser(sessionStorage.getItem("UID"));
      if (response.status !== 200) {
        return toast.error(response.data.error);
      }
      setUserData(response.data.data);

      if (!web3) {
        return;
      }
      setLoading(true);
      const nfts = await ApiService.getUserNFTs(fetchAccounts[0]);
      console.log("NFTss : ", nfts);
      setUserNfts(nfts.data.data);
      setLoading(false);
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
    if (!confirm) {
      return;
    }

    const price = prompt("Enter the Price for the NFT");
    try {
      setLoading(true);
      const getMetaMaskAccounts = await web3.eth.getAccounts();

      console.log("price : ", price, typeof price,);
      console.log("Index : ", index, typeof index,);
      console.log("acc : ", getMetaMaskAccounts[0],);

      const saveTx = await ApiService.saveTx({ tokenId: index, transactionAmount: web3.utils.toWei(price, "ether"), transactionType: "sell" });
      console.log(saveTx);

      const listNft = await contract.methods.sellNFT(index, web3.utils.toWei(Number(price), "ether")).send({
        from: getMetaMaskAccounts[0]
      });

      setLoading(false);
      console.log("NFT is Now Listed For Sale : ", listNft);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleAuction = async (index) => {
    setAuctionIndex(index);
    setToggleAuctionForm(!toggleAuctionForm);
  }

  const handleInitiateAuction = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fetchAccounts = await web3.eth.getAccounts();
      let auctionDurationInSeconds = Number(auctionDuration) * 3600;
      if(auctionDuration < 1){
        return window.alert("Please Enter hours greater than or equal to 1"); 
      }
      let auctionPriceInWei = web3.utils.toWei(auctionStartingPrice, 'ether');
     
      setLoading(false);
      const startAuction = await contract.methods.startAuction(auctionPriceInWei, auctionDurationInSeconds, auctionIndex).send({
        from: fetchAccounts[0]
      });
      setToggleAuctionForm(!toggleAuctionForm);
      toast.success("Transaction Successful");
      // console.log(startAuction);
    }
    catch (err) {
      console.log(err);
      return;
    }
  }

  const getRemainingTime = (endTime) => {
    const now = new Date().getTime();
    const endTimestamp = endTime * 1000; // Convert seconds to milliseconds
    const remainingTime = endTimestamp - now;
    // console.log(remainingTime);
    // if(remainingTime > 0)
    return remainingTime
  };

  const handleFinalizeAuction = async (index, price) => {
    try{
      // console.log(index)
      const auctionDetails = await ApiService.getAuctionWithId(index);
      // console.log(auctionDetails);
      const auctionTime = getRemainingTime(Number(auctionDetails.data.data.endTime));
      // console.log(auctionTime);
      if (auctionTime > 0) {
        return window.alert("You can not finalize the auction yet.");
      }
      let confirm = window.confirm("Are you sure you want to end the auction");
      if (!confirm) {
        return;
      }
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
  
      const saveTx = await ApiService.saveTx({ tokenId: index, transactionAmount: price, transactionType: "sell" });
      // console.log(saveTx);
      let finalize = await contract.methods.finalizeAuction(index).send({
        from: accounts[0]
      });
  
      // save transaction history..
      console.log("finalized : ", finalize);
      setLoading(false);
    }
    catch(err){
      console.log(err);
    }
  }


  const override = {
    margin: "0 auto",
    borderColor: "blue",
    position: "absolute",
    // width : "", 
    top: "50%",
    marginLeft: "auto",
    display: "block",
  };

  useEffect(() => {
    // fetch user transactions...
    const fetchData = async () => {
      setLoading(true);
      const fetchTxs = await ApiService.getTxHistory();
      setLoading(false);
      console.log(fetchTxs.data.data);
      setTxs(fetchTxs.data.data);
    }
    fetchData();
  }, [])
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

      <div className='relative w-full flex justify-center'>
        <MoonLoader
          color={"#ffffff"}
          loading={loading}
          cssOverride={override}
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>

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
              <input type="Number" className='px-3 py-1 rounded-md text-dark-900' style={{ color: "black" }} id='startingPrice' name='startingPrice' value={auctionStartingPrice} onChange={(e) => setAuctionStartingPrice(e.target.value)} />
            </div>

            <div className='mb-3 flex flex-col w-full'>
              <label htmlFor="duration">Duration In Hours</label>
              <input type="Number" className='px-3 py-1 rounded-md text-dark-900' style={{ color: "black" }} id='duration' name='duration' value={auctionDuration} onChange={(e) => setAuctionDuration(e.target.value)} />
            </div>

            <div className='mb-3 flex justify-between w-full'>
              <button className='btn-primary py-2 px-3 rounded-md' onClick={() => setToggleAuctionForm(!toggleAuctionForm)}>Close</button>
              <button className='btn-primary py-2 px-3 rounded-md' type='submit'>Submit</button>
            </div>
          </form>
        </div>

      }

      <div className='mt-8 grid lg:grid-cols-4 gap-3 md:grid-cols-3 md:place-content-center sm:place-content-center sm:grid-cols-2 xs:grid-cols-1 px-4 '>
        {userNfts?.map((item, index) => {
          return (
            <div key={index} className='card col-span-1 bg-[#343444] w-[320px] rounded-lg px-4 py-2 shadow-sm shadow-[#79279F] my-6'>
              {/* <p className='break-words'>Owner: {item[0]}</p> */}
              <p>name : {item.name}</p>
              <p className='break-words'>Description : {item.description}</p>
              <img src={item.tokenURI} className='w-full rounded-md my-3 h-[250px] object-cover' alt='' />
              <div className='flex justify-between'>
                {/* <p>Item Id : {item.tokenId}</p> */}
                {Boolean(item?.isListedForSale) && <p>Price : {Number(web3.utils.fromWei(item?.price, "ether"))} ETH</p>}
                {!Boolean(item?.isListedForSale) && !Boolean(item?.isListedForAuction) && <p>Price : {Number(web3?.utils?.fromWei(item.price, "ether"))} ETH</p>}
                <p>{Boolean(item?.isListedForAuction)}</p>
                {/* {Boolean(item?.isListedForAuction) && <p>Highest Bid : {web3.utils.fromWei(item.highestBid, "ether")}</p>} */}
              </div>
                {/* {item?.isListedForAuction && <p>You can Finalize Auction in : <br /><Countdown text="" endTime={item.endTime}/></p>}  */}
              <div className='flex justify-between items-center mt-3'>
                {/* <p>Sold : {item.isSold.toString()}</p> */}
                {Boolean(item?.isListedForAuction) ? <button className={getRemainingTime(item?.endTime) > 0 ? 'py-2 rounded-md btn-primary px-3 disabled' : 'py-2 rounded-md btn-primary px-3'} disabled={getRemainingTime(item?.endTime) > 0} onClick={() => handleFinalizeAuction(item?.auctionIndex, item.price)}>{getRemainingTime(item.endTime) > 0 ? <Countdown text="Finalize in " endTime = {item.endTime}/> : "Finalize Auction"}</button> :
                  Boolean(!item?.isListedForSale) && Boolean(!item?.isListedForAuction) && <button className='py-2 rounded-md btn-primary px-3' onClick={() => handleAuction(item.tokenId)}>Auction</button>
                }
                  {/* {console.log()} */}
                {Boolean(!item?.isListedForSale) && Boolean(!item?.isListedForAuction) && <button className='py-2 rounded-md btn-primary px-5' onClick={() => sellNft(item.tokenId)}>Sell</button>}
              </div>
            </div>
          )
        })}
      </div>

      <section id='tx' className='my-16 px-4'>
      <h3 className='text-3xl font-semibold text-center mb-2'>Transactions</h3>
      <hr className='mb-8' />
      <div className='grid grid-cols-2 gap-4'>
        {txs?.map((item, key) => {
            return (
              <div className='gap-10 tx py-2 px-4 inline-flex rounded-lg col-span-1'>
                <p>Token Id : {item.tokenId}</p>
                {/* {setTxAmount(item?.transactionAmount ?? "xx")} */}
                {/* <p>Transaction Amount : {web3.utils.fromWei(item.transactionAmount, "ether")} ETH</p> */}
                <p>Transaction Type : {item.transactionType}</p>
              </div>
            )
          })}
      </div>
      </section>
    </>
  )
}

export default User
