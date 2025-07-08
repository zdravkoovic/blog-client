import './App.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import { UserProvider } from './Context/userAuth';
import { Outlet, useLocation } from 'react-router-dom';
import './Services/echo';
import { TagProvider } from './Context/tagContext';
import Header from './Page/Header';
import { SearchResultsProvider } from './Context/searchResultsContext';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  const queryClient = new QueryClient();
  
  useEffect(() => {
    const theme = localStorage.getItem('app-theme');
    if(theme)
    {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [])

  return (
    <>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </>
  );
}

export default App
