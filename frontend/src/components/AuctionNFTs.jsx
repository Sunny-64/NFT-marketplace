import React, { useEffect, useState, useRef } from 'react'
import ApiService from '../services/ApiServices';
import web3 from './../scripts/web3';
import { initContract } from '../scripts/contract';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";

import Countdown from './Countdown';
import web3Utils from '../scripts/web3Utils';

import AuctionNFT from './AuctionNFT';

function AuctionNFTs() {
    const [auctions, setAuctions] = useState([]);
    let [loading, setLoading] = useState(false);
    useEffect(() => {
        // initialize the contract...
        const fetchData = async () => {
            try {
                const data = await ApiService.fetchAuctions();
                console.log(data);
                if (data.status === 200) {
                    setAuctions(data.data.data);
                }
            }
            catch (err) {
                console.log(err.message);
            }
        }
        fetchData();

    }, []);

    const sortNFTByPrice = async () => {

    }

    const getRemainingTime = (endTime) => {
        const now = new Date().getTime();
        const endTimestamp = endTime * 1000; // Convert seconds to milliseconds
        const remainingTime = endTimestamp - now;
        return remainingTime;
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


            <div className='flex justify-between'>
                {auctions?.length > 0 ? <h3 className='font-semibold text-3xl mb-4'>Auction NFTs</h3> : <p className='mt-5'>No NFT's has been listed for Auction yet</p>}
                <select style={{color : "black"}}>
                    <option selected style={{color : "black"}} disabled="true" className='' value="">Sort by Price</option>
                    <option style={{color : "black"}} className='outline-none' value="descending">High to low</option>
                    <option style={{color : "black"}} value="ascending">Low to high</option>
                </select>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 md:place-content-center sm:place-content-center sm:grid-cols-2 xs:grid-cols-1'>
                {
                    auctions?.map((item, index) => {
                        return getRemainingTime(item.endTime) > 0 &&

                            <AuctionNFT
                                key={index}
                                tokenName={item.tokenName}
                                tokenDescription={item.tokenDescription}
                                tokenURI={item.tokenURI}
                                highestBid={item.highestBid}
                                startingPrice={item.startingPrice}
                                category={item.category}
                                endTime={item.endTime}
                                creator={item.creator}
                                index={index}
                            />

                    })
                }
            </div>
        </>
    )
}

export default AuctionNFTs

