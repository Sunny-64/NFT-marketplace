import React from 'react'
import NFTs from '../components/NFTs'
import AuctionNFTs from '../components/AuctionNFTs'

function Home() {
  return (
    <section id='Home' className='px-8 mb-8'>
        {/* NFTs... */}
        <NFTs/>
        <AuctionNFTs />
    </section>
  )
}

export default Home
