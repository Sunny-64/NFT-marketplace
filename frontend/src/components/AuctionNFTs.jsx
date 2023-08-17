import React, { useEffect, useState} from 'react'
import ApiService from '../services/ApiServices';

function AuctionNFTs() {
    const [auctions, setAuctions] = useState(""); 

    useEffect(() => {
        const fetchData = async () => {
            const data = await ApiService.fetchAuctions(); 
            console.log(data.data.data);
            if(data.status === 200){ 
                setAuctions(data.data.data); 
            }
        }
        fetchData(); 
    }, []); 

    return (
        <>
            <h3 className='font-semibold text-3xl mb-4'>Auction NFTs</h3>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 md:place-content-center sm:place-content-center sm:grid-cols-2 xs:grid-cols-1'>
                {/* <div key={index} className='card bg-[#343444] w-[320px] rounded-lg px-4 py-2 shadow-sm shadow-[#79279F] mb-6'>
                 
                    <p>name : {item.name}</p>
                    <p className='break-words'>Description : {item.description}</p>
                    <img src={item.tokenURI} className='w-full rounded-md my-3 h-[250px] object-cover' alt='' />
                    <div className='flex justify-between'>
                    <p>Item Id : {item.tokenId}</p>
                    <p>Price : {web3.utils.fromWei(item.price, "ether")}</p>
                    </div>
                    <div className='flex justify-between items-center mt-3'>
                    <p>Category : {item.category}</p>
                    <button className='py-2 rounded-md btn-primary px-3' onClick={() => purchaseNFT(index, item.price)}>Purchase</button>
                    </div>
                </div> */}
            </div>
        </>

    )
}

export default AuctionNFTs
