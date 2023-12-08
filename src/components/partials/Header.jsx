import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {

  const navigate = useNavigate();
  const [hamActive, setHamActive] = useState(false); 

  const logout = async () => {
    const confirm = window.confirm("Are you sure you want to logout")
    if(confirm){
      sessionStorage.clear(); 
      localStorage.clear(); 
      navigate("/"); 
    }
  }
  return (
    <header id='Header' className='h-[40px] px-4 md:px-8 mb-8 py-8'>
        <nav className='grid grid-cols-2 sm:grid-cols-3 content-center h-full '>
            <h3 className='col-span-1 text-xl font-bold brand self-center'><Link to={"/"}>NFT Marketplace</Link></h3>
            <ul className={` ${!hamActive ? 'opacity-0 -top-[300px]' : ' bg-slate-800 rounded-md px-2 py-3'} sm:bg-transparent absolute top-12 z-50 right-8 w-[30%] sm:static sm:opacity-100 sm:w-full sm:gap-8 sm:col-span-2 sm:flex sm:justify-end md:px-8 sm:items-center transition-all ease-in-out duration-500`}>
                <li className='mb-3 sm:mb-0' onClick={() => setHamActive(!hamActive)}><Link to={"/"}>Home</Link></li>
                <li className='mb-3 sm:mb-0' onClick={() => setHamActive(!hamActive)} ><Link to={"/search"}>Search</Link></li>
                <li className='mb-3 sm:mb-0' onClick={() => setHamActive(!hamActive)} ><Link to={"/mint"}>Mint NFT</Link></li>
                {sessionStorage.getItem("isLoggedIn") && <li className='mb-3 sm:mb-0' onClick={() => setHamActive(!hamActive)}><Link to={"/profile"}>Profile</Link></li>}
                {sessionStorage.getItem("isLoggedIn")  ? 
                  <li className='mb-3 sm:mb-0' onClick={() => setHamActive(!hamActive)}><button className='btn-primary px-3 py-2 rounded-md flex items-center' onClick={logout}>Logout</button></li> 
                  : 
                  <li className='mb-3 sm:mb-0' onClick={() => setHamActive(!hamActive)}><Link className='btn-primary px-3 py-2 rounded-md flex items-center' to={"/login"}>Login</Link></li> 
                }
            </ul>
            <div className={`ham col-span-1 place-self-end self-start sm:hidden`}>
              <div className="absolute right-12 top-6 menu" onClick={() => setHamActive(!hamActive)}>
                <span className={`line w-[24px] h-[2px] bg-[#ffffff] inline-block absolute top-0 ${hamActive && '-rotate-45 top-2'}`}></span>
                <span className={`line w-[24px] h-[2px] bg-[#ffffff] inline-block absolute top-2 ${hamActive && ' scale-0'}`}></span>
                <span className={`line w-[24px] h-[2px] bg-[#ffffff] inline-block absolute top-4 ${hamActive && 'rotate-45 -translate-y-2 top-2'}`}></span>
              </div>
            </div>
        </nav>
    </header>
  )
}

export default Header
