import AddIcon from "@mui/icons-material/Add"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from '@mui/icons-material/Logout';
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useContext, useState } from "react";
import CreateBlogModal from "./common/CreateBlogModal";
import { UserContext } from "../Context/userContext";
import axiosSSR from "../components/auth/axiosSSR";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import LoginBtn from "./common/LoginBtn";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import SettingsModal from "./common/Settings";

type Props = {}

export default function Header({}: Props) {
  // const { isLoggedIn, user, logout } = userAuth();
  const user = useContext(UserContext);

  const navigate = useNavigate();

  function isLoggedIn() { return user !== null }

  const logout = async () => {
    const message = await axiosSSR.post('/logout');

    console.log(message);
  }

  const [ showCreateBlog, setShowCreateBlog ] = useState(false);
  const openModal = () => setShowCreateBlog(true);
  const closeModal = () => setShowCreateBlog(false);

  const [showSettings, setShowSettings] = useState(false);
  const openSettings = () => setShowSettings(true);

  const { handleSubmit } = useForm();

  const handleLogout =  async () => {
    console.log('Logout');
    const message = await axiosSSR.post('/logout', {}, {withCredentials: true});
    if(message.status === 200){
      console.log("Redirect");
      window.location.href = '/'
    }
  }

  return (
    <>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)}/>}
      <CreateBlogModal show={showCreateBlog} onHide={closeModal}/>
      { !isLoggedIn() ? (
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('./assets/background.jpg" }}>
          <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div className="h-screen relative z-20 flex-1/3 content-center mx-auto max-w-7xl px-6 lg:px-8">
              <div className="dark:text-gray-50 mx-auto max-w-2xl lg:mx-0" >
                  <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">From the blog</h2>
                  <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">Learn how to grow your business with our expert advice.</p>
              </div>
              <div className="relative z-20 mt-20 px-6 py-3 font-medium rounded-lg transition-colors duration-200">
                <LoginBtn />
              </div>
          </div>
      </div>) : (
        <Disclosure as="nav" className="dark:bg-blue-950 fixed z-10 bg-blue-900 text-white shadow-md w-full">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          <div className=" absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            {/* <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"> */}
              {/* <span className="absolute -inset-0.5" /> */}
              {/* <span className="sr-only">Open main menu</span> */}
              {/* <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" /> */}
              {/* <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" /> */}
            {/* </DisclosureButton> */}
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to='/'>
                <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=yellow&shade=500"
                  className="h-8 w-auto"
                />
              </Link>
              {/* {user && <img alt="" src={user.avatar} className="size-10 rounded-full bg-gray-50" />} */}
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              {/* <BellIcon aria-hidden="true" className="size-6" /> */}
            {/* </button> */} 

            {/* Profile dropdown */}
             <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className=" relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-b-full text-sm focus:outline-none">
                  {/* <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span> */}
                  <div className="flex items-center space-x-4 text-gray-600">
                    <Avatar className="w-13 h-13 rounded-full overflow-hidden">
                      <AvatarImage src={user?.avatar_url} className="object-cover w-full h-full"/>
                    </Avatar>
                  </div>
                </MenuButton>
                </div>
              <MenuItems
                transition
                className="dark:bg-blue-950 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-blue-800 py-1 shadow-lg ring-1 ring-yellow-400/50 transition focus:outline-none"
              >
                <MenuItem>
                  <button
                    onClick={openModal}
                    className="block w-full px-4 py-2 text-sm text-yellow-400 dark:hover:bg-blue-800 hover:text-white"
                  >
                    Create blog
                    <AddIcon className="ml-9"/>
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                  onClick={openSettings}
                    className="block w-full px-4 py-2 text-sm text-yellow-400 hover:bg-blue-700 hover:text-white"
                  >
                    Settings
                    <SettingsIcon className="ml-15" />
                  </button>
                </MenuItem>
                <MenuItem>
                <form onSubmit={handleSubmit(handleLogout)} method="POST">
                    <button
                      className="block w-full px-4 py-2 text-sm text-yellow-400 hover:bg-blue-700 hover:text-white"
                    >
                      Sign out
                      <LogoutIcon className="ml-15" />
                    </button>
                </form>
                </MenuItem>
              </MenuItems>
            </Menu>
            </div>
          </div>
        </div>
      </div>

        {/* <DisclosurePanel className="sm:hidden">
          {/* <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div> */}
        {/* </DisclosurePanel> */}
        </Disclosure>
      )}
    </>
  )
}