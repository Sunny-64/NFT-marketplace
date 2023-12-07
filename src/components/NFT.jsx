import { React, useState, useEffect } from 'react'
import web3Utils from '../scripts/web3Utils'
import initWeb3 from '../scripts/web3';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";

import { useLocation, useNavigate } from 'react-router-dom';

import APIService from '../services/ApiServices';
import { initContract } from '../scripts/contract';

function NFT(props) {
    const [contract, setContract] = useState("");
    let [loading, setLoading] = useState(false);
    let [accounts, setAccounts] = useState([]);
    const [web3, setWeb3] = useState({});
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();
    // const [txStatus, setTxStatus] = useState(); // to show transaction status..

    useEffect(() => {
        initWeb3()
            .then(web3Instance => {
                setWeb3(web3Instance);
                console.log("Web3 initialized and accounts fetched");
                const fetchAccounts = async () => {
                    try {
                        setAccounts(await web3Instance.eth.getAccounts());
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                fetchAccounts();
                // console.log(accounts);
            })
            .catch(err => {
                console.log(err);
            });

        initContract()
            .then(async (contractInstance) => {
                if (contractInstance) {
                    // Contract initialized successfully
                    setContract(contractInstance);
                    // setAccounts(await web3.eth.getAccounts()); 
                    console.log("Contract initialized");

                } else {
                    // Handle the case when the contract could not be initialized
                    console.log("Failed to initialize contract.");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const purchaseNFT = async (index, price, owner) => {
        setLoading(true);
        if (!sessionStorage.getItem("isLoggedIn")) {
            toast.error("You have to login to purchase the NFT");
            return;
        }
        try {
            const accounts = await web3.eth.getAccounts();

            contract.methods.purchaseNFT(index).send({
                from: accounts[0],
                value: price,
                gas: "500000"
            })
                .then(purchase => {
                    console.log(purchase);
                    APIService.saveTx({ tokenId: index, transactionAmount: price, transactionType: "purchase", transactionHash: purchase?.transactionHash ?? "" })
                        .then(saveTx => {
                            console.log(saveTx);
                            setLoading(false);

                            console.log("tx", purchase);
                            navigate("/profile");
                            toast.success("transaction Complete")
                        })
                        .catch(err => {
                            console.log(err);
                            toast.error("Error while Saving the tx : ", err.message)
                        });
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err.message);
                });


        }
        catch (err) {
            console.log(err);
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

    console.log(isOwner);

    return (
        <>
            <div key={props.index} className='card bg-[#343444] w-[320px] rounded-lg px-4 py-2 shadow-sm shadow-[#79279F] mb-6'>
                {/* <p className='break-words'>Owner: {item.owner}</p> */}
                {/* <p className='break-words'>Owner : {item[0]}</p> */}
                <p className='text-xl font-bold'>{props.name}</p>
                <p className='break-words text-md opacity-80'>{props.description}</p>
                <img src={props.tokenURI} className='w-full rounded-md my-3 h-[250px] object-cover' alt='' />
                <div className='flex justify-between'>
                    {/* <p>Item Id : {props.tokenId}</p> */}
                    <p className='font-bold'>Price : {web3Utils.fromWei(props.price, "ether")} ETH</p>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <p><span className='opacity-80'>Category :</span> <span className='font-semibold'>{props.category}</span></p>
                    {/* {console.log(props.owner, "accounts : ", accounts[0])} */}
                    {props.owner !== accounts[0] && <button className='py-2 rounded-md btn-primary px-3' onClick={() => purchaseNFT(props.tokenId, props.price, props.owner)}>Purchase</button>}
                </div>
            </div>
        </>
    )
}

export default NFT
