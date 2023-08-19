import React from 'react'

function SearchBar() {
  return (
    <div>
        <form action="">
            <input className='px-2 py-1 rounded-sm' type="text" placeholder='Search for NFT' />
            <button className='btn-primary px-2 py-1 rounded-sm'>Search</button>
        </form>
    </div>
  )
}

export default SearchBar
