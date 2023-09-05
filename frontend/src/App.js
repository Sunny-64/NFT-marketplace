import Layout from './Layout';
import User from './pages/User'; 

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';
import Home from './pages/Home';
import MintNFT from './pages/MintNFT';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Search from './pages/Search';
import PageNotFound from './pages/PageNotFound';

// Define a custom ProtectedRoute component
function ProtectedRoute({ component: Component, ...rest }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const UID = localStorage.getItem("UID");

  // You can customize the redirection logic here
  if (!isLoggedIn) {
    // Redirect to the login page if not logged in
    return <Navigate to="/login" />;
  }

  // Render the component if authenticated
  return <Component {...rest} />;
}


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
        // element : sessionStorage.getItem("isLoggedIn") ? <User /> : <PageNotFound />
        // element : <User /> 
        element : <ProtectedRoute component={User} />
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
