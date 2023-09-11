import { React, useState, useEffect } from 'react'
import { initContract } from '../../scripts/contract';
import initWeb3 from '../../scripts/web3';
import ApiService from '../../services/ApiServices';
import { useNavigate } from 'react-router-dom';
import UserNFT from './UserNFT';

function UserNFTs(props) {
  const [userNfts, setUserNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const fetchData = async () => {
        try{
          const nfts = await ApiService.getUserNFTs(props?.accounts[0]);
          setUserNfts(nfts.data.data);
          setLoading(false);
        }
        catch(err){
          console.log(err);
        }
      }
      fetchData();
  }, [props.accounts]);

  console.log(props.accounts);

  return (
    <>

      <div className='mt-8 grid lg:grid-cols-4 gap-3 md:grid-cols-3 md:place-content-center sm:place-content-center sm:grid-cols-2 xs:grid-cols-1 px-4 '>
        {!props.web3 && !props.accounts ? "Fetching Data...." :
          userNfts?.length < 1 ? "you do not have any nfts.." : userNfts?.map((item, index) => {
            return (
              <UserNFT
                key={index}
                index={index}
                name={item?.name}
                description={item?.description}
                tokenURI={item?.tokenURI}
                isListedForSale={item?.isListedForSale}
                isListedForAuction={item?.isListedForAuction}
                price={item?.price}
                endTime={item?.endTime}
                tokenId={item.tokenId}
                contract={props.contract}
                web3={props.web3}
                accounts={props.accounts}
              />
            )
          })
        }
      </div>
    </>
  )
}

export default UserNFTs
