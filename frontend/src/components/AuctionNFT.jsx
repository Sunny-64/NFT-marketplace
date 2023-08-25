import {React, useState, useEffect} from 'react'
import web3 from '../scripts/web3';
import web3Utils from '../scripts/web3Utils';
import { initContract } from '../scripts/contract';
import ApiService from '../services/ApiServices';
import Countdown from './Countdown';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";

function AuctionNFT(props) {
    let [loading, setLoading] = useState(false);
    const [contract, setContract] = useState({});
    const [accounts,setAccounts] = useState([]); 
    // console.log(props.endTime);
    useEffect(() => {
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

    const getRemainingTime = (endTime) => {
        const now = new Date().getTime();
        const endTimestamp = endTime * 1000; // Convert seconds to milliseconds
        const remainingTime = endTimestamp - now;
        return remainingTime;
    }

    // console.log(contract);
    const handleBidding = async (highestBid, index, endTime, owner) => {
        if(!localStorage.getItem("TOKEN") || !sessionStorage.getItem("isLoggedIn")){
            return window.alert("please login first"); 
        }
        if(!web3){
            console.log("inside");
            return window.alert("please install or login to metamask"); 
        }
        if (getRemainingTime(endTime) < 0) {
            return window.alert("Auction is over you can't bid anymore")
        }
        // console.log(highestBid, index, biddingAmount);
        try {
            setLoading(true); 
            
            if(!accounts || accounts?.length <= 0){
                setLoading(false); 
                return window.alert("Please login to meta mask first"); 
            }
            if(accounts[0] === owner){
                setLoading(false); 
                return window.alert("Owner Cannot Bid on their own NFT"); 
            }
            const biddingAmount = prompt("Enter the Amount in (ETH) : ");
            if (!biddingAmount) {
                return;
            }
            if (web3?.utils?.toWei(biddingAmount, "ether") < highestBid) {
                return window.alert("Bid a higher amount than the previous bid");
            }
            // initiate bidding...
            console.log("Bidding...")
            // console.log(contract)

            const saveTx = await ApiService.saveTx({ tokenId: index, transactionAmount: web3?.utils?.toWei(biddingAmount, "ether"), transactionType: "bid" });
            console.log(saveTx);
            setLoading(false); 
            const bid = await contract.methods.bidOnAuction(index).send({
                from: accounts[0],
                value: web3.utils.toWei(biddingAmount, "ether")
            });

            console.log("success : ", bid);
            window.location.reload();
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
        left: "45%",
        marginLeft: "auto",
        display: "block",
    };
    
    return (
        <div key={props.index} className='card bg-[#343444] w-[320px] rounded-lg px-4 py-2 shadow-sm shadow-[#79279F] mb-6 mt-10'>
            {loading &&  <MoonLoader
                color={"#ffffff"}
                loading={loading}
                cssOverride={override}
                size={60}
                aria-label="Loading Spinner"
                data-testid="loader"
            />}
            <p className='text-xl font-bold'>{props.tokenName}</p>
            <p className='break-words text-md opacity-[0.9]'>{props.tokenDescription}</p>
            <Countdown text={"Auction ends in : "} endTime={props.endTime} />

            <img src={props.tokenURI} className='w-full rounded-md my-3 h-[250px] object-cover' alt='' />
            <div className='flex flex-col'>
                <p className='font-bold'>Highest Bid : {Number(web3Utils.fromWei(props.highestBid, "ether"))} ETH</p>
                <p className='font-bold'>Starting Price : {Number(web3Utils.fromWei(props.startingPrice, "ether"))} ETH</p>
            </div>
            <div className='flex justify-between items-center mt-3'>
                <p><span className='opacity-80'>Category :</span> <span className='font-semibold'>{props.category}</span></p>
                {accounts[0] !== props.creator && <button className='py-2 rounded-md btn-primary px-7' disable={getRemainingTime(props.endTime) > 0 ? "false" : "true"} onClick={() => handleBidding(props.highestBid, props.index, props.endTime, props.creator)}>Bid</button>}
            </div>
        </div>
    )
}

export default AuctionNFT
