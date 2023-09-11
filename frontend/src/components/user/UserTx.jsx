import {React, useEffect, useState} from 'react'
import axios from 'axios';
import { BASE_URL } from '../../services/ApiServices';

function UserTx() {
    let [loading, setLoading] = useState(false);
    const [txs, setTxs] = useState([]);
    useEffect(() => {
        // fetch user transactions...
        
        const fetchData = async () => {
          try {
            setLoading(true);
            let url = `${BASE_URL}/nfts/user/txs`; 
            const fetchTxs = await axios.get(url, {headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          }});
            setLoading(false);
            console.log("txs : ", fetchTxs?.data?.data);
            setTxs(fetchTxs?.data?.data);
          }
          catch (err) {
            console.log(err);
          }
        }
        fetchData();
      }, [])
    return (
        <section id='tx' className='my-16 px-4'>
        <h3 className='text-3xl font-semibold text-center mb-2'>Transactions</h3>
        <hr className='mb-8' />
        <div className='grid grid-cols-2 gap-4'>
          {txs?.map((item, key) => {
            return (
              <div key={key} className='gap-10 tx py-2 px-4 inline-flex rounded-lg col-span-1'>
                <p>Token Id : {item?.tokenId}</p>
                {/* {setTxAmount(item?.transactionAmount ?? "xx")} */}
                {/* <p>Transaction Amount : {web3Utils.fromWei(item?.transactionAmount, "ether") ?? "xxx"} ETH</p> */}
                <p>Transaction Type : {item?.transactionType}</p>
              </div>
            )
          })}
        </div>
      </section>
    )
}

export default UserTx
