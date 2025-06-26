import './App.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import { UserProvider } from './Context/userAuth';
import { Outlet, useLocation } from 'react-router-dom';
import './Services/echo';
import { TagProvider } from './Context/tagContext';
import Header from './Page/Header';
import { SearchResultsProvider } from './Context/searchResultsContext';

function App() {
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
