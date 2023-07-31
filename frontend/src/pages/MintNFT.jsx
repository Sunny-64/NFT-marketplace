import React, { useEffect, useState } from 'react'
import storage from './../scripts/firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';
import web3 from './../scripts/web3'
// import {contract} from './../scripts/contract'; 
import { initContract } from "./../scripts/contract";
import { useNavigate } from 'react-router-dom';

function MintNFT() {
    const navigate = useNavigate(); 

    if(!sessionStorage.getItem("isLoggedIn")){
        navigate("/"); 
    }
    
    const [name, setName] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [price, setPrice] = useState(0); 
    const [image, setImage] = useState(); 
    // const [imageDownloadUrl, setImageDownloadUrl] = useState(""); 
    const [contract, setContract] = useState(""); 

    let imageName; 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try{
            // Upload image to firebase and get the image url...
            if(!image){
                return;
            }
            
            imageName = (uuidv4() + "." + image.type.split("/")[1]); 

            const storageRef = ref(storage, `images/${imageName}`);
            const snapshot = await uploadBytes(storageRef, image); 
            console.log("Image uploaded to firebase..."); 

            // const imageListRef = ref(storage ,`images/${imageName}/`)
            // console.log("image list ref", imageListRef);

            const imageDownloadUrl = await getDownloadURL(ref(storage, `images/${imageName}/`)); 

            // make request to blockchain for minting the NFT.
            // console.log("Image Download URL : ",imageDownloadUrl);

            // get accounts  
            const accounts = await web3.eth.getAccounts(); 
            console.log(contract);

            const executeMint = await contract.methods.mintNFT(imageDownloadUrl, price, name, description)
            .send({
                from : accounts[0],
                value : price
            }); 

            console.log('result : ', executeMint);

        }
        catch(err){
            console.log(err)
        }
    }

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

    return (
        <section id='MintNFT' className='px-8 mt-16'>
            <div className='flex justify-center border-white border-2 flex-col items-center md:w-[40%] xs:w-[80%] xs:px-4 md:px-0 mx-auto py-8 rounded-lg'>
            <h2 className='text-3xl font-semibold mb-8 text-center'>Mint NFT</h2>
                <form action="" encType='multipart/form-data' className='md:w-[80%] sm:w-full' onSubmit={handleSubmit}>
                    <div className='mb-3 flex flex-col'>
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' name='name' className='py-2 rounded-md text-black px-4' required value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="description">Description</label>
                        <input type="text" id='description' name='description' className='py-2 rounded-md text-black px-4' required value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="price">Price</label>
                        <input type="number" name='price' id='price' className='py-2 rounded-md text-black px-4' required value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div className='mb-3 flex flex-col content-start'>
                        <label htmlFor="nftImage">Upload NFT image</label>
                        <input type="file" className='nftImage' required id='nftImage' onChange={(e) => setImage(e.target.files[0])}/>
                    </div>
                    <div className='mb-3 mt-5'>
                        <button className='btn-primary py-2 px-8 rounded-md'>Mint</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default MintNFT
