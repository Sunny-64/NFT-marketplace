import {React, useState, useEffect} from 'react';
import Layout from './Layout';
import User from './pages/User'; 

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate
} from 'react-router-dom';
import Home from './pages/Home';
import MintNFT from './pages/MintNFT';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Search from './pages/Search';
import PageNotFound from './pages/PageNotFound';

function ProtectedRoutes({component : Component, ...props}) {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn"); 
    if(!isLoggedIn){
        return <Navigate to={"/login"}/>
    }
    return <Component {...props}/>
}

function App() {

  const [loggedIn, setLoggedIn] = useState(false); 

  useEffect(() => {
    setLoggedIn(Boolean(sessionStorage.getItem("isLoggedIn"))); 
  }, [loggedIn]); 

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
        element : <ProtectedRoutes component={User}/>
      },
      {
        path : "/search",
        element : <Search />
      }, 
      {
        path : "/page-not-found", 
        element : <PageNotFound />
      }
    ],
  },
]);

    return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
    )
}

export default App;
