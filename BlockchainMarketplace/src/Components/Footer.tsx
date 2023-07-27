import { BsTwitter, BsInstagram, BsYoutube, BsTiktok } from "react-icons/bs";
import { BiMessage } from "react-icons/bi"


const Footer = () => {
    return (
        <>
            <div className='bg-[#1868B7] mt-3 text-white  h-[auto]  relative  w-[100%] py-6 px-[32px]'>
                <div className=' flex justify-between item-start  text-left border-b border-[#e5e8eb40]'>
                    <div className=' w-[50%] py-[32px] pr-[32px]'>
                        <div className='text-white text-[20px] font-[600] mb-[8px] text-left'>Stay in loop</div>
                        <div className='text--white text-[16px] text-left'>Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating OpenSea.</div>
                        <form className='flex mt-5'>
                            <div className='w-[70%]'>
                                <input placeholder='Your email address' className="py-[10px] px-[10px] background-color   text-black bg-white rounded-md 
                          border-[none] outline-none  !w-[100%]"></input>
                            </div>
                            <div className='ml-2'>
                                <button className='inline-flex items-center rounded-[12px] text-white  text-[16px] font-[600]  border-[none]   py-[10px] px-[24px]   bg-[#2081E2]'>Sign up</button>
                            </div>
                        </form>
                    </div>
                    <div className='w-[50%] py-[32px] pl-[32px]'>
                        <div className="text-[20px] text-left font-[600]">Join the community</div>
                        <div className='flex text-white   mt-5 '>
                            <ul className='list-none flex gap-5 text-[25px] font-[600]'>
                                <li>
                                    <button className="p-[10px] bg-[#2081E2] rounded-md w-[54px]  h-[54px]"><BsTwitter className="m-1" /></button>
                                </li>
                                <li>
                                    <button className="p-[10px] bg-[#2081E2] rounded-md w-[54px]  h-[54px]"><BsInstagram className="m-1" /></button>
                                </li>
                                <li>
                                    <button className="p-[10px] bg-[#2081E2] rounded-md w-[54px]  h-[54px]"><BsYoutube className="m-1" /></button>
                                </li>
                                <li>
                                    <button className="p-[10px] bg-[#2081E2] rounded-md w-[54px]  h-[54px]"><BsTiktok className="m-1" /></button>
                                </li>
                                <li>
                                    <button className="p-[10px] bg-[#2081E2] rounded-md w-[54px]  h-[54px]"><BiMessage className="m-1" /></button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between  pb-[40px]  mb-[20px]  border-b  border-[#e5e8eb40]">
                    <div className="w-[25%]   pt-[46px]   items-[flex-start]   text-[left]">
                        <div className="w-16 ">
                            <span><img src="opensea-white.svg" alt="" className="" /></span>
                        </div>
                        <div className="text-white text-[20px] font-[600] mb-[8px] mt-[8px]">OpenSea</div>
                        <div className="text-[16px] text-white leading-6">
                            The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.
                        </div>
                    </div>
                    <div className="flex gap-10 w-[75%] pt-[46px] items-flex-start pl-[72px]">
                        <div className="mb-[16px] w-[20%]  h-[100%]  pt-0  items-flex-start">
                            <h1 className="text-[16px] font-[600] text-white">Marketpalce</h1>
                            <ul className="mt-0 list-none pl-0 leading-9">
                                <li>All NFTs</li>
                                <li>Art</li>
                                <li>Gaming</li>
                                <li>Membership</li>
                                <li>PFPs</li>
                                <li>Photography</li>
                                <li>Music</li>
                            </ul>
                        </div>
                        <div className="mb-[16px] w-[20%]  h-[100%]  pt-0  items-flex-start">
                            <h1 className="text-[16px] font-[600] text-white"> My Account</h1>
                            <ul className="mt-0 list-none pl-0 leading-9">
                                <li>Profile</li>
                                <li>Watchlist</li>
                                <li>My Collection</li>
                                <li>Create</li>
                                <li>OpenSea Pro</li>
                                <li>Photography</li>
                                <li>Setting</li>
                            </ul>
                            <h1 className="text-[16px] font-[600] text-white mt-[43px]">Stats</h1>
                            <ul className="mt-0 list-none pl-0 leading-9">
                                <li>Ranking</li>
                                <li>Activity</li> 
                            </ul>
                        </div>
                        <div className="mb-[16px] w-[20%]  h-[100%]  pt-0  items-flex-start">
                            <h1 className="text-[16px] font-[600] text-white">Resources</h1>
                            <ul className="mt-0 list-none pl-0 leading-9">
                                <li>Blogs</li>
                                <li>Learn</li>
                                <li>Help Centre</li>
                                <li>Community standards</li>
                                <li>Taxes</li>
                                <li>partners</li>
                                <li>Developer platform</li>
                                <li>Platform status</li>
                            </ul>
                        </div>
                        <div className="mb-[16px] w-[20%]  h-[100%]  pt-0  items-flex-start">
                            <h1 className="text-[16px] font-[600] text-white">Company</h1>
                            <ul className="mt-0 list-none pl-0 leading-9">
                                <li>About</li>
                                <li>Careers</li>
                                <li>Ventures</li>
                            </ul>
                            <h1 className="text-[16px] font-[600] text-white mt-[48px]">Learn</h1>
                            <ul className="mt-0 list-none pl-0 leading-9">
                                <li>What is an NFT?</li>
                                <li>How to buy an NFT</li> 
                                <li>What are NFT drops?</li> 
                                <li>How to sell an NFT using OpenSea</li> 
                                <li>How to create an NFT on OpenSea</li> 
                                <li>What is a crypto wallet?</li> 
                                <li>What is cryptocurrency?</li> 
                                <li>What are blockchain gas fees?</li> 
                                <li>What is blockchain?</li> 
                                <li>What is web3?</li> 
                                <li>How to stay protected in web3?</li>
                            </ul>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className="items-center text-[12px] mt-[20px] mb-[20px] flex justify-between">
                   <div className="">
                    <p className="my-10">© 2018 - 2023 Ozone Networks, Inc</p>
                   </div>
                   <div className="flex gap-2">
                    <a>Privacy Policy</a>
                    <a>Terms of Service</a>
                   </div>
                </div>

            </div>


        </>
    )
}

export default Footer