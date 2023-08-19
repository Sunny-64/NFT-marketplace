import React, { useEffect, useState } from 'react'
import ApiService from '../services/ApiServices';
import web3 from './../scripts/web3';
import { initContract } from '../scripts/contract';

function AuctionNFTs() {
    const [auctions, setAuctions] = useState([]);
    const [contract, setContract] = useState({});

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

        // const countdownInterval = setInterval(updateCountdowns, 1000);

        // Clear the interval when the component unmounts
        // return () => clearInterval(countdownInterval);
    }, []);


    const calculateCountdown = (endTime) => {
        const now = new Date().getTime();
        const endTimestamp = endTime * 1000; // Convert seconds to milliseconds
        const remainingTime = endTimestamp - now;

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);


        return remainingTime > 0 ? `${days}d ${hours}h ${minutes}m ${seconds}s` : 0;
    };

    console.log(contract);
    const handleBidding = async (highestBid, index) => {
        const biddingAmount = prompt("Enter the Amount in (ETH) : ");
        // console.log(highestBid, index, biddingAmount);
        const accounts = await web3.eth.getAccounts(); 
        console.log(accounts);
        console.log(highestBid);
        if (web3.utils.toWei(biddingAmount, "ether") < highestBid) {
            return;
        }

        // initiate bidding...
        console.log("Bidding...")
        console.log(contract)
        const bid = await contract.methods.bidOnAuction(index).send({
            from : accounts[0],
            value : web3.utils.toWei(biddingAmount, "ether")
        }); 

        console.log("success : ",bid);
        window.location.reload(); 
    }
    return (
        <>

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
                                <div className='flex justify-between'>
                                    <p>HighestBid : {Number(web3.utils.fromWei(item.highestBid, "ether"))} ETH</p>
                                </div>
                                <div className='flex justify-between items-center mt-3'>
                                    <p>Category : {item.category}</p>
                                    <button className='py-2 rounded-md btn-primary px-7' onClick={() => handleBidding(item.highestBid, index)}>Bid</button>
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
