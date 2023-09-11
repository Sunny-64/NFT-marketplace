import {React, useState} from 'react'
import web3Utils from '../../scripts/web3Utils';
import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import { CSSProperties } from "react";
import Countdown from '../Countdown';
import ApiService from '../../services/ApiServices';

function UserNFT(props) {
  const [toggleAuctionForm, setToggleAuctionForm] = useState(false);
  const [auctionDuration, setAuctionDuration] = useState(0);
  const [auctionStartingPrice, setAuctionStartingPrice] = useState(0);
  const [auctionIndex, setAuctionIndex] = useState()
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

    const getRemainingTime = (endTime) => {
        const now = new Date().getTime();
        const endTimestamp = endTime * 1000; // Convert seconds to milliseconds
        const remainingTime = endTimestamp - now;
        // console.log(remainingTime);
        // if(remainingTime > 0)
        return remainingTime
    };

    
  const handleInitiateAuction = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
    //   const fetchAccounts = await props.web3.eth.getAccounts();
      let auctionDurationInSeconds = Number(auctionDuration) * 3600;
      if (auctionDuration < 1) {
        return window.alert("Please Enter hours greater than or equal to 1");
      }
      let auctionPriceInWei = web3Utils.toWei(auctionStartingPrice, 'ether');

      setLoading(false);
      setToggleAuctionForm(!toggleAuctionForm);
      props.contract.methods.startAuction(auctionPriceInWei, auctionDurationInSeconds, auctionIndex).send({
        from: props.accounts[0],
        gas: "500000"
      })
        .then(auctionData => {
          navigate("/");
          toast.success("Transaction Successful");
        })
        .catch(err => {
          console.log(err);
          toast.error("Transaction Failed");
        });

    }
    catch (err) {
      console.log(err);
      return;
    }
  }

  const handleAuction = async (index) => {
    setAuctionIndex(index);
    setToggleAuctionForm(!toggleAuctionForm);
  }

  const sellNft = async (index) => {
    let confirm = window.confirm("You really want to sell your NFT?");
    if (!confirm) {
      return;
    }
    const price = prompt("Enter the Price for the NFT");
    try {
      setLoading(true);
    //   const getMetaMaskAccounts = await props.web3.eth.getAccounts();

      props.contract.methods.sellNFT(index, web3Utils.toWei(Number(price), "ether")).send({
        from: props.accounts[0],
        gas: "500000"
      })
        .then(listNft => {
          const saveTxInDB = async () => {
            try {
              const saveTx = await ApiService.saveTx({ tokenId: index, transactionAmount: web3Utils.toWei(price, "ether"), transactionType: "sell", transactionHash: listNft.transactionHash ?? "" });
              console.log(saveTx);
            }
            catch (err) {
              console.log(err);
            }
          }
          saveTxInDB();
          setLoading(false);
          toast.success("NFT listed for Sale");
          setTimeout(() => navigate("/"), 1000)
          return;
        })
        .catch(err => {
          console.log(err);
        });
    }
    catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  }

  const removeFromSale = async (tokenIndex) => {
    // console.log(tokenIndex);
    console.log(props.accounts);
    setLoading(true);
    try {
      let confirm = window.confirm("Are you sure you want to Remove it from sale");
      if (!confirm) {
        return;
      }
      // toast("Removing from Sale please wait");
      props.contract.methods.removeFromSale(tokenIndex).send({
        from: props.accounts[0],
        gas: "500000"
      })
      .then(remove => {
        console.log(remove);
        setLoading(false);
        toast.success("NFT unlisted form sale successfully");
        setTimeout(() => {
          navigate("/profile")
        }, 2000);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        toast.error(err.message);
      });

    }
    catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  const handleFinalizeAuction = async (index, price) => {
    try {
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
    //   const accounts = await props.web3.eth.getAccounts();

      // console.log(saveTx);
      props.contract.methods.finalizeAuction(index).send({
        from: props.accounts[0],
        gas: "500000"
      })
        .then(finalize => {
          console.log({tokenId: index, transactionAmount: price, transactionType: "sell", transactionHash: finalize?.transactionHash })
          const saveTransaction = async () => {
            const saveTx = await ApiService.saveTx({ tokenId: index, transactionAmount: price, transactionType: "sell", transactionHash: finalize?.transactionHash ?? "" });
            // save transaction history..
            console.log("finalized : ", finalize);
            setLoading(false);
            window.location.reload();
          }
          saveTransaction();
        })
        .catch(err => {
          console.log(err)
          toast.error(err.message);
          return;
        });

    }
    catch (err) {
      console.log(err);
    }
  }

    return (
        <>
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


            <div key={props.index} className='card col-span-1 bg-[#343444] w-[320px] rounded-lg px-4 py-2 shadow-sm shadow-[#79279F] my-6'>
                {/* <p className='break-words'>Owner: {props[0]}</p> */}
                <p>name : {props?.name}</p>
                <p className='break-words'>Description : {props?.description}</p>
                <img src={props?.tokenURI} className='w-full rounded-md my-3 h-[250px] object-cover' alt='' />
                <div className='flex justify-between'>
                    {/* <p>props Id : {props.tokenId}</p> */}
                    {Boolean(props?.isListedForSale) && <p>Price : {Number(web3Utils.fromWei(props?.price, "ether"))} ETH</p>}
                    {!Boolean(props?.isListedForSale) && !Boolean(props?.isListedForAuction) && <p>Price : {Number(web3Utils.fromWei(props.price, "ether"))} ETH</p>}
                    <p>{Boolean(props?.isListedForAuction)}</p>
                    {/* {Boolean(props?.isListedForAuction) && <p>Highest Bid : {web3.utils.fromWei(props.highestBid, "ether")}</p>} */}
                </div>
                {/* {props?.isListedForAuction && <p>You can Finalize Auction in : <br /><Countdown text="" endTime={props.endTime}/></p>}  */}
                <div className='flex justify-between propss-center mt-3'>
                    {/* <p>Sold : {props.isSold.toString()}</p> */}
                    {Boolean(props?.isListedForAuction) ? <button className={getRemainingTime(props?.endTime) > 0 ? 'py-2 rounded-md btn-primary px-3 disabled' : 'py-2 rounded-md btn-primary px-3'} disabled={getRemainingTime(props?.endTime) > 0} onClick={() => handleFinalizeAuction(props?.auctionIndex, props.price)}>{getRemainingTime(props.endTime) > 0 ? <Countdown text="Finalize in " endTime={props.endTime} /> : "Finalize Auction"}</button> :
                        Boolean(!props?.isListedForSale) && Boolean(!props?.isListedForAuction) && <button className='py-2 rounded-md btn-primary px-3' onClick={() => handleAuction(props.tokenId)}>Auction</button>
                    }
                    {/* {console.log()} */}
                    {Boolean(!props?.isListedForSale) && Boolean(!props?.isListedForAuction) && <button className='py-2 rounded-md btn-primary px-5' onClick={() => sellNft(props.tokenId)}>Sell</button>}
                    {Boolean(props?.isListedForSale) && Boolean(!props?.isListedForAuction) && <button className='py-2 rounded-md btn-primary px-5' onClick={() => removeFromSale(props.tokenId)}>Remove from Sell</button>}
                </div>
            </div>
        </>
    )
}

export default UserNFT
