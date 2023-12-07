import React, { useEffect, useState } from 'react'
import NFTs from '../components/NFTs'
import AuctionNFTs from '../components/AuctionNFTs'
import axios from 'axios';
import { BASE_URL } from '../services/ApiServices';
// import SearchBar from '../components/SearchBar'

function Home() {
 
  return (
    <section id='Home' className='px-8 mb-8'>
        <NFTs/>
        <AuctionNFTs />
    </section>
  )
}

export default Home
