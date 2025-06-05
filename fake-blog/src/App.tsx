import './App.css'
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import { UserProvider } from './Context/userAuth';
import { Outlet } from 'react-router-dom';
import './Services/echo';
import { TagProvider } from './Context/tagContext';
import Header from './Page/Header';
import BlogsPage from './Page/Blogs';

function App() {
  // const [count, setCount] = useState(0)
  // const store = createStore({
  //   authName: '_auth',
  //   authType: 'cookie',
  // });

  return (
    <>
      <TagProvider>
        <UserProvider>

            <Outlet />
          
          <ToastContainer />
        </UserProvider>
      </TagProvider>
    </>
  );
}

export default App
