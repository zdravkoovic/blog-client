import './App.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider, type DehydratedState } from '@tanstack/react-query';
import { TagProvider } from './context/tagContext';
import { UserProvider } from './context/userAuth';
import { SearchResultsProvider } from './context/searchResultsContext';
import Header from './features/dashboard/components/Header';


function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [dehydratedState, setDehydratedState] = useState<DehydratedState | null>(null);

  useEffect(() => {
    const el = document.getElementById('__REACT_QUERY_STATE__');
    if (el) {
      const data = JSON.parse(el.textContent || '{}');
      setDehydratedState(data);
    }
  }, []);
  
  const [queryClient] = useState(
    () => 
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 20,
          },
        },
      }),
  )
  
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
              <HydrationBoundary state={dehydratedState}>
                <Outlet />
              </HydrationBoundary>
            <ToastContainer />
            </SearchResultsProvider>
          </UserProvider>
        </TagProvider>
      </QueryClientProvider>
    </>
  );
}

export default App
