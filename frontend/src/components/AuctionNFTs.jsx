import React, { useEffect, useState, useRef } from 'react'
import ApiService from '../services/ApiServices';
import web3 from './../scripts/web3';
import { initContract } from '../scripts/contract';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";


function AuctionNFTs() {
    const [auctions, setAuctions] = useState([]);
    const [contract, setContract] = useState({});
    // const [time, setTime] = useState(0)
    let [loading, setLoading] = useState(false);
    useEffect(() => {
        // initialize the contract...
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
            const data = await ApiService.fetchAuctions();
            console.log(data.data.data);
            if (data.status === 200) {
                setAuctions(data.data.data);
            }
        }
        fetchData();

    }, []);

    const getRemainingTime = (endTime) => {
        const now = new Date().getTime();
        const endTimestamp = endTime * 1000; // Convert seconds to milliseconds
        const remainingTime = endTimestamp - now;
        return remainingTime;
    }

    // const getFormatedTime = (endTime) => {
    //     // const now = new Date().getTime();
    //     const date = new Date(endTime); 
    //     return date.toString(); 
    // }

    const calculateCountdown = (endTime) => {
        const remainingTime = getRemainingTime(endTime);
        // setCountDown(remainingTime); 
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);


        return remainingTime > 0 ? `${days}d ${hours}h ${minutes}m ${seconds}s` : 0;
    };



    console.log(contract);
    const handleBidding = async (highestBid, index, endTime) => {
        if (getRemainingTime(endTime) < 0) {
            return window.alert("Auction is over you can't bid anymore")
        }
        const biddingAmount = prompt("Enter the Amount in (ETH) : ");
        if (!biddingAmount) {
            return;
        }
        // console.log(highestBid, index, biddingAmount);
        try {
            setLoading(true); 
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
            console.log(highestBid);
            if (web3.utils.toWei(biddingAmount, "ether") < highestBid) {
                return window.alert("Bid a higher amount than the previous bid");
            }

            // initiate bidding...
            console.log("Bidding...")
            // console.log(contract)

            const saveTx = await ApiService.saveTx({ tokenId: index, transactionAmount: web3.utils.toWei(biddingAmount, "ether"), transactionType: "bid" });
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

            {auctions?.length > 0 ? <h3 className='font-semibold text-3xl mb-4'>Auction NFTs</h3> : <p className='mt-5'>No NFT's has been listed for Auction yet</p>}
            <div className='grid lg:grid-cols-4 md:grid-cols-3 md:place-content-center sm:place-content-center sm:grid-cols-2 xs:grid-cols-1'>
                {
                    auctions?.map((item, index) => {
                        return (
                            <div key={index} className='card bg-[#343444] w-[320px] rounded-lg px-4 py-2 shadow-sm shadow-[#79279F] mb-6 mt-10'>
                                <p>name : {item.tokenName}</p>
                                <p className='break-words'>Description : {item.tokenDescription}</p>
                                <p>Auction Ends in : {calculateCountdown(item.endTime)}</p>
                                <img src={item.tokenURI} className='w-full rounded-md my-3 h-[250px] object-cover' alt='' />
                                <div className='flex flex-col'>
                                    <p>Highest Bid : {Number(web3.utils.fromWei(item.highestBid, "ether"))} ETH</p>
                                    <p>Starting Price : {Number(web3.utils.fromWei(item.startingPrice, "ether"))} ETH</p>
                                </div>
                                <div className='flex justify-between items-center mt-3'>
                                    <p>Category : {item.category}</p>
                                    <button className='py-2 rounded-md btn-primary px-7' disable={getRemainingTime(item.endTime) > 0 ? "false" : "true"} onClick={() => handleBidding(item.highestBid, index, item.endTime)}>Bid</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>

    )
}

export default AuctionNFTs
