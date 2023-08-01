import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {

  const navigate = useNavigate();

  const logout = async () => {
    const confirm = window.confirm("Are you sure you want to logout")
    if(confirm){
      sessionStorage.clear(); 
      navigate("/"); 
    }
  }
  return (
    <header id='Header' className='h-[40px] px-8 mb-8 py-8'>
        <nav className='grid grid-cols-3 content-center h-full '>
            <h3 className='col-span-1 text-xl font-bold brand self-center'><Link to={"/"}>NFT Marketplace</Link></h3>
            <ul className='flex gap-8 col-span-2 justify-end px-8 items-center'>
                <li><Link to={"/"}>Home</Link></li>
                {/* {sessionStorage.getItem("isLoggedIn") && <li><Link to={"/mint"}>Mint NFT</Link></li>} */}
                <li><Link to={"/mint"}>Mint NFT</Link></li>
                {sessionStorage.getItem("isLoggedIn") && <li><Link to={"/profile"}>Profile</Link></li>}
                {sessionStorage.getItem("isLoggedIn")  ? 
                  <li><button className='btn-primary px-3 py-2 rounded-md flex items-center' onClick={logout}>Logout</button></li> 
                  : 
                  <li><Link className='btn-primary px-3 py-2 rounded-md flex items-center' to={"/login"}>Login</Link></li> 
                }
            </ul>
        </nav>
    </header>
  )
}

export default Header
