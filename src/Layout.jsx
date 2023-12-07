import React from 'react'
import Header from './components/partials/Header'
import Footer from './components/partials/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
   <>
        <Header />
        <div className='main'>
          <Outlet />
        </div>
        {/* <Footer /> */}
   </>
  )
}

export default Layout
