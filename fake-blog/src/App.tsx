import './App.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TagProvider } from './context/tagContext';
import { UserProvider } from './context/userAuth';
import { SearchResultsProvider } from './context/searchResultsContext';
import Header from './features/dashboard/components/Header';


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
