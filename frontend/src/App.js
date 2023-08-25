import { useState } from 'react'
import './App.css'
import Layout from './Layout';
import NFTs from './components/NFTs';
import User from './pages/User'; 
// import {Web3Provider} from './scripts/web3'; 

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import MintNFT from './pages/MintNFT';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Search from './pages/Search';
import PageNotFound from './pages/PageNotFound';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element:  <Home />,
      },
      {
        path : "/mint", 
        element : <MintNFT />
      }, 
      {
        path : "/signup", 
        element : <Signup />
      }, 
      {
        path : "/login", 
        element : <Login />
      }, 
      {
        path : "/profile",
        element : sessionStorage.getItem("isLoggedIn") ? <User /> : <PageNotFound />
      },
      {
        path : "/search",
        element : <Search />
      }
    ],
  },
]);

function App() {
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
