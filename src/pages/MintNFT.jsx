import React, { useEffect, useState, useRef } from 'react'
import storage from './../scripts/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';
import initWeb3 from './../scripts/web3'
import { initContract } from "./../scripts/contract";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiService from './../services/ApiServices';

import { CSSProperties } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

import { io } from "socket.io-client";


function MintNFT() {
    const navigate = useNavigate();
    // const socket = useRef(); 
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState();
    // const [imageDownloadUrl, setImageDownloadUrl] = useState(""); 
    const [contract, setContract] = useState();
    let [loading, setLoading] = useState(false);
    const [web3, setWeb3] = useState();
    const [accounts, setAccounts] = useState();


    let imageName;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const ethAccounts = await web3.eth.getAccounts();
            if (!sessionStorage.getItem("isLoggedIn")) {
                toast.error("please login first");
                return;
            }
            if (!web3) {
                alert("Please install metaMask first");
                return;
            }
            e.preventDefault();
            // Upload image to firebase and get the image url...
            if (!contract) {
                toast.error("Please login into metamask first");
                return;
            }

            if (!ethAccounts) {
                toast.error("Please Login into metamask");
                return
            }
            if (!image) {
                return;
            }
            setLoading(true);
            imageName = (uuidv4() + "." + image.type.split("/")[1]);

            const storageRef = ref(storage, `images/${imageName}`);
            const snapshot = await uploadBytes(storageRef, image);
            console.log("Image uploaded to firebase...");

            const imageDownloadUrl = await getDownloadURL(ref(storage, `images/${imageName}/`));
            setLoading(false);
            toast.success("Confirming Transactin...");

            // get accounts  

            console.log(contract);
            setLoading(true);

            // make request to blockchain for minting the NFT.
            contract.methods.mintNFT(imageDownloadUrl, name, description, category)
                .send({
                    from: ethAccounts[0],
                })
                .then(executeMint => {
                    console.log(executeMint);
                    toast.success("Transaction successful");
                    setLoading(false);

                    const data = {
                        tokenId: Number(executeMint.logs[1].data),
                        tokenName: name,
                        tokenURI: imageDownloadUrl,
                        tokenDescription: description,
                        ownerAddress: ethAccounts[0],
                        category: category
                    }

                    console.log("Data to be sent to the server : ", data);
                    ApiService.addNFT(data)
                        .then(saveNFTData => {
                            if (saveNFTData.status === 200) {
                                console.log("NFT SAVED...");
                            }
                            else {
                                console.log("NFT not saved")

                            }
                            console.log('result : ', executeMint);
                            navigate("/profile");
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        // Initialize web3...
        initWeb3()
            .then(web3Instance => {
                console.log(web3Instance);
                setWeb3(web3Instance);
                const fetchAccounts = async () => {
                    try {
                        if (web3Instance) {
                            setAccounts(await web3Instance?.eth?.getAccounts());
                        }

                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                fetchAccounts();
            })
            .catch(err => {
                console.log(err);
            });

        // initialize contract
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
            let confirm = window.confirm("You need to be logged in to mint the NFT. Go to Login page ?");
            if (confirm) {
                navigate("/login");
            }
        }
    }, []);

    const override = {
        width: '100%',
        margin: '0 auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // Center the loader
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
    };

    return (
        <>
            <div className='relative w-full flex justify-center'>
                <ClimbingBoxLoader
                    color={"#ffffff"}
                    loading={loading}
                    cssOverride={override}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
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

            <section id='MintNFT' className='px-8 mt-16'>
                <div className='flex justify-center border-white border-2 flex-col items-center md:w-[60%] lg:w-[40%] sm:w-[60%] sm:px-4 mx-auto py-8 rounded-lg'>
                    <h2 className='text-3xl font-semibold mb-8 text-center'>Mint NFT</h2>
                    <form action="" encType='multipart/form-data' className='md:w-[80%] sm:w-full' onSubmit={handleSubmit}>
                        <div className='mb-3 flex flex-col'>
                            <label htmlFor="name">Name</label>
                            <input type="text" id='name' name='name' className='py-2 rounded-md text-black px-4' required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='flex flex-col mb-3'>
                            <label htmlFor="description">Description</label>
                            <input type="text" id='description' name='description' className='py-2 rounded-md text-black px-4' required value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className='flex flex-col mb-3'>
                            <label htmlFor="category">Category</label>
                            <input type="text" name='price' id='category' className='py-2 rounded-md text-black px-4' required value={category} onChange={(e) => setCategory(e.target.value)} />
                        </div>
                        <div className='mb-3 flex flex-col content-start'>
                            <label htmlFor="nftImage">Upload NFT image</label>
                            <input type="file" className='nftImage' required id='nftImage' onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <div className='mb-3 mt-5'>
                            <button className='btn-primary py-2 px-8 rounded-md'>Mint</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default MintNFT
