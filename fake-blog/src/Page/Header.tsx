import AddIcon from "@mui/icons-material/Add"
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useContext, useState } from "react";
import CreateBlogModal from "./common/CreateBlogModal";
import { UserContext } from "../Context/userContext";
import axiosSSR from "../components/auth/axiosSSR";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LoginBtn from "./common/LoginBtn";

type Props = {}

export default function Header({}: Props) {
  // const { isLoggedIn, user, logout } = userAuth();
  const user = useContext(UserContext);

  const navigate = useNavigate();

  console.log(user);

  function isLoggedIn() { return user !== null }

  const logout = async () => {
    const message = await axiosSSR.post('/logout');

    console.log(message);
  }

  const [ showCreateBlog, setShowCreateBlog ] = useState(false);
  const openModal = () => setShowCreateBlog(true);
  const closeModal = () => setShowCreateBlog(false);

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
      <CreateBlogModal show={showCreateBlog} onHide={closeModal}/>
      { !isLoggedIn() ? (
      <div className="bg-grape py-24 sm:py-32">
          <LoginBtn />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                  <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">From the blog</h2>
                  <p className="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p>
              </div>
          </div>
      </div>) : (
        <Disclosure as="nav" className="bg-blue-400">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
              {/* <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              /> */}
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
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="menuButton relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  {/* <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span> */}
                  <img
                    alt=""
                    src={user?.avatar_url}
                    className="size-11 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <button
                    onClick={openModal}
                    className="select-none block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Create blog
                    <AddIcon className="ml-9"/>
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Settings
                  </button>
                </MenuItem>
                <MenuItem>
                <form onSubmit={handleSubmit(handleLogout)} method="POST">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Sign out
                    </button>
                </form>
                </MenuItem>
              </MenuItems>
            </Menu>
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