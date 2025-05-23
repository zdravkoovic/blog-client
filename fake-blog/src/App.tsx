import './App.css'
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import { UserProvider } from './Context/userAuth';
import { Outlet } from 'react-router-dom';
import './Services/echo';
import { TagProvider } from './Context/tagContext';

function App() {
  // const [count, setCount] = useState(0)
  const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
  });

  return (
    <>
    <UserProvider>
      <AuthProvider store={store}>
        <TagProvider>
          <Outlet /> 
        </TagProvider>
      </AuthProvider>
      <ToastContainer />
    </UserProvider>
    </>
  );
}

export default App
