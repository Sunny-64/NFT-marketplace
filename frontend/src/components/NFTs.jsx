import React, { useEffect, useState } from 'react'
import APIService from './../services/ApiServices'; 


function NFTs() {
  const [nfts, setNfts] = useState(); 

  useEffect(() => {
      const fetchData = async () => {
        try{
          let nfts = await APIService.fetchNFTs(); 
          let nftArray = nfts.data.data.map((items, index) => {
              return items.split(",");
          }) 
          setNfts(nftArray); 
        }
        catch(err){
          console.log(err) ;
        }
      }

      fetchData(); 
  }, [])
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 md:place-content-center sm:place-content-center sm:grid-cols-2 xs:grid-cols-1'>
          {nfts?.map((item, index) => {
              return (
                <>
                  <div key={index} className='card bg-[#343444] w-[320px] rounded-lg px-4 py-2 shadow-sm shadow-[#79279F]'>
                      {/* <p className='break-words'>Owner: {item[0]}</p> */}
                      <p>name : {item[5]}</p>
                      <p className='break-words'>Description : {item[6]}</p>
                      <img src={item[2]} className='w-full rounded-md my-3' alt=''/>
                      <div className='flex justify-between'>
                        <p>Item Id : {item[1]}</p>
                        <p>Price : {item[3]}</p>
                      </div>
                      <div className='flex justify-between items-center mt-3'>
                        <p>Sold : {item[4]}</p>
                        <button className='py-2 rounded-md btn-primary px-3'>Purchase</button>
                      </div>
                  </div>
                </>
              )
          })}
    </div>
  )
}

export default NFTs
