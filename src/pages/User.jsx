import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import initWeb3 from './../scripts/web3';
import { initContract } from "./../scripts/contract";

import MoonLoader from "react-spinners/MoonLoader";
import axios from 'axios';
import UserNFTs from '../components/user/UserNFTs';
import UserTx from '../components/user/UserTx';

import { BASE_URL } from '../services/ApiServices';

function User(props) {
  const navigate = useNavigate();
  // console.log(sessionStorage.getItem("isLoggedIn"));
  if (!localStorage.getItem("TOKEN")) {
    navigate("/");
  }
  const [userData, setUserData] = useState();
  let [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(sessionStorage.getItem("UID"));
  const [web3, setWeb3] = useState(); 
  const [accounts, setAccounts] = useState();
  const [contract, setContract] = useState();

  useEffect(() => {
    // setup web3..
    setLoading(true);

    initWeb3()
    .then(web3Instance => {
      // console.log("Web3 initialized...", web3);
      setWeb3(web3Instance);
      web3Instance.eth.getAccounts()
        .then(acc => {
          setAccounts(acc); 
          // console.log("Accounts initialized....",acc);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    })

    initContract()
    .then((contractInstance) => {
      if (contractInstance) {
        // console.log("Contract initialized...", contract);
        setContract(contractInstance)

      } else {
        console.log("Failed to initialize contract. ", contractInstance);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);


  useEffect(() => {
    setUserId(sessionStorage.getItem("UID"));
    const fetchData = async () => {
      try {
        setLoading(true); 
        let url = `${BASE_URL}/users/${userId}`;
       
        const response = await axios.get(url, {headers : {
            'Accept' : "application/json",
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        }});
        if (response.status !== 200) {
          return toast.error(response.data.error);
        }
        setUserData(response.data.data);
        setLoading(false);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [userId, web3]);


  const override = {
    margin: "0 auto",
    borderColor: "blue",
    position: "absolute",
    // width : "", 
    top: "50%",
    marginLeft: "auto",
    display: "block",
  };

  // console.log("web3 : ", web3, "contract : ", contract, "accounts : ", accounts);
  return (
    <>
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

      <div className='relative w-full flex justify-center'>
        <MoonLoader
          color={"#ffffff"}
          loading={loading}
          cssOverride={override}
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>

      <section id='User' className='px-4 flex gap-4'>
        <p className='bg-[#000] px-3 py-2 inline-block rounded-md font-semibold text-lg'>My Information</p>
        <p className='bg-[#000] px-3 py-2 inline-block rounded-md'>{userData?.username}</p>
        <p className='bg-[#000] px-3 py-2 inline-block rounded-md'>{userData?.email}</p>
        <p className='bg-[#000] px-3 py-2 inline-block rounded-md'>{userData?.mobile}</p>
      </section>
      
      {!web3 && !contract && !accounts ? <p className='px-4'> Please install and login into metamask</p> :  
          <UserNFTs 
            contract = {contract}
            web3 = {web3}
            accounts = {accounts}
          />
      }
      <UserTx />
    </>
  )
}

export default User
