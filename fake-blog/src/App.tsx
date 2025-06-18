import './App.css'
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import { UserProvider } from './Context/userAuth';
import { Outlet, useLocation } from 'react-router-dom';
import './Services/echo';
import { TagProvider } from './Context/tagContext';
import Header from './Page/Header';
import BlogsPage from './Page/Blogs';
import { useState } from 'react';
import type { Blog } from './Services/BlogService';
import { Search } from 'lucide-react';
import { SearchResultsContext, SearchResultsProvider } from './Context/searchResultsContext';

function App() {
  // const [count, setCount] = useState(0)
  // const store = createStore({
  //   authName: '_auth',
  //   authType: 'cookie',
  // });

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <TagProvider>
        <UserProvider>
          <SearchResultsProvider>
          {!currentPath.includes('/login') && !currentPath.includes('/register')
            && <Header/>
          }
            <Outlet />
          <ToastContainer />
          </SearchResultsProvider>
        </UserProvider>
      </TagProvider>
    </>
  );
}

export default App
