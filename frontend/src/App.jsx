import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Layout from './Layout';
import NFTs from './components/NFTs'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element:  <NFTs />,
      },
    ],
  },
]);

function App(props) {

  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  )
}

export default App
