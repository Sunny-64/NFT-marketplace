import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineAccountCircle, MdOutlineWallet } from "react-icons/md";


  const Header  = () => {
    return (
        <div className="h-[100%] px-[30px] item-centre py-4 text-white" >
            <nav className='flex h-[100%]  justify-space-between ali'>
                <div className="flex !item-centre">
                    <img src="opensea-logo.svg" alt=" " className='w-10 h-10 !item-centre' />
                    <span className="mt-[2px] ml-[10px] text-[25px]  item-centre">OpenSea</span>
                    <div></div>
                    <div className='flex'>
                        <div className="h-[42px] box-border">
                            <div className="mx-[20px] bg-gray-300 h-[100%] w-[1px]"></div>
                        </div>
                        <div className="flex gap-x-[30px]  text-lg list-none items-center">
                            <li>Drops</li>
                            <li>Stats</li>
                        </div>
                    </div>
                </div>
                <div className='flex w-[50%] ms-5 '>
                    <div className="mr-[12px] flex p-[5px]  rounded-[12px] border  font-[__Inter_6faf11, __Inter_Fallback_6faf11, sans-serif]    w-[100%]
                      h-[48px]   text-[16px] bg-[#ffffff1f] ">
                        <div className="text-[#8A939B] mr-[8px] max-w-[24px] mt-[3px]">
                            <AiOutlineSearch className="opacity-80 text-[24px] font-normal inline-block " />
                        </div>
                        <input placeholder="Search items, collections, and accounts" type="search" className="py-[1px] px-[2px] background-color    bg-[transparent]
                          border[none] outline-none  w-[100%]"/>

                    </div>
                </div>
                <ul className="flex justify-center items-center flex-col list-none rounded-md  border  mr-[12px] cursor-pointer bg-[#ffffff1f] ">
                    <div className="flex">
                        <div className="p-[12px] h-[100%] flex border-r  border-[#E5E8EB]">
                            <div className="flex gap-x-[12px] text-[15px]">
                                <MdOutlineWallet className="inline-block font-normal leading-normal" />
                                <span className="font-[600] ">Connect Wallet</span>
                            </div>
                        </div>
                        <a className="p-[12px] text-[20px]">
                            <MdOutlineAccountCircle />
                        </a>
                    </div>
                    
                </ul>
                <li className="list-none cursor-pointer">
                    <div className="rounded-[12px] p-[12px] w-[48px] h-[48px] border border-gray-100 bg-[#ffffff1f] text-[20px] " >
                       <a ><AiOutlineShoppingCart/></a>
                    </div>
                </li>
            </nav>
        </div>
    )
}

export default Header