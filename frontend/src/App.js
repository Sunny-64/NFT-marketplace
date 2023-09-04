import Layout from './Layout';
import User from './pages/User'; 

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

console.log(localStorage.getItem("isLoggedIn"));
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
        element : <User />
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
